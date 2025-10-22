"use client";
export const dynamic = "force-dynamic";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/lib/state";
import { useMemo, useState } from "react";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { events, registerEvent } = useApp();
  const ev = useMemo(() => events.find((e) => e.id === id), [events, id]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nim, setNim] = useState("");

  if (!ev) {
    return (
      <div className="min-h-[calc(100vh-64px-300px)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-black text-white mb-3">Event tidak ditemukan</h1>
          <p className="text-gray-400">Event yang Anda cari tidak tersedia.</p>
        </div>
      </div>
    );
  }

  const eventId = ev.id;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const t = registerEvent(eventId, { userName: name, userEmail: email, nim });
    router.push(`/tickets/${t}`);
  }

  return (
    <div className="min-h-[calc(100vh-64px-300px)] mx-auto max-w-4xl px-4 py-8">
      <div className="space-y-6">
        {/* Event Details */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border-2 border-white/10 p-6">
          <h1 className="text-3xl font-black text-white mb-3">{ev.title}</h1>
          <p className="text-gray-300 mb-4">{ev.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <span className="text-red-500">📅</span>
              {new Date(ev.date).toLocaleString('id-ID')}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-red-500">📍</span>
              {ev.location}
            </span>
          </div>
        </div>

        {/* Registration Form */}
        <section className="bg-white/5 backdrop-blur-sm rounded-2xl border-2 border-white/10 p-6">
          <h2 className="text-xl font-black text-white mb-5">Pendaftaran Event</h2>
          <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label className="block text-sm font-bold text-white mb-2">
                Nama <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-red-600 focus:outline-none transition-colors"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="block text-sm font-bold text-white mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contoh@email.com"
                className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-red-600 focus:outline-none transition-colors"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-white mb-2">
                NIM <span className="text-gray-500 text-xs font-normal">(opsional)</span>
              </label>
              <input
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                placeholder="Nomor Induk Mahasiswa"
                className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-red-600 focus:outline-none transition-colors"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-600/40 hover:shadow-red-600/60 transition-all duration-300 hover:scale-105"
              >
                Daftar & Dapatkan Tiket
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
