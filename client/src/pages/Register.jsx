import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Panggil API Register
      await axios.post('http://localhost:5000/api/users', formData);
      toast.success('Registrasi Berhasil! Silakan Login.');
      navigate('/login'); // Pindah ke halaman login
    } catch (error) {
      toast.error(error.response?.data?.message || 'Terjadi Kesalahan');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Daftar Akun</h1>
        <p className="text-center text-gray-500 mb-6">Bergabung dengan BalikinDong</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nama Lengkap"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
          <input
            type="email"
            className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email Address"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
          <input
            type="password"
            className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200">
            Daftar
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login disini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;