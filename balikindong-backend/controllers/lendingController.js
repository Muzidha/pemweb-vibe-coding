const Lending = require('../models/Lending');

// @desc    Get all lendings (Dashboard)
// @route   GET /api/lendings
const getLendings = async (req, res) => {
    // Hanya tampilkan barang milik user yang sedang login
    const lendings = await Lending.find({ user: req.user.id }).sort({ createdAt: -1 }); // Terbaru diatas
    res.status(200).json(lendings);
};

// @desc    Create new lending
// @route   POST /api/lendings
const createLending = async (req, res) => {
    const { itemName, borrowerName, conditionNotes } = req.body;

    // Validasi input
    if (!itemName || !borrowerName) {
        return res.status(400).json({ message: 'Nama barang dan peminjam wajib diisi' });
    }

    // Cek apakah ada file gambar diupload
    if (!req.file) {
        return res.status(400).json({ message: 'Bukti foto wajib diupload' });
    }

    const lending = await Lending.create({
        user: req.user.id,
        itemName,
        borrowerName,
        conditionNotes,
        imagePath: req.file.path, // Simpan path gambar dari Multer
    });

    res.status(200).json(lending);
};

// @desc    Update Status (Kembali)
// @route   PUT /api/lendings/:id
const updateLending = async (req, res) => {
    const lending = await Lending.findById(req.params.id);

    if (!lending) {
        return res.status(404).json({ message: 'Lending not found' });
    }

    // Pastikan yang update adalah pemilik data
    if (lending.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    // Update status jadi 'kembali'
    lending.status = 'kembali';
    lending.returnDate = Date.now();

    const updatedLending = await lending.save();

    res.status(200).json(updatedLending);
};

module.exports = { getLendings, createLending, updateLending };