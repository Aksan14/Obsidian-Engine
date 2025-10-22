Platform UKM & Event Kampus (UI-only)
====================================

Proyek ini menyediakan tampilan (frontend saja) untuk platform manajemen UKM dan event kampus:

- Autentikasi & Role Management: Admin Kampus, Pengurus UKM, Mahasiswa Umum (simulasi token)
- Manajemen Event: pengurus membuat event, admin menyetujui sebelum tampil publik
- Pendaftaran Event: formulir pendaftaran dan Tiket Digital berbentuk QR Code

Catatan: Tidak ada backend. Data disimpan di memory React Context selama sesi aplikasi berjalan.

Fitur Utama
-----------

- Autentikasi (UI): Login, Registrasi, Reset Password
	- Halaman: `/auth/login`, `/auth/register`, `/auth/reset`
- Event Publik:
	- Daftar event: `/events`
	- Detail + pendaftaran: `/events/[id]`
- Dashboard Pengurus:
	- Event saya: `/pengurus/events`
	- Buat event: `/pengurus/events/new`
- Dashboard Admin:
	- Persetujuan event: `/admin/events`
- Tiket & QR:
	- Daftar tiket: `/tickets`
	- Detail tiket (QR Code): `/tickets/[code]`

Teknologi
---------

- Next.js App Router, React, TypeScript
- Tailwind CSS (v4) untuk styling
- QR Code: `react-qr-code`

Cara Menjalankan
----------------

1. Instal dependensi
2. Jalankan development server

Opsional: build produksi

Struktur Kode
-------------

- `src/lib/types.ts`: Tipe data (User, Event, Registration)
- `src/lib/state.tsx`: React Context untuk state mock dan aksi (login/register, create/approve event, register event)
- `src/components/Navbar.tsx`: Navigasi
- Halaman berada di `src/app/**`

Lisensi
-------

Untuk keperluan demo internal/kampus. Silakan adaptasi sesuai kebutuhan backend Anda.
