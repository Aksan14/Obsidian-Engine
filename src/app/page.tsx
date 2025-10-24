"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  // Dummy events data
  const dummyEvents = [
    {
      id: "1",
      title: "Workshop UI/UX Design 2025",
      date: "2025-11-15T14:00:00",
      location: "Lab Komputer Gedung A",
      organizer: "UKM Desain Grafis",
      capacity: 50,
      registered: 32,
      category: "Workshop"
    },
    {
      id: "2",
      title: "Turnamen E-Sports PUBG Mobile",
      date: "2025-11-20T09:00:00",
      location: "Aula Utama",
      organizer: "UKM Gaming",
      capacity: 100,
      registered: 87,
      category: "Kompetisi"
    },
    {
      id: "3",
      title: "Seminar Kewirausahaan Digital",
      date: "2025-11-25T13:00:00",
      location: "Auditorium Kampus",
      organizer: "BEM Fakultas Ekonomi",
      capacity: 200,
      registered: 145,
      category: "Seminar"
    },
    {
      id: "4",
      title: "Festival Musik Akustik",
      date: "2025-12-01T18:00:00",
      location: "Lapangan Kampus",
      organizer: "UKM Musik",
      capacity: 300,
      registered: 256,
      category: "Festival"
    },
  ];

  // Gallery images (letakkan file gambar di /public/galeri/)
  const galleryImages = [
    "/6.png",
    "/5.png",
    "/4.png",
    "/3.png",
    "/2.png",
    "/1.png"
  ];
  const [activeImage, setActiveImage] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-20 min-h-[85vh] flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-7 text-center lg:text-left">
              <div className="inline-block">
                <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-red-600/30">
                  Platform Resmi Fakultas Teknik
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white">
                Platform Lembaga<br/>
                & Event<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                  Fakultas Teknik
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Kelola event kelembagaan, ajukan persetujuan admin, dan fasilitasi pendaftaran mahasiswa dengan tiket digital berbasis QR — terpusat dan efisien.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
                <Link 
                  href="/events" 
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-600/40 hover:shadow-red-600/60 transition-all duration-300 hover:scale-105"
                >
                  Lihat Event
                </Link>
                <Link 
                  href="/auth/login" 
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-900 bg-white rounded-xl hover:bg-gray-100 shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Buat Event
                </Link>
              </div>
              
              <p className="text-sm text-gray-400 italic">
                Tidak perlu instalasi rumit. Login untuk mulai membuat atau mendaftar event.
              </p>
            </div>

            {/* Right Content - Logo */}
            <div className="flex justify-center items-center lg:justify-end">
              <div className="relative w-full max-w-[400px] lg:max-w-[500px] aspect-square">
                {/* Enhanced Multiple Glow Layers */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 via-white/40 to-red-600/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-red-500/30 to-white/50 rounded-full blur-2xl"></div>
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                {/* Rotating Ring Effect */}
                <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-spin" style={{ animationDuration: '20s' }}></div>
                <div className="absolute inset-8 rounded-full border-2 border-red-500/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                
                {/* Logo */}
                <div className="relative w-full h-full z-10">
                  <Image 
                    src="/logolomba1.png" 
                    alt="Platform Logo" 
                    fill 
                    className="object-contain drop-shadow-[0_0_80px_rgba(255,255,255,0.6)]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About & Benefits Section */}
      <section className="py-16 lg:py-20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-3">
              Mengapa Memilih Platform Kami?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Solusi terpadu untuk manajemen event kampus yang modern dan efisien
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            
            {/* Tentang Platform */}
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-7 border-2 border-white/10 hover:border-red-600 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-red-600/30">
                  T
                </div>
                <h3 className="text-xl font-black text-white">Tentang Platform</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-base">
                Platform Lembaga Teknik membantu pengurus mengelola event dan administrasi pendaftaran secara terpusat. Mulai dari pengajuan event, persetujuan admin, hingga distribusi tiket QR untuk memudahkan check-in saat acara.
              </p>
            </div>

            {/* Manfaat Utama */}
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-7 border-2 border-white/10 hover:border-red-600 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-red-600/30">
                  M
                </div>
                <h3 className="text-xl font-black text-white">Manfaat Utama</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Alur persetujuan event yang jelas antara Pengurus dan Admin",
                  "Pendaftaran online cepat tanpa kertas",
                  "Tiket QR untuk check-in yang efisien",
                  "Transparansi informasi event untuk mahasiswa"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-600/20 text-red-400 rounded-full flex items-center justify-center text-sm font-bold">
                      ✓
                    </span>
                    <span className="text-gray-300 leading-relaxed text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-3">
              Bagaimana Cara Kerjanya?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Proses sederhana dari pembuatan event hingga tiket digital dalam 4 langkah mudah
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Pengurus Membuat Event",
                desc: "Pengurus membuat detail event dengan formulir yang mudah"
              },
              {
                step: "02",
                title: "Admin Review",
                desc: "Admin meninjau dan menyetujui event yang diajukan"
              },
              {
                step: "03",
                title: "Event Publikasi",
                desc: "Event yang disetujui tampil publik di halaman Event"
              },
              {
                step: "04",
                title: "Mahasiswa Daftar",
                desc: "Mahasiswa mendaftar dan mendapat tiket QR untuk check-in"
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 h-full border-2 border-white/10 hover:border-red-600 hover:-translate-y-2">
                  
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-red-600/40">
                    {item.step}
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-black text-lg mb-2 text-white pt-4">{item.title}</h3>
                  
                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed text-sm">{item.desc}</p>
                </div>

                {/* Connector Arrow */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <div className="text-red-600 text-2xl font-bold">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-3">
              Platform Terpercaya Kampus
            </h2>
            <p className="text-lg text-gray-400">
              Dipercaya oleh ribuan mahasiswa dan puluhan lembaga
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "5+", label: "Lembaga Terintegrasi" },
              { number: "1000+", label: "Mahasiswa Terdaftar" },
              { number: "10+", label: "Event Terselenggara" },
              { number: "5 Menit", label: "Rata-rata Registrasi" }
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border-2 border-white/10 hover:border-red-600 hover:scale-105"
              >
                <div className="text-3xl lg:text-4xl font-black text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-bold text-sm lg:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Mendatang Section */}
      {/* <section className="py-16 lg:py-20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-3">
              Event Mendatang
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Jangan lewatkan event-event menarik dari berbagai lembaga fakultas
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {dummyEvents.map((event) => {
              const eventDate = new Date(event.date);
              const percentFull = Math.round((event.registered / event.capacity) * 100);
              
              return (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 border-2 border-white/10 hover:border-red-600"
                >
                  {/* Category Badge }
                  <div className="mb-3">
                    <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md shadow-red-600/30">
                      {event.category}
                    </span>
                  </div>
                  
                  {/* Event Title }
                  <h3 className="font-black text-base mb-3 line-clamp-2 text-white group-hover:text-red-400 transition-colors min-h-[3rem]">
                    {event.title}
                  </h3>
                  
                  {/* Event Info }
                  <div className="space-y-2 text-xs mb-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <span className="text-red-500 font-bold">📅</span>
                      <span className="font-medium">{eventDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <span className="text-red-500 font-bold">🕐</span>
                      <span className="font-medium">{eventDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <span className="text-red-500 font-bold">📍</span>
                      <span className="font-medium line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <span className="text-red-500 font-bold">👥</span>
                      <span className="font-medium line-clamp-1">{event.organizer}</span>
                    </div>
                  </div>
                  
                  {/* Capacity Progress }
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1.5 font-bold">
                      <span>{event.registered} terdaftar</span>
                      <span>{event.capacity} kapasitas</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          percentFull >= 90 ? 'bg-red-600' : 
                          percentFull >= 70 ? 'bg-orange-500' : 
                          'bg-green-500'
                        }`}
                        style={{ width: `${percentFull}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-400 mt-1 text-right font-bold">
                      {percentFull}% terisi
                    </div>
                  </div>
                  
                  {/* CTA }
                  <div className="pt-3 border-t-2 border-white/10 group-hover:border-red-600/50">
                    <span className="text-sm font-bold text-red-500 inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                      Lihat Detail
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          
          <div className="text-center">
            <Link 
              href="/events" 
              className="inline-flex items-center justify-center px-10 py-4 text-base font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-600/40 hover:shadow-red-600/60 transition-all duration-300 hover:scale-105"
            >
              Lihat Semua Event →
            </Link>
          </div>
        </div>
      </section> */}

      {/* Galeri Dokumentasi (kegiatan sudah terlaksana) */}
      <section className="py-16 lg:py-20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-3">
              Galeri Dokumentasi
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Dokumentasi kegiatan dan kegiatan yang telah terlaksana — klik untuk memperbesar.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {galleryImages.map((src, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(src)}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-white/10 hover:border-red-600 hover:scale-[1.02] transition-all duration-200"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={src}
                    alt={`Dokumentasi ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority={idx < 3}
                  />
                </div>
                <div className="p-3 text-sm text-gray-300">
                  Foto kegiatan {idx + 1}
                </div>
              </button>
            ))}
          </div>

          {/* Lihat Selengkapnya removed - gallery shows inline */}
        </div>

        {/* Modal pembesaran gambar */}
        {activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="relative max-w-4xl w-full">
              <button
                onClick={() => setActiveImage(null)}
                className="absolute -top-4 -right-4 bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
                aria-label="Tutup"
              >
                ×
              </button>
              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-white/10 rounded-2xl overflow-hidden p-4">
                <div className="relative w-full h-[60vh] sm:h-[70vh]">
                  <Image
                    src={activeImage}
                    alt="Dokumentasi besar"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* About Organizer Section */}
      <section className="py-16 lg:py-20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6">
            
            {/* Tentang Penyelenggara */}
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-7 border-2 border-white/10 hover:border-red-600 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-red-600/30">
                  P
                </div>
                <h3 className="text-xl font-black text-white">Tentang Penyelenggara</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-base">
                Platform ini dikembangkan dan dikelola oleh unit teknologi Fakultas Teknik yang berfokus pada digitalisasi layanan kemahasiswaan. Kami berkomitmen menghadirkan pengalaman pengelolaan event yang ringkas, aman, dan inklusif.
              </p>
            </div>

            {/* Komitmen */}
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-7 border-2 border-white/10 hover:border-red-600 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-red-600/30">
                  K
                </div>
                <h3 className="text-xl font-black text-white">Komitmen Kami</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Keamanan data dan privasi terjamin",
                  "Skalabilitas untuk seluruh lembaga fakultas",
                  "Dukungan dan pelatihan untuk pengurus"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-600/20 text-red-400 rounded-full flex items-center justify-center text-sm font-bold">
                      ✓
                    </span>
                    <span className="text-gray-300 leading-relaxed text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 lg:py-20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-3">
              Mitra & Kolaborator
            </h2>
            <p className="text-lg text-gray-400">
              Bekerja sama dengan berbagai fakultas dan unit kampus
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Lembaga Fakultas Teknik", initial: "FT" },
              { name: "Pimpinan Komisariat IMM FT", initial: "PK" },
              { name: "Badan Eksekutif Mahasiswa Fakultas Teknik", initial: "BK" },
              { name: "Direktorat Kemahasiswaan", initial: "DK" }
            ].map((partner, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 border-2 border-white/10 hover:border-red-600"
              >
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-red-600/30">
                  {partner.initial}
                </div>
                <div className="font-black text-white text-base">{partner.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5">
            Siap Memulai?
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Hubungi kami untuk onboarding lembaga dan pelatihan pengurus. Mulai digitalkan event kampus Anda sekarang!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-10 py-4 text-base font-bold text-red-600 bg-white rounded-xl hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Hubungi Kami
            </Link>
            <Link 
              href="/about" 
              className="inline-flex items-center justify-center px-10 py-4 text-base font-bold text-white border-2 border-white/30 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}