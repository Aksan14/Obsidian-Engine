"use client";
export const dynamic = "force-dynamic";
import Link from "next/link";
import { useApp } from "@/lib/state";

export default function PengurusEventsPage() {
  const { events, user } = useApp();
  const myEvents = events.filter((e) => e.createdBy === (user?.id ?? ""));
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Event Saya</h1>
        <Link href="/pengurus/events/new" className="btn-outline">Buat Event</Link>
      </div>
      <div className="grid gap-3">
        {myEvents.map((e) => (
          <div key={e.id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{e.title}</h3>
                <div className="text-xs text-gray-500 flex items-center gap-2">Status:
                  {e.status === 'PENDING' ? (
                    <span style={{background:'#fff3cd', color:'#664d03', border:'1px solid #ffe69c', padding:'1px 6px', borderRadius:4}}>Pending</span>
                  ) : (
                    <span style={{background:'#d1e7dd', color:'#0f5132', border:'1px solid #badbcc', padding:'1px 6px', borderRadius:4}}>Approved</span>
                  )}
                </div>
              </div>
              <Link href={`/events/${e.id}`} className="text-sm underline">Lihat</Link>
            </div>
          </div>
        ))}
        {myEvents.length === 0 && <div className="text-gray-600">Belum ada event — buat event baru.</div>}
      </div>
    </div>
  );
}
