"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

type FinalQuestion = {
  sceneId: number;
  sceneTitle: string;
  question: string;
  options: string[];
  correctIndex: number;
};

type QuizScene = {
  id: number;
  title: string;
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
  } | null;
};

type QuizAchievement = {
  title: "Zeitstarter" | "Spurensucher" | "Zeitkenner" | "Zeitmeister";
  description: string;
  className: string;
};

type CubeTopic = {
  label: "Bleiben" | "Ordnen" | "Vernetzen" | "Beschleunigen";
  symbol: string;
  className: string;
};

const EPISODE_THREE_BEST_SCORE_KEY = "zeitreise-episode3-final-quiz-best-20";

export function FinalEpisodeQuiz({
  scenes,
  episode = 1,
  episodePart = 1,
  questionCount,
  randomize = false,
  celebratePerfect = false,
  timeFelsenChallenge = false,
  soundMuted = false,
}: {
  scenes: QuizScene[];
  episode?: 1 | 2 | 3;
  episodePart?: 1 | 2 | 3 | 4;
  questionCount?: number;
  randomize?: boolean;
  celebratePerfect?: boolean;
  timeFelsenChallenge?: boolean;
  soundMuted?: boolean;
}) {
  const questionPool = useMemo<FinalQuestion[]>(
    () =>
      scenes
        .filter((scene) => scene.quiz)
        .map((scene) => ({
          sceneId: scene.id,
          sceneTitle: scene.title,
          question: scene.quiz!.question,
          options: scene.quiz!.options,
          correctIndex: scene.quiz!.correctIndex,
        })),
    [scenes],
  );
  const visibleQuestionCount = Math.min(
    timeFelsenChallenge ? 20 : questionCount ?? questionPool.length,
    questionPool.length,
  );
  const [questions, setQuestions] = useState<FinalQuestion[]>(() =>
    questionPool.slice(0, visibleQuestionCount),
  );
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    if (!timeFelsenChallenge || typeof window === "undefined") return;
    let cancelled = false;
    window.queueMicrotask(() => {
      if (cancelled) return;
      try {
        const storedValue = window.localStorage.getItem(
          EPISODE_THREE_BEST_SCORE_KEY,
        );
        if (storedValue === null) return;
        const storedScore = Number(storedValue);
        if (
          Number.isInteger(storedScore) &&
          storedScore >= 0 &&
            storedScore <= 20
        ) {
          setBestScore(storedScore);
        }
      } catch {
        // Das Quiz bleibt auch dann vollständig spielbar, wenn lokaler Speicher blockiert ist.
      }
    });
    return () => {
      cancelled = true;
    };
  }, [timeFelsenChallenge]);

  if (!questionPool.length || !questions.length) return null;

  const question = questions[questionIndex];
  const isCorrect = selected === question.correctIndex;
  const isEpisodeTwo = episode === 2;
  const isEpisodeThree = episode === 3;
  const isEpisodeThreePartTwo = isEpisodeThree && episodePart === 2;
  const isEpisodeThreePartThree = isEpisodeThree && episodePart === 3;
  const isEpisodeThreePartFour = isEpisodeThree && episodePart === 4;
  const score = answers.filter(Boolean).length;
  const perfectResult = score === questions.length;
  const strongResult = Math.ceil(questions.length * 0.78);
  const solidResult = Math.ceil(questions.length * 0.56);
  const achievement = achievementForScore(score, questions.length);
  const cubeTopic = topicForScene(question.sceneId);

  const reset = () => {
    const nextQuestions = randomize
      ? timeFelsenChallenge
        ? balancedEpisodeThreeQuestions(questionPool, visibleQuestionCount)
        : shuffled(questionPool).slice(0, visibleQuestionCount)
      : questionPool.slice(0, visibleQuestionCount);
    setQuestions(nextQuestions);
    setStarted(true);
    setQuestionIndex(0);
    setSelected(null);
    setChecked(false);
    setAnswers([]);
    setFinished(false);
  };

  const answer = (optionIndex: number) => {
    if (checked) return;
    const correct = optionIndex === question.correctIndex;
    setSelected(optionIndex);
    setAnswers((values) => [...values, correct]);
    setChecked(true);
  };

  const next = () => {
    if (questionIndex === questions.length - 1) {
      setFinished(true);
      if (timeFelsenChallenge) {
        const nextBestScore = Math.max(bestScore ?? 0, score);
        setBestScore(nextBestScore);
        try {
          window.localStorage.setItem(
            EPISODE_THREE_BEST_SCORE_KEY,
            String(nextBestScore),
          );
        } catch {
          // Keine Fehlermeldung nötig: Die aktuelle Belohnung bleibt sichtbar.
        }
      }
      if (celebratePerfect && perfectResult && !soundMuted) {
        playPerfectFanfare();
      }
      return;
    }
    setQuestionIndex((value) => value + 1);
    setSelected(null);
    setChecked(false);
  };

  return (
    <section
      className={`final-quiz ${isEpisodeThree ? "quiz-learning-light" : ""} ${timeFelsenChallenge ? "final-quiz-timefelsen" : ""}`}
      data-part={timeFelsenChallenge ? Math.floor(questionIndex / 5) + 1 : episodePart}
      aria-labelledby="final-quiz-title"
    >
      {!started ? (
        timeFelsenChallenge ? (
          <div className="timefelsen-intro">
            <div className="timefelsen-intro-visual" aria-hidden="true">
              <TimeCube topic={{ label: "Vernetzen", symbol: "⌁", className: "all" }} />
              <span className="timefelsen-intro-orbit" />
            </div>
            <div className="timefelsen-intro-copy">
              <p className="eyebrow">Episode 3 abgeschlossen</p>
              <h2 id="final-quiz-title">Die Zeitfelsen-Challenge</h2>
              <p>
                Vier Teile, vier Farben, jeweils fünf Fragen. Nach jedem Teil
                dreht sich dein Zeitwürfel weiter. Schaffst du alle 20?
              </p>
              <AchievementScale />
              {bestScore !== null ? (
                <p className="timefelsen-best">
                  Deine bisher beste Runde: <strong>{bestScore} von 20</strong>
                </p>
              ) : null}
              <button type="button" onClick={reset}>
                Zeitwürfel starten <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="final-quiz-intro">
            <div>
              <p className="eyebrow">
                {isEpisodeThreePartFour
                  ? "Teil 4 abgeschlossen"
                  : isEpisodeThreePartThree
                    ? "Teil 3 abgeschlossen"
                    : isEpisodeThreePartTwo
                      ? "Teil 2 abgeschlossen"
                      : isEpisodeThree
                        ? "Teil 1 abgeschlossen"
                        : "Am Ende der Reise"}
              </p>
              <h2 id="final-quiz-title">
                {isEpisodeThreePartFour
                  ? "Das Abschlussquiz zu „Der Planet auf Schnellvorlauf“"
                  : isEpisodeThreePartThree
                    ? "Das Abschlussquiz zu „Die Welt rückt zusammen“"
                    : isEpisodeThreePartTwo
                      ? "Das Abschlussquiz zu Städte, Schrift und Macht"
                      : isEpisodeThree
                        ? "Das Abschlussquiz zu Teil 1"
                        : isEpisodeTwo
                          ? "Das große Episode-2-Quiz"
                          : "Das große Episode-1-Quiz"}
              </h2>
              <p>
                {isEpisodeThreePartFour
                  ? "Fünf zufällig ausgewählte Fragen zu Energie, Dünger, Mobilität, Computern und planetarer Wirkung."
                  : isEpisodeThreePartThree
                    ? "Fünf zufällig ausgewählte Fragen aus den zwölf Fragen zu Handel, Wissen, Krankheiten, Kolonisierung und Versklavung."
                    : isEpisodeThreePartTwo
                      ? "Fünf zufällig ausgewählte Fragen aus den zwölf Fragen zu Uruk, Arbeitsteilung, Schrift, Verwaltung und Macht."
                      : isEpisodeThree
                        ? "Fünf zufällig ausgewählte Fragen zu Sesshaftigkeit, Landwirtschaft und den ersten großen Siedlungen."
                        : isEpisodeTwo
                          ? "Neun Fragen zu Primaten, Zweibeinigkeit, Werkzeugen, Wanderungen und unseren menschlichen Verwandten."
                          : "Neun Fragen aus neun Etappen deiner Zeitreise – von der jungen Erde bis zum Asteroideneinschlag."}
              </p>
            </div>
            <button type="button" onClick={reset}>
              Quiz starten <span aria-hidden="true">→</span>
            </button>
          </div>
        )
      ) : finished ? (
        timeFelsenChallenge ? (
          <div
            className={`timefelsen-result ${perfectResult ? "is-perfect" : ""} ${achievement.className}`}
            aria-live="polite"
          >
            {perfectResult ? (
              <div className="final-quiz-fireworks timefelsen-fireworks" aria-hidden="true">
                {Array.from({ length: 36 }, (_, index) => (
                  <i key={index} />
                ))}
              </div>
            ) : null}
            <div className="timefelsen-reward" aria-hidden="true">
              <span className="timefelsen-tablet-mark">▤</span>
              <small>Tontafel der Zeit</small>
              <strong>
                {score}<span>/20</span>
              </strong>
            </div>
            <div className="timefelsen-result-copy">
              <p className="eyebrow">Dein Rang</p>
              <h2 id="final-quiz-title">{achievement.title}</h2>
              <p>{achievement.description}</p>
              <QuizStaircase
                answers={answers.slice(-5)}
                currentIndex={5}
                total={5}
                finished
              />
              <div className="timefelsen-result-meta">
                <span>{score} richtige Antworten</span>
                <span>{questions.length - score} offene Spuren</span>
                <span>Bestwert {Math.max(bestScore ?? 0, score)}/20</span>
              </div>
              <button type="button" onClick={reset}>
                Neue Zeitreise-Runde <span aria-hidden="true">↻</span>
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`final-quiz-result ${celebratePerfect && perfectResult ? "is-perfect" : ""}`}
            aria-live="polite"
          >
            {celebratePerfect && perfectResult ? (
              <div className="final-quiz-fireworks" aria-hidden="true">
                {Array.from({ length: 18 }, (_, index) => (
                  <i key={index} />
                ))}
              </div>
            ) : null}
            <span className="final-score">
              {score}
              <small>von {questions.length}</small>
            </span>
            <div>
              <p className="eyebrow">Dein Ergebnis</p>
              <h2 id="final-quiz-title">
                {isEpisodeThreePartFour
                  ? perfectResult
                    ? "Fünf von fünf – den Schnellvorlauf sicher im Blick."
                    : score >= strongResult
                      ? "Die Beschleunigung ist fast vollständig entschlüsselt."
                      : score >= solidResult
                        ? "Die Energiespuren werden sichtbar."
                        : "Noch eine Runde durch den Schnellvorlauf?"
                  : isEpisodeThreePartThree
                    ? perfectResult
                      ? "Fünf von fünf – Verbindungen und ihre Folgen im Blick."
                      : score >= strongResult
                        ? "Das weltweite Netz ist fast vollständig."
                        : score >= solidResult
                          ? "Die Verbindungen werden sichtbar."
                          : "Noch einmal den Routen folgen?"
                    : isEpisodeThreePartTwo
                      ? perfectResult
                        ? "Fünf von fünf – du hättest den Speicher von Uruk im Griff!"
                        : score >= strongResult
                          ? "Die Listen sind fast vollständig."
                          : score >= solidResult
                            ? "Die Stadtverwaltung nimmt Form an."
                            : "Noch eine Runde durch Uruk?"
                      : isEpisodeThree
                        ? score >= strongResult
                          ? "Bereit für die ersten Städte!"
                          : score >= solidResult
                            ? "Das Dorf wächst schon in deinem Kopf."
                            : "Noch eine Runde durchs Dorf?"
                        : isEpisodeTwo
                          ? score >= strongResult
                            ? "Spurensuche bestanden!"
                            : score >= solidResult
                              ? "Im Stammbaum gut orientiert."
                              : "Ein paar Äste verdienen eine zweite Runde."
                          : score >= strongResult
                            ? "Zeitreise bestanden!"
                            : score >= solidResult
                              ? "Schon ziemlich erdgeschichtsfest."
                              : "Die Erde gibt dir eine zweite Runde."}
              </h2>
              <p>
                {isEpisodeThreePartFour
                  ? perfectResult
                    ? "Du hast alle fünf zufällig ausgewählten Fragen richtig beantwortet."
                    : "Beim zweiten Durchgang erkennst du noch genauer, wie Energie neue Möglichkeiten, Abhängigkeiten und Folgen schuf."
                  : isEpisodeThreePartThree
                    ? perfectResult
                      ? "Du hast alle fünf zufällig ausgewählten Fragen richtig beantwortet."
                      : "Beim zweiten Durchgang erkennst du noch genauer, wie Vernetzung Möglichkeiten und Abhängigkeiten zugleich schuf."
                    : isEpisodeThreePartTwo
                      ? perfectResult
                        ? "Du hast alle fünf zufällig ausgewählten Fragen richtig beantwortet."
                        : "Beim zweiten Durchgang kennst du Speicher, Tafeln und Machtverhältnisse schon genauer."
                      : isEpisodeThree
                        ? score >= strongResult
                          ? "Du erkennst Chancen, Belastungen und offene Fragen des neuen Lebens sehr sicher."
                          : "Beim zweiten Durchgang kennst du die entscheidenden Spuren schon."
                        : isEpisodeTwo
                          ? score >= strongResult
                            ? "Du behältst selbst in einer verzweigten Geschichte den Überblick."
                            : "Beim zweiten Durchgang kennst du die entscheidenden Spuren schon."
                          : score >= strongResult
                            ? "Du hast die großen Wendepunkte der Erdgeschichte sicher im Blick."
                            : "Beim zweiten Durchgang kennst du die entscheidenden Spuren schon."}
              </p>
              <button type="button" onClick={reset}>
                Noch einmal spielen
              </button>
            </div>
          </div>
        )
      ) : (
        <>
          {timeFelsenChallenge ? (
            <ol className="timefelsen-parts" aria-label="Die vier Teile">
              {["Bleiben", "Ordnen", "Vernetzen", "Beschleunigen"].map((label, index) => (
                <li key={label} aria-current={Math.floor(questionIndex / 5) === index ? "step" : undefined}>
                  <span>{index + 1}</span>{label}
                  {answers.length >= (index + 1) * 5 ? <small>{answers.slice(index * 5, index * 5 + 5).filter(Boolean).length}/5</small> : null}
                </li>
              ))}
            </ol>
          ) : null}
          {timeFelsenChallenge ? (
            <div className="timefelsen-dashboard">
              <div className="timefelsen-cube-copy">
                <TimeCube
                  topic={cubeTopic}
                />
                <div>
                  <small>Teil {Math.floor(questionIndex / 5) + 1} von 4</small>
                  <strong>{cubeTopic.label}</strong>
                  <span>
                    Szene {String(question.sceneId).padStart(2, "0")} · {question.sceneTitle}
                  </span>
                </div>
              </div>
              <QuizStaircase
                answers={answers.slice(Math.floor(questionIndex / 5) * 5)}
                currentIndex={questionIndex % 5}
                total={5}
              />
            </div>
          ) : (
            <div className="final-quiz-head">
              <div>
                <p className="eyebrow">
                  Frage {questionIndex + 1} von {questions.length}
                </p>
                <span>
                  Aus Szene {String(question.sceneId).padStart(2, "0")} ·{" "}
                  {question.sceneTitle}
                </span>
              </div>
              <div
                className="final-quiz-progress"
                aria-label={`${questionIndex + 1} von ${questions.length} Fragen`}
              >
                <i
                  style={{
                    width: `${((questionIndex + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {timeFelsenChallenge ? (
            <p className="timefelsen-question-number eyebrow">
              Frage {questionIndex % 5 + 1} von 5 · Insgesamt {questionIndex + 1} von 20
            </p>
          ) : null}
          <h2 id="final-quiz-title">{question.question}</h2>
          <div className="final-quiz-options">
            {question.options.map((option, index) => {
              const optionIsCorrect =
                checked && selected === index && index === question.correctIndex;
              const optionIsWrong =
                checked && selected === index && index !== question.correctIndex;
              return (
                <button
                  type="button"
                  className={`${selected === index ? "is-selected" : ""} ${optionIsCorrect ? "is-correct" : ""} ${optionIsWrong ? "is-wrong" : ""}`}
                  onClick={() => answer(index)}
                  aria-pressed={selected === index}
                  key={option}
                >
                  <span>{String.fromCharCode(65 + index)}</span>
                  {option}
                </button>
              );
            })}
          </div>

          {checked ? (
            <div className="final-quiz-actions">
              {timeFelsenChallenge && (questionIndex + 1) % 5 === 0 ? (
                <p className="timefelsen-block-result" role="status">
                  Teil {Math.floor(questionIndex / 5) + 1} geschafft · {answers.slice(-5).filter(Boolean).length} von 5 richtig!
                </p>
              ) : null}
              <p className={isCorrect ? "is-correct" : "is-wrong"} role="status">
                {isCorrect
                  ? timeFelsenChallenge
                    ? "Richtig – die nächste Stufe leuchtet."
                    : isEpisodeThreePartTwo
                      ? "Richtig – die Verwaltung behält den Überblick."
                      : isEpisodeThree
                        ? "Richtig – das Dorf wächst weiter."
                        : isEpisodeTwo
                          ? "Richtig – weiter auf der menschlichen Spur."
                          : "Richtig – weiter durch die Erdgeschichte."
                  : timeFelsenChallenge
                    ? "Nicht ganz – diese Stufe bleibt noch dunkel."
                    : "Nicht ganz – die Lösung bleibt noch verborgen."}
              </p>
              <button type="button" onClick={next}>
                {questionIndex === questions.length - 1
                  ? "Ergebnis ansehen"
                  : timeFelsenChallenge && (questionIndex + 1) % 5 === 0
                    ? "Nächsten Teil öffnen"
                    : "Nächste Frage"}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}

function AchievementScale() {
  const levels = [
    { score: "0–10", title: "Zeitstarter" },
    { score: "11–15", title: "Spurensucher" },
    { score: "16–19", title: "Zeitkenner" },
    { score: "20", title: "Zeitmeister" },
  ];

  return (
    <div className="timefelsen-levels" aria-label="Vier mögliche Belohnungsstufen">
      {levels.map((level) => (
        <span key={level.title}>
          <small>{level.score} richtig</small>
          <strong>{level.title}</strong>
        </span>
      ))}
    </div>
  );
}

function QuizStaircase({
  answers,
  currentIndex,
  total,
  finished = false,
}: {
  answers: boolean[];
  currentIndex: number;
  total: number;
  finished?: boolean;
}) {
  return (
    <div className="quiz-staircase">
      <div className="quiz-staircase-head">
        <span>Deine Zeitstufen</span>
        <strong>{answers.filter(Boolean).length} richtig</strong>
      </div>
      <ol aria-label={`Quiztreppe mit ${total} Stufen`}>
        {Array.from({ length: total }, (_, index) => {
          const hasAnswer = index < answers.length;
          const correct = hasAnswer && answers[index];
          const wrong = hasAnswer && !answers[index];
          const current = !finished && index === currentIndex && !hasAnswer;
          const status = correct
            ? "richtig beantwortet"
            : wrong
              ? "noch offene Spur"
              : current
                ? "aktuelle Frage"
                : "noch nicht erreicht";
          return (
            <li
              className={`${correct ? "is-correct" : ""} ${wrong ? "is-wrong" : ""} ${current ? "is-current" : ""}`}
              style={{ "--step-height": `${38 + index * 10}px` } as CSSProperties}
              aria-label={`Stufe ${index + 1}: ${status}`}
              aria-current={current ? "step" : undefined}
              key={index}
            >
              <small>{index + 1}</small>
              <span aria-hidden="true">{correct ? "✓" : wrong ? "·" : current ? "◆" : ""}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function TimeCube({ topic }: { topic: CubeTopic }) {
  const faces = ["⌂", "⌁", "▦", "↯", "◎", "◎"];
  const faceNames = ["front", "back", "right", "left", "top", "bottom"];

  return (
    <div
      className={`time-cube-stage topic-${topic.className}`}
      role="img"
      aria-label={`Zeitwürfel: ${topic.label}`}
    >
      <div className="time-cube" aria-hidden="true">
        {faces.map((face, index) => (
          <span className={`time-cube-face is-${faceNames[index]}`} key={faceNames[index]}>
            {face}
          </span>
        ))}
      </div>
    </div>
  );
}

function topicForScene(sceneId: number): CubeTopic {
  if (sceneId <= 9) {
    return { label: "Bleiben", symbol: "⌂", className: "settlement" };
  }
  if (sceneId <= 15) {
    return { label: "Ordnen", symbol: "▦", className: "order" };
  }
  if (sceneId <= 21) {
    return { label: "Vernetzen", symbol: "⌁", className: "network" };
  }
  return { label: "Beschleunigen", symbol: "↯", className: "speed" };
}

function achievementForScore(score: number, total: number): QuizAchievement {
  if (score === total) {
    return {
      title: "Zeitmeister",
      description:
        "20 von 20! Die Tontafel der Zeit gehört dir – und der Zeitfelsen darf ausnahmsweise ein kleines Feuerwerk veranstalten.",
      className: "rank-master",
    };
  }
  if (score >= total * 0.8) {
    return {
      title: "Zeitkenner",
      description:
        "Du erkennst die großen Zusammenhänge von Vorräten bis zur planetaren Wirkung.",
      className: "rank-expert",
    };
  }
  if (score >= total * 0.55) {
    return {
      title: "Spurensucher",
      description:
        "Die wichtigsten Spuren sind gefunden. Eine neue Runde bringt dich noch höher.",
      className: "rank-tracker",
    };
  }
  return {
    title: "Zeitstarter",
    description:
      "Der Anfang ist gemacht. Beim nächsten Würfelwurf kommen andere Fragen – und manches wirkt plötzlich erstaunlich vertraut.",
    className: "rank-starter",
  };
}

function shuffled<T>(items: T[]) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

function balancedEpisodeThreeQuestions(
  questionPool: FinalQuestion[],
  count: number,
) {
  const groups = [
    questionPool.filter((question) => question.sceneId <= 9),
    questionPool.filter(
      (question) => question.sceneId >= 10 && question.sceneId <= 15,
    ),
    questionPool.filter(
      (question) => question.sceneId >= 16 && question.sceneId <= 21,
    ),
    questionPool.filter((question) => question.sceneId >= 22),
  ];
  return groups.flatMap((group) => shuffled(group).slice(0, 5)).slice(0, count);
}

function playPerfectFanfare() {
  if (typeof window === "undefined") return;
  const AudioContextClass =
    window.AudioContext ??
    (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioContextClass) return;

  const context = new AudioContextClass();
  const master = context.createGain();
  master.gain.setValueAtTime(0.0001, context.currentTime);
  master.gain.exponentialRampToValueAtTime(0.16, context.currentTime + 0.03);
  master.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1.9);
  master.connect(context.destination);

  [261.63, 329.63, 392, 523.25].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = context.currentTime + index * 0.16;
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.32, start + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.72);
    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(start);
    oscillator.stop(start + 0.75);
  });

  window.setTimeout(() => void context.close(), 2300);
}
