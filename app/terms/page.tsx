export default function TermsPage() {
  return (
    <section className="container section">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black">
          Syarat dan <span className="text-red">Ketentuan</span>
        </h1>

        <div className="mt-8 space-y-6 text-sm leading-7 text-neutral-300">
          <section>
            <h2 className="text-xl font-bold text-white">1. Pemesanan</h2>
            <p className="muted mt-2">
              Pelanggan wajib memeriksa detail produk dan mengonfirmasi
              kebutuhan kepada admin sebelum melakukan pembayaran.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">
              2. Pembayaran
            </h2>
            <p className="muted mt-2">
              Pembayaran dilakukan sesuai instruksi resmi dari admin.
              Jangan mengirim uang sebelum memastikan instruksi dan nominal
              pembayaran benar.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">
              3. Pengiriman Produk
            </h2>
            <p className="muted mt-2">
              Produk atau layanan diberikan setelah admin memverifikasi
              pembayaran dan memastikan pesanan telah sesuai.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">
              4. Dukungan Pelanggan
            </h2>
            <p className="muted mt-2">
              Pertanyaan dan bantuan dapat disampaikan melalui Chat Website
              atau server Discord resmi STOGRA STORE.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
