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
    try {
        console.log('Request Body:', req.body);
        console.log('Request File:', req.file);
        console.log('Request User:', req.user);

        const { itemName, borrowerName, phoneNumber, conditionNotes } = req.body;

        // Validasi input
        if (!itemName || !borrowerName || !phoneNumber) {
            return res.status(400).json({ message: 'Nama barang, peminjam, dan nomor WA wajib diisi' });
        }

        // Cek apakah ada file gambar diupload
        if (!req.file) {
            return res.status(400).json({ message: 'Bukti foto wajib diupload' });
        }

        if (!req.user) {
            return res.status(500).json({ message: 'Req.user is undefined' });
        }

        const lending = await Lending.create({
            user: req.user.id,
            itemName,
            borrowerName,
            phoneNumber,
            conditionNotes,
            imagePath: req.file.path, // Simpan path gambar dari Multer
        });

        res.status(200).json(lending);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

// @desc    Update Status (Kembali)
// @route   PUT /api/lendings/:id
const updateLending = async (req, res) => {
    try {
        console.log('Update Request ID:', req.params.id);
        console.log('Update Request User:', req.user);

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
    } catch (error) {
        console.error('Update Error:', error);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

// @desc    Delete Lending
// @route   DELETE /api/lendings/:id
const deleteLending = async (req, res) => {
    try {
        console.log('Delete Request ID:', req.params.id);
        console.log('Delete Request User:', req.user);

        const lending = await Lending.findById(req.params.id);

        if (!lending) {
            return res.status(404).json({ message: 'Lending not found' });
        }

        // Pastikan yang delete adalah pemilik data
        if (lending.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await lending.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        console.error('Delete Error:', error);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

module.exports = { getLendings, createLending, updateLending, deleteLending };