"use client";
export const dynamic = "force-dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/lib/state";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MAHASISWA");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(email, role as any);
    if (role === "ADMIN") router.push("/admin/dashboard");
    else if (role === "PENGURUS") router.push("/pengurus/dashboard");
    else router.push("/mahasiswa/dashboard");
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-block mb-3">
          <span className="inline-block px-4 py-2 bg-red-50 rounded-full text-sm font-semibold text-red-700">
            Selamat Datang Kembali
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Login</h1>
        <p className="text-gray-600">Masuk ke akun Anda untuk melanjutkan</p>
      </div>

      <div className="card">
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="label">📧 Email</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e)=>setEmail(e.target.value)} 
              className="input" 
              placeholder="nama@email.com"
            />
          </div>
          
          <div>
            <label className="label">👤 Role / Peran</label>
            <select value={role} onChange={(e)=>setRole(e.target.value)} className="input">
              <option value="ADMIN">🔑 Admin Kampus</option>
              <option value="PENGURUS">📋 Pengurus UKM</option>
              <option value="MAHASISWA">🎓 Mahasiswa Umum</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Pilih sesuai akses Anda</p>
          </div>
          
          <button type="submit" className="w-full btn-primary">
            🚀 Masuk Sekarang
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm">
          <p className="text-gray-600">
            Belum punya akun?{" "}
            <Link href="/auth/register" className="link-brand font-semibold">
              Daftar Gratis
            </Link>
          </p>
          <p className="text-gray-600 mt-2">
            <Link href="/auth/reset" className="link-brand">
              Lupa Password?
            </Link>
          </p>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 card bg-blue-50 border-blue-100">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="text-sm">
            <p className="font-semibold text-blue-900 mb-1">Demo Mode</p>
            <p className="text-blue-700">
              Gunakan email apa saja dan pilih role untuk mencoba platform. Data hanya tersimpan di session browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
