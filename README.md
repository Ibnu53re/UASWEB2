# UASPemogramanWeb2

# Nama: Ibnu Nazhif Alamsyah
# NIM:  312410094

## E-Inventory System

Sistem Manajemen Inventaris Barang berbasis web menggunakan arsitektur **Decoupled** yang memisahkan Backend API dan Frontend SPA.

---

## 🛠️ Teknologi

| Komponen | Teknologi |
|----------|-----------|
| Backend  | PHP CodeIgniter 4 (RESTful API) |
| Frontend | VueJS 3 (SPA via CDN) |
| UI | TailwindCSS via CDN |
| HTTP Client | Axios |
| Database | MySQL/MariaDB |
| Auth | Bearer Token |

---  

### Relasi Tabel
<img width="1366" height="728" alt="Image" src="https://github.com/user-attachments/assets/63bd2be1-3d45-4f57-9110-d2267766e715" />

Tabel yang digunakan:
- **users** — data admin login
- **kategori** — kategori barang
- **barang** — data barang (berelasi ke kategori via `id_kategori`)
- **supplier** — data supplier (berelasi ke barang via `id_supplier`)

---

## 🔐 Screenshot

### Error 401 - Token Tidak Ditemukan
<img width="1366" height="728" alt="Image" src="https://github.com/user-attachments/assets/6f30e769-be2c-4260-9bfe-40a225cc9ba1" />

Endpoint manipulasi data dilindungi Bearer Token. Akses tanpa token mengembalikan **401 Unauthorized**.

---

### Halaman Login
<img width="1366" height="690" alt="Image" src="https://github.com/user-attachments/assets/d6e2a172-3a07-47ec-8bf7-96ba8264955b" />

### Dashboard Admin
<img width="1366" height="688" alt="Image" src="https://github.com/user-attachments/assets/3862cdef-18b1-439b-bdf2-65472d18b230" />

### Manajemen Barang
<img width="1366" height="678" alt="Image" src="https://github.com/user-attachments/assets/ed03add6-b36e-4718-a43d-b80e95ac57aa" />

### Manajemen Kategori
<img width="1366" height="676" alt="Image" src="https://github.com/user-attachments/assets/39b0ba20-7f72-4874-911b-e258bb1bde9e" />

---

## 👥 Hak Akses

| Halaman | Pengunjung | Admin |
|---------|-----------|-------|
| Landing Page | ✅ | ✅ |
| Dashboard | ❌ | ✅ |
| Manajemen Barang | ❌ | ✅ |
| Manajemen Kategori | ❌ | ✅ |

---

## 🚀 Cara Menjalankan Proyek

### 1. Clone Repository
```bash
git clone https://github.com/Ibnu53re/UASWEB2.git
cd UASWEB2
```

### 2. Setup Backend
```bash
composer install
```
Copy file env:
```bash
cp env .env
```

Edit `.env`:
```
CI_ENVIRONMENT = development
database.default.hostname = localhost
database.default.database = inventaris_db
database.default.username = root
database.default.password = 
database.default.DBDriver = MySQLi
```

Jalankan server:
```bash
php spark serve
```

Backend berjalan di: `http://localhost:8080`

### 3. Buka Frontend
```
http://localhost/UASWEB2/frontend-spa/index.html
```

### Akun Default
| Username | Password |
|----------|----------|
| admin | admin123 |

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Keterangan |
|--------|----------|------|------------|
| POST | /api/login | ❌ | Login admin |
| POST | /api/logout | ✅ | Logout |
| GET | /api/kategori | ✅ | List kategori |
| POST | /api/kategori | ✅ | Tambah kategori |
| PUT | /api/kategori/{id} | ✅ | Edit kategori |
| DELETE | /api/kategori/{id} | ✅ | Hapus kategori |
| GET | /api/barang | ✅ | List barang |
| POST | /api/barang | ✅ | Tambah barang |
| PUT | /api/barang/{id} | ✅ | Edit barang |
| DELETE | /api/barang/{id} | ✅ | Hapus barang |

---

### Kebutuhan Sistem
- XAMPP (PHP 8.2+, MySQL)
- Composer
- Web Browser

## 🔗 Link

- 🎥 **Video Presentasi:** [YouTube](https://youtu.be/HNKGeBTBC9I?si=ZBjEHeAqjdomj00v)
- 🌐 **Demo:** https://ibnu53re.github.io/UASWEB2/frontend-spa/
