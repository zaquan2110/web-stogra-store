import Link from "next/link";
import { ArrowUpRight, MessageCircle, ShieldCheck } from "lucide-react";

type SupportLinksProps = {
  discordUrl?: string;
};

export default function SupportLinks({
  discordUrl,
}: SupportLinksProps) {
  const safeDiscordUrl =
    discordUrl &&
    /^https:\/\/(discord\.gg|discord\.com)\/[a-zA-Z0-9/-]+$/.test(
      discordUrl
    )
      ? discordUrl
      : null;

  return (
    <section className="rounded-2xl border border-white/10 bg-[#101010] p-6 sm:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
            <MessageCircle className="h-6 w-6" />
          </div>

          <h2 className="text-xl font-black text-white sm:text-2xl">
            Butuh Bantuan?
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Hubungi tim STOGRA STORE melalui chat website atau Discord untuk
            pertanyaan produk, pesanan, dan pembayaran.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link
            href="/chat"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-500"
          >
            <MessageCircle className="h-4 w-4" />
            Chat Website
          </Link>

          {safeDiscordUrl && (
            <a
              href={safeDiscordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Discord
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 border-t border-white/10 pt-5">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
        <p className="text-xs leading-5 text-zinc-500">
          Pembayaran dan konfirmasi pesanan mengikuti instruksi staf. Pastikan
          kamu memeriksa detail pesanan sebelum melakukan pembayaran.
        </p>
      </div>
    </section>
  );
}
