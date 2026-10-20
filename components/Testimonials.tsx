const testimonials = [
  {
    name: "Customer 01",
    role: "Roblox Developer",
    message: "Proses pemesanan mudah dan produk sesuai kebutuhan proyek.",
  },
  {
    name: "Customer 02",
    role: "Game Creator",
    message: "Kategori produk mudah dicari dan komunikasi dengan admin jelas.",
  },
  {
    name: "Customer 03",
    role: "Studio Builder",
    message: "Cocok untuk mencari aset dan layanan pengembangan Roblox.",
  },
];

export default function Testimonials() {
  return (
    <section className="container section">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-red-400">
        Pengalaman Pelanggan
      </p>

      <h2 className="section-title">Dibuat untuk developer</h2>

      <p className="muted mb-8">
        STOGRA STORE membantu kebutuhan pengembangan game Roblox kamu.
      </p>

      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((item) => (
          <article
            key={item.name}
            className="rounded-xl border border-neutral-800 bg-[#101010] p-6"
          >
            <div className="mb-4 text-xl text-red-400">★★★★★</div>

            <p className="leading-7 text-neutral-300">
              “{item.message}”
            </p>

            <div className="mt-6 border-t border-neutral-800 pt-4">
              <p className="font-bold">{item.name}</p>
              <p className="mt-1 text-sm text-neutral-500">{item.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
