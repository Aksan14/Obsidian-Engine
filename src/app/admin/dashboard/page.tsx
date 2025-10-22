"use client";
import { useApp } from "@/lib/state";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const { user, events, registrations } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!user || user.role !== "ADMIN") return null;

  const pendingEvents = events.filter((e) => e.status === "PENDING");
  const approvedEvents = events.filter((e) => e.status === "APPROVED");
  const rejectedEvents = events.filter((e) => e.status === "REJECTED");
  const totalRegistrations = registrations.length;

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Section: Header */}
      <section className="w-full px-0 md:px-8 py-8 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Dashboard Admin</h1>
          <p className="text-base text-gray-400">Kelola dan pantau semua event kampus</p>
        </div>
      </section>

      {/* Section: Statistik */}
      <section className="w-full px-0 md:px-8 py-8 bg-gradient-to-r from-[#1a1a1a] via-[#232323] to-[#1a1a1a] shadow-lg">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="stat-card p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <h3 className="text-3xl font-bold text-red-600">{pendingEvents.length}</h3>
            <p className="text-sm text-gray-200 mt-2">Menunggu Persetujuan</p>
          </div>
          <div className="stat-card p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <h3 className="text-3xl font-bold text-green-500">{approvedEvents.length}</h3>
            <p className="text-sm text-gray-200 mt-2">Event Disetujui</p>
          </div>
          <div className="stat-card p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <h3 className="text-3xl font-bold text-yellow-400">{events.length}</h3>
            <p className="text-sm text-gray-200 mt-2">Total Event</p>
          </div>
          <div className="stat-card p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <h3 className="text-3xl font-bold text-blue-400">{totalRegistrations}</h3>
            <p className="text-sm text-gray-200 mt-2">Total Pendaftaran</p>
          </div>
        </div>
      </section>

      {/* Section: Aksi Cepat */}
      <section className="w-full px-0 md:px-8 py-8 bg-[#181818] border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-5 text-white">Aksi Cepat</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/admin/events" className="action-card p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <h4 className="text-lg font-bold mb-2">📋 Tinjau Event</h4>
              <p className="text-sm text-gray-300">Setujui atau tolak event yang diajukan</p>
            </Link>
            <Link href="/events" className="action-card p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <h4 className="text-lg font-bold mb-2">📅 Lihat Semua Event</h4>
              <p className="text-sm text-gray-300">Daftar lengkap event kampus</p>
            </Link>
            <Link href="/admin/reports" className="action-card p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <h4 className="text-lg font-bold mb-2">📊 Laporan</h4>
              <p className="text-sm text-gray-300">Statistik dan analitik platform</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Pending Approvals */}
      {pendingEvents.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-3">Menunggu Persetujuan</h2>
          <div>
            {pendingEvents.slice(0, 5).map((event) => (
              <div key={event.id} className="event-row">
                <div>
                  <div className="font-medium">{event.title}</div>
                  <div className="text-xs text-gray-600">
                    {new Date(event.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <Link href="/admin/events" className="btn-primary text-sm">
                  Tinjau
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Approved Events */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-3">Event Terbaru Disetujui</h2>
        {approvedEvents.length === 0 ? (
          <p className="text-sm text-gray-600">Belum ada event yang disetujui</p>
        ) : (
          <div>
            {approvedEvents.slice(0, 5).map((event) => (
              <div key={event.id} className="event-row">
                <div>
                  <div className="font-medium">{event.title}</div>
                  <div className="text-xs text-gray-600">
                    {new Date(event.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })} · {registrations.filter(r => r.eventId === event.id).length} pendaftar
                  </div>
                </div>
                <Link href={`/events/${event.id}`} className="text-sm link-brand">
                  Detail
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
