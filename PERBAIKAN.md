# Perbaikan UI/UX, Layout, dan Bug Admin Dashboard

Lakukan perbaikan pada dashboard admin dengan fokus pada **UI/UX**, **konsistensi layout**, dan **perbaikan bug**, tanpa mengubah logika bisnis atau fitur yang sudah berjalan dengan baik.

---

# 1. Perbaikan Layout Halaman Profile

Saat ini halaman **Profile** masih terlalu sempit karena kontennya berada di tengah dengan banyak ruang kosong di sisi kiri dan kanan. Selain itu, tinggi setiap section terlalu besar sehingga pengguna harus melakukan scroll untuk melihat seluruh form.

## Perbaikan yang diinginkan

- Manfaatkan area konten secara maksimal setelah sidebar.
- Jangan gunakan layout yang sempit atau menumpuk di tengah.
- Kurangi ruang kosong di sisi kiri dan kanan.
- Susun ulang form agar lebih ringkas.
- Seluruh form idealnya dapat terlihat dalam satu layar desktop tanpa perlu scroll.
- Pertahankan desain yang modern, bersih, dan konsisten dengan tema dashboard.

---

# 2. Perbaikan Bug Login

Masih terdapat bug pada proses login.

## Permasalahan

- Setelah login berhasil, pengguna terkadang tidak langsung diarahkan ke halaman **Dashboard**.
- Sebelum Dashboard muncul, masih sempat terlihat halaman atau komponen **Edit Profile** versi lama (flicker).

## Perbaikan

- Pastikan setelah login pengguna langsung diarahkan ke Dashboard.
- Hilangkan tampilan halaman lama sebelum proses redirect selesai.

---

# 3. Penyederhanaan Menu Add Skill

Perbaiki tampilan **Add Skill** agar lebih sederhana dan modern.

## Perubahan yang diinginkan

- Hilangkan daftar atau tombol yang terlalu banyak.
- Tampilkan hanya ikon-ikon skill.
- Mekanisme interaksi:
  - Klik satu kali → Skill aktif.
  - Klik sekali lagi → Skill nonaktif.
- Pengguna cukup memilih skill melalui ikon sehingga tampilannya lebih bersih, cepat, dan intuitif.

---

# 4. Perbaikan Dark Mode & Light Mode

Saat ini fitur **Dark Mode** dan **Light Mode** pada dashboard admin belum berfungsi dengan benar.

## Pastikan

- Pergantian tema dapat dilakukan secara langsung tanpa refresh halaman.
- Tema diterapkan secara konsisten ke seluruh halaman dan komponen.
- Preferensi tema disimpan sehingga tetap digunakan saat aplikasi dibuka kembali.

---

# 5. Periksa Implementasi Accent Color

Fitur **Accent Color** terlihat belum berfungsi sebagaimana mestinya.

## Yang perlu dilakukan

- Bandingkan implementasinya dengan aplikasi asli di folder **`protofolio-app`**.
- Pastikan mekanisme pemilihan warna sama dengan aplikasi asli.
- Pastikan penyimpanan warna berjalan dengan benar.
- Accent Color langsung diterapkan ke seluruh komponen tanpa perlu refresh.
- Jika ada implementasi yang berbeda atau belum lengkap, samakan dengan aplikasi asli.

---

# 6. Perbaikan Layout Seluruh Halaman CRUD

Perbaiki seluruh halaman CRUD, antara lain:

- Profile
- Skills
- Projects
- Experiences
- Education
- Achievements
- Social Links
- Dan halaman CRUD lainnya.

## Permasalahan

Hampir semua halaman CRUD masih menggunakan layout sempit sehingga seluruh form hanya berada di tengah halaman dan menyisakan banyak ruang kosong.

## Perbaikan

- Gunakan area konten secara maksimal.
- Form lebih lebar dan nyaman digunakan.
- Layout konsisten di seluruh halaman.
- Jika memungkinkan, seluruh form dapat terlihat dalam satu layar desktop tanpa scroll berlebihan.

---

# 7. Pindahkan Judul Halaman ke Navbar

Saat ini setiap halaman masih memiliki judul seperti:

- New Project
- Edit Profile
- New Skill
- Edit Experience
- Dan halaman lainnya.

Judul tersebut masih berada di dalam area konten.

## Perbaikan

- Pindahkan judul halaman ke **Navbar/Header**.
- Navbar harus menampilkan nama halaman yang sedang aktif.
- Setelah dipindahkan, hilangkan judul yang berada di dalam halaman agar tidak terjadi duplikasi.
- Manfaatkan ruang vertikal secara lebih efisien.

Contoh judul di Navbar:

- Dashboard
- Projects
- New Project
- Skills
- Profile
- Settings
- Experiences
- Education

---

# 8. Samakan Layout Seluruh Menu Admin

Saat ini hampir seluruh menu admin masih menggunakan layout lama yang sempit, termasuk:

- Profile
- Skills
- Projects
- Experiences
- Education
- Achievements
- Social Links
- Dan menu lainnya.

## Perbaikan

- Gunakan satu layout yang konsisten untuk seluruh halaman admin.
- Semua halaman harus memanfaatkan area konten secara maksimal setelah sidebar.
- Jangan ada lagi halaman yang menumpuk di tengah.
- Kurangi ruang kosong di sisi kiri dan kanan.
- Samakan tampilan card, form, tabel, tombol, serta jarak antar komponen.
- Jika seluruh halaman menggunakan layout/template yang sama, lakukan perbaikan pada layout tersebut agar semua halaman otomatis mengikuti desain baru.

---

# 9. Perbaikan Fungsionalitas CRUD

Saat ini sebagian besar fitur **CRUD (Create, Read, Update, Delete)** masih belum berfungsi dengan baik.

## Permasalahan

- Data baru belum dapat ditambahkan (Create).
- Data yang sudah ada belum dapat diedit (Update).
- Beberapa aksi CRUD tidak memberikan respons.
- Perubahan data tidak tersimpan.
- Beberapa form hanya menampilkan UI tanpa benar-benar menjalankan proses penyimpanan data.

## Perbaikan

Pastikan seluruh fitur CRUD berfungsi dengan baik pada semua modul admin, termasuk:

- Profile
- Skills
- Projects
- Experiences
- Education
- Achievements
- Social Links
- Dan seluruh modul CRUD lainnya.

### Yang harus dipastikan

- Create (Tambah Data) berfungsi.
- Read (Menampilkan Data) berfungsi.
- Update (Edit Data) berfungsi.
- Delete (Hapus Data) berfungsi jika memang tersedia.
- Perubahan langsung tersimpan dan diperbarui pada daftar data.
- Seluruh form terhubung dengan API, database, atau state management yang benar.
- Validasi form tetap berjalan.
- Tampilkan notifikasi sukses maupun gagal setelah proses CRUD.
- Jika implementasi CRUD belum lengkap, lakukan pengecekan dan sesuaikan dengan implementasi pada folder **`protofolio-app`**.

---

# Tujuan Akhir

Saya ingin dashboard admin memiliki tampilan modern, profesional, dan konsisten seperti dashboard SaaS (GitHub, Vercel, Linear, atau Supabase).

## Hasil yang diharapkan

- Memanfaatkan area konten secara maksimal.
- Tidak ada layout yang sempit atau menumpuk di tengah.
- Tidak ada ruang kosong yang berlebihan.
- Tidak memerlukan scroll yang tidak perlu pada halaman form.
- Seluruh halaman memiliki desain dan tata letak yang konsisten.
- Navigasi terasa lebih halus tanpa flicker.
- Seluruh fitur CRUD berfungsi dengan baik.
- Dark Mode dan Light Mode berfungsi dengan baik.
- Accent Color berfungsi sesuai implementasi pada aplikasi asli.
- UI terasa lebih modern, rapi, profesional, dan nyaman digunakan.

> **Catatan:** Jangan mengubah logika bisnis, struktur database, API, maupun fitur yang sudah berjalan dengan baik. Fokus pada perbaikan UI/UX, layout, konsistensi desain, penyelesaian bug, dan memastikan seluruh fitur CRUD dapat digunakan sebagaimana mestinya. Jika diperlukan, lakukan pengecekan dan bandingkan implementasi dengan aplikasi asli pada folder **`protofolio-app`** agar perilaku dan fungsionalitas tetap konsisten.