import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container section text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-red-400">
        Error 404
      </p>

      <h1 className="mt-4 text-5xl font-black">Halaman tidak ditemukan</h1>

      <p className="muted mx-auto mt-4 max-w-lg">
        Halaman yang kamu cari tidak tersedia atau alamatnya salah.
      </p>

      <Link href="/" className="btn-primary mt-7">
        Kembali ke Beranda
      </Link>
    </section>
  );
}
