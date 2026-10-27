export default function PhotoPlaceholder({
  label = "Foto profissional a definir",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex aspect-[4/5] items-center justify-center rounded-lg bg-bronze-light text-primary-dark ${className}`}
    >
      <span className="px-4 text-center text-sm">{label}</span>
    </div>
  );
}
