"use client";

import { FormEvent, useState } from "react";

export default function ChatPage() {
  const [name, setName] = useState("");
  const [discord, setDiscord] = useState("");
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const orderMessage = [
      "PESANAN STOGRA STORE",
      `Nama: ${name}`,
      `Discord: ${discord}`,
      `Produk: ${product || "Belum ditentukan"}`,
      `Pesan: ${message}`,
    ].join("\n");

    const discordInvite =
      process.env.NEXT_PUBLIC_DISCORD_INVITE_URL;

    const encodedMessage = encodeURIComponent(orderMessage);

    setStatus(
      "Pesanan sudah disiapkan. Salin detail pesanan di bawah dan kirim ke admin melalui Discord."
    );

    const output = document.getElementById("order-output");
    if (output) {
      output.textContent = orderMessage;
    }

    const link = document.getElementById("discord-link");
    if (link && discordInvite) {
      link.setAttribute("href", discordInvite);
    }

    void encodedMessage;
  }

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
          Isi formulir untuk menyiapkan permintaan pemesanan. Admin akan
          membantu konfirmasi produk dan pembayaran manual melalui Discord.
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
              value={discord}
              onChange={(event) => setDiscord(event.target.value)}
              placeholder="username Discord kamu"
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
              <option>Scripts</option>
              <option>UI</option>
              <option>Maps</option>
              <option>Assets</option>
              <option>Services</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-bold">
              Detail permintaan
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Jelaskan produk atau layanan yang kamu butuhkan..."
              className="w-full rounded-lg border border-neutral-700 bg-black px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Siapkan Pesanan
          </button>

          {status && (
            <div className="rounded-lg border border-red-900 bg-red-950/30 p-4">
              <p className="text-sm leading-6 text-neutral-200">{status}</p>
              <pre
                id="order-output"
                className="mt-3 whitespace-pre-wrap break-words text-sm text-neutral-300"
              />
              <button
                type="button"
                onClick={() => {
                  const output = document.getElementById("order-output");
                  if (output?.textContent) {
                    void navigator.clipboard.writeText(output.textContent);
                  }
                }}
                className="btn-secondary mt-3 w-full"
              >
                Salin Detail Pesanan
              </button>
            </div>
          )}

          <a
            id="discord-link"
            href="https://discord.com/app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full"
          >
            Lanjutkan ke Discord
          </a>
        </form>
      </div>
    </section>
  );
}
