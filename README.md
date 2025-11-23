# BalikinDong
-----

## BalikinDong

> **Pinjam Meminjam Tanpa Drama.**
> *Personal Asset Lending Tracker with Proof-of-Condition.*

<img width="1919" height="896" alt="image" src="https://github.com/user-attachments/assets/8900abf1-eddf-40fa-97ff-98117aa6152a" />



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

### Cara Menjalankan Project (Setup Instructions)

Ikuti langkah-langkah berikut untuk menjalankan **BalikinDong** di komputer lokal Anda.

### 1. Prasyarat (Prerequisites)
Pastikan Anda sudah menginstall:
* [Node.js](https://nodejs.org/) (Versi 16 atau lebih baru)
* [Git](https://git-scm.com/)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Akun database cloud)

### 2. Clone Repository
```bash
git clone [https://github.com/username-kamu/balikindong.git](https://github.com/username-kamu/balikindong.git)
cd balikindong
````

### 3\. Setup Backend (Server)

Buka terminal baru, masuk ke folder backend:

```bash
cd balikindong-backend
```

**a. Install Dependencies:**

```bash
npm install
```

**b. Konfigurasi Environment Variable (.env):**
Buat file baru bernama `.env` di dalam folder `balikindong-backend`, lalu isi dengan konfigurasi berikut:

```env
PORT=5000
MONGO_URI=masukkan_connection_string_mongodb_anda_disini
JWT_SECRET=rahasia_kunci_jwt_bebas
NODE_ENV=development
```

**c. Buat Folder Uploads:**
Karena folder kosong tidak ter-upload ke git, Anda perlu membuatnya manual agar fitur upload foto berjalan:

```bash
mkdir uploads
```

**d. Jalankan Server:**

```bash
npm run dev
```

*(Server akan berjalan di http://localhost:5000)*

-----

### 4\. Setup Frontend (Client)

Buka terminal **baru** (jangan matikan terminal backend), masuk ke folder client:

```bash
cd client
```

**a. Install Dependencies:**

```bash
npm install
```

**b. Jalankan React App:**

```bash
npm run dev
```

Buka browser dan akses alamat yang muncul (biasanya **http://localhost:5173**).

-----

### 🧪 Akun Demo (Optional)

Jika Anda malas registrasi, gunakan akun demo berikut (jika database sudah di-seed):

  * **Email:** admin@demo.com
  * **Password:** 123456

-----

## 📸 Screen Capture

### Login Page

<img width="1368" height="794" alt="image" src="https://github.com/user-attachments/assets/85448ae9-8028-4584-8bde-f59914167e83" />

### Register Page

<img width="1249" height="811" alt="image" src="https://github.com/user-attachments/assets/4abad55f-490e-4962-8a53-f29319eb58d6" />

-----

Made with ❤️ by Mylord for Pemrograman Web Project.

```

### 💡 Tips Penting buat Kamu:

1.  **Jangan Upload `.env` ke GitHub:** Pastikan file `.env` kamu masuk ke dalam `.gitignore`. Juri harus membuat file `.env` mereka sendiri (atau kamu kasih tahu isinya saat presentasi), tapi jangan di-push ke publik karena ada password database kamu.
2.  **Folder Uploads:** Di instruksi di atas (poin 3c), saya tambahkan perintah `mkdir uploads`. Ini penting! Karena biasanya folder kosong tidak ikut ter-upload ke GitHub. Kalau juri clone kodinganmu dan folder `uploads` tidak ada, aplikasinya akan error saat upload gambar.
3.  **Link GitHub:** Ganti `username-kamu` di bagian clone dengan link repo aslimu nanti.

Sekarang README kamu sudah lengkap dari "Pitch" sampai "Cara Install". Ada lagi yang mau dipoles?
```
