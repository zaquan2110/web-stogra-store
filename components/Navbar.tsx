import Link from "next/link";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/#produk", label: "Produk" },
  { href: "/chat", label: "Chat Admin" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-black/90 backdrop-blur-xl">
      <nav className="container flex min-h-[72px] items-center justify-between gap-5">
        <Link href="/" className="text-xl font-black tracking-tight">
          STOGRA <span className="text-red">STORE.</span>
        </Link>

        <div className="flex items-center gap-5 text-sm text-neutral-300">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-red-400"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/chat"
          className="hidden rounded-lg bg-red-600 px-4 py-2 text-sm font-bold hover:bg-red-700 sm:inline-flex"
        >
          Pesan Sekarang
        </Link>
      </nav>
    </header>
  );
}
