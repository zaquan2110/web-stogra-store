
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { ArrowLeft, MessageCircle, ShieldCheck } from "lucide-react";

export const revalidate = 60;

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  image_url: string | null;
};

async function getProduct(slug: string): Promise<Product | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Konfigurasi Supabase belum tersedia.");
  }

  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from("products")
    .select("id, name, slug, category, description, price, image_url")
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    throw new Error("Gagal mengambil data produk.");
  }

  return data as Product | null;
}

function formatPrice(price: number) {
  if (price <= 0) return "Hubungi Admin";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-6 py-12">
      <Link
        href="/#produk"
        className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-red-400"
      >
        <ArrowLeft size={16} />
        Kembali ke katalog
      </Link>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101010]">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full max-h-[520px] min-h-72 w-full object-cover"
            />
          ) : (
            <div className="flex min-h-72 items-center justify-center bg-gradient-to-br from-red-950/50 via-[#111] to-black p-8">
              <div className="text-center">
                <div className="text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
                  STOGRA STORE
                </div>
                <h2 className="mt-4 text-3xl font-black text-white">
                  {product.category}
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Product Preview
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#101010] p-7 sm:p-10">
          <span className="inline-flex rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-sm text-red-300">
            {product.category}
          </span>

          <h1 className="mt-5 text-3xl font-black text-white sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-5 whitespace-pre-line leading-7 text-gray-400">
            {product.description || "Hubungi admin untuk informasi produk."}
          </p>

          <p className="mt-8 text-3xl font-black text-red-400">
            {formatPrice(product.price)}
          </p>

          <div className="mt-7 space-y-4 rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 shrink-0 text-red-400" size={20} />
              <div>
                <p className="font-medium text-white">Proses dengan staff</p>
                <p className="mt-1 text-sm text-gray-400">
                  Ketersediaan, pembayaran, dan pengiriman dikonfirmasi oleh
                  staff secara manual.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/chat?produk=${encodeURIComponent(product.name)}`}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-500"
            >
              <MessageCircle size={18} />
              Pesan via Chat
            </Link>

            <Link
              href="/discord"
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-white/15 px-5 py-3 font-semibold text-white transition hover:border-red-500/50 hover:bg-white/5"
            >
              Discord Support
            </Link>
          </div>

          <p className="mt-4 text-xs leading-5 text-gray-500">
            Pastikan detail pesanan sudah benar sebelum menghubungi staff.
          </p>
        </div>
      </div>
    </section>
  );
}
