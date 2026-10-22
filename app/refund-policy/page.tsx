import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kebijakan Pengembalian Dana | STOGRA STORE",
  description: "Draf kebijakan pengembalian dana STOGRA STORE.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#080808] px-5 py-16 text-zinc-300">
      <article className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-widest text-red-500">
          STOGRA STORE
        </p>

        <h1 className="mt-3 text-3xl font-black text-white">
          Kebijakan Pengembalian Dana
        </h1>

        <p className="mt-4 text-sm leading-7 text-zinc-400">
          Kebijakan ini merupakan draf yang harus disesuaikan dengan ketentuan
          operasional toko dan hukum yang berlaku sebelum dipublikasikan.
        </p>

        <div className="mt-10 space-y-7 text-sm leading-7">
          <section>
            <h2 className="text-lg font-bold text-white">
              1. Pengajuan Pengembalian
            </h2>
            <p className="mt-2">
              Pelanggan dapat menghubungi staf untuk mengajukan pemeriksaan
              apabila terjadi pembayaran ganda, transaksi gagal, atau masalah
              lain yang berkaitan dengan pesanan.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white">
              2. Produk Digital
            </h2>
            <p className="mt-2">
              Setiap permintaan akan diperiksa berdasarkan status pesanan,
              pembayaran, pengiriman produk, dan kondisi masalah. Produk digital
              yang telah dikirim tidak otomatis memenuhi syarat pengembalian
              dana maupun otomatis dikecualikan darinya.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white">
              3. Cara Mengajukan
            </h2>
            <p className="mt-2">
              Sertakan kode pesanan, detail transaksi yang relevan, serta
              penjelasan masalah melalui saluran dukungan resmi. Jangan
              mengirimkan kata sandi atau kode autentikasi akun.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white">
              4. Pemeriksaan dan Keputusan
            </h2>
            <p className="mt-2">
              Staf akan meninjau setiap permintaan dan menjelaskan hasilnya
              kepada pelanggan. Ketentuan final harus transparan, konsisten,
              serta mengikuti hukum yang berlaku.
            </p>
          </section>
        </div>

        <Link
          href="/chat"
          className="mt-10 inline-flex rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-500"
        >
          Hubungi Dukungan
        </Link>
      </article>
    </main>
  );
}
