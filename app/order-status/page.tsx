"use client";

import { useState, FormEvent } from "react";

type Order = {
  order_code: string;
  product_name: string;
  quantity: number;
  total_price: number;
  payment_status: string;
  order_status: string;
  created_at: string;
  updated_at: string;
};

const statusLabels: Record<string, string> = {
  pending: "Menunggu diproses",
  processing: "Sedang diproses",
  completed: "Selesai",
  cancelled: "Dibatalkan",
  waiting_confirmation: "Menunggu konfirmasi pembayaran",
  paid: "Sudah dibayar",
};

export default function OrderStatusPage() {
  const [orderCode, setOrderCode] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function checkOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const response = await fetch(
        `/api/orders/${encodeURIComponent(orderCode.trim())}`
      );
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Pesanan tidak dapat ditemukan.");
        return;
      }

      setOrder(result.order);
    } catch {
      setError("Koneksi bermasalah. Silakan coba kembali.");
    } finally {
      setLoading(false);
    }
  }

  const money = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <main className="min-h-screen bg-[#080808] px-5 py-16 text-white">
      <div className="mx-auto max-w-xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-red-500">
          STOGRA STORE
        </p>

        <h1 className="mb-3 text-3xl font-black md:text-4xl">
          Lacak Pesanan
        </h1>

        <p className="mb-8 text-sm leading-6 text-zinc-400">
          Masukkan kode pesanan yang diberikan setelah pesanan berhasil dibuat.
        </p>

        <form
          onSubmit={checkOrder}
          className="space-y-4 rounded-2xl border border-white/10 bg-zinc-950 p-6"
        >
          <label className="block text-sm font-semibold" htmlFor="orderCode">
            Kode pesanan
          </label>

          <input
            id="orderCode"
            value={orderCode}
            onChange={(event) => setOrderCode(event.target.value)}
            placeholder="Contoh: STG-ABC123-12AB34"
            required
            maxLength={80}
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-red-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-red-600 px-5 py-3 font-bold transition hover:bg-red-500 disabled:opacity-50"
          >
            {loading ? "Memeriksa..." : "Periksa Pesanan"}
          </button>

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}
        </form>

        {order && (
          <section className="mt-6 space-y-4 rounded-2xl border border-red-500/30 bg-zinc-950 p-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Kode pesanan
              </p>
              <p className="mt-1 break-all font-bold text-red-400">
                {order.order_code}
              </p>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="text-sm text-zinc-500">Produk</p>
              <p className="font-semibold">{order.product_name}</p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">Jumlah</p>
              <p>{order.quantity}</p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">Total</p>
              <p className="font-bold">{money(Number(order.total_price))}</p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">Status pembayaran</p>
              <p className="font-semibold">
                {statusLabels[order.payment_status] ?? order.payment_status}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">Status pesanan</p>
              <p className="font-semibold text-red-400">
                {statusLabels[order.order_status] ?? order.order_status}
              </p>
            </div>

            <p className="border-t border-white/10 pt-4 text-xs text-zinc-500">
              Terakhir diperbarui:{" "}
              {new Date(order.updated_at).toLocaleString("id-ID")}
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
