import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kebijakan Pengiriman | STOGRA STORE",
  description: "Informasi proses pengiriman produk digital STOGRA STORE.",
};

export default function DeliveryPolicyPage() {
  return (
    <main className="min-h-screen bg-[#080808] px-5 py-16 text-zinc-300">
      <article className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-widest text-red-500">
          STOGRA STORE
        </p>

        <h1 className="mt-3 text-3xl font-black text-white">
          Kebijakan Pengiriman Produk
        </h1>

        <p className="mt-4 text-sm leading-7 text-zinc-400">
          Informasi mengenai proses pemenuhan pesanan produk digital dan
          layanan Roblox Studio.
        </p>

        <div className="mt-10 space-y-7 text-sm leading-7">
          <section>
            <h2 className="text-lg font-bold text-white">
              1. Produk Digital
            </h2>
            <p className="mt-2">
              Produk dapat berupa Script, UI, Map, Assets, atau Services.
              Metode dan waktu penyerahan bergantung pada jenis produk dan
              keterangan yang tercantum di halaman produk.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white">
              2. Proses Pesanan
            </h2>
            <p className="mt-2">
              Setelah pesanan dibuat, pelanggan mengikuti instruksi staf
              mengenai pembayaran dan konfirmasi. Pengerjaan atau penyerahan
              dilakukan sesuai kesepakatan pesanan.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white">
              3. Status Pesanan
            </h2>
            <p className="mt-2">
              Gunakan halaman Lacak Pesanan untuk memeriksa status menggunakan
              kode pesanan. Status yang ditampilkan bergantung pada data pesanan
              yang tersimpan di sistem.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white">
              4. Kendala Pengiriman
            </h2>
            <p className="mt-2">
              Jika produk belum diterima sesuai kesepakatan, hubungi dukungan
              dengan menyertakan kode pesanan. Jangan membagikan kata sandi
              akun Roblox untuk keperluan pengiriman.
            </p>
          </section>
        </div>

        <Link
          href="/order-status"
          className="mt-10 inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
        >
          Lacak Pesanan
        </Link>
      </article>
    </main>
  );
}
