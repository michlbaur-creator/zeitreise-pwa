"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { emptyProgress, learningPaths, readProgress, recordResult, type LearningProgress } from "../data/learningPath";
import QuietEntry from "../components/QuietEntry";
import LearningPlayer from "./LearningPlayer";
import "./learning-path.css";

function localDate() { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }
export default function LearningPath({ pathId = "bleiben" }: { pathId?: string }) {
  const path = learningPaths.find(p => p.id === pathId) ?? learningPaths[0];
  const learningStations = path.stations;
  const learningPathKey = path.key;
  const totalPoints = learningStations.reduce((sum, s) => sum + s.quizzes.length, 0);
  const [saved, setSaved] = useState<LearningProgress>(() => emptyProgress(learningStations));
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [stationIndex, setStationIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<"learn" | "quiz" | "result">("learn");
  const [answers, setAnswers] = useState<number[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [allOpen, setAllOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [certificate, setCertificate] = useState(false);
  const [name, setName] = useState("");
  const [celebrate, setCelebrate] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { queueMicrotask(() => {
    try { setSaved(readProgress(localStorage.getItem(learningPathKey), learningStations)); } catch { setStorageError(true); }
    setReady(true);
  }); }, [learningPathKey, learningStations]);
  useEffect(() => { if (!celebrate) return; const timer=setTimeout(() => setCelebrate(false),3500); return () => clearTimeout(timer); },[celebrate]);
  useEffect(() => { if (stationIndex !== null || certificate) heading.current?.focus(); }, [stationIndex, phase, questionIndex, certificate]);
  function persist(next: LearningProgress) {
    setSaved(next);
    try { localStorage.setItem(learningPathKey, JSON.stringify(next)); } catch { setStorageError(true); }
  }
  function openStation(index: number) { setStationIndex(index); setPhase("learn"); setAnswers([]); setQuestionIndex(0); setCertificate(false); }
  function overview() { setStationIndex(null); setCertificate(false); setCelebrate(false); }
  const station=stationIndex === null ? null : learningStations[stationIndex];
  const completed=saved.scores.filter(s => s !== null).length;
  const points=saved.scores.reduce<number>((sum,s) => sum+(s ?? 0),0);
  const nextIndex=saved.scores.findIndex(s => s === null);
  const question=station?.quizzes[questionIndex];
  const answered=answers[questionIndex] !== undefined;
  const score=station ? answers.reduce((sum,a,i) => sum+Number(a===station.quizzes[i].correctAnswer),0) : 0;
  function finish() {
    if (stationIndex === null) return;
    const next=recordResult(saved,stationIndex,score,localDate(),learningStations); persist(next);
    setPhase("result");
    if (next.scores.every(s => s !== null) && completed < 5) setCelebrate(true);
  }
  return <main className="lp-shell">
    <div className="lp-screen">
      <header className="lp-header"><Link href="/">◷ Zeitreise</Link><nav><Link href="/lernpfade/">Alle Lernpfade</Link><Link href={path.episode === 1 ? "/entdecken/" : `/episode-${path.episode}/`}>Frei entdecken →</Link></nav></header>
      <div className="lp-topline"><span className="lp-path-label">Lernpfad {learningPaths.indexOf(path) + 1} · {path.subtitle}</span><div className="lp-score" aria-live="polite"><div><strong>{points}<small> / {totalPoints}</small></strong><span>Wissenspunkte</span></div><progress aria-label="Gesammelte Wissenspunkte" max={totalPoints} value={points} /><small>{completed} von {learningStations.length} Stationen bearbeitet</small></div></div>
      {storageError && <p className="lp-notice" role="status">Dein Browser erlaubt gerade kein Speichern. Du kannst weiterlernen; nach dem Schließen geht dieser Fortschritt verloren.</p>}
      {!ready ? <p>Lernpass wird geladen …</p> : certificate ? <section className="lp-card">
        <h1 ref={heading} tabIndex={-1}>Deine Urkunde</h1><p>Trage deinen Namen ein oder ergänze ihn später von Hand. Er wird nicht gespeichert oder übertragen.</p>
        <label className="lp-name">Dein Name (freiwillig)<input maxLength={70} value={name} onChange={e => setName(e.target.value)} autoComplete="off" /></label>
        <div className="lp-actions"><button className="lp-primary" onClick={() => window.print()}>Urkunde drucken / als PDF sichern</button><button onClick={overview}>Zum Lernpass</button></div>
      </section> : !station ? <>
        <section className="lp-hero"><div><p className="lp-kicker">Dein Lernpass · Episode {path.episode}</p><h1>{path.title}</h1><p>{path.intro}</p><p>Fünf Stationen · zehn Fragen · etwa {path.duration} Minuten</p><button className="lp-primary" onClick={() => completed > 0 ? openStation(nextIndex < 0 ? 0 : nextIndex) : document.getElementById("einstieg")?.scrollIntoView()}>{completed === 5 ? "Noch einmal entdecken" : completed ? "Lernpfad fortsetzen →" : "Mit dem Einstieg beginnen ↓"}</button></div><div className="lp-pass-mark" aria-hidden="true"><span>◷</span><strong>{completed} / 5</strong><small>Stationen entdeckt</small></div></section>
        <QuietEntry />
        <section className="lp-card unit-plan" id="einstieg"><p className="lp-kicker">So läuft deine Unterrichtseinheit</p><h2>In vier Schritten zur eigenen Erklärung</h2><ol className="unit-timeline"><li><strong>1 · Einstieg</strong><span>4 Minuten · Vermutung sammeln</span></li><li><strong>2 · Entdecken</strong><span>22 Minuten · Stationen & Quiz</span></li><li><strong>3 · Selbst erklären</strong><span>9 Minuten · Deine Denkaufgabe</span></li><li><strong>4 · Austauschen</strong><span>5 Minuten · Gemeinsam besprechen</span></li></ol><p className="unit-note">Etwa 40 Minuten insgesamt. Die Dauer ist bis zur Unterrichtserprobung ein Richtwert, kein Zeitlimit.</p><h3>1 · Bevor du loslegst</h3><p>{path.opening}</p><p>Notiere deine Idee im Heft oder auf Papier. Du kommst am Ende darauf zurück.</p></section>
        <section className="lp-card"><p className="lp-kicker">2 · Entdecken · etwa 22 Minuten</p><h2>Dein Weg durch fünf Stationen</h2><p>Schau oder lies die Szenen, entdecke die Hintergründe und beantworte je zwei Fragen. Fehler gehören dazu: Du darfst jede Station wiederholen. Dein bester Punktestand bleibt erhalten.</p><button className="lp-primary" onClick={() => openStation(nextIndex < 0 ? 0 : nextIndex)}>Zu den Stationen →</button><progress aria-label="Abgeschlossene Stationen" max={5} value={completed} /><label className="lp-open"><input type="checkbox" checked={allOpen} onChange={e => setAllOpen(e.target.checked)} /> Alle Stationen frei wählen</label>
          <ol className="lp-stations">{learningStations.map((s,i) => { const locked=!allOpen && i>nextIndex && nextIndex >= 0 && saved.scores[i] === null; return <li key={s.id}><button disabled={locked} onClick={() => openStation(i)}><span className="lp-number">{saved.scores[i] !== null ? "✓" : i+1}</span><span><strong>{s.title}</strong><small>{s.scenes.length} {s.scenes.length === 1 ? "Szene" : "Szenen"} · 2 Fragen</small></span><span>{locked ? "Gesperrt" : saved.scores[i] !== null ? `${saved.scores[i]}/2` : "→"}</span></button></li>; })}</ol>
        </section>
        <section className="lp-card unit-assignment" id="denkaufgabe"><p className="lp-kicker">3 · Selbst erklären · etwa 9 Minuten</p><h2>Jetzt bist du dran</h2><p>{path.assignment}</p><p>Arbeite im Heft oder auf Papier. Tauscht euch zu zweit aus: Sind eure Beispiele passend und eure Erklärungen nachvollziehbar?</p><details><summary>Prüfe deine Erklärung</summary><p>Hast du die Frage beantwortet, Beispiele aus den Szenen verwendet und den Zusammenhang in eigenen Worten erklärt? Ergänze, was noch fehlt. Diese offene Aufgabe wird gemeinsam besprochen und erhält keine automatischen Quizpunkte.</p></details></section>
        <section className="lp-card unit-discussion"><p className="lp-kicker">4 · Austauschen · etwa 5 Minuten</p><h2>Das nehmen wir mit</h2><p>{path.discussion}</p><p>Stellt euch eure Ergebnisse vor. Vergleiche mit deiner Vermutung vom Einstieg: Was würdest du jetzt ergänzen oder ändern?</p></section>
        <details className="lp-card unit-extension"><summary>Noch Zeit? Freiwillig weiterdenken ↗</summary><p>{path.extension}</p><p>Nutze dafür „Genauer hinsehen“ in den passenden Stationen. Die Vertiefung liegt außerhalb der geplanten 40 Minuten.</p></details>
        {completed > 0 && <section className="lp-card"><h2>{completed === 5 ? "Dein Lernpfad ist geschafft!" : "Dein Zwischenstand zählt"}</h2><p>{completed} von 5 Stationen bearbeitet · {points} von 10 Wissenspunkten. {completed === 5 ? path.conclusion : "Deine Urkunde zeigt genau, welche Stationen du schon bearbeitet hast."}</p><button onClick={() => setCertificate(true)}>Urkunde ansehen</button></section>}
        <details className="lp-card"><summary>Für die Lehrkraft: Vorbereitung & Abschluss</summary><p>Heft oder Papier bereitlegen. Einzel- und Partnerarbeit sind möglich. Leise-Modus bereits vor dem Start wählen, sonst Kopfhörer verwenden. Die vier Phasen ergeben ungefähr 40 Minuten; die Unterrichtserprobung steht noch aus.</p><p>Die offene Aufgabe und die Abschlussfrage stehen auch ohne vollständigen Quizabschluss bereit. Zum Schluss zwei unterschiedliche Erklärungen vergleichen und gemeinsam anhand der Szenen begründen. Die Urkunde dokumentiert ausschließlich die Stationen und Quizpunkte.</p><p>Der Lernpass bleibt nur in diesem Browser auf diesem Gerät gespeichert. Auf gemeinsam genutzten Geräten vor dem nächsten Schüler zurücksetzen. Die bisherigen Lernpässe bleiben gültig.</p></details>
        <div className="lp-reset">{resetOpen ? <><p>Nur diesen Lernpass und seine Wissenspunkte zurücksetzen?</p><button onClick={() => { persist(emptyProgress(learningStations)); setResetOpen(false); setName(""); setAllOpen(false); }}>Ja, Lernpass zurücksetzen</button><button onClick={() => setResetOpen(false)}>Abbrechen</button></> : <button onClick={() => setResetOpen(true)}>Lernpass zurücksetzen</button>}</div>
      </> : <>
        <button className="lp-back" onClick={overview}>← Zum Lernpass</button>
        <section className="lp-card"><p className="lp-kicker">Station {stationIndex!+1} von 5</p><h1 ref={phase === "learn" ? heading : undefined} tabIndex={-1}>{station.title}</h1><p><strong>Dein Auftrag:</strong> {station.task}</p></section>
        {phase === "learn" && <LearningPlayer key={station.id} scenes={station.scenes} episode={path.episode} onQuiz={() => setPhase("quiz")} />}
        {phase === "quiz" && question && <section className="lp-card lp-quiz" aria-label="Stations-Check"><p className="lp-kicker">Stations-Check · Frage {questionIndex+1} von 2</p><h2 ref={heading} tabIndex={-1}>{question.question}</h2><div className="lp-answers">{question.answers.map((a,i) => <button key={a} disabled={answered} className={answered ? i===question.correctAnswer ? "lp-correct" : answers[questionIndex]===i ? "lp-wrong" : "" : ""} onClick={() => setAnswers([...answers,i])}><span>{String.fromCharCode(65+i)}</span>{a}</button>)}</div>
          {answered && <div className="lp-feedback" role="status"><strong>{answers[questionIndex]===question.correctAnswer ? "Richtig!" : "Noch nicht richtig."}</strong><p>Richtig ist: {question.answers[question.correctAnswer]}</p><p>{question.explanation}</p><button className="lp-primary" onClick={() => questionIndex < station.quizzes.length-1 ? setQuestionIndex(questionIndex+1) : finish()}>{questionIndex < station.quizzes.length-1 ? "Nächste Frage →" : "Station abschließen"}</button></div>}
        </section>}
        {phase === "result" && <section className="lp-card lp-result"><p className="lp-kicker">Station bearbeitet ✓</p><h2 ref={heading} tabIndex={-1}>{score} von 2 Fragen richtig</h2><p>Dein Bestwert für diese Station: {saved.scores[stationIndex!]}/2. Auch nach Fehlern kannst du weiterlernen und später wiederholen.</p>{completed === 5 && <p><strong>Alle fünf Stationen geschafft – dein Lernpass ist vollständig!</strong></p>}<div className="lp-actions"><button onClick={() => { setAnswers([]); setQuestionIndex(0); setPhase("quiz"); }}>Quiz wiederholen</button><button onClick={() => openStation(stationIndex!)}>Szenen noch einmal ansehen</button>{nextIndex >= 0 ? <button className="lp-primary" onClick={() => openStation(nextIndex)}>Zur nächsten offenen Station →</button> : <button className="lp-primary" onClick={() => { overview(); setTimeout(() => document.getElementById("denkaufgabe")?.scrollIntoView(), 0); }}>Weiter zur Denkaufgabe →</button>}</div></section>}
      </>}
      {celebrate && <div className="lp-celebration" aria-hidden="true">{Array.from({length:18},(_,i) => <i key={i} style={{left:`${5+i*5}%`,animationDelay:`${i%4*.12}s`}} />)}</div>}
    </div>
    {certificate && <section className="lp-certificate" aria-label="Druckbare Urkunde"><p>ZEITREISE · LERNPASS</p><span className="lp-seal" aria-hidden="true">◷</span><h2>Urkunde</h2><p>für</p><h3>{name.trim() || "________________________________"}</h3><p>Du hast im Lernpfad</p><h3>{path.title}</h3><p>{completed} von 5 Stationen bearbeitet und <strong>{points} von 10 Wissenspunkten</strong> gesammelt.</p><ul>{learningStations.map((s,i) => <li key={s.id}><span>{s.title}</span><strong>{saved.scores[i] === null ? "noch offen" : `${saved.scores[i]} / 2`}</strong></li>)}</ul><p>{completed === 5 ? "Lernpfad abgeschlossen" : "Persönlicher Zwischenstand"} · {new Date(`${saved.completedAt ?? localDate()}T12:00:00`).toLocaleDateString("de-DE")}</p><small>Zeitreise · evo.mibaso.de · Persönlicher Lernnachweis</small></section>}
    <div className="lp-screen"><SiteFooter /></div>
  </main>;
}
