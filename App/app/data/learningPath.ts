import { scenes as episodeOneScenes, followUpQuizzes, type Scene } from "./scenes";
import { episodeTwoScenes, type EpisodeTwoScene } from "./episode2";
import type { EpisodeThreeScene } from "./episode3";
export type LearningScene = Pick<EpisodeThreeScene, "id" | "title" | "timeLabel" | "speakerText" | "discoveries"> & { original?: Scene | EpisodeTwoScene };
export type LearningStation = { id: number; title: string; sceneIds: number[]; task: string; scenes: LearningScene[]; quizzes: { question: string; answers: readonly string[]; correctAnswer: number; explanation: string }[] };
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
function episodeStations(episode: 1 | 2, groups: { title: string; ids: number[]; task: string }[]): LearningStation[] {
  return groups.map((group, id) => {
    const originals = group.ids.map(n => episode === 1 ? episodeOneScenes.find(s => s.id === n)! : episodeTwoScenes.find(s => s.id === n)!);
    const last = originals[originals.length - 1];
    const quizzes = [last.quiz!, episode === 1 ? followUpQuizzes[last.id] : (last as EpisodeTwoScene).followUpQuiz];
    return { id, title: group.title, sceneIds: group.ids, task: group.task,
      scenes: originals.map(s => ({ id: s.id, title: s.title, timeLabel: s.timeLabel ?? "", speakerText: [s.speaker], discoveries: s.hotspots.map(h => ({ title: h.title ?? h.label, text: h.text })), original: s })),
      quizzes: quizzes.map(q => ({ question: q.question, answers: q.options, correctAnswer: q.correctIndex, explanation: `Merke: ${q.options[q.correctIndex]}` })) };
  });
}
export const lifeStations = episodeStations(1, [
  { title: "Leben in einer Zelle", ids: [5, 6], task: "Welche Aufgaben erfüllt eine Zelle? Achte auf ihre Hülle und ihre Vermehrung." },
  { title: "Leben verändert die Umwelt", ids: [7, 8], task: "Warum war Sauerstoff für manche Lebewesen eine Gefahr und für andere eine Chance?" },
  { title: "Zusammenarbeit im Kleinen", ids: [9, 10], task: "Erkläre, wie Zusammenarbeit in Zellen neue Möglichkeiten eröffnet." },
  { title: "Aus Zellen wird ein Team", ids: [11, 12], task: "Was verändert sich, wenn Zellen unterschiedliche Aufgaben übernehmen?" },
  { title: "Vielfalt im Meer", ids: [13], task: "Achte auf neue Körperformen und die Beziehungen zwischen Räubern und Beute." },
]);
export const humanStations = episodeStations(2, [
  { title: "Verwandt und verzweigt", ids: [1, 3], task: "Achte auf den gemeinsamen Ursprung: Warum stammen Menschen nicht von heutigen Schimpansen ab?" },
  { title: "Auf zwei Beinen", ids: [4, 5], task: "Welche Hinweise geben Ardi, Lucy und Fußspuren auf das Gehen und Klettern?" },
  { title: "Werkzeuge und Veränderungen", ids: [6, 7], task: "Vergleiche Veränderungen von Körper, Gehirn und Verhalten. Geschah alles gleichzeitig?" },
  { title: "Menschen unterwegs", ids: [8, 10], task: "Achte auf Wanderungen und verschiedene Menschenformen. Warum passt das Bild einer geraden Leiter nicht?" },
  { title: "Eine Menschheit", ids: [13, 14], task: "Was verbindet heutige Menschen trotz ihrer Unterschiede?" },
]);
export const learningPaths: { id: string; href: string; key: string; title: string; subtitle: string; intro: string; duration: string; recordingMinutes: string; conclusion: string; discussion: string; stations: LearningStation[]; episode: 1 | 2 | 3; opening: string; assignment: string; extension: string }[] = [
  { id: "leben", href: "/lernpfad-leben/", key: "zeitreise-lernpfad-leben-v1", title: "Vom Einzeller zur Vielfalt", subtitle: "Zellen, Zusammenarbeit und neue Lebensformen", intro: "Wie verändert das Leben seine Umwelt – und wie entstehen neue Möglichkeiten durch Zusammenarbeit?", duration: "40", recordingMinutes: "acht", conclusion: "Du hast wichtige Veränderungen vom einzelligen Leben zur Vielfalt früher Tiere untersucht.", discussion: "Wie hängen Veränderungen der Umwelt und Veränderungen des Lebens zusammen?", stations: lifeStations, episode: 1, opening: "Eine einzelne Zelle lebt. Ein Tier besteht aus vielen Zellen. Welche Vorteile könnte Zusammenarbeit haben? Notiere eine Vermutung.", assignment: "Erkläre zwei Veränderungen: die Anreicherung von Sauerstoff und die Zusammenarbeit von Zellen. Schreibe zu jeder Veränderung: Was geschieht? Welche neue Möglichkeit entsteht? Nutze je ein Beispiel aus den Szenen. Vergleiche deine Erklärung mit deiner Vermutung vom Einstieg.", extension: "Untersuche Räuber und Beute im Kambrium: Wie können Veränderungen der einen Gruppe die andere beeinflussen? Belege deine Erklärung mit der Szene." },
  { id: "mensch", href: "/lernpfad-mensch/", key: "zeitreise-lernpfad-mensch-v1", title: "Mensch werden: ein verzweigter Weg", subtitle: "Spuren, Werkzeuge und gemeinsame Herkunft", intro: "Warum ist die Entwicklung des Menschen ein verzweigter Weg mit vielen gleichzeitig lebenden Linien?", duration: "40", recordingMinutes: "acht", conclusion: "Du hast Spuren der Menschheitsentwicklung und unsere gemeinsame Herkunft untersucht.", discussion: "Warum beschreibt ein verzweigter Baum unsere Entwicklung besser als eine Leiter?", stations: humanStations, episode: 2, opening: "Was stellst du dir unter der Entwicklung des Menschen vor? Halte deine Vorstellung als kleine Skizze fest.", assignment: "Zeichne eine neue Skizze der verzweigten Entwicklung. Erkläre in vier bis fünf Sätzen, warum aufrechter Gang, Werkzeuge und großes Gehirn keine gleichzeitig entstandene Stufe bilden. Verwende zwei Belege aus den Szenen und vergleiche mit deiner ersten Skizze.", extension: "Was lässt sich aus Fußspuren sicher schließen, was nicht? Vergleiche diese Frage mit der Frage nach den Herstellern der Lomekwi-Werkzeuge." },
  { id: "bleiben", href: "/lernpfad/", key: learningPathKey, title: "Vom Wandern zum Bleiben", subtitle: "Dörfer, Felder und Herden", intro: "Wie wurden aus wandernden Gruppen Menschen, die Dörfer bauten, Felder bestellten und Tiere hielten?", duration: "40", recordingMinutes: "sieben", conclusion: "Du hast die Chancen und Herausforderungen des sesshaften Lebens kennengelernt.", discussion: "War das Bleiben für alle ein Vorteil? Begründe mit einem Beispiel.", stations: learningStations, episode: 3, opening: "Wandern oder bleiben: Was könnte dafür sprechen, an einem Ort zu leben? Notiere eine Vermutung.", assignment: "Vergleiche das Leben ohne Acker mit dem Leben im Dorf. Notiere je zwei Merkmale zu Nahrung, Wohnen und Zusammenleben. Erkläre anschließend in drei bis vier Sätzen einen Vorteil und eine Belastung des Bleibens. Belege beides mit einer Szene.", extension: "Schau bei Jericho und Göbekli Tepe genauer hin: Was zeigen die Bauwerke sicher, und welche Frage bleibt offen? Trenne Beobachtung und Vermutung." },
  { id: "stadt", href: "/lernpfad-2/", key: "zeitreise-lernpfad-stadt-v1", title: "Vom Dorf zur Stadt", subtitle: "Vorräte, Schrift und Macht", intro: "Wie verändern Vorräte, neue Berufe und die Schrift das Zusammenleben – und wer entscheidet in einer wachsenden Stadt?", duration: "40", recordingMinutes: "sechs", conclusion: "Du hast entdeckt, wie Vorräte, Arbeitsteilung und Schrift das Leben in frühen Städten veränderten.", discussion: "Wer profitiert davon, dass Vorräte aufgeschrieben werden? Wer bekommt dadurch Einfluss?", stations: cityStations, episode: 3, opening: "Ein ganzer Ort teilt einen Getreidespeicher. Was muss geregelt werden? Sammle zwei Ideen.", assignment: "Zeichne eine Erklärungskette: Vorräte → Arbeitsteilung → Aufzeichnungen → Macht. Beschrifte jeden Pfeil mit einem erklärenden Satz. Nutze mindestens zwei Beispiele aus den Szenen und erläutere, warum Listen zugleich helfen und Einfluss verleihen.", extension: "Ein großer Speicher oder Tempel wird ausgegraben. Welche Aussage über Organisation ist möglich? Was lässt sich daraus allein nicht über Besitz oder Herrschaft ableiten?" },
];
export type LearningPathDefinition = typeof learningPaths[number];
export type LearningProgress = { scores: (number | null)[]; completedAt: string | null };
export function emptyProgress(stations: LearningStation[] = learningStations): LearningProgress { return { scores: stations.map(() => null), completedAt: null }; }
export function readProgress(raw: string | null, stations: LearningStation[] = learningStations): LearningProgress {
  try {
    const value = JSON.parse(raw ?? "null");
    if (!value || !Array.isArray(value.scores)) return emptyProgress(stations);
    const scores = stations.map((s, i) => Number.isInteger(value.scores[i]) && value.scores[i] >= 0 && value.scores[i] <= s.quizzes.length ? value.scores[i] : null);
    return { scores, completedAt: scores.every(s => s !== null) && typeof value.completedAt === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value.completedAt) && Number.isFinite(Date.parse(value.completedAt)) ? value.completedAt : null };
  } catch { return emptyProgress(stations); }
}
export function recordResult(progress: LearningProgress, station: number, score: number, date: string, stations: LearningStation[] = learningStations): LearningProgress {
  if (!stations[station] || !Number.isInteger(score) || score < 0 || score > stations[station].quizzes.length) return progress;
  const scores = progress.scores.map((old, i) => i === station ? Math.max(old ?? 0, score) : old);
  return { scores, completedAt: scores.every(s => s !== null) ? progress.completedAt ?? date : null };
}
