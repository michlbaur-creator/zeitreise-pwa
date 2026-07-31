"use client";

type HistoryBackLinkProps = {
  className?: string;
  label?: string;
};

export function HistoryBackLink({
  className = "info-back",
  label = "Zurück",
}: HistoryBackLinkProps) {
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.assign("/?weiter=1");
  };

  return (
    <button className={className} type="button" onClick={goBack}>
      <span aria-hidden="true">←</span> {label}
    </button>
  );
}
