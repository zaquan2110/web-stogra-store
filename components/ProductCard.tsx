import Link from "next/link";

export type Product = {
  slug: string;
  name: string;
  category: string;
  description: string;
  price: number;
  icon: string;
  featured?: boolean;
};

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <article className="group flex flex-col rounded-xl border border-neutral-800 bg-[#101010] p-5 transition hover:-translate-y-1 hover:border-red-500/70">
      <div className="mb-5 flex h-36 items-center justify-center rounded-lg border border-neutral-800 bg-gradient-to-br from-red-950/50 to-black text-5xl">
        {product.icon}
      </div>

      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rounded-full border border-red-900 bg-red-950/40 px-3 py-1 text-xs text-red-300">
          {product.category}
        </span>
        {product.featured && (
          <span className="text-xs font-bold text-amber-400">
            ★ Pilihan
          </span>
        )}
      </div>

      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-neutral-400">
        {product.description}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-neutral-800 pt-4">
        <span className="font-bold text-red-400">
          {product.price === 0
            ? "Hubungi Admin"
            : `Rp${product.price.toLocaleString("id-ID")}`}
        </span>

        <Link
          href={`/chat?produk=${encodeURIComponent(product.name)}`}
          className="rounded-lg bg-red-600 px-3 py-2 text-sm font-bold hover:bg-red-700"
        >
          Pesan
        </Link>
      </div>
    </article>
  );
}
