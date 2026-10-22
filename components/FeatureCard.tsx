import type { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-[#101010] p-6 transition duration-300 hover:-translate-y-1 hover:border-red-500/40">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 transition group-hover:bg-red-500 group-hover:text-white">
        {icon}
      </div>

      <h3 className="text-lg font-bold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-zinc-400">
        {description}
      </p>
    </article>
  );
}
