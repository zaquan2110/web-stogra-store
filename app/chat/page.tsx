"use client";

import { useCallback, useState } from "react";

type ChatMessage = {
  id: string;
  sender_name: string;
  sender_type: "customer" | "admin";
  message: string;
  order_id: string | null;
  created_at: string;
};

export default function AdminChatPage() {
  const [secret, setSecret] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const loadMessages = useCallback(async () => {
    if (!secret.trim()) {
      setError("Masukkan ADMIN_API_SECRET terlebih dahulu.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/chat", {
        method: "GET",
        headers: {
          "x-admin-secret": secret.trim(),
        },
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal mengambil pesan.");
      }

      setMessages(result.messages ?? []);
      setLoaded(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil pesan."
      );
      setLoaded(false);
    } finally {
      setLoading(false);
    }
  }, [secret]);

  return (
    <main className="min-h-screen bg-[#080808] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <a
          href="/admin"
          className="mb-6 inline-block text-sm text-red-400 hover:text-red-300"
        >
          ← Kembali ke Admin
        </a>

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
            STOGRA STORE
          </p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            Admin Chat
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Lihat pesan yang dikirim pelanggan melalui website.
          </p>
        </div>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
          <label
            htmlFor="admin-secret"
            className="mb-2 block text-sm font-medium text-zinc-300"
          >
            ADMIN API SECRET
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="admin-secret"
              type="password"
              autoComplete="current-password"
              value={secret}
              onChange={(event) => setSecret(event.target.value)}
              placeholder="Masukkan secret admin"
              className="min-w-0 flex-1 rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-red-500"
            />

            <button
              type="button"
              onClick={loadMessages}
              disabled={loading}
              className="rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Memuat..." : "Muat Pesan"}
            </button>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-4 rounded-lg border border-red-900 bg-red-950/40 p-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}
        </section>

        <div className="mb-4 mt-8 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Pesan Pelanggan</h2>

          <span className="rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300">
            {messages.length} pesan
          </span>
        </div>

        {!loaded ? (
          <div className="rounded-2xl border border-dashed border-zinc-800 p-8 text-center text-zinc-500">
            Masukkan secret admin, lalu tekan “Muat Pesan”.
          </div>
        ) : messages.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
            <p className="font-semibold text-zinc-300">
              Belum ada pesan pelanggan.
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              Pesan baru akan muncul di sini setelah pelanggan mengirimkannya.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-white">
                      {item.sender_name || "Pelanggan"}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500">
                      {item.sender_type === "admin"
                        ? "Admin"
                        : "Pelanggan"}
                    </p>
                  </div>

                  <time className="text-xs text-zinc-500">
                    {new Date(item.created_at).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </time>
                </div>

                <div className="mt-4 whitespace-pre-wrap break-words rounded-xl bg-black p-4 text-sm leading-6 text-zinc-300">
                  {item.message}
                </div>

                {item.order_id && (
                  <p className="mt-3 text-xs text-zinc-500">
                    Order ID: {item.order_id}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}

        <p className="mt-8 text-xs leading-5 text-zinc-600">
          Halaman ini hanya untuk membaca pesan. Fitur membalas pesan admin
          akan memerlukan endpoint tambahan.
        </p>
      </div>
    </main>
  );
}
