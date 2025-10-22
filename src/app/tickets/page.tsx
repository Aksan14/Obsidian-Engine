"use client";
export const dynamic = "force-dynamic";
import Link from "next/link";
import { useApp } from "@/lib/state";

export default function TicketsPage() {
  const { registrations } = useApp();
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Tiket Saya</h1>
      <p className="text-sm text-gray-700">Tiket muncul setelah Anda mendaftar event. Cari event di halaman <a className="link-brand" href="/events">Event</a>.</p>
      <div className="grid gap-3">
        {registrations.map((r) => (
          <Link key={r.id} href={`/tickets/${r.ticketCode}`} className="card hover:shadow">
            <div className="font-medium">{r.userName}</div>
            <div className="text-xs text-gray-500">{r.userEmail} • Kode: {r.ticketCode}</div>
          </Link>
        ))}
        {registrations.length === 0 && <div className="text-gray-600">Belum ada tiket.</div>}
      </div>
    </div>
  );
}
