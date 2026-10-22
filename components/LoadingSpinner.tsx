type LoadingSpinnerProps = {
  label?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
};

export default function LoadingSpinner({
  label = "Memuat...",
  size = "md",
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-7 w-7 border-[3px]",
    lg: "h-10 w-10 border-4",
  };

  const content = (
    <div
      className="flex flex-col items-center justify-center gap-3"
      role="status"
      aria-live="polite"
    >
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-red-500/30 border-t-red-500`}
        aria-hidden="true"
      />
      <span className="text-sm text-zinc-400">{label}</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#080808]">
        {content}
      </div>
    );
  }

  return content;
}
