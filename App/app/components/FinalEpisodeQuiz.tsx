"use client";

import { useMemo, useState } from "react";
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

export function FinalEpisodeQuiz({
  scenes,
  episode = 1,
  episodePart = 1,
  questionCount,
  randomize = false,
  celebratePerfect = false,
}: {
  scenes: QuizScene[];
  episode?: 1 | 2 | 3;
  episodePart?: 1 | 2 | 3 | 4;
  questionCount?: number;
  randomize?: boolean;
  celebratePerfect?: boolean;
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
    questionCount ?? questionPool.length,
    questionPool.length,
  );
  const [questions, setQuestions] = useState<FinalQuestion[]>(() =>
    questionPool.slice(0, visibleQuestionCount),
  );
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!questionPool.length || !questions.length) return null;

  const question = questions[questionIndex];
  const isCorrect = selected === question.correctIndex;
  const isEpisodeTwo = episode === 2;
  const isEpisodeThree = episode === 3;
  const isEpisodeThreePartTwo = isEpisodeThree && episodePart === 2;
  const isEpisodeThreePartThree = isEpisodeThree && episodePart === 3;
  const isEpisodeThreePartFour = isEpisodeThree && episodePart === 4;
  const perfectResult = score === questions.length;
  const strongResult = Math.ceil(questions.length * 0.78);
  const solidResult = Math.ceil(questions.length * 0.56);

  const reset = () => {
    const nextQuestions = randomize
      ? [...questionPool]
          .sort(() => Math.random() - 0.5)
          .slice(0, visibleQuestionCount)
      : questionPool.slice(0, visibleQuestionCount);
    setQuestions(nextQuestions);
    setStarted(true);
    setQuestionIndex(0);
    setSelected(null);
    setChecked(false);
    setScore(0);
    setFinished(false);
  };

  const answer = (optionIndex: number) => {
    if (checked) return;
    setSelected(optionIndex);
    if (optionIndex === question.correctIndex) {
      setScore((value) => value + 1);
    }
    setChecked(true);
  };

  const next = () => {
    if (questionIndex === questions.length - 1) {
      setFinished(true);
      if (celebratePerfect && perfectResult) playPerfectFanfare();
      return;
    }
    setQuestionIndex((value) => value + 1);
    setSelected(null);
    setChecked(false);
  };

  return (
    <section className="final-quiz" aria-labelledby="final-quiz-title">
      {!started ? (
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
      ) : finished ? (
        <div className={`final-quiz-result ${celebratePerfect && perfectResult ? "is-perfect" : ""}`} aria-live="polite">
          {celebratePerfect && perfectResult ? (
            <div className="final-quiz-fireworks" aria-hidden="true">
              {Array.from({ length: 18 }, (_, index) => <i key={index} />)}
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
      ) : (
        <>
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

          <h2 id="final-quiz-title">{question.question}</h2>
          <div className="final-quiz-options">
            {question.options.map((option, index) => {
              const optionIsCorrect =
                checked && selected === index && index === question.correctIndex;
              const optionIsWrong =
                checked && selected === index && !optionIsCorrect;
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
              <>
                <p
                  className={isCorrect ? "is-correct" : "is-wrong"}
                  role="status"
                >
                  {isCorrect
                    ? isEpisodeThreePartTwo
                      ? "Richtig – die Verwaltung behält den Überblick."
                      : isEpisodeThree
                      ? "Richtig – das Dorf wächst weiter."
                      : isEpisodeTwo
                      ? "Richtig – weiter auf der menschlichen Spur."
                      : "Richtig – weiter durch die Erdgeschichte."
                    : "Nicht ganz – die Lösung bleibt noch verborgen."}
                </p>
                <button type="button" onClick={next}>
                  {questionIndex === questions.length - 1
                    ? "Ergebnis ansehen"
                    : "Nächste Frage"}
                  <span aria-hidden="true">→</span>
                </button>
              </>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}

function playPerfectFanfare() {
  if (typeof window === "undefined") return;
  const AudioContextClass = window.AudioContext;
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
