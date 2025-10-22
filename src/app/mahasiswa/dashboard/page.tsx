"use client";
import { useApp } from "@/lib/state";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const dynamic = "force-dynamic";

export default function MahasiswaDashboard() {
  const { user, events, registrations } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "MAHASISWA") {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!user || user.role !== "MAHASISWA") return null;

  const myRegistrations = registrations.filter(r => r.userEmail === user.email);
  const myEventIds = myRegistrations.map(r => r.eventId);
  const registeredEvents = events.filter(e => myEventIds.includes(e.id));
  const availableEvents = events.filter(e => e.status === "APPROVED" && !myEventIds.includes(e.id));
  const upcomingEvents = registeredEvents.filter(e => new Date(e.date) >= new Date());
  const pastEvents = registeredEvents.filter(e => new Date(e.date) < new Date());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard Mahasiswa</h1>
        <p className="text-sm text-gray-600 mt-1">Kelola pendaftaran event Anda</p>
      </div>

      {/* Statistics Cards */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <h3>{myRegistrations.length}</h3>
          <p>Event Terdaftar</p>
        </div>
        <div className="stat-card">
          <h3>{upcomingEvents.length}</h3>
          <p>Event Mendatang</p>
        </div>
        <div className="stat-card">
          <h3>{pastEvents.length}</h3>
          <p>Event Selesai</p>
        </div>
        <div className="stat-card">
          <h3>{availableEvents.length}</h3>
          <p>Event Tersedia</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Aksi Cepat</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <Link href="/events" className="action-card">
            <h4>🔍 Jelajahi Event</h4>
            <p>Cari dan daftar event kampus</p>
          </Link>
          <Link href="/tickets" className="action-card">
            <h4>🎟️ Tiket Saya</h4>
            <p>Lihat semua tiket event Anda</p>
          </Link>
          <Link href="/about" className="action-card">
            <h4>ℹ️ Tentang Platform</h4>
            <p>Pelajari lebih lanjut tentang kami</p>
          </Link>
        </div>
      </div>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div className="card">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Event Mendatang</h2>
            <Link href="/tickets" className="text-sm link-brand">
              Lihat Tiket
            </Link>
          </div>
          <div>
            {upcomingEvents.map((event) => {
              const myReg = myRegistrations.find(r => r.eventId === event.id);
              return (
                <div key={event.id} className="event-row">
                  <div>
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs text-gray-600">
                      {new Date(event.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })} · {event.location}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/tickets/${myReg?.ticketCode}`} className="text-sm link-brand">
                      Tiket
                    </Link>
                    <Link href={`/events/${event.id}`} className="text-sm link-brand">
                      Detail
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Available Events */}
      <div className="card">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Event Tersedia</h2>
          <Link href="/events" className="text-sm link-brand">
            Lihat Semua
          </Link>
        </div>
        {availableEvents.length === 0 ? (
          <p className="text-sm text-gray-600">Tidak ada event baru saat ini. Cek lagi nanti!</p>
        ) : (
          <div>
            {availableEvents.slice(0, 5).map((event) => {
              const eventRegs = registrations.filter(r => r.eventId === event.id);
              const isFull = event.capacity && eventRegs.length >= event.capacity;
              return (
                <div key={event.id} className="event-row">
                  <div>
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs text-gray-600">
                      {new Date(event.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      {event.capacity && ` · ${eventRegs.length}/${event.capacity} peserta`}
                      {isFull && " · Penuh"}
                    </div>
                  </div>
                  <Link 
                    href={`/events/${event.id}`} 
                    className={isFull ? "text-sm text-gray-500" : "btn-primary text-sm"}
                  >
                    {isFull ? "Penuh" : "Daftar"}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-3">Riwayat Event</h2>
          <div>
            {pastEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="event-row">
                <div>
                  <div className="font-medium text-gray-600">{event.title}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(event.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <span className="text-xs text-gray-500">Selesai</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
