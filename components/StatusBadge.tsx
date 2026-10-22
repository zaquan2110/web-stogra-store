type StatusBadgeProps = {
  status: string;
};

const statusStyles: Record<string, string> = {
  pending: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  paid: "border-green-500/30 bg-green-500/10 text-green-400",
  processing: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  completed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  cancelled: "border-red-500/30 bg-red-500/10 text-red-400",
  failed: "border-red-500/30 bg-red-500/10 text-red-400",
  active: "border-green-500/30 bg-green-500/10 text-green-400",
  inactive: "border-zinc-500/30 bg-zinc-500/10 text-zinc-400",
};

const statusLabels: Record<string, string> = {
  pending: "Menunggu",
  paid: "Sudah Dibayar",
  processing: "Diproses",
  completed: "Selesai",
  cancelled: "Dibatalkan",
  failed: "Gagal",
  active: "Aktif",
  inactive: "Nonaktif",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();
  const style =
    statusStyles[normalizedStatus] ??
    "border-zinc-500/30 bg-zinc-500/10 text-zinc-400";

  const label = statusLabels[normalizedStatus] ?? status;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${style}`}
    >
      {label}
    </span>
  );
}
