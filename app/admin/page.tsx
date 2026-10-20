"use client";

import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);

  return (
    <section className="container section">
      <div className="mx-auto max-w-xl rounded-2xl border border-neutral-800 bg-[#101010] p-7">
        <p className="text-sm font-bold uppercase tracking-widest text-red-400">
          STOGRA STORE
        </p>

        <h1 className="mt-3 text-3xl font-black">Panel Admin</h1>

        <p className="muted mt-3">
          Area awal untuk pengelolaan toko. Autentikasi admin perlu
          dikonfigurasi di server sebelum panel digunakan untuk tindakan nyata.
        </p>

        {!authorized ? (
          <form
            className="mt-6 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setPassword("");
              alert(
                "Login admin belum dikonfigurasi. Hubungkan autentikasi server sebelum menggunakan panel ini."
              );
            }}
          >
            <label htmlFor="admin-password" className="block text-sm font-bold">
              Kata sandi admin
            </label>

            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Autentikasi belum diaktifkan"
              className="w-full rounded-lg border border-neutral-700 bg-black px-4 py-3 outline-none focus:border-red-500"
              autoComplete="current-password"
            />

            <button type="submit" className="btn-primary w-full">
              Masuk
            </button>
          </form>
        ) : (
          <p className="mt-6 text-green-400">Admin terverifikasi.</p>
        )}
      </div>
    </section>
  );
}
