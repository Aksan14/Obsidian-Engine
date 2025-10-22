"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }
  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-semibold">Reset Password</h1>
      {sent ? (
        <p className="text-green-700">Link reset telah dikirim (simulasi).</p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="label">Email</label>
            <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="input" />
          </div>
          <button className="w-full btn-primary">Kirim Link</button>
        </form>
      )}
    </div>
  );
}
