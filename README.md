# Task Management App

Aplikasi manajemen tugas dengan sistem autentikasi dan antarmuka pengguna modern dibangun menggunakan Next.js.

## Fitur Utama

- ✅ Sistem Autentikasi (Login/Register)
- ✅ Manajemen Tugas CRUD
- ✅ Pemisahan Tugas Aktif/Selesai
- ✅ Toko Online(Add to Cart, detail, delete)
- ✅ Responsive Design

## Teknologi

- Next.js 14
- React 19
- TypeScript
- CSS Modules

## Instalasi

1. Clone repositori

```bash
git clone [repo-url]
```

2. Install dependencies

```bash
npm install
```

3. Jalankan development server

```bash
npm run dev
```

## Struktur Proyek

```
/src
├── app
│   ├── (auth) - Halaman login/register
│   ├── task_management - Fitur manajemen tugas
│   └── layout.tsx - Layout utama
├── components
│   ├── CustomButton - Komponen button reusable
│   └── InputField - Komponen input field
└── contexts - Auth context provider
```

## Scripts Tersedia

- `npm run dev` - Development mode
- `npm run build` - Build produksi
- `npm start` - Jalankan build produksi

## Kontribusi

Dibuka untuk kontribusi dengan membuat issue/pull request.
