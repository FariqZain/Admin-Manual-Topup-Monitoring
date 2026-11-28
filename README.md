# Top-Up Game Management

Aplikasi web admin untuk mengelola pesanan top-up game. Dibangun dengan Node.js, Express, dan MongoDB; menyediakan fitur membuat, melihat, mengubah, dan menghapus pesanan.

## Persyaratan

- Node.js dan npm
- MongoDB lokal yang sedang berjalan atau database MongoDB Atlas

## Persiapan

1. Buka terminal di folder project.
2. Pasang dependency:

   ```bash
   npm install
   ```

3. Buat atau perbarui file `.env` di folder utama project. Isi `MONGO_URI` dengan connection string MongoDB Anda:

   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/topup_game
   PORT=3000
   ```

   Untuk MongoDB Atlas, gunakan connection string Atlas sebagai nilai `MONGO_URI`. Pastikan database dapat diakses dari komputer Anda. Jangan bagikan atau commit connection string yang berisi kredensial.

## Menjalankan aplikasi

Jalankan mode biasa:

```bash
npm start
```

Atau jalankan mode pengembangan dengan restart otomatis saat file berubah:

```bash
npm run dev
```

Jika berhasil, server berjalan di `http://localhost:3000`. Buka alamat tersebut di browser. Jika variabel `PORT` di `.env` diubah, gunakan port tersebut.

## Fitur

- Membuat pesanan top-up untuk beberapa game
- Melihat, mencari, dan memfilter pesanan
- Mengubah detail maupun status pesanan
- Menghapus pesanan

API pesanan tersedia di `/api/orders`:

- `GET /api/orders` — daftar pesanan; mendukung query `status` dan `search`
- `POST /api/orders` — membuat pesanan
- `PUT /api/orders/:id` — memperbarui pesanan
- `DELETE /api/orders/:id` — menghapus pesanan

## Pemecahan masalah

- **`node` tidak dikenali atau muncul `exec: node: not found` di Git Bash**: error ini berarti `npm` ditemukan, tetapi Node.js belum ada di `PATH`. Jika Node.js terpasang di lokasi standar Windows, jalankan perintah berikut di Git Bash:

  ```bash
  export PATH="/c/Program Files/nodejs:$PATH"
  node --version
  npm --version
  ```

  Jika kedua perintah menampilkan versi, jalankan `npm install` lalu `npm start` dari folder proyek. Perintah `export` hanya berlaku untuk terminal saat ini. Agar permanen, tambahkan `C:\Program Files\nodejs` ke `Path` pada Windows Environment Variables, lalu buka ulang Git Bash. Jika Node.js tidak terpasang di lokasi tersebut, instal Node.js terlebih dahulu atau sesuaikan path di atas. Mengaktifkan lingkungan Python seperti `.venv` tidak menyediakan Node.js.

- **`node` tidak dikenali di Command Prompt**: tambahkan folder instalasi Node.js (umumnya `C:\Program Files\nodejs`) ke `PATH`, lalu tutup dan buka kembali terminal. Untuk terminal CMD saat ini, jalankan:

  ```cmd
  set "PATH=C:\Program Files\nodejs;%PATH%"
  ```

- **Gagal terhubung ke MongoDB**: pastikan MongoDB berjalan, nilai `MONGO_URI` benar, dan database Atlas mengizinkan koneksi dari jaringan Anda.
- **Port sudah digunakan**: ubah nilai `PORT` di `.env` ke port yang tersedia.
