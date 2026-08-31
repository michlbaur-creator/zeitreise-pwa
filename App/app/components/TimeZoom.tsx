import type { CSSProperties } from "react";

type TimeZoomLevel = 1 | 2 | 3;

const timeZoomScales = {
  1: {
    short: "12 Stunden Erdzeit",
    title: "Die ganze Erdgeschichte",
    range: "4,6 Milliarden Jahre auf einer 12-Stunden-Uhr",
  },
  2: {
    short: "Zoom: letzte 67 Sekunden",
    title: "Die Entwicklung des Menschen",
    range: "Die letzten rund 7 Millionen Jahre werden zur eigenen Zeitleiste",
  },
  3: {
    short: "Zoom: letzte 0,13 Sekunden",
    title: "Episode 3 im Wimpernschlag",
    range: "Von 12.000 v. Chr. bis heute als breites Zeitband",
  },
} as const;

function zoomStyle(progress: number) {
  return {
    "--time-zoom-progress": Math.min(1, Math.max(0, progress)),
  } as CSSProperties;
}

export function TimeZoomMark({
  level,
  progress,
}: {
  level: TimeZoomLevel;
  progress: number;
}) {
  const scale = timeZoomScales[level];

  return (
    <div
      className={`time-zoom-mark time-zoom-level-${level}`}
      aria-label={`Zeit-Zoom, Stufe ${level} von 3: ${scale.short}`}
      title={`${scale.title}: ${scale.range}`}
    >
      <span className="time-zoom-mini-clock" style={zoomStyle(progress)} aria-hidden="true">
        <i className="time-zoom-mini-hand" />
        <i className="time-zoom-mini-focus" />
      </span>
      <span className="time-zoom-mark-copy">
        <small>Zeit-Zoom {level}/3</small>
        <strong>{scale.short}</strong>
      </span>
    </div>
  );
}

export function TimeZoomTransition({
  level,
  progress = 1,
  caption,
}: {
  level: TimeZoomLevel;
  progress?: number;
  caption?: string;
}) {
  const scale = timeZoomScales[level];

  return (
    <section
      className={`time-zoom-transition time-zoom-level-${level}`}
      aria-label={`Zeit-Zoom auf Stufe ${level}: ${scale.title}`}
    >
      <div className="time-zoom-large-clock" style={zoomStyle(progress)} aria-hidden="true">
        <span className="time-zoom-clock-face">
          {Array.from({ length: 12 }, (_, index) => (
            <i style={{ "--hour-index": index } as CSSProperties} key={index} />
          ))}
          <b />
          <em />
        </span>
        <span className="time-zoom-focus-ring" />
      </div>

      <div className="time-zoom-transition-copy">
        <p className="eyebrow">Zeit-Zoom · Stufe {level} von 3</p>
        <h3>{scale.title}</h3>
        <strong>{scale.range}</strong>
        {caption ? <p>{caption}</p> : null}

        <ol className="time-zoom-levels">
          {([1, 2, 3] as const).map((item) => (
            <li className={item === level ? "is-current" : item < level ? "is-passed" : ""} key={item}>
              <span>{item}</span>
              <div>
                <small>{timeZoomScales[item].short}</small>
                <b>{timeZoomScales[item].title}</b>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
