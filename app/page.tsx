import Link from "next/link";
import ProductCard, { type Product } from "@/components/ProductCard";

const products: Product[] = [
  {
    slug: "advanced-combat-system",
    name: "Advanced Combat System",
    category: "Scripts",
    description:
      "Sistem combat modular untuk proyek Roblox Studio.",
    price: 75000,
    icon: "⚔️",
    featured: true,
  },
  {
    slug: "modern-inventory-ui",
    name: "Modern Inventory UI",
    category: "UI",
    description:
      "Antarmuka inventory modern yang dapat disesuaikan.",
    price: 45000,
    icon: "🎒",
  },
  {
    slug: "city-roleplay-map",
    name: "City Roleplay Map",
    category: "Maps",
    description:
      "Map kota untuk game roleplay Roblox.",
    price: 120000,
    icon: "🏙️",
    featured: true,
  },
  {
    slug: "game-assets-pack",
    name: "Game Assets Pack",
    category: "Assets",
    description:
      "Kumpulan aset untuk membantu pengembangan game.",
    price: 35000,
    icon: "🧱",
  },
  {
    slug: "studio-development",
    name: "Studio Development",
    category: "Services",
    description:
      "Layanan pengembangan sesuai kebutuhan proyekmu.",
    price: 0,
    icon: "🛠️",
  },
  {
    slug: "custom-ui-service",
    name: "Custom UI Service",
    category: "Services",
    description:
      "Pembuatan UI khusus sesuai konsep game.",
    price: 0,
    icon: "🎨",
  },
];

const categories = ["Scripts", "UI", "Maps", "Assets", "Services"];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-neutral-900">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,35,45,0.16),transparent_55%)]" />

        <div className="container relative py-24 sm:py-32">
          <div className="mb-6 inline-flex rounded-full border border-red-900 bg-red-950/40 px-4 py-2 text-xs font-bold tracking-widest text-red-300">
            ROBLOX STUDIO MARKETPLACE
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight sm:text-7xl">
            BUILD YOUR GAME.
            <br />
            <span className="text-red">LEVEL IT UP.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg">
            Temukan Scripts, UI, Maps, Assets, dan layanan
            pengembangan Roblox Studio untuk proyek game kamu.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="#produk" className="btn-primary">
              Jelajahi Produk →
            </Link>
            <Link href="/chat" className="btn-secondary">
              Hubungi Admin
            </Link>
          </div>

          <div className="mt-14 grid max-w-2xl grid-cols-3 gap-4 border-t border-neutral-800 pt-7">
            <div>
              <p className="text-2xl font-black text-red-400">5</p>
              <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
                Kategori
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-red-400">24/7</p>
              <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
                Akses Website
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-red-400">1:1</p>
              <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
                Layanan Personal
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container section" id="kategori">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-red-400">
          Kategori
        </p>
        <h2 className="section-title">Apa yang kamu butuhkan?</h2>
        <p className="muted mb-8 max-w-2xl">
          Pilih kategori yang sesuai dengan kebutuhan pengembangan game.
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category, index) => (
            <a
              key={category}
              href="#produk"
              className="rounded-xl border border-neutral-800 bg-[#101010] p-5 transition hover:border-red-500"
            >
              <span className="text-2xl">
                {["⚙️", "🖥️", "🌆", "🧩", "🛠️"][index]}
              </span>
              <p className="mt-4 font-bold">{category}</p>
              <p className="mt-1 text-xs text-neutral-500">
                Lihat katalog →
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="container section border-t border-neutral-900" id="produk">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-red-400">
          Katalog
        </p>
        <h2 className="section-title">Produk pilihan</h2>
        <p className="muted mb-9">
          Harga ditampilkan sebagai contoh dan dapat disesuaikan oleh admin.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="container pb-20">
        <div className="rounded-2xl border border-red-950 bg-gradient-to-r from-red-950/40 to-[#101010] p-7 sm:p-12">
          <h2 className="text-3xl font-black sm:text-4xl">
            Punya proyek khusus?
          </h2>
          <p className="muted mt-3 max-w-2xl">
            Hubungi admin melalui chat website untuk konsultasi, pemesanan,
            dan verifikasi pembayaran manual.
          </p>
          <Link href="/chat" className="btn-primary mt-6">
            Chat Admin Sekarang →
          </Link>
        </div>
      </section>
    </>
  );
}
