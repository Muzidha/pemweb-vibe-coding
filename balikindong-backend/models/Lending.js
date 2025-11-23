const mongoose = require('mongoose');

const lendingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Relasi: Barang ini milik User siapa?
  },
  itemName: {
    type: String,
    required: [true, 'Nama barang wajib diisi']
  },
  borrowerName: {
    type: String,
    required: [true, 'Nama peminjam wajib diisi']
  },
  borrowDate: {
    type: Date,
    default: Date.now // Default hari ini
  },
  returnDate: {
    type: Date // Opsional, kalau ada janji kapan balik
  },
  status: {
    type: String,
    enum: ['dipinjam', 'kembali', 'hilang'], // Hanya boleh 3 status ini
    default: 'dipinjam'
  },
  imagePath: {
    type: String,
    required: [true, 'Bukti foto wajib diupload'] // Fitur utama kita
  },
  conditionNotes: {
    type: String,
    default: '-' // Misal: "Ada lecet di kiri"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Lending', lendingSchema);