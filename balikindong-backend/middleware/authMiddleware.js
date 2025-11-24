const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
  let token;

  // Cek apakah ada header Authorization dengan format "Bearer <token>"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Ambil tokennya saja (buang kata 'Bearer')
      token = req.headers.authorization.split(' ')[1];

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded);

      // Cari user berdasarkan ID di token, simpan di req.user
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        console.log('User not found for ID:', decoded.id);
        return res.status(401).json({ message: 'User not found' });
      }

      next(); // Lanjut ke controller berikutnya
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: 'Not authorized' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };