"use client";
export const dynamic = "force-dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/lib/state";

export default function RegisterPage() {
  const { register } = useApp();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MAHASISWA");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    register(name, email, role as any);
    router.push("/events");
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-semibold">Registrasi</h1>
  <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="label">Nama</label>
          <input required value={name} onChange={(e)=>setName(e.target.value)} className="input" />
        </div>
        <div>
          <label className="label">Email</label>
          <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="input" />
        </div>
        <div>
          <label className="label">Role</label>
          <select value={role} onChange={(e)=>setRole(e.target.value)} className="input">
            <option value="MAHASISWA">Mahasiswa Umum</option>
            <option value="PENGURUS">Pengurus UKM</option>
          </select>
        </div>
        <button className="w-full btn-primary">Daftar</button>
      </form>
      <div className="text-sm text-gray-700">Sudah punya akun? <a href="/auth/login" className="link-brand">Login</a></div>
    </div>
  );
}
