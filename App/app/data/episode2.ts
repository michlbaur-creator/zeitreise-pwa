import rawScenes from "./episode2.compact.generated.json";

export type EpisodeTwoQuiz = {
  kind: "optional" | "stop";
  question: string;
  options: string[];
  correctIndex: number;
};

export type EpisodeTwoScene = {
  id: number;
  title: string;
  timeLabel: string;
  duration: number;
  durationLabel: string;
  function: string;
  background: string;
  camera: string[];
  animation: string[];
  sounds: string[];
  speaker: string;
  audioPath: string;
  hotspots: { label: string; title: string; text: string }[];
  quiz: EpisodeTwoQuiz;
  followUpQuiz: EpisodeTwoQuiz;
  transition: string;
  science: string;
};

const episodeTwoFollowUpQuizzes: Record<number, EpisodeTwoQuiz> = {
  1: {
    kind: "optional",
    question: "Warum wäre es falsch, heutige Lemuren oder Affen als unveränderte Vorstufen des Menschen zu bezeichnen?",
    options: [
      "Weil auch ihre Entwicklungslinien seit gemeinsamen Vorfahren weiterliefen.",
      "Weil nur Fossilien zur Gruppe der Primaten gehören.",
      "Weil Menschen mit heutigen Primaten nicht verwandt sind.",
    ],
    correctIndex: 0,
  },
  2: {
    kind: "optional",
    question: "Welche Beobachtung widerspricht am stärksten einer geraden Entwicklungsleiter zum Menschen?",
    options: [
      "Viele Menschenaffenlinien lebten nebeneinander und zahlreiche davon starben aus.",
      "Viele Primaten besitzen empfindliche Fingerkuppen.",
      "Manche Primaten bewegen sich häufiger am Boden als andere.",
    ],
    correctIndex: 0,
  },
  3: {
    kind: "optional",
    question: "Welche Folgerung ergibt sich aus einem gemeinsamen Vorfahren von Menschen und Schimpansen?",
    options: [
      "Beide heutigen Arten blieben seit der Trennung nahezu unverändert.",
      "Beide Linien entwickelten sich nach ihrer Trennung eigenständig weiter.",
      "Eine heutige Schimpansenpopulation verwandelte sich direkt in Menschen.",
    ],
    correctIndex: 1,
  },
  4: {
    kind: "optional",
    question: "Warum passt Ardis Merkmalsmischung schlecht zu einer einfachen Geschichte vom Wald direkt in die Savanne?",
    options: [
      "Weil Klettermerkmale und Zweibeinigkeit offenbar längere Zeit nebeneinander bestanden.",
      "Weil aufrechter Gang ausschließlich in völlig baumlosen Gebieten möglich ist.",
      "Weil Ardi bereits dieselben Körperproportionen wie heutige Menschen besaß.",
    ],
    correctIndex: 0,
  },
  5: {
    kind: "optional",
    question: "Welche zeitliche Reihenfolge wird durch Lucy und die Laetoli-Spuren gestützt?",
    options: [
      "Zuerst stark vergrößertes Gehirn, danach aufrechter Gang.",
      "Aufrechter Gang und großes Gehirn entstanden gleichzeitig.",
      "Regelmäßige Zweibeinigkeit entstand lange vor dem großen menschlichen Gehirn.",
    ],
    correctIndex: 2,
  },
  6: {
    kind: "optional",
    question: "Welche Schlussfolgerung erlauben die Werkzeuge von Lomekwi am sichersten?",
    options: [
      "Werkzeugherstellung kann nicht ausschließlich der Gattung Homo zugeschrieben werden.",
      "Australopithecus afarensis war zweifelsfrei ihr Hersteller.",
      "Alle frühen Steinwerkzeuge wurden von derselben Art gefertigt.",
    ],
    correctIndex: 0,
  },
  7: {
    kind: "optional",
    question: "Was bedeutet das Mosaik aus Veränderungen bei frühen Homo-Formen?",
    options: [
      "Alle menschlichen Merkmale erschienen gleichzeitig in einer einzigen Population.",
      "Körper, Gehirn und Verhalten veränderten sich in unterschiedlichem Tempo.",
      "Nur die Gehirngröße entschied darüber, welche Fossilien zu Homo gehören.",
    ],
    correctIndex: 1,
  },
  8: {
    kind: "optional",
    question: "Warum kann ein einzelner Pfeil auf einer Karte die frühe Ausbreitung irreführend darstellen?",
    options: [
      "Er lässt viele Bewegungen, Rückwege und Generationen wie eine geplante Reise wirken.",
      "Er beweist, dass alle Gruppen exakt dieselbe Strecke nahmen.",
      "Er zeigt, dass Menschen damals keine natürlichen Hindernisse kannten.",
    ],
    correctIndex: 0,
  },
  9: {
    kind: "optional",
    question: "Welcher Befund unterscheidet eine genutzte Feuerstelle am besten von einem zufälligen Buschbrand?",
    options: [
      "Ein einzelner dunkler Stein ohne Fundzusammenhang.",
      "Wiederholte Brandspuren und verbranntes Material in geordneter räumlicher Lage.",
      "Asche, die ausschließlich durch ihre Farbe datiert wurde.",
    ],
    correctIndex: 1,
  },
  10: {
    kind: "optional",
    question: "Warum können zwei Forschende dasselbe Fossil unterschiedlich benennen, ohne dass einer offensichtlich falsch liegt?",
    options: [
      "Weil lückenhafte Funde und fließende Merkmalsunterschiede verschiedene Abgrenzungen erlauben.",
      "Weil Fossilien grundsätzlich keine biologischen Merkmale bewahren.",
      "Weil Artnamen nach dem Fund zufällig ausgelost werden.",
    ],
    correctIndex: 0,
  },
  11: {
    kind: "optional",
    question: "Warum ist der kräftige Körper der Neandertaler kein Beleg für eine ‚primitive‘ Entwicklungsstufe?",
    options: [
      "Er war eine erfolgreiche Anpassung, die den Wärmeverlust in kalten Gebieten verringerte.",
      "Er entstand erst durch Begegnungen mit Homo sapiens.",
      "Er zeigt, dass Neandertaler weder Werkzeuge noch Feuer nutzten.",
    ],
    correctIndex: 0,
  },
  12: {
    kind: "optional",
    question: "Was macht die Denisova-Forschung methodisch besonders?",
    options: [
      "Eine Menschenlinie wurde zunächst vor allem durch Moleküle statt durch vollständige Skelette erkannt.",
      "Die Linie wurde ausschließlich aus alten Reiseberichten rekonstruiert.",
      "Ihre Fossilien lassen sich ohne Datierung allein am Fundort bestimmen.",
    ],
    correctIndex: 0,
  },
  13: {
    kind: "optional",
    question: "Warum ähnelt die Geschichte verschiedener Menschenlinien eher einem Netz als nur einem Baum?",
    options: [
      "Getrennte Linien trafen sich später wieder und tauschten Gene aus.",
      "Alle Linien entstanden unabhängig voneinander ohne gemeinsame Vorfahren.",
      "Jede Begegnung führte sofort zum Verschwinden einer der beteiligten Linien.",
    ],
    correctIndex: 0,
  },
  14: {
    kind: "optional",
    question: "Welcher Befund spricht gegen klar getrennte biologische Menschenrassen?",
    options: [
      "Menschliche Variation überlappt stark und verteilt sich ohne scharfe natürliche Grenzen.",
      "Alle Menschen besitzen äußerlich genau dieselben Merkmale.",
      "Regionale Anpassungen kommen beim Menschen grundsätzlich nicht vor.",
    ],
    correctIndex: 0,
  },
};

function compactQuizOptions(quiz: EpisodeTwoQuiz): EpisodeTwoQuiz {
  if (quiz.options.length <= 3) return quiz;

  const optionIndexes = quiz.correctIndex === 3 ? [0, 1, 3] : [0, 1, 2];
  return {
    ...quiz,
    options: optionIndexes.map((index) => quiz.options[index]),
    correctIndex: optionIndexes.indexOf(quiz.correctIndex),
  };
}

type RawEpisodeTwoScene = Omit<EpisodeTwoScene, "followUpQuiz">;

export const episodeTwoScenes: EpisodeTwoScene[] = (
  rawScenes as RawEpisodeTwoScene[]
).map((scene) => ({
  ...scene,
  quiz: compactQuizOptions(scene.quiz),
  followUpQuiz: episodeTwoFollowUpQuizzes[scene.id],
}));

export const episodeTwoMilestones = [
  { sceneId: 1, label: "Primaten", age: "60 Mio.", symbol: "⌁" },
  { sceneId: 3, label: "Verzweigung", age: "10–6 Mio.", symbol: "⑂" },
  { sceneId: 5, label: "Aufrechter Gang", age: "3,6 Mio.", symbol: "∴" },
  { sceneId: 6, label: "Werkzeuge", age: "3,3 Mio.", symbol: "◆" },
  { sceneId: 8, label: "Weite Wege", age: "1,8 Mio.", symbol: "↗" },
  { sceneId: 10, label: "Menschenformen", age: "700.000", symbol: "⋔" },
  { sceneId: 14, label: "Eine Menschheit", age: "Heute", symbol: "✦" },
] as const;
