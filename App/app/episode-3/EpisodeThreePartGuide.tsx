import {
  episodeThreeParts,
  episodeThreeThread,
  type EpisodeThreePart,
} from "../data/episode3Parts";

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
