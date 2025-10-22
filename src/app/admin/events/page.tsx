"use client";
export const dynamic = "force-dynamic";
import { useApp } from "@/lib/state";

export default function AdminEventsPage() {
  const { events, approveEvent } = useApp();
  const pending = events.filter((e) => e.status === "PENDING");
  const approved = events.filter((e) => e.status === "APPROVED");
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Persetujuan Event</h1>
      <section className="space-y-3">
        <h2 className="font-medium">Menunggu Persetujuan</h2>
        <div className="grid gap-3">
          {pending.map((e) => (
            <div key={e.id} className="card flex items-center justify-between">
              <div>
                <div className="font-medium">{e.title}</div>
                <div className="text-xs text-gray-500">{new Date(e.date).toLocaleString()} • {e.location}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>approveEvent(e.id)} className="btn-primary">Setujui</button>
                <button disabled className="btn-outline">Tolak</button>
              </div>
            </div>
          ))}
          {pending.length === 0 && <div className="text-gray-600">Tidak ada event pending.</div>}
        </div>
      </section>
      <section className="space-y-3">
        <h2 className="font-medium">Disetujui</h2>
        <div className="grid gap-3">
          {approved.map((e) => (
            <div key={e.id} className="card">
              <div className="font-medium">{e.title}</div>
              <div className="text-xs text-gray-500">{new Date(e.date).toLocaleString()} • {e.location}</div>
            </div>
          ))}
          {approved.length === 0 && <div className="text-gray-600">Belum ada event disetujui.</div>}
        </div>
      </section>
    </div>
  );
}
