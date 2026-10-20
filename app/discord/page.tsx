export default function DiscordPage() {
  const invite =
    process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ||
    "https://discord.com/app";

  return (
    <section className="container section">
      <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-800 bg-[#101010] p-8 text-center sm:p-12">
        <div className="text-5xl">💬</div>

        <h1 className="mt-5 text-4xl font-black">
          Gabung <span className="text-red">Discord</span>
        </h1>

        <p className="muted mt-4">
          Hubungi admin STOGRA STORE untuk pertanyaan produk, konsultasi,
          pemesanan, dan konfirmasi pembayaran manual.
        </p>

        <a
          href={invite}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-7"
        >
          Buka Server Discord →
        </a>
      </div>
    </section>
  );
}
