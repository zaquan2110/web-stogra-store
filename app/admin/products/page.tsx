"use client";

import { useState } from "react";

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  image_url: string | null;
  status: "active" | "inactive";
};

const emptyForm = {
  name: "",
  slug: "",
  category: "Roblox Script",
  description: "",
  price: "0",
  image_url: "",
};

export default function AdminProductsPage() {
  const [secret, setSecret] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  async function api(
    method: "GET" | "POST" | "PATCH",
    body?: Record<string, unknown>
  ) {
    const response = await fetch("/api/admin/products", {
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

  async function loadProducts() {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const result = await api("GET");
      setProducts(result.products ?? []);
      setAuthenticated(true);
    } catch (err) {
      setAuthenticated(false);
      setError(err instanceof Error ? err.message : "Gagal memuat produk.");
    } finally {
      setLoading(false);
    }
  }

  function editProduct(product: Product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      slug: product.slug,
      category: product.category,
      description: product.description,
      price: String(product.price),
      image_url: product.image_url ?? "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId("");
    setForm(emptyForm);
  }

  async function saveProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const payload = {
      name: form.name,
      slug: form.slug,
      category: form.category,
      description: form.description,
      price: Number(form.price),
      image_url: form.image_url,
    };

    try {
      if (editingId) {
        await api("PATCH", { id: editingId, ...payload });
        setMessage("Produk berhasil diperbarui.");
      } else {
        await api("POST", payload);
        setMessage("Produk berhasil ditambahkan.");
      }

      resetForm();
      const result = await api("GET");
      setProducts(result.products ?? []);
      setAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan produk.");
    } finally {
      setLoading(false);
    }
  }

  async function toggleProduct(product: Product) {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await api("PATCH", {
        id: product.id,
        status: product.status === "active" ? "inactive" : "active",
      });

      setMessage("Status produk berhasil diubah.");
      const result = await api("GET");
      setProducts(result.products ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengubah status.");
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
    <main className="min-h-screen bg-[#080808] px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-bold tracking-[0.3em] text-red-500">
          STOGRA STORE
        </p>
        <h1 className="mb-2 text-3xl font-black">Kelola Produk</h1>
        <p className="mb-8 text-sm text-zinc-400">
          Tambahkan produk, ubah harga, dan aktifkan atau nonaktifkan katalog.
        </p>

        <section className="mb-8 max-w-xl rounded-2xl border border-white/10 bg-zinc-950 p-5">
          <label htmlFor="secret" className="mb-2 block text-sm font-semibold">
            Kunci akses admin
          </label>
          <input
            id="secret"
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
            onClick={loadProducts}
            className="rounded-xl bg-red-600 px-5 py-3 font-bold hover:bg-red-500 disabled:opacity-50"
          >
            {loading ? "Memuat..." : "Masuk / Muat Produk"}
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
          <>
            <form
              onSubmit={saveProduct}
              className="mb-10 grid gap-4 rounded-2xl border border-white/10 bg-zinc-950 p-5 md:grid-cols-2"
            >
              <h2 className="text-xl font-bold md:col-span-2">
                {editingId ? "Edit Produk" : "Tambah Produk"}
              </h2>

              <label className="text-sm">
                Nama produk
                <input
                  required
                  maxLength={120}
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  className="mt-2 w-full rounded-lg border border-white/10 bg-black p-3"
                />
              </label>

              <label className="text-sm">
                Slug URL (huruf kecil, angka, tanda hubung)
                <input
                  required
                  maxLength={120}
                  value={form.slug}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      slug: event.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]/g, ""),
                    })
                  }
                  placeholder="contoh-roblox-script"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-black p-3"
                />
              </label>

              <label className="text-sm">
                Kategori
                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm({ ...form, category: event.target.value })
                  }
                  className="mt-2 w-full rounded-lg border border-white/10 bg-black p-3"
                >
                  <option>Roblox Script</option>
                  <option>UI</option>
                  <option>Map</option>
                  <option>Assets</option>
                  <option>Services</option>
                  <option>Membership</option>
                </select>
              </label>

              <label className="text-sm">
                Harga (IDR)
                <input
                  required
                  type="number"
                  min="0"
                  max="1000000000"
                  step="1"
                  value={form.price}
                  onChange={(event) =>
                    setForm({ ...form, price: event.target.value })
                  }
                  className="mt-2 w-full rounded-lg border border-white/10 bg-black p-3"
                />
              </label>

              <label className="text-sm md:col-span-2">
                URL gambar produk (opsional)
                <input
                  type="url"
                  value={form.image_url}
                  onChange={(event) =>
                    setForm({ ...form, image_url: event.target.value })
                  }
                  placeholder="https://..."
                  className="mt-2 w-full rounded-lg border border-white/10 bg-black p-3"
                />
              </label>

              <label className="text-sm md:col-span-2">
                Deskripsi
                <textarea
                  rows={4}
                  maxLength={5000}
                  value={form.description}
                  onChange={(event) =>
                    setForm({ ...form, description: event.target.value })
                  }
                  className="mt-2 w-full rounded-lg border border-white/10 bg-black p-3"
                />
              </label>

              <div className="flex flex-wrap gap-3 md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-red-600 px-5 py-3 font-bold hover:bg-red-500 disabled:opacity-50"
                >
                  {loading ? "Menyimpan..." : "Simpan Produk"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-xl border border-white/10 px-5 py-3"
                  >
                    Batal Edit
                  </button>
                )}
              </div>
            </form>

            <section>
              <h2 className="mb-4 text-xl font-bold">
                Daftar Produk ({products.length})
              </h2>

              <div className="space-y-3">
                {products.map((product) => (
                  <article
                    key={product.id}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-zinc-950 p-5 md:flex-row md:items-center"
                  >
                    <div className="min-w-0">
                      <h3 className="font-bold">{product.name}</h3>
                      <p className="mt-1 break-all text-xs text-zinc-500">
                        /products/{product.slug}
                      </p>
                      <p className="mt-2 text-sm text-zinc-300">
                        {product.category} · {money(Number(product.price))}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        Status: {product.status}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => editProduct(product)}
                        className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:border-red-500"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={loading}
                        onClick={() => toggleProduct(product)}
                        className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:border-red-500 disabled:opacity-50"
                      >
                        {product.status === "active" ? "Nonaktifkan" : "Aktifkan"}
                      </button>
                    </div>
                  </article>
                ))}

                {products.length === 0 && (
                  <p className="rounded-xl border border-white/10 p-6 text-zinc-500">
                    Belum ada produk. Tambahkan produk melalui formulir di atas.
                  </p>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
