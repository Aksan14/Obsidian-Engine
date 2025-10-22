export default function NotFound() {
  return (
    <div className="text-center space-y-3">
      <h1 className="text-3xl font-semibold">Halaman tidak ditemukan</h1>
      <p className="text-gray-700">Maaf, halaman yang Anda cari tidak tersedia.</p>
      <a href="/" className="btn-primary">Kembali ke Beranda</a>
    </div>
  );
}
