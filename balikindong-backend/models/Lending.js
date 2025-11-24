const mongoose = require('mongoose');

const lendingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  itemName: {
    type: String,
    required: [true, 'Nama barang wajib diisi']
  },
  borrowerName: {
    type: String,
    required: [true, 'Nama peminjam wajib diisi']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Nomor WA peminjam wajib diisi']
  },
  borrowDate: {
    type: Date,
    default: Date.now
  },
  returnDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['dipinjam', 'kembali', 'hilang'],
    default: 'dipinjam'
  },
  imagePath: {
    type: String,
    required: [true, 'Bukti foto wajib diupload']
  },
  conditionNotes: {
    type: String,
    default: '-'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Lending', lendingSchema);