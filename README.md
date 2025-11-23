# BalikinDong
-----

## BalikinDong

> **Pinjam Meminjam Tanpa Drama.**
> *Personal Asset Lending Tracker with Proof-of-Condition.*

 *(screenshot aplikasi nanti)*

### Latar Belakang Masalah (The Problem)

Di lingkungan sosial kita (kampus, kos, atau tetangga), meminjamkan barang adalah hal yang lumrah. Namun, kebiasaan ini sering memicu **gesekan sosial** karena tiga masalah utama:

1.  **"Social Amnesia":** Peminjam lupa mengembalikan, dan pemilik lupa siapa yang meminjam. Barang hilang begitu saja.
2.  **Dispute Kondisi Barang:** Barang dikembalikan dalam kondisi rusak/baret, tapi peminjam menyangkal ("Pas kupinjam udah begitu kok\!").
3.  **Sungkan Menagih:** Pemilik barang sering merasa tidak enak hati untuk menagih barangnya sendiri, berujung pada kerugian finansial pribadi.

### Solusi Kami (The Solution)

**BalikinDong** hadir sebagai "pihak ketiga" digital yang mencatat setiap transaksi peminjaman secara transparan. Bukan sekadar catatan teks, aplikasi ini berfokus pada **Bukti Digital**.

Fitur kunci kami adalah **Condition-Check Upload**:

  * Sebelum barang berpindah tangan, pemilik **wajib** mengunggah foto kondisi terkini barang.
  * Foto ini menjadi acuan valid (timestamped evidence) jika terjadi kerusakan saat pengembalian.
  * Dilengkapi dengan tombol **"One-Click Reminder"** yang mengarahkan ke WhatsApp dengan pesan template sopan untuk menagih tanpa rasa canggung.

### Mengapa Aplikasi Ini Penting?

  * **Menjaga Hubungan:** Menghilangkan prasangka buruk antar teman dengan data yang jelas.
  * **Menyelamatkan Aset:** Mengurangi risiko barang pribadi hilang atau rusak tanpa pertanggungjawaban.
  * **Efisiensi Mental:** Mengurangi beban pikiran (*cognitive load*) untuk mengingat-ingat keberadaan barang.

### Fitur Utama (Key Features)

  * 🔐 **Secure Auth:** Login & Register menggunakan JWT (JSON Web Token).
  * 📸 **Visual Evidence:** Upload foto barang menggunakan Multer (disimpan di Server/Cloudinary).
  * 📝 **Lending Dashboard:** Pantau status barang (Dipinjam/Kembali) dalam satu pandangan.
  * 💬 **Smart Action:** Integrasi *direct link* ke WhatsApp untuk menghubungi peminjam.
  * 📱 **Responsive UI:** Tampilan modern dan mudah digunakan di Mobile maupun Desktop.

### Tech Stack

Project ini dibangun menggunakan **MERN Stack** untuk performa dan skalabilitas:

  * **Frontend:** React.js + Vite + Axios + Tailwind CSS (Responsif & Cepat).
  * **Backend:** Node.js + Express.js (REST API Architecture).
  * **Database:** MongoDB + Mongoose (Menyimpan data relasi User & Transaksi).
  * **File Handling:** Multer (Manajemen upload gambar).

-----

#### Cara Menjalankan Project (Setup Instructions)

*(isi cara install: npm install, setup .env, npm run dev, dll)*

-----
