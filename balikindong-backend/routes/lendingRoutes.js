const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getLendings, createLending, updateLending, deleteLending } = require('../controllers/lendingController');
const { protect } = require('../middleware/authMiddleware');

// --- KONFIGURASI MULTER (UPLOAD) ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // File disimpan di folder 'uploads'
  },
  filename: function (req, file, cb) {
    // Namai file: tanggal-namaasli.jpg
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Filter hanya terima gambar
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
// -----------------------------------

// Routes
// GET semua data & POST data baru (Ada upload gambar 'image')
router.route('/')
  .get(protect, getLendings)
  .post(protect, upload.single('image'), createLending);

// Update status (Mark as returned)
router.put('/:id', protect, updateLending);

// Delete lending
router.delete('/:id', protect, deleteLending);

module.exports = router;