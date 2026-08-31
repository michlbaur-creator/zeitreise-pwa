import Link from "next/link";
import {
  episodeThreeParts,
  episodeThreePart,
  episodeThreeThread,
  type EpisodeThreePart,
} from "../data/episode3Parts";

type ChapterEndingProps = {
  partId: EpisodeThreePart["id"];
  href?: string;
  onContinue?: () => void;
  actionLabel?: string;
  statusLabel?: string;
};

export function EpisodeThreeChapterEnding({
  partId,
  href,
  onContinue,
  actionLabel,
  statusLabel,
}: ChapterEndingProps) {
  const part = episodeThreePart(partId);
  const content = (
    <>
      <div className="ep3-chapter-object" aria-hidden="true">
        <span>{part.symbol}</span>
        <small>{part.object}</small>
      </div>
      <div className="ep3-chapter-ending-copy">
        <span>Die Reise geht weiter · Teil {part.id} von 4</span>
        <strong>{part.title}</strong>
        <p>{part.guidingQuestion}</p>
        {actionLabel ? (
          <em className="ep3-chapter-action">
            {actionLabel} <span aria-hidden="true">→</span>
          </em>
        ) : null}
        {statusLabel ? (
          <em className="ep3-chapter-status">{statusLabel}</em>
        ) : null}
      </div>
      <EpisodeThreeThread activePart={part.id} />
    </>
  );

  if (href) {
    return (
      <Link
        className="ep3-chapter-ending is-clickable"
        href={href}
        aria-label={`${actionLabel ?? part.title}: ${part.guidingQuestion}`}
        aria-live="polite"
      >
        {content}
      </Link>
    );
  }

  if (onContinue) {
    return (
      <button
        type="button"
        className="ep3-chapter-ending is-clickable"
        onClick={onContinue}
        aria-label={`${actionLabel ?? part.title}: ${part.guidingQuestion}`}
        aria-live="polite"
      >
        {content}
      </button>
    );
  }

  return (
    <div className="ep3-chapter-ending" aria-live="polite">
      {content}
    </div>
  );
}

export function EpisodeThreePartOverview({
  activePart,
}: {
  activePart: EpisodeThreePart["id"];
}) {
  return (
    <section className="ep3-part-overview" aria-labelledby="episode-3-four-questions">
      <p className="eyebrow" id="episode-3-four-questions">Vier Teile · vier Leitfragen</p>
      <ol>
        {episodeThreeParts.map((part) => (
          <li className={part.id === activePart ? "is-current" : ""} key={part.id}>
            <span aria-hidden="true">{part.symbol}</span>
            <div>
              <small>Teil {part.id}</small>
              <strong>{part.title}</strong>
              <p>{part.guidingQuestion}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function EpisodeThreeThread({
  activePart,
}: {
  activePart: EpisodeThreePart["id"];
}) {
  const currentPart = episodeThreeParts[activePart - 1];
  const firstCurrentStep = currentPart.threadSteps[0];

  return (
    <ol
      className="ep3-development-thread"
      aria-label="Roter Faden: Vorräte, Organisation, Vernetzung, Beschleunigung und planetare Wirkung"
    >
      {episodeThreeThread.map((step, index) => (
        <li
          className={
            currentPart.threadSteps.includes(index)
              ? "is-current"
              : index < firstCurrentStep
                ? "is-passed"
                : ""
          }
          key={step}
        >
          {step}
        </li>
      ))}
    </ol>
  );
}
