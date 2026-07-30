"use client";

import { useMemo, useState } from "react";
import type { Scene } from "../data/scenes";

type FinalQuestion = {
  sceneId: number;
  sceneTitle: string;
  question: string;
  options: string[];
  correctIndex: number;
};

export function FinalEpisodeQuiz({ scenes }: { scenes: Scene[] }) {
  const questions = useMemo<FinalQuestion[]>(
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
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!questions.length) return null;

  const question = questions[questionIndex];
  const isCorrect = selected === question.correctIndex;

  const reset = () => {
    setStarted(true);
    setQuestionIndex(0);
    setSelected(null);
    setChecked(false);
    setScore(0);
    setFinished(false);
  };

  const check = () => {
    if (selected === null) return;
    if (selected === question.correctIndex) setScore((value) => value + 1);
    setChecked(true);
  };

  const next = () => {
    if (questionIndex === questions.length - 1) {
      setFinished(true);
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
            <p className="eyebrow">Am Ende der Reise</p>
            <h2 id="final-quiz-title">Das große Episode-1-Quiz</h2>
            <p>
              Neun Fragen aus neun Etappen deiner Zeitreise – von der jungen
              Erde bis zum Asteroideneinschlag.
            </p>
          </div>
          <button type="button" onClick={reset}>
            Quiz starten <span aria-hidden="true">→</span>
          </button>
        </div>
      ) : finished ? (
        <div className="final-quiz-result" aria-live="polite">
          <span className="final-score">
            {score}
            <small>von {questions.length}</small>
          </span>
          <div>
            <p className="eyebrow">Dein Ergebnis</p>
            <h2 id="final-quiz-title">
              {score >= 7
                ? "Zeitreise bestanden!"
                : score >= 5
                  ? "Schon ziemlich erdgeschichtsfest."
                  : "Die Erde gibt dir eine zweite Runde."}
            </h2>
            <p>
              {score >= 7
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
                checked && index === question.correctIndex;
              const optionIsWrong =
                checked && selected === index && !optionIsCorrect;
              return (
                <button
                  type="button"
                  className={`${selected === index ? "is-selected" : ""} ${optionIsCorrect ? "is-correct" : ""} ${optionIsWrong ? "is-wrong" : ""}`}
                  onClick={() => {
                    if (!checked) setSelected(index);
                  }}
                  aria-pressed={selected === index}
                  key={option}
                >
                  <span>{String.fromCharCode(65 + index)}</span>
                  {option}
                </button>
              );
            })}
          </div>

          <div className="final-quiz-actions">
            {checked ? (
              <>
                <p
                  className={isCorrect ? "is-correct" : "is-wrong"}
                  role="status"
                >
                  {isCorrect
                    ? "Richtig – weiter durch die Erdgeschichte."
                    : `Nicht ganz. Richtig ist: ${question.options[question.correctIndex]}`}
                </p>
                <button type="button" onClick={next}>
                  {questionIndex === questions.length - 1
                    ? "Ergebnis ansehen"
                    : "Nächste Frage"}
                  <span aria-hidden="true">→</span>
                </button>
              </>
            ) : (
              <button type="button" disabled={selected === null} onClick={check}>
                Antwort prüfen
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
