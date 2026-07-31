import Link from "next/link";

type HistoryBackLinkProps = {
  className?: string;
  label?: string;
};

export function HistoryBackLink({
  className = "info-back",
  label = "Zurück",
}: HistoryBackLinkProps) {
  return (
    <Link className={className} href="/?weiter=1">
      <span aria-hidden="true">←</span> {label}
    </Link>
  );
}
