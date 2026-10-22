import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | STOGRA STORE",
  description: "Kebijakan privasi pengguna STOGRA STORE.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#080808] px-5 py-16 text-zinc-300">
      <article className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-widest text-red-500">
          STOGRA STORE
        </p>

        <h1 className="mt-3 text-3xl font-black text-white">
          Kebijakan Privasi
        </h1>

        <p className="mt-4 text-sm leading-7 text-zinc-400">
          Halaman ini menjelaskan bagaimana informasi pengguna dapat digunakan
          ketika mengakses layanan STOGRA STORE.
        </p>

        <section className="mt-10 space-y-7 text-sm leading-7">
          <div>
            <h2 className="text-lg font-bold text-white">
              1. Informasi yang Dikumpulkan
            </h2>
            <p>
              Kami dapat meminta informasi yang diperlukan untuk pemesanan,
              seperti nama pengguna, detail produk, dan informasi komunikasi
              terkait pesanan.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              2. Penggunaan Informasi
            </h2>
            <p>
              Informasi digunakan untuk memproses pesanan, memberikan dukungan,
              mengonfirmasi pembayaran, dan meningkatkan layanan toko.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              3. Keamanan Data
            </h2>
            <p>
              Kami perlu menerapkan kontrol akses yang sesuai dan tidak
              menampilkan informasi pribadi pelanggan kepada pengguna lain.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              4. Layanan Pihak Ketiga
            </h2>
            <p>
              Website dapat menggunakan layanan pihak ketiga untuk hosting,
              penyimpanan data, atau komunikasi. Penggunaan layanan tersebut
              mengikuti ketentuan penyedia masing-masing.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              5. Pertanyaan Privasi
            </h2>
            <p>
              Hubungi tim toko melalui halaman chat atau Discord untuk
              mengajukan pertanyaan terkait informasi yang kamu berikan.
            </p>
          </div>
        </section>

        <p className="mt-10 border-t border-white/10 pt-5 text-xs text-zinc-500">
          Dokumen ini merupakan draf dan harus ditinjau serta disesuaikan
          sebelum website dipublikasikan.
        </p>
      </article>
    </main>
  );
}
