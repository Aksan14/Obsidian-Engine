"use client";
import { useApp } from "@/lib/state";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EventsPage() {
  const { events, user } = useApp();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="min-h-[calc(100vh-64px-300px)]">
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-600 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-red-600/30 animate-in fade-in zoom-in duration-300">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg shadow-red-600/50">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            
            {/* Title */}
            <h3 className="text-2xl font-black text-white mb-3 text-center">
              Login Diperlukan
            </h3>
            
            {/* Message */}
            <p className="text-gray-400 text-center mb-8">
              Silakan login terlebih dahulu untuk mendaftar event
            </p>
            
            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all duration-300 border-2 border-white/20 hover:border-white/40"
              >
                Batal
              </button>
              <button
                onClick={() => router.push("/auth/login")}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-3">
            Event Tersedia
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Jelajahi berbagai event menarik dari lembaga kampus
          </p>
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border-2 border-white/10 p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg shadow-red-600/30">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-white mb-3">
              Belum ada event tersedia
            </h2>
            <p className="text-gray-400">
              Event akan muncul di sini setelah dibuat oleh pengurus
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.filter((ev) => ev.status === "APPROVED").map((e) => {
              const eventDate = new Date(e.date);
              
              const handleClick = (evt: React.MouseEvent) => {
                if (!user) {
                  evt.preventDefault();
                  setShowLoginModal(true);
                }
              };
              
              return (
                <Link
                  key={e.id}
                  href={`/events/${e.id}`}
                  onClick={handleClick}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 border-2 border-white/10 hover:border-red-600"
                >
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md shadow-red-600/30">
                      Event
                    </span>
                  </div>

                  {/* Event Title */}
                  <h3 className="font-black text-xl mb-3 text-white group-hover:text-red-400 transition-colors line-clamp-2 min-h-[3.5rem]">
                    {e.title}
                  </h3>

                  {/* Event Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                    {e.description}
                  </p>

                  {/* Event Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="text-red-500 font-bold">📅</span>
                      <span className="font-medium">
                        {eventDate.toLocaleDateString('id-ID', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="text-red-500 font-bold">🕐</span>
                      <span className="font-medium">
                        {eventDate.toLocaleTimeString('id-ID', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })} WIB
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="text-red-500 font-bold">📍</span>
                      <span className="font-medium line-clamp-1">
                        {e.location}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-4 border-t-2 border-white/10 group-hover:border-red-600/50">
                    <span className="text-sm font-bold text-red-500 inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                      Lihat Detail & Daftar
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
