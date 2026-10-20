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
export const cityStations = [
  { title: "Vorräte brauchen Überblick", sceneIds: [10], task: "Achte darauf, warum ein großer Speicher mehr braucht als volle Körbe. Was lässt sich aus seinem Fund sicher schließen?", questions: [[10, 0], [10, 1]], explanations: ["Maße und Aufzeichnungen machen Lieferungen und Ausgaben auch später nachvollziehbar.", "Ein Speicher zeigt organisierte Vorratshaltung. Er beweist allein noch nicht, wem das Getreide gehörte."] },
  { title: "Neue Aufgaben entstehen", sceneIds: [11], task: "Welche Berufe entdeckst du? Überlege, warum Fachleute andere Menschen für ihre Versorgung brauchen.", questions: [[11, 0], [11, 1]], explanations: ["Spezialisierung fördert Können und Erfahrung. Zugleich müssen Nahrung und Waren zuverlässig zwischen den Menschen verteilt werden.", "Wolle wurde in großer Menge zu Textilien verarbeitet. Dafür brauchte es viele spezialisierte Arbeitskräfte."] },
  { title: "Zeichen, Listen und Macht", sceneIds: [12, 13], task: "Verfolge den Weg von gezählten Vorräten zur Tontafel. Warum bekommt Einfluss, wer die Listen kontrolliert?", questions: [[12, 0], [13, 1]], explanations: ["Viele frühe Tafeln erfassten Mengen, Güter und Rationen. Die Verwaltung bekam damit ein dauerhaftes Gedächtnis.", "Listen dokumentierten Lieferungen und Ansprüche auf Rationen. Wer diese Aufzeichnungen kontrollierte, konnte Einfluss auf die Verteilung nehmen."] },
  { title: "Uruk: eine Stadt als Netzwerk", sceneIds: [14], task: "Suche die Verbindungen zwischen Stadt, Feldern und Wasserwegen. Welche Aufgaben können einzelne Familien kaum allein lösen?", questions: [[14, 0], [14, 1]], explanations: ["Uruk lag im Süden Mesopotamiens, im Gebiet von Euphrat und Tigris im heutigen Irak.", "Kanäle müssen gebaut, gereinigt und gemeinsam genutzt werden. Dafür sind Absprachen über einzelne Haushalte hinaus nötig."] },
  { title: "Wer entscheidet für die Stadt?", sceneIds: [15], task: "Achte darauf, wer gemeinsame Arbeit organisiert. Belegt ein großes Bauwerk schon einen allmächtigen König?", questions: [[15, 0], [15, 1]], explanations: ["Ein großer Bau belegt organisierte Arbeit und Materialversorgung. Wie die Entscheidungen zustande kamen, zeigt er allein nicht.", "Mehrere eigenständige Stadtstaaten prägten die Region. Städtische Macht entwickelte sich schrittweise und nicht überall gleich."] },
].map((station, index) => ({
  ...station, id: index,
  scenes: station.sceneIds.map(id => episodeThreeScenes.find(scene => scene.id === id)!),
  quizzes: station.questions.map(([id, question], i) => ({ ...episodeThreeScenes.find(scene => scene.id === id)!.quiz[question], explanation: station.explanations[i] })),
}));
export const learningPaths = [
  { id: "bleiben", href: "/lernpfad/", key: learningPathKey, title: "Vom Wandern zum Bleiben", subtitle: "Dörfer, Felder und Herden", intro: "Wie wurden aus wandernden Gruppen Menschen, die Dörfer bauten, Felder bestellten und Tiere hielten?", duration: "25–35", recordingMinutes: "sieben", conclusion: "Du hast die Chancen und Herausforderungen des sesshaften Lebens kennengelernt.", discussion: "Nenne einen Vorteil und eine Belastung des sesshaften Lebens.", stations: learningStations },
  { id: "stadt", href: "/lernpfad-2/", key: "zeitreise-lernpfad-stadt-v1", title: "Vom Dorf zur Stadt", subtitle: "Vorräte, Schrift und Macht", intro: "Wie verändern Vorräte, neue Berufe und die Schrift das Zusammenleben – und wer entscheidet in einer wachsenden Stadt?", duration: "25–35", recordingMinutes: "sechs", conclusion: "Du hast entdeckt, wie Vorräte, Arbeitsteilung und Schrift das Leben in frühen Städten veränderten.", discussion: "Erkläre an einem Beispiel, wie Organisation das Zusammenleben erleichtert und zugleich Macht verleiht.", stations: cityStations },
];
export type LearningPathDefinition = typeof learningPaths[number];
export type LearningProgress = { scores: (number | null)[]; completedAt: string | null };
export function emptyProgress(stations = learningStations): LearningProgress { return { scores: stations.map(() => null), completedAt: null }; }
export function readProgress(raw: string | null, stations = learningStations): LearningProgress {
  try {
    const value = JSON.parse(raw ?? "null");
    if (!value || !Array.isArray(value.scores)) return emptyProgress(stations);
    const scores = stations.map((s, i) => Number.isInteger(value.scores[i]) && value.scores[i] >= 0 && value.scores[i] <= s.quizzes.length ? value.scores[i] : null);
    return { scores, completedAt: scores.every(s => s !== null) && typeof value.completedAt === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value.completedAt) && Number.isFinite(Date.parse(value.completedAt)) ? value.completedAt : null };
  } catch { return emptyProgress(stations); }
}
export function recordResult(progress: LearningProgress, station: number, score: number, date: string, stations = learningStations): LearningProgress {
  if (!stations[station] || !Number.isInteger(score) || score < 0 || score > stations[station].quizzes.length) return progress;
  const scores = progress.scores.map((old, i) => i === station ? Math.max(old ?? 0, score) : old);
  return { scores, completedAt: scores.every(s => s !== null) ? progress.completedAt ?? date : null };
}
