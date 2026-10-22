import Link from "next/link";
import { Code2, Menu, MessageCircle, PackageSearch } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/#produk", label: "Produk" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Kontak" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080808]/95 backdrop-blur-xl">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8"
      >
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10">
            <Code2 className="h-5 w-5 text-red-500" />
          </span>
          <span className="font-black tracking-wide text-white">
            STOGRA <span className="text-red-500">STORE</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-300 transition hover:text-red-400"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/order-status"
            className="hidden items-center gap-2 text-sm text-zinc-300 transition hover:text-red-400 sm:flex"
          >
            <PackageSearch className="h-4 w-4" />
            Lacak Pesanan
          </Link>

          <Link
            href="/chat"
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-500"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Hubungi Admin</span>
            <span className="sm:hidden">Chat</span>
          </Link>

          <details className="relative md:hidden">
            <summary
              aria-label="Buka menu navigasi"
              className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-xl border border-white/10 text-white"
            >
              <Menu className="h-5 w-5" />
            </summary>

            <div className="absolute right-0 top-12 flex min-w-48 flex-col gap-1 rounded-xl border border-white/10 bg-[#111111] p-2 shadow-xl">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-red-400"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/order-status"
                className="rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-red-400"
              >
                Lacak Pesanan
              </Link>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
