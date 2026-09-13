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
    question: "Wie entwickelten sich heutige Primaten seit ihren gemeinsamen Vorfahren?",
    options: [
      "Ihre verschiedenen Linien entwickelten sich jeweils weiter.",
      "Nur die menschliche Linie veränderte sich weiter.",
      "Heutige Primaten blieben seitdem vollkommen unverändert.",
    ],
    correctIndex: 0,
  },
  2: {
    kind: "optional",
    question: "Was zeigt der Fossilbericht über frühere Menschenaffen?",
    options: [
      "Viele Linien lebten nebeneinander; zahlreiche starben wieder aus.",
      "Es gab immer nur eine einzige Menschenaffenart.",
      "Alle früheren Menschenaffen entwickelten sich zu Menschen.",
    ],
    correctIndex: 0,
  },
  3: {
    kind: "optional",
    question: "Was geschah nach der Trennung der Menschen- und Schimpansenlinie?",
    options: [
      "Beide Linien blieben nahezu unverändert.",
      "Beide Linien entwickelten sich eigenständig weiter.",
      "Heutige Schimpansen verwandelten sich direkt in Menschen.",
    ],
    correctIndex: 1,
  },
  4: {
    kind: "optional",
    question: "Was verrät Ardis Mischung aus Kletter- und Gehmerkmalen?",
    options: [
      "Klettern und Zweibeinigkeit bestanden längere Zeit nebeneinander.",
      "Zweibeinigkeit entstand erst in völlig baumlosen Landschaften.",
      "Ardi besaß bereits den Körperbau heutiger Menschen.",
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
    question: "Was wissen Forschende über die Hersteller der Lomekwi-Werkzeuge?",
    options: [
      "Die genaue Menschenart ist bislang unbekannt.",
      "Australopithecus afarensis war zweifelsfrei der Hersteller.",
      "Homo sapiens fertigte sie in Europa.",
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
    question: "Wie verlief die frühe Ausbreitung außerhalb Afrikas?",
    options: [
      "In vielen Bewegungen, über Generationen und teils mit Rückwegen.",
      "Als eine einzige geplante Expedition auf fester Route.",
      "Erst nach der Erfindung von Hochseeschiffen.",
    ],
    correctIndex: 0,
  },
  9: {
    kind: "optional",
    question: "Welchen Vorteil kann das Erhitzen von Nahrung haben?",
    options: [
      "Nahrung enthält danach grundsätzlich keine Keime mehr.",
      "Sie kann leichter zu kauen und zu verdauen sein.",
      "Sie liefert danach keine Energie mehr.",
    ],
    correctIndex: 1,
  },
  10: {
    kind: "optional",
    question: "Warum sind Artgrenzen bei menschlichen Fossilien oft umstritten?",
    options: [
      "Lückenhafte Funde und fließende Unterschiede erlauben verschiedene Abgrenzungen.",
      "Fossilien bewahren grundsätzlich keine körperlichen Merkmale.",
      "Artnamen werden nach jedem Fund neu ausgelost.",
    ],
    correctIndex: 0,
  },
  11: {
    kind: "optional",
    question: "Wobei half Neandertalern ihr gedrungener, kräftiger Körper?",
    options: [
      "Er verringerte den Wärmeverlust in kalten Gebieten.",
      "Er ersetzte Werkzeuge und kontrolliertes Feuer.",
      "Er machte Nahrung und Kleidung überflüssig.",
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
    question: "Warum ist die Geschichte verschiedener Menschenlinien auch ein Netz?",
    options: [
      "Getrennte Linien trafen sich später wieder und tauschten Gene aus.",
      "Alle Linien entstanden unabhängig voneinander ohne gemeinsame Vorfahren.",
      "Jede Begegnung führte sofort zum Verschwinden einer der beteiligten Linien.",
    ],
    correctIndex: 0,
  },
  14: {
    kind: "optional",
    question: "Wie verteilt sich die biologische Vielfalt heutiger Menschen?",
    options: [
      "Sie überlappt stark und besitzt keine scharfen natürlichen Grenzen.",
      "Sie bildet wenige klar getrennte biologische Rassen.",
      "Sie kommt nur innerhalb Europas vor.",
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
