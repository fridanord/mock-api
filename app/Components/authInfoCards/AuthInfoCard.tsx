import type { LucideIcon } from "lucide-react";

type AuthInfoCardProps = {
  title: string;
  text: string;
  icon: LucideIcon;
  color: string;
  isOpen: boolean;
  onClick: () => void;
};

export default function AuthInfoCard({
  title,
  text,
  icon: Icon,
  color,
  isOpen,
  onClick,
}: AuthInfoCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-left shadow-sm transition hover:bg-[var(--color-surface-muted)] hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${color}`}
        >
          <Icon className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[var(--color-text-main)]">
            {title}
          </h2>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Klicka för att läsa mer
          </p>
        </div>
      </div>

      {isOpen && (
        <p className="mt-4 text-sm leading-6 text-[var(--color-text-muted)]">
          {text}
        </p>
      )}
    </button>
  );
}
