# 📖 PANDUAN SETUP — Sistem Sijil (6 Guru Kongsi Data)

Panduan ini membolehkan **6 guru kongsi & lihat data yang sama** melalui **Google Sheets**.
Dilindungi kata laluan: **`Guru@2026`**

---

## 🗺️ Gambaran keseluruhan
1. Cipta Google Sheet (pangkalan data)
2. Pasang kod Apps Script → dapat URL Web App
3. Masukkan URL ke dalam `index.html`
4. Hoskan `index.html` di GitHub Pages
5. Kongsi pautan + kata laluan kepada 6 guru

---

## LANGKAH 1️⃣ — Cipta Google Sheet
1. Pergi ke [sheets.google.com](https://sheets.google.com) → **Blank spreadsheet**
2. Namakan fail: **Data Sijil Murid**
3. (Sheet kosong sahaja — kod akan buat tajuk kolum secara automatik)

---

## LANGKAH 2️⃣ — Pasang Apps Script
1. Dalam Google Sheet → menu **Extensions → Apps Script**
2. Padam semua kod sedia ada
3. Buka fail [`Code.gs`](Code.gs) dalam repo ini → salin **SEMUA** kod → tampal ke Apps Script
4. Klik ikon **Simpan** (disket)

### Deploy sebagai Web App
5. Klik butang **Deploy** (kanan atas) → **New deployment**
6. Klik ikon gear ⚙️ → pilih **Web app**
7. Isi:
   - **Description**: Sijil API
   - **Execute as**: **Me** (email anda)
   - **Who has access**: **Anyone**
8. Klik **Deploy**
9. Benarkan kebenaran (Authorize access) → pilih akaun Google anda → **Allow**
   - *(Jika ada amaran "Google hasn't verified", klik **Advanced → Go to (project) → Allow**)*
10. **SALIN "Web app URL"** — contoh: `https://script.google.com/macros/s/AKfy..../exec`

---

## LANGKAH 3️⃣ — Masukkan URL ke dalam aplikasi
1. Dalam repo GitHub → buka fail **`index.html`** → klik ✏️ (Edit)
2. Cari baris ini (berhampiran atas bahagian `<script>`):
   ```js
   const API_URL = 'MASUKKAN_URL_WEB_APP_ANDA_DI_SINI';
   ```
3. Ganti dengan URL yang anda salin tadi:
   ```js
   const API_URL = 'https://script.google.com/macros/s/AKfy..../exec';
   ```
4. (Pilihan) Untuk tukar kata laluan, ubah baris:
   ```js
   const KATA_LALUAN = 'Guru@2026';
   ```
5. Klik **Commit changes**

---

## LANGKAH 4️⃣ — Hoskan di GitHub Pages
1. Repo → **Settings → Pages**
2. **Source**: Branch **main**, folder **/(root)** → **Save**
3. Tunggu 1-2 minit. Pautan akan muncul:
   `https://sitifaizahhassan.github.io/sijil-tamat-persekolahan/`

---

## LANGKAH 5️⃣ — Kongsi kepada 6 guru
Hantar kepada setiap guru:
- 🔗 **Pautan**: `https://sitifaizahhassan.github.io/sijil-tamat-persekolahan/`
- 🔑 **Kata laluan**: `Guru@2026`

Setiap guru:
1. Buka pautan
2. Taip kata laluan
3. Isi / edit / cetak sijil — **semua data dikongsi & sama**

---

## ✅ Cara guna harian
| Tindakan | Langkah |
|----------|---------|
| Tambah murid | Isi borang → **Simpan Murid** |
| Kemas kini | Klik **Edit** pada senarai → ubah → **Simpan Murid** |
| Cetak semula | Klik **Cetak** → pilih *Save as PDF* / cetak |
| Padam | Klik **Padam** |
| Lihat data terkini | Klik **🔄 Muat Semula** |

---

## ❓ Masalah lazim
- **"API belum disambung"** → anda belum masukkan `API_URL` (Langkah 3)
- **Data tak simpan** → pastikan deployment "Who has access = Anyone"
- **Selepas ubah Code.gs** → perlu **Deploy → Manage deployments → Edit → New version**
- **Logo tak sama antara guru** → logo & tetapan sekolah disimpan per-komputer; setiap guru upload logo sekali sahaja pada komputer masing-masing

---

## 🔐 Nota keselamatan
Kata laluan ini bersifat **ringkas** (untuk kegunaan dalaman guru). Ia menghalang capaian tidak sengaja, tetapi bukan keselamatan gred tinggi. Jangan kongsi pautan/kata laluan kepada orang luar.
