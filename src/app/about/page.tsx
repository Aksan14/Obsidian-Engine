export default function AboutPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-block">
          <span className="inline-block px-4 py-2 bg-red-50 rounded-full text-sm font-semibold text-red-700">
            Tentang Kami
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold">OBSIDIAN ENGINE</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Solusi terpadu untuk mengelola seluruh aktivitas event Lembaga dengan sistem digital yang modern dan efisien
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-3">Visi Kami</h2>
          <p className="text-gray-700 leading-relaxed">
            Menjadi platform digital terdepan yang menghubungkan seluruh ekosistem kegiatan kemahasiswaan dalam satu sistem yang terintegrasi dan mudah digunakan.
          </p>
        </div>
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-3">Misi Kami</h2>
          <p className="text-gray-700 leading-relaxed">
            Memberikan kemudahan dan keteraturan dalam pengelolaan event kampus, meningkatkan partisipasi mahasiswa, dan menciptakan pengalaman event yang memorable.
          </p>
        </div>
      </div>

      {/* Features Highlight */}
      <div className="card bg-gradient-to-br from-red-50 to-orange-50 border-red-100 p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Mengapa Pilih Platform Kami?</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="font-semibold mb-1">Cepat & Efisien</h3>
            <p className="text-sm text-gray-700">Proses approval dan registrasi dalam hitungan menit</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-1">Aman & Terpercaya</h3>
            <p className="text-sm text-gray-700">Data terenkripsi dengan sistem keamanan berlapis</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-1">Mobile Friendly</h3>
            <p className="text-sm text-gray-700">Akses dari mana saja, kapan saja via smartphone</p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Nilai-Nilai Kami</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="card text-center p-6">
            <h3 className="font-semibold mb-2">Transparansi</h3>
            <p className="text-sm text-gray-700">Informasi event yang jelas dan mudah diakses semua pihak</p>
          </div>
          <div className="card text-center p-6">
            <h3 className="font-semibold mb-2">Kolaborasi</h3>
            <p className="text-sm text-gray-700">Memfasilitasi kerja sama antar Lembaga Maupun dan unit kampus</p>
          </div>
          <div className="card text-center p-6">
            <h3 className="font-semibold mb-2">Inovasi</h3>
            <p className="text-sm text-gray-700">Terus berkembang dengan teknologi dan fitur terbaru</p>
          </div>
        </div>
      </div>

      {/* Team/Contact CTA */}
      <div className="card text-center bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-3">Bergabung Bersama Kami</h2> 
        <p className="mb-6 opacity-95">
          Punya pertanyaan atau ingin mengintegrasikan Lembaga Anda? Hubungi tim kami!
        </p>
        <div className="flex justify-center gap-3">
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-all">
            Hubungi Kami
          </a>
        </div>
      </div>
    </div>
  );
}
