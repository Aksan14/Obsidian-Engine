"use client";
import { useApp } from "@/lib/state";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const dynamic = "force-dynamic";

export default function PengurusDashboard() {
  const { user, events, registrations } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "PENGURUS") {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!user || user.role !== "PENGURUS") return null;

  const myEvents = events.filter((e) => e.createdBy === user.id);
  const pendingEvents = myEvents.filter((e) => e.status === "PENDING");
  const approvedEvents = myEvents.filter((e) => e.status === "APPROVED");
  const rejectedEvents = myEvents.filter((e) => e.status === "REJECTED");
  const myEventIds = myEvents.map(e => e.id);
  const totalRegistrations = registrations.filter(r => myEventIds.includes(r.eventId)).length;

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Section: Header */}
      <section className="w-full px-0 md:px-8 py-8 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Dashboard Pengurus UKM</h1>
          <p className="text-base text-gray-400">Kelola event UKM Anda</p>
        </div>
      </section>

      {/* Section: Statistik */}
      <section className="w-full px-0 md:px-8 py-8 bg-gradient-to-r from-[#1a1a1a] via-[#232323] to-[#1a1a1a] shadow-lg">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="stat-card p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <h3 className="text-3xl font-bold text-yellow-400">{myEvents.length}</h3>
            <p className="text-sm text-gray-200 mt-2">Total Event Saya</p>
          </div>
          <div className="stat-card p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <h3 className="text-3xl font-bold text-green-500">{approvedEvents.length}</h3>
            <p className="text-sm text-gray-200 mt-2">Event Disetujui</p>
          </div>
          <div className="stat-card p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <h3 className="text-3xl font-bold text-red-600">{pendingEvents.length}</h3>
            <p className="text-sm text-gray-200 mt-2">Menunggu Persetujuan</p>
          </div>
          <div className="stat-card p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <h3 className="text-3xl font-bold text-blue-400">{totalRegistrations}</h3>
            <p className="text-sm text-gray-200 mt-2">Total Pendaftar</p>
          </div>
        </div>
      </section>

      {/* Section: Aksi Cepat */}
      <section className="w-full px-0 md:px-8 py-8 bg-[#181818] border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-5 text-white">Aksi Cepat</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/pengurus/events/new" className="action-card p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <h4 className="text-lg font-bold mb-2">➕ Buat Event Baru</h4>
              <p className="text-sm text-gray-300">Ajukan event UKM untuk persetujuan</p>
            </Link>
            <Link href="/pengurus/events" className="action-card p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <h4 className="text-lg font-bold mb-2">📋 Event Saya</h4>
              <p className="text-sm text-gray-300">Lihat dan kelola event yang dibuat</p>
            </Link>
            <Link href="/events" className="action-card p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <h4 className="text-lg font-bold mb-2">📅 Event Kampus</h4>
              <p className="text-sm text-gray-300">Jelajahi event kampus lainnya</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Section: Konten Event */}
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Pending Review */}
        {pendingEvents.length > 0 && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-3">Menunggu Persetujuan Admin</h2>
            <div>
              {pendingEvents.map((event) => {
                return (
                  <div key={event.id} className="event-row">
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs text-gray-600">
                        Diajukan · {new Date(event.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <span className="badge">PENDING</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Approved Events */}
        <div className="card">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Event Aktif</h2>
            <Link href="/pengurus/events" className="text-sm link-brand">
              Lihat Semua
            </Link>
          </div>
          {approvedEvents.length === 0 ? (
            <p className="text-sm text-gray-600">Belum ada event yang disetujui. <Link href="/pengurus/events/new" className="link-brand">Buat event pertama</Link>?</p>
          ) : (
            <div>
              {approvedEvents.slice(0, 5).map((event) => {
                const eventRegs = registrations.filter(r => r.eventId === event.id);
                return (
                  <div key={event.id} className="event-row">
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs text-gray-600">
                        {new Date(event.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })} · {eventRegs.length} pendaftar
                        {event.capacity && ` / ${event.capacity} kapasitas`}
                      </div>
                    </div>
                    <Link href={`/events/${event.id}`} className="text-sm link-brand">
                      Detail
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Rejected Events (if any) */}
        {rejectedEvents.length > 0 && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-3">Event Ditolak</h2>
            <div>
              {rejectedEvents.map((event) => {
                return (
                  <div key={event.id} className="event-row">
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs text-gray-600">
                        Ditolak · {new Date(event.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <span className="badge" style={{background: "#dc2626"}}>REJECTED</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
