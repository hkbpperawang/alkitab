# 📖 Alkitab HKBP Perawang

Situs web Alkitab online untuk HKBP Perawang dengan dukungan **Terjemahan Baru** dan **Bahasa Batak Toba**.

## ✨ Fitur Utama

- 📖 **Dua Versi Alkitab**: Terjemahan Baru (TB) dan Bahasa Batak Toba (BTB)
- 🌓 **Mode Gelap/Terang**: Interface yang nyaman untuk semua kondisi pencahayaan
- 📱 **Responsif**: Optimal untuk desktop, tablet, dan mobile
- 🔍 **Navigasi Mudah**: Dropdown untuk kitab, pasal, dan ayat
- 🚀 **Cepat**: Dilengkapi dengan caching untuk performa optimal
- 🎨 **Modern UI**: Menggunakan shadcn/ui dan Tailwind CSS
- 🌐 **SEO Friendly**: Meta tags yang dioptimalkan untuk mesin pencari

## 🛠 Teknologi yang Digunakan

### 🎯 Framework Utama
- **⚡ Next.js 15** - React framework dengan App Router
- **📘 TypeScript 5** - Type-safe JavaScript untuk pengalaman developer yang lebih baik
- **🎨 Tailwind CSS 4** - Utility-first CSS framework untuk pengembangan UI yang cepat

### 🧩 Komponen UI & Styling
- **🧩 shadcn/ui** - Komponen berkualitas tinggi berbasis Radix UI
- **🎯 Lucide React** - Library ikon yang indah dan konsisten
- **🌈 Next Themes** - Dukungan mode gelap/terang yang sempurna

### 🔄 State Management & Data Fetching
- **🔄 TanStack Query** - Sinkronisasi data yang powerful untuk React
- **🌐 Axios** - HTTP client berbasis Promise

## 🚀 Cara Menjalankan

### Persyaratan
- Node.js 18+ 
- npm atau yarn

### Instalasi & Development

```bash
# Clone repository
git clone <repository-url>
cd alkitab-hkbp-perawang

# Install dependencies
npm install

# Start development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi berjalan.

### Build untuk Production

```bash
# Build aplikasi
npm run build

# Start production server
npm start
```

## 📁 Struktur Proyek

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── bible/         # Bible data API endpoints
│   ├── error.tsx          # Error handling
│   ├── global-error.tsx   # Global error handling
│   ├── layout.tsx         # Root layout dengan theme provider
│   ├── not-found.tsx      # 404 page dengan redirect
│   └── page.tsx           # Halaman utama pembaca Alkitab
├── components/            # Reusable React components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
└── lib/                  # Utility functions dan configurations
```

## 🌐 API Source

Data Alkitab diambil dari API eksternal:
- **Repository**: [indrapalijama/alkitab-api-v3](https://github.com/indrapalijama/alkitab-api-v3)
- **Base URL**: `https://alkitab-api-v3.vercel.app`

### Endpoint yang Digunakan:
- `/books/{version}` - Mendapatkan daftar kitab
- `/{version}/{book}/{chapter}` - Mendapatkan ayat-ayat

### Versi yang Didukung:
- `tb` - Terjemahan Baru
- `btb` - Bahasa Batak Toba

## 🎨 Fitur UI

### 📖 Pembaca Alkitab
- **Pemilihan Kitab**: Dropdown dengan semua kitab Alkitab
- **Pemilihan Pasal**: Dropdown dinamis berdasarkan kitab yang dipilih
- **Pemilihan Ayat**: Opsional, bisa menampilkan seluruh pasal atau ayat spesifik
- **Tampilan Ayat**: Nomor ayat yang jelas dengan teks yang mudah dibaca

### 🌓 Mode Tema
- **Sistem Otomatis**: Mengikuti preferensi sistem
- **Manual Toggle**: Bisa beralih antara mode terang dan gelap
- **Transisi Halus**: Animasi yang nyaman saat pergantian tema

### 📱 Desain Responsif
- **Mobile First**: Dioptimalkan untuk penggunaan mobile
- **Tablet & Desktop**: Layout yang menyesuaikan untuk layar lebih besar
- **Touch Friendly**: Kontrol yang mudah digunakan di layar sentuh

## 🚀 Deployment

### Persiapan untuk GitHub Pages
1. **Custom Domain**: `alkitab.hkbpperawang.org`
2. **Build Command**: `npm run build`
3. **Output Directory**: `.next`
4. **Environment Variables**: Tidak diperlukan untuk build statis

### Error Handling
- **404 Page**: Otomatis redirect ke `alkitab.hkbpperawang.org`
- **Error Page**: Redirect ke domain utama dengan pesan error yang jelas
- **Global Error**: Handling untuk kesalahan sistem dengan redirect otomatis

## 🤝 Kontribusi

Project ini dikembangkan untuk kebutuhan jemaat HKBP Perawang. Jika ada saran atau kontribusi, silakan hubungi pengembang.

## 📄 Lisensi

Project ini untuk penggunaan internal HKBP Perawang.

---

Dibangun dengan ❤️ untuk jemaat HKBP Perawang  
🙏 Soli Deo Gloria