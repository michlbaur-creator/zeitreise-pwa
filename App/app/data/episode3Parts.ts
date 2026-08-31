export type EpisodeThreePart = {
  id: 1 | 2 | 3 | 4;
  title: string;
  guidingQuestion: string;
  object: string;
  symbol: string;
  threadSteps: number[];
};

export const episodeThreeParts: EpisodeThreePart[] = [
  {
    id: 1,
    title: "Vom Wandern zum Bleiben",
    guidingQuestion: "Was verändert sich, wenn Menschen bleiben?",
    object: "Ähre",
    symbol: "≋",
    threadSteps: [0],
  },
  {
    id: 2,
    title: "Städte, Schrift und Macht",
    guidingQuestion: "Was passiert, wenn Vorräte organisiert werden müssen?",
    object: "Tontafel",
    symbol: "▤",
    threadSteps: [1],
  },
  {
    id: 3,
    title: "Die Welt rückt zusammen",
    guidingQuestion:
      "Was geschieht, wenn Waren, Ideen, Menschen – und Krankheiten – immer weiter reisen?",
    object: "Segel",
    symbol: "◁",
    threadSteps: [2],
  },
  {
    id: 4,
    title: "Der Planet auf Schnellvorlauf",
    guidingQuestion:
      "Was passiert, wenn fossile Energie menschliche Möglichkeiten vervielfacht?",
    object: "Kohle · Glühbirne · Smartphone",
    symbol: "✦",
    threadSteps: [3, 4],
  },
];

export const episodeThreeThread = [
  "Vorräte",
  "Organisation",
  "Vernetzung",
  "Beschleunigung",
  "planetare Wirkung",
];

export function episodeThreePart(partId: EpisodeThreePart["id"]) {
  return episodeThreeParts.find((part) => part.id === partId)!;
}
