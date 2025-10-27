"use client";
export const dynamic = "force-dynamic";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/state";
import { useState, useEffect } from "react";

export default function NewEventPage() {
  const { createEvent, user } = useApp();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState<number | "">("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const iso = date && time ? new Date(`${date}T${time}:00`).toISOString() : new Date().toISOString();
    const id = createEvent({ title, description, date: iso, location, capacity: capacity === "" ? undefined : Number(capacity) });
    router.push(`/pengurus/events`);
  }

  useEffect(() => {
    // protect this page: only allow logged-in pengurus to create events
    if (!user) {
      router.push("/auth/login");
    } else if (user.role !== "PENGURUS") {
      // if logged in but not pengurus, redirect to home
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-xl font-semibold">Buat Event Baru</h1>
      <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1 sm:col-span-2">
          <label className="text-sm text-gray-700">Judul</label>
          <input required value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label className="text-sm text-gray-700">Deskripsi</label>
          <textarea required value={description} onChange={(e)=>setDescription(e.target.value)} className="w-full border rounded px-3 py-2 min-h-[100px]" />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-700">Tanggal</label>
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-700">Waktu</label>
          <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label className="text-sm text-gray-700">Lokasi</label>
          <input required value={location} onChange={(e)=>setLocation(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label className="text-sm text-gray-700">Kapasitas (opsional)</label>
          <input type="number" value={capacity} onChange={(e)=>setCapacity(e.target.value === "" ? "" : Number(e.target.value))} className="w-full border rounded px-3 py-2" />
        </div>
        <div className="sm:col-span-2">
          <button className="w-full btn-primary">Kirim untuk Persetujuan</button>
        </div>
      </form>
    </div>
  );
}
