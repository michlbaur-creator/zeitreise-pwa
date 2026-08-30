export type EpisodeThreeScene = {
  id: number;
  title: string;
  timeLabel: string;
  imageStatus: "ready" | "draft" | "open";
};

export const episodeThreeScenes: EpisodeThreeScene[] = [
  { id: 1, title: "Noch einmal zurück", timeLabel: "Um 12.000 v. Chr.", imageStatus: "ready" },
  { id: 2, title: "Leben ohne Acker", timeLabel: "Am Ende der letzten Eiszeit", imageStatus: "draft" },
  { id: 3, title: "Steine für die Ewigkeit", timeLabel: "Göbekli Tepe", imageStatus: "draft" },
  { id: 4, title: "Ein Ort bleibt", timeLabel: "Jericho", imageStatus: "open" },
  { id: 5, title: "Eine Ähre verändert sich", timeLabel: "Über viele Generationen", imageStatus: "open" },
  { id: 6, title: "Aus Jagd wird Herde", timeLabel: "Über viele Generationen", imageStatus: "open" },
  { id: 7, title: "Eine Idee entsteht immer wieder", timeLabel: "In mehreren Weltregionen", imageStatus: "open" },
  { id: 8, title: "Leben Wand an Wand", timeLabel: "Çatalhöyük", imageStatus: "open" },
  { id: 9, title: "Der Preis des Bleibens", timeLabel: "Mit den ersten dauerhaften Siedlungen", imageStatus: "open" },
];

export const episodeThreeSceneOneImages = {
  present: "/assets/episode3/scene01/hintergrund-zeitfelsen-heute-v1.png",
  past: "/assets/episode3/scene01/hintergrund-zeitfelsen-12000-vchr-v1.png",
} as const;

export const episodeThreeSceneTwoDraft =
  "/assets/episode3/scene02/hintergrund-leben-ohne-acker-entwurf-v1.png";

export const episodeThreeSceneThreeDraft =
  "/assets/episode3/scene03/hintergrund-goebekli-tepe-entwurf-v1.png";
