import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaSignOutAlt, FaWhatsapp, FaCheckCircle, FaCamera, FaBoxOpen } from 'react-icons/fa';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [lendings, setLendings] = useState([]);
  
  const [itemName, setItemName] = useState('');
  const [borrowerName, setBorrowerName] = useState('');
  const [conditionNotes, setConditionNotes] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(storedUser);
      fetchLendings(storedUser.token);
    }
  }, [navigate]);

  const fetchLendings = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/lendings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLendings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error('Wajib upload foto bukti!');

    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('borrowerName', borrowerName);
    formData.append('conditionNotes', conditionNotes);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/lendings', formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Barang berhasil dicatat!');
      setItemName(''); setBorrowerName(''); setConditionNotes(''); setImage(null); setPreview(null);
      fetchLendings(user.token);
    } catch (error) {
      toast.error('Gagal upload');
    }
  };

  const markReturned = async (id) => {
    if(!window.confirm('Yakin barang ini sudah kembali?')) return;
    try {
      await axios.put(`http://localhost:5000/api/lendings/${id}`, {}, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success('Status diperbarui!');
      fetchLendings(user.token);
    } catch (error) {
      toast.error('Gagal update status');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const onLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* --- NAVBAR --- */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 px-4 py-3 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaBoxOpen className="text-2xl text-blue-600"/>
            <h1 className="text-xl font-bold text-gray-800">BalikinDong</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-gray-600 text-sm">Hi, {user?.name}</span>
            <button onClick={onLogout} className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4 mt-6">
        {/* --- GRID LAYOUT (Kiri Form, Kanan Data) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* KOLOM KIRI: FORM INPUT (Sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-24">
              <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">➕ Catat Pinjaman</h2>
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Barang</label>
                  <input type="text" placeholder="Contoh: Helm KYT" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Peminjam</label>
                  <input type="text" placeholder="Nama Teman" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" value={borrowerName} onChange={(e) => setBorrowerName(e.target.value)} required />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Kondisi</label>
                  <textarea placeholder="Ada lecet? Masih baru?" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" rows="2" value={conditionNotes} onChange={(e) => setConditionNotes(e.target.value)}></textarea>
                </div>
                
                {/* UPLOAD BOX */}
                <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition relative bg-gray-50">
                  <input type="file" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                  {preview ? (
                    <img src={preview} alt="Preview" className="h-40 w-full object-cover rounded-md" />
                  ) : (
                    <div className="text-gray-400 py-4">
                      <FaCamera className="mx-auto text-3xl mb-2" />
                      <p className="text-xs">Klik untuk foto bukti</p>
                    </div>
                  )}
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 shadow-lg transition transform hover:-translate-y-1">
                  Simpan Data
                </button>
              </form>
            </div>
          </div>

          {/* KOLOM KANAN: CARD LIST */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              📋 Daftar Barang ({lendings.length})
            </h2>
            
            {lendings.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                <FaBoxOpen className="text-6xl text-gray-200 mx-auto mb-4"/>
                <p className="text-gray-400">Belum ada barang yang dipinjamkan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {lendings.map((item) => (
                  <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group">
                    
                    {/* FOTO BARANG (Penting: Object Cover biar gak gepeng) */}
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={`http://localhost:5000/${item.imagePath}`} 
                        alt={item.itemName} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm ${item.status === 'kembali' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                        {item.status === 'kembali' ? 'Selesai' : 'Dipinjam'}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-800 mb-1">{item.itemName}</h3>
                      <p className="text-sm text-gray-500 mb-3">Peminjam: <span className="font-semibold text-gray-700">{item.borrowerName}</span></p>
                      
                      <div className="bg-gray-50 p-2 rounded text-xs text-gray-600 italic mb-4 border border-gray-100">
                        " {item.conditionNotes} "
                      </div>

                      {/* BUTTON ACTION */}
                      {item.status === 'dipinjam' && (
                        <div className="flex gap-2">
                          <a 
                            href={`https://wa.me/?text=Halo ${item.borrowerName}, barang ${item.itemName} kapan dibalikin?`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 hover:bg-green-200 transition"
                          >
                            <FaWhatsapp /> Tagih
                          </a>
                          <button 
                            onClick={() => markReturned(item._id)}
                            className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 hover:bg-blue-200 transition"
                          >
                            <FaCheckCircle /> Selesai
                          </button>
                        </div>
                      )}
                      
                      {item.status === 'kembali' && (
                         <div className="w-full bg-gray-100 text-gray-400 py-2 rounded-lg text-sm text-center font-medium">
                           Barang sudah kembali
                         </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;