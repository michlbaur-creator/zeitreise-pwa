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
  transition: string;
  science: string;
};

export const episodeTwoScenes = rawScenes as EpisodeTwoScene[];

export const episodeTwoMilestones = [
  { sceneId: 1, label: "Primaten", age: "60 Mio.", symbol: "⌁" },
  { sceneId: 3, label: "Verzweigung", age: "10–6 Mio.", symbol: "⑂" },
  { sceneId: 5, label: "Aufrechter Gang", age: "3,6 Mio.", symbol: "∴" },
  { sceneId: 6, label: "Werkzeuge", age: "3,3 Mio.", symbol: "◆" },
  { sceneId: 8, label: "Weite Wege", age: "1,8 Mio.", symbol: "↗" },
  { sceneId: 10, label: "Menschenformen", age: "700.000", symbol: "⋔" },
  { sceneId: 14, label: "Eine Menschheit", age: "Heute", symbol: "✦" },
] as const;
