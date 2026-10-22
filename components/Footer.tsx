
import Link from "next/link";
import { Code2, MessageCircle } from "lucide-react";
import { STORE_NAME } from "@/lib/constants";

const DISCORD_URL = "https://discord.gg/J8SQA7uM4x";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080808]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
        {/* Identitas toko */}
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400">
              <Code2 size={23} />
            </span>

            <span className="font-bold tracking-wide text-white">
              {STORE_NAME}
            </span>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-7 text-gray-400">
            Toko produk Roblox Studio untuk Script, UI, Map, Assets, dan
            Services. Temukan produk dan layanan yang sesuai kebutuhanmu.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="mb-4 font-semibold text-white">Navigasi</h3>

          <nav className="flex flex-col items-start gap-3 text-sm text-gray-400">
            <Link className="transition hover:text-red-400" href="/">
              Beranda
            </Link>

            <Link className="transition hover:text-red-400" href="/#produk">
              Katalog Produk
            </Link>

            <Link className="transition hover:text-red-400" href="/chat">
              Chat Website
            </Link>

            <Link className="transition hover:text-red-400" href="/order-status">
              Lacak Pesanan
            </Link>
          </nav>
        </div>

        {/* Bantuan */}
        <div>
          <h3 className="mb-4 font-semibold text-white">
            Informasi & Bantuan
          </h3>

          <nav className="flex flex-col items-start gap-3 text-sm text-gray-400">
            <Link className="transition hover:text-red-400" href="/terms">
              Syarat & Ketentuan
            </Link>

            <Link className="transition hover:text-red-400" href="/privacy">
              Kebijakan Privasi
            </Link>

            <Link className="transition hover:text-red-400" href="/refund-policy">
              Kebijakan Pengembalian
            </Link>

            <Link className="transition hover:text-red-400" href="/delivery-policy">
              Kebijakan Pengiriman
            </Link>

            <a
              className="inline-flex items-center gap-2 transition hover:text-red-400"
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={16} />
              Discord Support
            </a>
          </nav>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} {STORE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
