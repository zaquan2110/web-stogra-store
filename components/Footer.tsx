import Link from "next/link";
import { Code2, MessageCircle } from "lucide-react";
import { DISCORD_INVITE_URL, STORE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080808]">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400">
              <Code2 size={22} />
            </span>
            <span className="font-bold tracking-wide text-white">
              {STORE_NAME}
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
            Toko produk Roblox Studio untuk Script, UI, Map, Assets, dan
            Services. Produk dan layanan diproses dengan bantuan staff.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Navigasi</h3>
          <div className="flex flex-col items-start gap-3 text-sm text-gray-400">
            <Link className="hover:text-red-400" href="/">
              Beranda
            </Link>
            <Link className="hover:text-red-400" href="/#produk">
              Katalog Produk
            </Link>
            <Link className="hover:text-red-400" href="/chat">
              Chat Website
            </Link>
            <Link className="hover:text-red-400" href="/order-status">
              Lacak Pesanan
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Informasi & Bantuan</h3>
          <div className="flex flex-col items-start gap-3 text-sm text-gray-400">
            <Link className="hover:text-red-400" href="/terms">
              Syarat & Ketentuan
            </Link>
            <Link className="hover:text-red-400" href="/privacy">
              Kebijakan Privasi
            </Link>
            <Link className="hover:text-red-400" href="/refund-policy">
              Kebijakan Pengembalian
            </Link>
            <Link className="hover:text-red-400" href="/delivery-policy">
              Kebijakan Pengiriman
            </Link>
            <a
              className="inline-flex items-center gap-2 hover:text-red-400"
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={16} />
              Discord Support
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} {STORE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
