type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow = "STOGRA STORE",
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "mx-auto text-center items-center" : "text-left";

  return (
    <div className={`mb-8 flex max-w-3xl flex-col ${alignment}`}>
      <span className="mb-3 inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-red-500">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        {eyebrow}
      </span>

      <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
