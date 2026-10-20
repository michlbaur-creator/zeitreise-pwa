"use client";
import { useEffect, useState } from "react";
export default function QuietEntry() {
  const [quiet, setQuiet] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => { queueMicrotask(() => { try { setQuiet(localStorage.getItem("zeitreise-quiet") === "true"); } catch { setError(true); } }); }, []);
  return <div className="quiet-entry"><button aria-pressed={!quiet} onClick={() => { const next = !quiet; setQuiet(next); try { localStorage.setItem("zeitreise-quiet", String(next)); } catch { setError(true); } }}>{quiet ? "🔇" : "🔊"} Ton: {quiet ? "aus" : "an"}</button><span>{quiet ? "Ohne Ton starten und mitlesen." : "Ohne Kopfhörer? Schalte hier auf leise."}</span>{error && <p role="status">Die Einstellung kann nicht gespeichert werden. Bitte schalte im Player erneut auf „Leise“.</p>}</div>;
}
