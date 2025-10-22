"use client";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setSent(false);
    }, 3000);
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Contact Info */}
        <div className="space-y-6">
          <div>
            <div className="inline-block mb-3">
              <span className="inline-block px-4 py-2 bg-red-50 rounded-full text-sm font-semibold text-red-700">
                Hubungi Kami
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Mari Berkomunikasi</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Punya pertanyaan, saran, atau ingin bergabung? Kami siap membantu Anda!
            </p>
          </div>

          {/* Contact Cards */}
          <div className="space-y-4">
            <div className="card hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📧</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-sm text-gray-600">admin@obsidiaengine.ac.id</p>
                  <p className="text-xs text-gray-500 mt-1">Respons dalam 1-2 hari kerja</p>
                </div>
              </div>
            </div>

            <div className="card hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📱</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">WhatsApp</h3>
                  <p className="text-sm text-gray-600">+62 812-3456-7890</p>
                  <p className="text-xs text-gray-500 mt-1">Senin - Jumat, 09:00 - 17:00</p>
                </div>
              </div>
            </div>

            <div className="card hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📍</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Lokasi</h3>
                  <p className="text-sm text-gray-600">Gedung IQRO Lt. 3</p>
                  <p className="text-xs text-gray-500 mt-1">Universitas Muhammadiyah Makassar, Kota Makassar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="card bg-gradient-to-br from-gray-50 to-gray-100">
            <h3 className="font-semibold mb-3">Ikuti Kami</h3>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-white hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-all shadow-sm">
                <span className="text-lg">📘</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-all shadow-sm">
                <span className="text-lg">📸</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-all shadow-sm">
                <span className="text-lg">🐦</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-all shadow-sm">
                <span className="text-lg">💼</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div>
          {sent ? (
            <div className="card text-center py-12 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-2 text-green-800">Pesan Terkirim!</h3>
              <p className="text-gray-700 mb-4">
                Terima kasih telah menghubungi kami. Tim kami akan segera merespons pesan Anda.
              </p>
              <p className="text-sm text-gray-600">Form akan direset otomatis...</p>
            </div>
          ) : (
            <div className="card">
              <h2 className="text-2xl font-bold mb-2">Kirim Pesan</h2>
              <p className="text-sm text-gray-600 mb-6">
                Isi form di bawah dan kami akan merespons secepat mungkin
              </p>
              
              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <label className="label">Nama Lengkap *</label>
                  <input 
                    className="input" 
                    placeholder="Masukkan nama Anda"
                    value={name} 
                    onChange={e=>setName(e.target.value)} 
                    required 
                  />
                </div>
                
                <div>
                  <label className="label">Alamat Email *</label>
                  <input 
                    className="input" 
                    type="email"
                    placeholder="nama@email.com"
                    value={email} 
                    onChange={e=>setEmail(e.target.value)} 
                    required 
                  />
                </div>
                
                <div>
                  <label className="label">Pesan Anda *</label>
                  <textarea 
                    className="input resize-none" 
                    placeholder="Tuliskan pesan, pertanyaan, atau saran Anda di sini..."
                    value={message} 
                    onChange={e=>setMessage(e.target.value)} 
                    rows={6} 
                    required 
                  />
                </div>
                
                <button type="submit" className="btn-primary w-full">
                  📨 Kirim Pesan
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  Dengan mengirim pesan, Anda menyetujui kebijakan privasi kami
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
