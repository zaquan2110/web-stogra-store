
"use client";

import { FormEvent, useState } from "react";

export default function ChatPage() {
  const [name, setName] = useState("");
  const [discord, setDiscord] = useState("");
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setIsSuccess(false);
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          discord,
          product,
          message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Pesan gagal dikirim.");
      }

      setIsSuccess(true);
      setStatus(
        "Pesan berhasil disimpan! Admin dapat menindaklanjuti permintaanmu."
      );
      setMessage("");
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan. Silakan coba lagi."
      );
    } finally {
      setIsSending(false);
    }
  }

  const discordInvite =
    process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ||
    "https://discord.com/app";

  return (
    <section className="container section">
      <div className="mx-auto max-w-2xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-red-400">
          Layanan Pelanggan
        </p>

        <h1 className="text-4xl font-black sm:text-5xl">
          Chat <span className="text-red">STOGRA STORE</span>
        </h1>

        <p className="muted mt-4">
          Kirim pertanyaan atau permintaan produk kepada STOGRA STORE.
          Pembayaran akan dikonfirmasi secara manual oleh admin.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-2xl border border-neutral-800 bg-[#101010] p-6 sm:p-8"
        >
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-bold">
              Nama
            </label>
            <input
              id="name"
              required
              maxLength={80}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nama kamu"
              className="w-full rounded-lg border border-neutral-700 bg-black px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label htmlFor="discord" className="mb-2 block text-sm font-bold">
              Username Discord
            </label>
            <input
              id="discord"
              required
              maxLength={100}
              value={discord}
              onChange={(event) => setDiscord(event.target.value)}
              placeholder="Username Discord kamu"
              className="w-full rounded-lg border border-neutral-700 bg-black px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label htmlFor="product" className="mb-2 block text-sm font-bold">
              Produk yang diminati
            </label>
            <select
              id="product"
              value={product}
              onChange={(event) => setProduct(event.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-black px-4 py-3 outline-none focus:border-red-500"
            >
              <option value="">Pilih kategori atau produk</option>
              <option value="Script">Script</option>
              <option value="UI">UI</option>
              <option value="Map">Map</option>
              <option value="Assets">Assets</option>
              <option value="Services">Services</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-bold">
              Detail permintaan
            </label>
            <textarea
              id="message"
              required
              maxLength={2000}
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Jelaskan produk atau layanan yang kamu butuhkan..."
              className="w-full rounded-lg border border-neutral-700 bg-black px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSending ? "Mengirim..." : "Kirim Pesan"}
          </button>

          {status && (
            <div
              role={isSuccess ? "status" : "alert"}
              className={`rounded-lg border p-4 ${
                isSuccess
                  ? "border-green-800 bg-green-950/30 text-green-300"
                  : "border-red-800 bg-red-950/30 text-red-300"
              }`}
            >
              <p className="text-sm leading-6">{status}</p>
            </div>
          )}

          <a
            href={discordInvite}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary block w-full text-center"
          >
            Hubungi Admin di Discord
          </a>
        </form>
      </div>
    </section>
  );
}
