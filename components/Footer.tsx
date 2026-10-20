import Link from "next/link";
<Link href="/terms" className="hover:text-red-400">
  Syarat & Ketentuan
</Link>
<Link href="/discord" className="hover:text-red-400">
  Layanan Discord
</Link>

export default function Footer() {
  const discord =
    process.env.DISCORD_INVITE_URL ||
    "https://discord.gg/GANTI_LINK_DISCORD";

  return (
    <footer className="border-t border-neutral-800 bg-[#050505]">
      <div className="container flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-black">
            STOGRA <span className="text-red">STORE.</span>
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            Roblox Studio Scripts, UI, Maps, Assets & Services.
          </p>
        </div>

        <div className="flex gap-5 text-sm text-neutral-400">
          <Link href="/chat" className="hover:text-red-400">
            Chat Website
          </Link>
          <a
            href={discord}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400"
          >
            Discord
          </a>
        </div>

        <p className="text-xs text-neutral-600">
          © {new Date().getFullYear()} STOGRA STORE
        </p>
      </div>
    </footer>
  );
}
