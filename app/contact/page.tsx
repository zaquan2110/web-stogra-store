import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontak | STOGRA STORE",
  description: "Hubungi dukungan pelanggan STOGRA STORE.",
};

export default function ContactPage() {
  const discordUrl = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL;

  const validDiscordUrl =
    discordUrl &&
    /^https:\/\/(discord\.gg|discord\.com)\/[a-zA-Z0-9/-]+$/.test(discordUrl);

  return (
    <main className="min-h-screen bg-[#080808] px-5 py-16 text-white">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-widest text-red-500">
          STOGRA STORE
        </p>

        <h1 className="mt-3 text-3xl font-black sm:text-4xl">
          Hubungi Kami
        </h1>

        <p className="mt-4 text-sm leading-7 text-zinc-400">
          Butuh bantuan tentang produk, pesanan, atau pembayaran? Pilih salah
          satu saluran dukungan resmi berikut.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/chat"
            className="rounded-2xl border border-red-500/20 bg-red-500/[0.06] p-6 transition hover:border-red-500/50"
          >
            <MessageCircle className="h-7 w-7 text-red-500" />

            <h2 className="mt-4 font-bold">Chat Website</h2>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Buka halaman chat untuk memulai komunikasi terkait kebutuhanmu.
            </p>
          </Link>

          {validDiscordUrl ? (
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/30"
            >
              <ShieldCheck className="h-7 w-7 text-zinc-300" />

              <h2 className="mt-4
