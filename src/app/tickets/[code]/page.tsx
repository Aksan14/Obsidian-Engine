"use client";
export const dynamic = "force-dynamic";
import { useParams } from "next/navigation";
import { useApp } from "@/lib/state";
import NextDynamic from "next/dynamic";
const QRCode = NextDynamic(() => import("react-qr-code"), { ssr: false });

export default function TicketDetailPage() {
  const { code } = useParams<{ code: string }>();
  const { registrations, events } = useApp();
  const reg = registrations.find((r) => r.ticketCode === code);
  if (!reg) return <div>Tiket tidak ditemukan.</div>;
  const ev = events.find((e) => e.id === reg.eventId);
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-3">
        <h1 className="text-xl font-semibold">Tiket Digital</h1>
        <div className="card">
          <div className="font-medium">{reg.userName}</div>
          <div className="text-sm text-gray-600">{reg.userEmail} • {reg.nim || "Tanpa NIM"}</div>
          {ev && <div className="text-sm text-gray-600 mt-2">Event: {ev.title}</div>}
          <div className="text-xs text-gray-500 mt-1">Kode: {reg.ticketCode}</div>
        </div>
        <div className="text-sm text-gray-700">Tunjukkan QR ini saat registrasi ulang di lokasi atau simpan sebagai gambar.</div>
        <button onClick={()=>window.print()} className="btn-outline" style={{width:'fit-content'}}>Cetak</button>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="bg-white p-4 rounded shadow" style={{ border: '1px solid rgba(0,0,0,0.1)'}}>
          <QRCode value={reg.ticketCode} size={180} />
        </div>
      </div>
    </div>
  );
}
