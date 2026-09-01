import Link from "next/link";

const episodes = [
  { id: 1, href: "/?start=1", label: "Leben entsteht" },
  { id: 2, href: "/episode-2/?start=1", label: "Der Mensch" },
  { id: 3, href: "/episode-3/?start=1", label: "Vom Wandern zum Bleiben" },
] as const;

export function EpisodeSeriesNav({
  currentEpisode,
  onSelectCurrentEpisode,
}: {
  currentEpisode: 1 | 2 | 3;
  onSelectCurrentEpisode: () => void;
}) {
  return (
    <nav className="episode-series-nav" aria-label="Zwischen den Episoden wechseln">
      <span className="episode-series-label">Die ganze Zeitreise</span>
      <div className="episode-series-list">
        {episodes.map((episode) => {
          const content = (
            <>
              <strong>Episode {episode.id}</strong>
              <small>{episode.label}</small>
            </>
          );

          const isCurrent = episode.id === currentEpisode;

          return (
            <Link
              className={`episode-series-button${isCurrent ? " is-current" : ""}`}
              href={episode.href}
              aria-label={`Episode ${episode.id} bei Szene 1 öffnen: ${episode.label}`}
              aria-current={isCurrent ? "page" : undefined}
              onClick={isCurrent ? (event) => {
                event.preventDefault();
                onSelectCurrentEpisode();
              } : undefined}
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
