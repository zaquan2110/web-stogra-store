import Link from "next/link";
import { notFound } from "next/navigation";

const products = [
  {
    slug: "advanced-combat-system",
    name: "Advanced Combat System",
    category: "Scripts",
    description: "Sistem combat modular untuk proyek Roblox Studio.",
    price: 75000,
  },
  {
    slug: "modern-inventory-ui",
    name: "Modern Inventory UI",
    category: "UI",
    description: "Antarmuka inventory modern yang dapat disesuaikan.",
    price: 45000,
  },
  {
    slug: "city-roleplay-map",
    name: "City Roleplay Map",
    category: "Maps",
    description: "Map kota untuk game roleplay Roblox.",
    price: 120000,
  },
  {
    slug: "game-assets-pack",
    name: "Game Assets Pack",
    category: "Assets",
    description: "Kumpulan aset untuk pengembangan game.",
    price: 35000,
  },
  {
    slug: "studio-development",
    name: "Studio Development",
    category: "Services",
    description: "Layanan pengembangan sesuai kebutuhan proyek.",
    price: 0,
  },
];

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) notFound();

  return (
    <section className="container section">
      <Link href="/#produk" className="text-sm text-red-400 hover:underline">
        ← Kembali ke katalog
      </Link>

      <div className="mt-8 max-w-3xl rounded-2xl border border-neutral-800 bg-[#101010] p-7 sm:p-10">
        <span className="rounded-full border border-red-900 bg-red-950/40 px-3 py-1 text-sm text-red-300">
          {product.category}
        </span>

        <h1 className="mt-5 text-4xl font-black">{product.name}</h1>

        <p className="muted mt-4">{product.description}</p>

        <p className="mt-8 text-2xl font-black text-red-400">
          {product.price === 0
            ? "Hubungi Admin"
            : `Rp${product.price.toLocaleString("id-ID")}`}
        </p>

        <p className="muted mt-4">
          Konfirmasi ketersediaan, metode pembayaran, dan pengiriman produk
          dilakukan oleh admin secara manual.
        </p>

        <Link
          href={`/chat?produk=${encodeURIComponent(product.name)}`}
          className="btn-primary mt-7"
        >
          Pesan Produk →
        </Link>
      </div>
    </section>
  );
}
