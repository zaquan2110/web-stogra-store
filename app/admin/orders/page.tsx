
"use client";

import { useState } from "react";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  async function api(
    method: "GET" | "PATCH",
    body?: Record<string, string>
  ) {
    const response = await fetch("/api/admin/orders", {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": secret,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Permintaan gagal.");
    }

    return result;
  }

  async function loadOrders() {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const result = await api("GET");
      setOrders(result.orders ?? []);
      setAuthenticated(true);
    } catch (err) {
      setAuthenticated(false);
      setError(
        err instanceof Error ? err.message : "Gagal memuat pesanan."
      );
    } finally {
      setLoading(false);
    }
  }

  async function updateOrder(
    orderCode: string,
    field: "orderStatus" | "paymentStatus",
    value: string
  ) {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await api("PATCH", {
        orderCode,
        [field]: value,
      });

      setMessage(`Pesanan ${orderCode} berhasil diperbarui.`);
      await loadOrders();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal memperbarui pesanan."
      );
    } finally {
      setLoading(false);
    }
  }

  const money = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(value) || 0);

  return (
    <main className="min-h-screen bg-[#080808] px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-bold tracking-[0.3em] text-red-500">
          STOGRA STORE
        </p>

        <h1 className="text-3xl font-black">Kelola Pesanan</h1>

        <p className="mb-8 mt-2 text-sm text-zinc-400">
          Pantau pesanan dan perbarui status pembayaran serta pengerjaan.
        </p>

        <section className="mb-8 max-w-xl rounded-2xl border border-white/10 bg-zinc-950 p-5">
          <label htmlFor="admin-secret" className="mb-2 block text-sm font-semibold">
            Kunci akses admin
          </label>

          <input
            id="admin-secret"
            type="password"
            autoComplete="current-password"
            value={secret}
            onChange={(event) => setSecret(event.target.value)}
            placeholder="Masukkan kunci admin"
            className="mb-3 w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-red-500"
          />

          <button
            type="button"
            disabled={!secret || loading}
            onClick={loadOrders}
            className="rounded-xl bg-red-600 px-5 py-3 font-bold hover:bg-red-500 disabled:opacity-50"
          >
            {loading ? "Memuat..." : "Masuk / Muat Pesanan"}
          </button>
        </section>

        {error && (
          <p role="alert" className="mb-4 rounded-xl border border-red-500/30 p-4 text-red-400">
            {error}
          </p>
        )}

        {message && (
          <p className="mb-4 rounded-xl border border-green-500/30 p-4 text-green-400">
            {message}
          </p>
        )}

        {authenticated && (
          <section>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold">
                Daftar Pesanan ({orders.length})
              </h2>

              <button
                type="button"
                disabled={loading}
                onClick={loadOrders}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:border-red-500 disabled:opacity-50"
              >
                Muat ulang
              </button>
            </div>

            {orders.length === 0 && (
              <p className="rounded-xl border border-white/10 p-6 text-zinc-400">
                Belum ada pesanan.
              </p>
            )}

            <div className="space-y-4">
              {orders.map((order) => (
                <article
                  key={order.order_code}
                  className="rounded-2xl border border-white/10 bg-zinc-950 p-5"
                >
                  <div className="mb-4 flex flex-wrap justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-red-400">
                        {order.order_code}
                      </h3>
                      <p className="mt-1 text-xs text-zinc-500">
                        {new Date(order.created_at).toLocaleString("id-ID")}
                      </p>
                    </div>

                    <p className="font-bold">
                      {money(order.total_price)}
                    </p>
                  </div>

                  <div className="grid gap-2 text-sm sm:grid-cols-2">
                    <p>
                      <span className="text-zinc-500">Pelanggan:</span>{" "}
                      {order.customer_name}
                    </p>
                    <p>
                      <span className="text-zinc-500">Discord:</span>{" "}
                      {order.discord_username}
                    </p>
                    <p>
                      <span className="text-zinc-500">Produk:</span>{" "}
                      {order.product_name}
                    </p>
                    <p>
                      <span className="text-zinc-500">Jumlah:</span>{" "}
                      {order.quantity}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <label className="text-sm">
                      Status pesanan
                      <select
                        value={order.order_status}
                        disabled={loading}
                        onChange={(event) =>
                          updateOrder(
                            order.order_code,
                            "orderStatus",
                            event.target.value
                          )
                        }
                        className="mt-2 w-full rounded-lg border border-white/10 bg-black p-3"
                      >
                        {orderStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="text-sm">
                      Status pembayaran
                      <select
                        value={order.payment_status}
                        disabled={loading}
                        onChange={(event) =>
                          updateOrder(
                            order.order_code,
                            "paymentStatus",
                            event.target.value
                          )
                        }
                        className="mt-2 w-full rounded-lg border border-white/10 bg-black p-3"
                      >
                        {paymentStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
