import { episodeThreeScenes } from "./episode3";

export const learningPathKey = "zeitreise-lernpfad-bleiben-v1";
export const learningStations = [
  { title: "Leben ohne Acker", sceneIds: [1, 2], task: "Achte darauf, wie Menschen ohne Felder und Viehherden Nahrung fanden. Was wussten sie über ihre Umgebung?", questions: [[1, 1], [2, 0]], explanations: ["Unsere heutige Warmzeit heißt Holozän. Sie begann vor rund 11.700 Jahren.", "Die Lagerplätze richteten sich nach Jahreszeit und Nahrungsangebot. Die Gruppen kannten ihre Landschaft genau."] },
  { title: "Gemeinsam bauen und bleiben", sceneIds: [3, 4], task: "Vergleiche Göbekli Tepe und Jericho: Was machte gemeinsames Bauen und dauerhaftes Bleiben möglich? Achte auch darauf, was wir nicht sicher wissen.", questions: [[3, 1], [4, 0]], explanations: ["Die schweren Pfeiler zeigen, dass viele Menschen schon vor großen Städten gemeinsam planen und bauen konnten.", "Ob die Mauer vor Menschen, Hochwasser oder mehreren Gefahren schützen sollte, ist nicht sicher."] },
  { title: "Pflanzen und Tiere verändern sich", sceneIds: [5, 6], task: "Verfolge, wie wiederholtes Auswählen über viele Generationen Pflanzen und Tiere verändert.", questions: [[5, 0], [6, 0]], explanations: ["Ähren mit festeren Körnern waren leichter zu ernten. Ihre Samen wurden dadurch häufiger weitervermehrt.", "Menschen beeinflussten die Fortpflanzung. Über Generationen veränderten sich so Körperbau und Verhalten der Tiere."] },
  { title: "Viele Wege zur Landwirtschaft", sceneIds: [7], task: "Ordne beim Zuhören oder Lesen die Pflanzen den Regionen zu. Entstand Landwirtschaft überall zur gleichen Zeit?", questions: [[7, 0], [7, 1]], explanations: ["Menschen entwickelten Landwirtschaft unabhängig voneinander, zu unterschiedlichen Zeiten und mit Pflanzen ihrer jeweiligen Umwelt.", "In Vorderasien wurden Weizen und Gerste angebaut, in Ostasien unter anderem Reis und Hirse und im Andenraum Kartoffeln und Quinoa."] },
  { title: "Das neue Zusammenleben", sceneIds: [8, 9], task: "Sammle einen Vorteil und eine Belastung des sesshaften Lebens. Schau dir an, wie das Zusammenleben in Çatalhöyük organisiert war.", questions: [[8, 1], [9, 0]], explanations: ["Die Häuser standen dicht nebeneinander. Viele Zugänge lagen im Dach, deshalb verliefen auch Wege dort entlang.", "Landwirtschaft ernährte mehr Menschen. Zugleich konnten schwere Arbeit, Krankheiten und soziale Unterschiede zunehmen."] },
].map((station, index) => ({
  ...station, id: index,
  scenes: station.sceneIds.map(id => episodeThreeScenes.find(scene => scene.id === id)!),
  quizzes: station.questions.map(([id, question], i) => ({ ...episodeThreeScenes.find(scene => scene.id === id)!.quiz[question], explanation: station.explanations[i] })),
}));
export type LearningProgress = { scores: (number | null)[]; completedAt: string | null };
export function emptyProgress(): LearningProgress { return { scores: learningStations.map(() => null), completedAt: null }; }
export function readProgress(raw: string | null): LearningProgress {
  try {
    const value = JSON.parse(raw ?? "null");
    if (!value || !Array.isArray(value.scores)) return emptyProgress();
    const scores = learningStations.map((s, i) => Number.isInteger(value.scores[i]) && value.scores[i] >= 0 && value.scores[i] <= s.quizzes.length ? value.scores[i] : null);
    return { scores, completedAt: scores.every(s => s !== null) && typeof value.completedAt === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value.completedAt) && Number.isFinite(Date.parse(value.completedAt)) ? value.completedAt : null };
  } catch { return emptyProgress(); }
}
export function recordResult(progress: LearningProgress, station: number, score: number, date: string): LearningProgress {
  if (!learningStations[station] || !Number.isInteger(score) || score < 0 || score > learningStations[station].quizzes.length) return progress;
  const scores = progress.scores.map((old, i) => i === station ? Math.max(old ?? 0, score) : old);
  return { scores, completedAt: scores.every(s => s !== null) ? progress.completedAt ?? date : null };
}
