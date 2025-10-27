"use client";
import { useApp } from "@/lib/state";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const dynamic = "force-dynamic";

export default function PengurusDashboard() {
  const { user, events, registrations, checkInByTicket, setPresent } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "PENGURUS") {
      router.push("/auth/login");
    }
  }, [user, router]);

  // QR scan state (hooks must be declared before any early returns)
  const [scanning, setScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanIntervalRef = useRef<number | null>(null);
  const detectorRef = useRef<any | null>(null);

  function stopScan() {
    try {
      if (scanIntervalRef.current) {
        window.clearInterval(scanIntervalRef.current);
        scanIntervalRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        try { videoRef.current.pause(); videoRef.current.srcObject = null; } catch {}
      }
    } catch (e) {
      // ignore
    }
  }

  async function handleDetected(code: string) {
    setLastScanned(code);
    const res = checkInByTicket(code);
    setScanMessage(res.message);
    if (res.eventId) setSelectedEventId(res.eventId);
    // stop after detection
    setScanning(false);
    stopScan();
  }

  // start / stop scanning when `scanning` toggles
  useEffect(() => {
    if (!scanning) {
      stopScan();
      return;
    }

    let mounted = true;

      async function start() {
      setScanMessage(null);
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setScanMessage('Browser ini tidak mendukung kamera (navigator.mediaDevices tidak tersedia).');
          setScanning(false);
          return;
        }
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (!mounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        // wait for video element to be mounted (it should be after render). timeout after 2s
        let attempts = 0;
        while (!videoRef.current && attempts < 20) {
          // eslint-disable-next-line no-await-in-loop
          await new Promise((r) => setTimeout(r, 100));
          attempts++;
        }
        if (videoRef.current) {
          try {
            videoRef.current.srcObject = stream;
            // some browsers require a user gesture to play; this effect is triggered by a click
            await videoRef.current.play();
          } catch (err) {
            // ignore play errors but keep stream running
          }
        } else {
          setScanMessage('Tidak dapat menemukan elemen video untuk menampilkan kamera.');
        }

        // Try using BarcodeDetector if available
        const BD = (window as any).BarcodeDetector;
        if (BD) {
          detectorRef.current = new BD({ formats: ['qr_code'] });
          scanIntervalRef.current = window.setInterval(async () => {
            try {
              if (!videoRef.current || !canvasRef.current) return;
              const v = videoRef.current;
              const c = canvasRef.current;
              const w = v.videoWidth;
              const h = v.videoHeight;
              if (!w || !h) return;
              c.width = w;
              c.height = h;
              const ctx = c.getContext('2d');
              if (!ctx) return;
              ctx.drawImage(v, 0, 0, w, h);
              const results = await detectorRef.current.detect(c);
              if (results && results.length) {
                const raw = results[0].rawValue || results[0].rawData || null;
                if (raw) {
                  handleDetected(String(raw));
                }
              }
            } catch (err) {
              // ignore frame errors
            }
          }, 600);
        } else {
          setScanMessage('Browser Anda tidak mendukung kamera QR auto-detect. Gunakan input manual.');
        }
      } catch (err: any) {
        setScanMessage('Gagal membuka kamera: ' + (err?.message ?? String(err)));
        setScanning(false);
      }
    }

    start();

    return () => {
      mounted = false;
      stopScan();
    };
  }, [scanning]);

  function ManualCheckin({ onCheck }: { onCheck: (code: string) => void }) {
    const [code, setCode] = useState("");
    return (
      <div className="flex gap-2">
        <input value={code} onChange={(e)=>setCode(e.target.value)} placeholder="Masukkan kode tiket" className="w-full border rounded px-3 py-2 bg-white/5 text-white" />
        <button onClick={()=>{ if(code.trim()){ onCheck(code.trim()); setCode(""); } }} className="btn-primary">Check-in</button>
      </div>
    );
  }

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

      {/* Section: Daftar Hadir */}
      <section className="w-full px-0 md:px-8 py-8">
        <div className="max-w-6xl mx-auto card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">Daftar Hadir</h2>
            <div className="flex items-center gap-3">
              <select value={selectedEventId ?? ''} onChange={(e)=>setSelectedEventId(e.target.value || null)} className="border rounded px-3 py-2 bg-white/5 text-white">
                <option value="">Pilih event</option>
                {myEvents.map(ev => (
                  <option key={ev.id} value={ev.id}>{ev.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            {selectedEventId ? (
              (() => {
                const regs = registrations.filter(r => r.eventId === selectedEventId);
                const presentRegs = regs.filter(r => r.present);
                return (
                  <div>
                    <div className="text-sm text-gray-400 mb-3">{presentRegs.length} hadir dari {regs.length} pendaftar</div>
                    {presentRegs.length === 0 ? (
                      <div className="text-sm text-gray-500">Belum ada yang check-in untuk event ini.</div>
                    ) : (
                      <div className="grid gap-2">
                        {presentRegs.map(r => (
                          <div key={r.id} className="flex items-center justify-between border rounded p-3">
                            <div>
                              <div className="font-medium">{r.userName}</div>
                              <div className="text-xs text-gray-500">{r.userEmail} • {r.nim || '—'}</div>
                              <div className="text-xs text-gray-400">Kode: {r.ticketCode}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-sm text-gray-400">{new Date(r.createdAt).toLocaleString('id-ID')}</div>
                              <button onClick={()=>{ setPresent(r.ticketCode, false); }} className="btn-outline">Undo</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              <div className="text-sm text-gray-500">Pilih event untuk melihat daftar hadir.</div>
            )}
          </div>
        </div>
      </section>

      {/* Section: QR Scanner */}
      <section className="w-full px-0 md:px-8 py-8">
        <div className="max-w-6xl mx-auto card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">Scan QR untuk Check-in</h2>
            <div className="flex items-center gap-3">
              <button onClick={() => setScanning((s) => !s)} className="btn-primary">
                {scanning ? "Stop Scan" : "Mulai Scan"}
              </button>
            </div>
          </div>

          <div>
            {scanning ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col items-center justify-center">
                  <video ref={videoRef} className="w-full rounded-md" autoPlay muted playsInline style={{maxHeight:360}} />
                  <canvas ref={canvasRef} style={{display:'none'}} />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Arahkan kamera ke QR tiket. Jika browser Anda tidak mendukung kamera, gunakan input kode di samping.</p>
                  <div className="mt-4">
                    <div className="text-sm">Terakhir discan: {lastScanned ?? "—"}</div>
                    {scanMessage && <div className="text-sm mt-2">{scanMessage}</div>}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-300">Mulai scan untuk membuka kamera. Jika perangkat Anda tidak mendukung atau Anda tidak ingin menggunakan kamera, gunakan input kode tiket di sebelah.</p>
                </div>
                <div>
                  <ManualCheckin onCheck={(code)=>{
                    const res = checkInByTicket(code);
                    setLastScanned(code);
                    setScanMessage(res.message);
                    if (res.eventId) setSelectedEventId(res.eventId);
                  }} />
                </div>
              </div>
            )}
          </div>
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
