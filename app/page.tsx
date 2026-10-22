"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Code2, Layers3, Map, Package, Wrench } from "lucide-react";

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  image_url: string | null;
};

const categories = [
  { name: "Roblox Script", icon: Code2, description: "Script dan sistem Roblox" },
  { name: "UI", icon: Layers3, description: "Antarmuka game profesional" },
  { name: "Map", icon: Map, description: "Map dan lingkungan game" },
  { name: "Assets", icon: Package, description: "Asset untuk project Roblox" },
  { name: "Services", icon: Wrench, description: "Jasa pengembangan Roblox" },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const response = await fetch("/api/products");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Gagal memuat katalog.");
        }

        if (active) setProducts(result.products ?? []);
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Terjadi kesalahan."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  const money = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(value));

  return (
    <main className="min-h-screen overflow-hidden bg-[#080808] text-white">
      <section className="relative border-b border-red-500/20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(220,38,38,0.20),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-red-400">
              ROBLOX STUDIO MARKETPLACE
            </p>

            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              BUILD YOUR
              <span className="block text-red-500">NEXT WORLD.</span>
            </h1>

            <p className="mt-6 max-w-xl leading-7 text-zinc-400">
              Temukan script, UI, map, assets, dan layanan Roblox Studio
              untuk membantu project game kamu berkembang bersama STOGRA STORE.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#produk"
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
              >
                Lihat Produk <ArrowRight size={18} />
              </a>

              <Link
                href="/chat"
                className="rounded-xl border border-white/15 px-6 py-3 font-bold transition hover:border-red-500"
              >
                Hubungi Admin
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-3xl bg-red-600/10 blur-3xl" />
            <div className="relative rounded-3xl border border-red-500/30 bg-zinc-950/90 p-7 shadow-2xl shadow-red-950/30">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.25em] text-red-400">
                    STOGRA STORE
                  </p>
                  <p className="mt-2 text-2xl font-black">Developer Hub</p>
                </div>
                <Code2 size={38} className="text-red-500" />
              </div>

              {["Scripts & Systems", "Custom UI Design", "Maps & Assets"].map(
                (item, index) => (
                  <div
                    key={item}
                    className="mb-3 flex items-center gap-4 rounded-xl border border-white/10 bg-black/60 p-4"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 font-black text-red-400">
                      0{index + 1}
                    </span>
                    <span className="font-semibold">{item}</span>
                  </div>
                )
              )}

              <p className="mt-5 text-xs text-zinc-500">
                DIGITAL PRODUCTS · ROBLOX STUDIO
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="mb-8">
          <p className="text-xs font-bold tracking-[0.25em] text-red-400">
            EXPLORE CATEGORIES
          </p>
          <h2 className="mt-3 text-3xl font-black">Kategori Produk</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map(({ name, icon: Icon, description }) => (
            <a
              key={name}
              href="#produk"
              className="rounded-2xl border border-white/10 bg-zinc-950 p-5 transition hover:-translate-y-1 hover:border-red-500/50"
            >
              <Icon size={28} className="text-red-500" />
              <h3 className="mt-5 font-bold">{name}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {description}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section id="produk" className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-red-400">
              STOGRA CATALOG
            </p>
            <h2 className="mt-3 text-3xl font-black">Produk Terbaru</h2>
          </div>
          <span className="text-sm text-zinc-500">
            {products.length} produk tersedia
          </span>
        </div>

        {loading && (
          <p className="rounded-xl border border-white/10 p-8 text-zinc-400">
            Memuat produk...
          </p>
        )}

        {!loading && error && (
          <p role="alert" className="rounded-xl border border-red-500/30 p-6 text-red-400">
            {error}
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-10 text-center">
            <Package size={36} className="mx-auto text-red-500" />
            <h3 className="mt-4 text-xl font-bold">Katalog masih kosong</h3>
            <p className="mt-2 text-sm text-zinc-500">
              Tambahkan produk melalui dashboard admin untuk menampilkannya di sini.
            </p>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 transition hover:border-red-500/40"
            >
              <div className="flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-br from-red-950/60 to-black">
                {product.image_url ? (
                  // URL gambar berasal dari data produk di database.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Code2 size={52} className="text-red-500/70" />
                )}
              </div>

              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-red-400">
                  {product.category}
                </p>
                <h3 className="mt-2 text-xl font-bold">{product.name}</h3>
                <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-zinc-400">
                  {product.description || "Detail produk akan segera tersedia."}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="font-black text-white">
                    {money(Number(product.price))}
                  </span>
                  <Link
                    href={`/products/${encodeURIComponent(product.slug)}`}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold hover:bg-red-500"
                  >
                    Detail
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <div className="rounded-3xl border border-red-500/20 bg-gradient-to-r from-red-950/40 to-zinc-950 p-8 md:p-12">
          <p className="text-xs font-bold tracking-[0.25em] text-red-400">
            NEED A CUSTOM PROJECT?
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-black md:text-4xl">
            Punya ide game Roblox sendiri?
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
            Diskusikan kebutuhan project dengan tim STOGRA STORE melalui chat
            website atau Discord.
          </p>
          <Link
            href="/chat"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-bold hover:bg-red-500"
          >
            Mulai Konsultasi <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
