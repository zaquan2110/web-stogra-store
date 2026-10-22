import { PackageSearch } from "lucide-react";

type EmptyStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyState({
  title = "Belum ada data",
  description = "Data yang kamu cari belum tersedia.",
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
        <PackageSearch className="h-7 w-7 text-red-500" />
      </div>

      <h3 className="text-lg font-bold text-white">{title}</h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-400">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
