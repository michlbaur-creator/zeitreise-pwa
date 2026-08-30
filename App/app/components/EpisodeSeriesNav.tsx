import Link from "next/link";

const episodes = [
  { id: 1, href: "/", label: "Leben entsteht" },
  { id: 2, href: "/episode-2/", label: "Der Mensch" },
  { id: 3, label: "Vom Wandern zum Bleiben" },
] as const;

export function EpisodeSeriesNav({
  currentEpisode,
}: {
  currentEpisode: 1 | 2 | 3;
}) {
  return (
    <nav className="episode-series-nav" aria-label="Zwischen den Episoden wechseln">
      <span className="episode-series-label">Die ganze Zeitreise</span>
      <div className="episode-series-list">
        {episodes.map((episode) => {
          if (episode.id === 3) {
            return (
              <span
                className={`episode-series-button is-unavailable ${
                  currentEpisode === 3 ? "is-current" : ""
                }`.trim()}
                aria-current={currentEpisode === 3 ? "page" : undefined}
                aria-disabled="true"
                key={episode.id}
              >
                <strong>Episode 3</strong>
                <small>
                  {currentEpisode === 3
                    ? "Direktlink geöffnet"
                    : "Nur per Direktlink"}
                </small>
              </span>
            );
          }

          const content = (
            <>
              <strong>Episode {episode.id}</strong>
              <small>{episode.label}</small>
            </>
          );

          return episode.id === currentEpisode ? (
            <span
              className="episode-series-button is-current"
              aria-current="page"
              key={episode.id}
            >
              {content}
            </span>
          ) : (
            <Link
              className="episode-series-button"
              href={episode.href}
              aria-label={`Episode ${episode.id}: ${episode.label}`}
              key={episode.id}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
