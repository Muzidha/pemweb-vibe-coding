const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// Load config
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Supaya bisa baca data JSON dari frontend
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/lendings', require('./routes/lendingRoutes'));

// Folder statis untuk akses gambar yang diupload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test Route (Cek apakah server hidup)
app.get('/', (req, res) => {
  res.send('API BalikinDong is running...');
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));