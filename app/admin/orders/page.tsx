"use client";

import { useEffect, useState } from "react";

type Order = {
  order_code: string;
  customer_name: string;
  discord_username: string;
  product_name: string;
  quantity: number;
  total_price: number;
  payment_status: string;
  order_status: string;
  created_at: string;
};

const orderStatuses = [
  "pending",
  "processing",
  "completed",
  "cancelled",
];

const paymentStatuses = [
  "pending",
  "waiting_confirmation",
  "paid",
  "cancelled",
];

export default function AdminOrdersPage() {
  const [secret, setSecret] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  async function loadOrders(currentSecret = secret) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/orders", {
        headers: {
          "x-admin-secret": currentSecret,
        },
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Gagal mengambil pesanan.");
        setAuthenticated(false);
        return;
      }

      setOrders(result.orders ?? []);
      setAuthenticated(true);
    } catch {
      setError("Koneksi gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  async function updateOrder(
    orderCode: string,
    field: "orderStatus" | "paymentStatus",
    value: string
  ) {
    setError("");

    try {
      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({
          orderCode,
          [field]: value,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Status gagal diperbarui.");
        return;
      }

      await loadOrders();
    } catch {
      setError("Koneksi gagal saat memperbarui status.");
    }
  }

  const money = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <main className="min-h-screen bg-[#080808] px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-2 text-sm font-bold tracking-[0.3em] text-red-500">
          STOGRA STORE
        </p>

        <h1 className="mb-2 text-3xl font-black">
          Dashboard Pesanan
        </h1>

        <p className="mb-8 text-sm text-zinc-400">
          Lihat pesanan masuk dan kelola status pembayaran manual.
        </p>

        <section className="mb-8 max-w-xl rounded-2xl border border-white/10 bg-zinc-950 p-5">
          <label
            htmlFor="admin-secret"
            className="mb-2 block text-sm font-semibold"
          >
            Kunci akses admin
          </label>

          <input
            id="admin-secret"
            type="password"
            autoComplete="current-password"
            value={secret}
            onChange={(event) => setSecret(event.target.value)}
            placeholder="Masukkan ADMIN_API_SECRET"
            className="mb-3 w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-red-500"
          />

          <button
            type="button"
            disabled={!secret || loading}
            onClick={() => loadOrders(secret)}
            className="rounded-xl bg-red-600 px-5 py-3 font-bold hover:bg-red-500 disabled:opacity-50"
          >
            {loading ? "Memuat..." : "Masuk / Muat Pesanan"}
          </button>

          {error && (
            <p role="alert" className="mt-3 text-sm text-red-400">
              {error}
            </p>
          )}
        </section>

        {authenticated && (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-zinc-300">
                Total pesanan ditampilkan:{" "}
                <strong>{orders.length}</strong>
              </p>

              <button
                type="button"
                onClick={() => loadOrders()}
                disabled={loading}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:border-red-500 disabled:opacity-50"
              >
                Muat ulang
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[1050px] border-collapse text-left text-sm">
                <thead className="bg-zinc-900 text-zinc-300">
                  <tr>
                    <th className="p-4">Kode</th>
                    <th className="p-4">Pembeli</th>
                    <th className="p-4">Produk</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Pembayaran</th>
                    <th className="p-4">Pesanan</th>
                    <th className="p-4">Tanggal</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.order_code}
                      className="border-t border-white/10 align-top"
                    >
                      <td className="p-4 font-semibold text-red-400">
                        {order.order_code}
                        <p className="mt-1 text-xs font-normal text-zinc-500">
                          {order.discord_username}
                        </p>
                      </td>

                      <td className="p-4">
                        {order.customer_name}
                      </td>

                      <td className="p-4">
                        {order.product_name}
                        <p className="text-xs text-zinc-500">
                          Jumlah: {order.quantity}
                        </p>
                      </td>

                      <td className="whitespace-nowrap p-4">
                        {money(Number(order.total_price))}
                      </td>

                      <td className="p-4">
                        <select
                          aria-label={`Status pembayaran ${order.order_code}`}
                          value={order.payment_status}
                          onChange={(event) =>
                            updateOrder(
                              order.order_code,
                              "paymentStatus",
                              event.target.value
                            )
                          }
                          className="rounded-lg border border-white/10 bg-zinc-900 p-2"
                        >
                          {paymentStatuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="p-4">
                        <select
                          aria-label={`Status pesanan ${order.order_code}`}
                          value={order.order_status}
                          onChange={(event) =>
                            updateOrder(
                              order.order_code,
                              "orderStatus",
                              event.target.value
                            )
                          }
                          className="rounded-lg border border-white/10 bg-zinc-900 p-2"
                        >
                          {orderStatuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="whitespace-nowrap p-4 text-zinc-400">
                        {new Date(order.created_at).toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {orders.length === 0 && (
                <p className="p-8 text-center text-zinc-500">
                  Belum ada pesanan.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
