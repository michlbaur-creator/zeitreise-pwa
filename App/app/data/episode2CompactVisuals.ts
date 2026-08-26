export type EpisodeTwoCompactVisual = {
  id: number;
  title: string;
  timeLabel: string;
  sourceScenes: number[];
  overlaySceneId: number;
  images: Array<{
    src: string;
    role: "Beginn" | "Übergang" | "Hauptbild";
    description: string;
  }>;
  movement: string;
  treeStage?: "split" | "branches" | "network";
  video?: {
    src: string;
    poster: string;
    playback: "loop" | "hold";
    soundtrack: string;
  };
};

export const episodeTwoCompactVisuals: EpisodeTwoCompactVisual[] = [
  {
    id: 1,
    title: "Der nächste Zeitsprung",
    timeLabel: "Vor etwa 60 bis 55 Millionen Jahren",
    sourceScenes: [1, 2],
    overlaySceneId: 2,
    images: [
      { src: "/assets/episode2/scene01/hintergrund-naechster-zeitsprung-v1.png", role: "Beginn", description: "Anschluss an das kleine Säugetier und den Zeitfelsen" },
      { src: "/assets/episode2/scene02/hintergrund-leben-in-den-baeumen-v1.png", role: "Übergang", description: "Langsames Eintauchen in die Baumkronen" },
    ],
    video: {
      src: "/assets/episode2/scene01/bewegung-frueher-primat-veo-v1.mp4",
      poster: "/assets/episode2/scene01/hintergrund-naechster-zeitsprung-v1.png",
      playback: "hold",
      soundtrack: "/assets/episode2/audio/sprecher-und-veo-szene-01-v1.m4a",
    },
    movement: "Ruhiger Zeitsprung mit weicher Überblendung und anschließendem Vorwärtsflug in den Wald.",
  },
  {
    id: 2,
    title: "Die Welt der Primaten",
    timeLabel: "Vor etwa 55 bis 10 Millionen Jahren",
    sourceScenes: [2, 3],
    overlaySceneId: 3,
    images: [
      { src: "/assets/episode2/scene02/hintergrund-leben-in-den-baeumen-v1.png", role: "Beginn", description: "Greifen, Klettern und räumliches Sehen" },
      { src: "/assets/episode2/scene03/hintergrund-welt-der-menschenaffen-v1.png", role: "Übergang", description: "Die spätere Vielfalt der Menschenaffen" },
    ],
    video: {
      src: "/assets/episode2/scene02/bewegung-primaten-veo-v1.mp4",
      poster: "/assets/episode2/scene02/hintergrund-leben-in-den-baeumen-v1.png",
      playback: "loop",
      soundtrack: "/assets/episode2/audio/sprecher-und-veo-szene-02-v1.m4a",
    },
    movement: "Die Kamera folgt zunächst einem Ast und öffnet sich dann zu einer weiteren Landschaft mit mehreren Formen.",
  },
  {
    id: 3,
    title: "Getrennte Wege",
    timeLabel: "Vor ungefähr 10 bis 6 Millionen Jahren",
    sourceScenes: [4, 5],
    overlaySceneId: 5,
    images: [
      { src: "/assets/episode2/scene04/hintergrund-afrika-im-wandel-v1.png", role: "Beginn", description: "Afrikanisches Landschaftsmosaik im Wandel" },
      { src: "/assets/episode2/scene05/hintergrund-getrennte-wege-v1.png", role: "Übergang", description: "Verzweigung der verwandten Linien" },
    ],
    video: {
      src: "/assets/episode2/scene04/bewegung-getrennte-wege-veo-v1.mov",
      poster: "/assets/episode2/scene04/hintergrund-afrika-im-wandel-v1.png",
      playback: "hold",
      soundtrack: "/assets/episode2/audio/sprecher-und-veo-szene-03-v1.m4a",
    },
    movement: "Landschaftsteile verändern sich langsam; daraus entwickeln sich dezente verzweigte Linien.",
    treeStage: "split",
  },
  {
    id: 4,
    title: "Der rätselhafte Gang auf zwei Beinen",
    timeLabel: "Vor etwa 7 bis 4,4 Millionen Jahren",
    sourceScenes: [6, 7],
    overlaySceneId: 7,
    images: [
      { src: "/assets/episode2/scene06/hintergrund-auf-zwei-beinen-v2.png", role: "Beginn", description: "Frühe Hinweise auf zeitweise Zweibeinigkeit" },
      { src: "/assets/episode2/scene07/hintergrund-ardi-v1.png", role: "Übergang", description: "Ardi zwischen Baum und Boden" },
    ],
    movement: "Zunächst vorsichtiger Gang am Boden, danach Übergang zu Ardis Verbindung aus Gehen und Klettern.",
  },
  {
    id: 5,
    title: "Lucy und die Spuren in der Asche",
    timeLabel: "Vor etwa 3,6 bis 3,2 Millionen Jahren",
    sourceScenes: [8, 9],
    overlaySceneId: 8,
    images: [
      { src: "/assets/episode2/scene08/hintergrund-spuren-in-der-asche-v1.png", role: "Beginn", description: "Die Laetoli-Fußspuren als erster Zeuge" },
      { src: "/assets/episode2/scene09/hintergrund-lucy-v2.png", role: "Übergang", description: "Lucys Skelett und Körperbau als zweiter Zeuge" },
    ],
    movement: "Die Kamera folgt den Fußspuren; ein Abdruck wird zur ruhigen Überblendung auf Lucy.",
  },
  {
    id: 6,
    title: "Der Stein, der alles durcheinanderbringt",
    timeLabel: "Vor etwa 3,3 Millionen Jahren",
    sourceScenes: [10],
    overlaySceneId: 10,
    images: [
      { src: "/assets/episode2/scene10/hintergrund-stein-wird-werkzeug-v1.png", role: "Hauptbild", description: "Lomekwi-Werkzeug und unbekannte Hersteller" },
    ],
    movement: "Das Bild bleibt nah am Stein; Schlag, Splitter und Quizmoment bilden die Bewegung.",
  },
  {
    id: 7,
    title: "Homo kommt in Bewegung",
    timeLabel: "Seit etwa 2,8 Millionen Jahren",
    sourceScenes: [11, 12],
    overlaySceneId: 12,
    images: [
      { src: "/assets/episode2/scene11/hintergrund-gattung-homo-v1.png", role: "Beginn", description: "Unscharfer Beginn der Gattung Homo" },
      { src: "/assets/episode2/scene12/hintergrund-homo-erectus-v1.png", role: "Übergang", description: "Homo erectus mit einem Körper für lange Wege" },
    ],
    movement: "Fossile Details verbinden sich mit einem langsamen Aufbruch in die offene Landschaft.",
  },
  {
    id: 8,
    title: "Die erste große Reise",
    timeLabel: "Vor etwa 1,85 bis 1,7 Millionen Jahren",
    sourceScenes: [13],
    overlaySceneId: 13,
    images: [
      { src: "/assets/episode2/scene13/hintergrund-erste-grosse-reise-v1.png", role: "Hauptbild", description: "Generation für Generation in neue Lebensräume" },
    ],
    video: {
      src: "/assets/episode2/scene13/bewegung-erste-reise-veo-v1.mov",
      poster: "/assets/episode2/scene13/hintergrund-erste-grosse-reise-v1.png",
      playback: "loop",
      soundtrack: "/assets/episode2/audio/sprecher-und-veo-szene-08-v1.m4a",
    },
    movement: "Langsame Wanderung und Kartenrückzug; hier liegt der große musikalische Mittelübergang.",
  },
  {
    id: 9,
    title: "Feuer verändert den Alltag",
    timeLabel: "Spätestens vor etwa 790.000 Jahren",
    sourceScenes: [14],
    overlaySceneId: 14,
    images: [
      { src: "/assets/episode2/scene14/hintergrund-feuer-veraendert-alltag-v1.png", role: "Hauptbild", description: "Feuer als Wärme, Werkzeug und Treffpunkt" },
    ],
    video: {
      src: "/assets/episode2/scene14/bewegung-feuer-veo-v1.mp4",
      poster: "/assets/episode2/scene14/hintergrund-feuer-veraendert-alltag-v1.png",
      playback: "loop",
      soundtrack: "/assets/episode2/audio/sprecher-und-veo-szene-09-v1.m4a",
    },
    movement: "Flammen, Rauch und wechselndes Feuerlicht bewegen sich zurückhaltend innerhalb des Bildes.",
  },
  {
    id: 10,
    title: "Eine Welt voller Menschenformen",
    timeLabel: "Vor etwa 700.000 bis 300.000 Jahren",
    sourceScenes: [15],
    overlaySceneId: 15,
    images: [
      { src: "/assets/episode2/scene15/hintergrund-viele-arten-von-menschen-v1.png", role: "Hauptbild", description: "Gleichzeitige Menschenformen statt einer geraden Reihe" },
    ],
    movement: "Mehrere Linien erscheinen nacheinander und bleiben gleichzeitig sichtbar, ohne Rangordnung.",
    treeStage: "branches",
  },
  {
    id: 11,
    title: "Die Neandertaler",
    timeLabel: "Vor etwa 400.000 bis 40.000 Jahren",
    sourceScenes: [16],
    overlaySceneId: 16,
    images: [
      { src: "/assets/episode2/scene16/hintergrund-neandertaler-v1.png", role: "Hauptbild", description: "Werkzeug, Feuer, Anpassung und Fürsorge" },
    ],
    video: {
      src: "/assets/episode2/scene16/bewegung-neandertaler-veo-v1.mp4",
      poster: "/assets/episode2/scene16/hintergrund-neandertaler-v1.png",
      playback: "hold",
      soundtrack: "/assets/episode2/audio/sprecher-und-veo-szene-11-v1.m4a",
    },
    movement: "Ruhige Tätigkeiten im Lager; Hände, Feuer und fürsorgliche Geste stehen im Mittelpunkt.",
  },
  {
    id: 12,
    title: "Denisova – eine Menschenlinie aus einer Schachtel",
    timeLabel: "Bis vor mindestens etwa 50.000 Jahren",
    sourceScenes: [17],
    overlaySceneId: 17,
    images: [
      { src: "/assets/episode2/scene17/hintergrund-denisova-v1.png", role: "Hauptbild", description: "Fingerknochen, Zahn und Harbin-Schädel" },
    ],
    movement: "Makrofahrt über die wenigen Funde; DNA- und Proteinlinien ergänzen die sichtbaren Lücken.",
  },
  {
    id: 13,
    title: "Homo sapiens trifft Verwandte",
    timeLabel: "Seit mindestens etwa 300.000 Jahren",
    sourceScenes: [18, 19],
    overlaySceneId: 19,
    images: [
      { src: "/assets/episode2/scene18/hintergrund-homo-sapiens-entsteht-v2.png", role: "Beginn", description: "Frühe Homo-sapiens-Gruppe in einer afrikanischen Landschaft" },
      { src: "/assets/episode2/scene19/hintergrund-begegnungen-v1.png", role: "Übergang", description: "Begegnungen verschiedener Menschenlinien" },
    ],
    movement: "Mehrere afrikanische Fundpunkte führen zu parallelen Wegen und schließlich zur gemeinsamen Wasserstelle.",
    treeStage: "network",
  },
  {
    id: 14,
    title: "Eine Menschheit",
    timeLabel: "Heute",
    sourceScenes: [20],
    overlaySceneId: 20,
    images: [
      { src: "/assets/episode2/scene20/hintergrund-eine-menschheit-v1.png", role: "Hauptbild", description: "Kinderhand am Zeitfelsen und ruhige Küstenlandschaft" },
    ],
    movement: "Goldenes Glimmen, wenige Blätter und Vögel sowie eine langsame Rückfahrt der Kamera.",
  },
];

export function episodeTwoSceneHasVideo(sceneId: number) {
  return episodeTwoCompactVisuals.some(
    (scene) => scene.id === sceneId && Boolean(scene.video),
  );
}

export function episodeTwoSceneSoundtrack(sceneId: number) {
  return episodeTwoCompactVisuals.find((scene) => scene.id === sceneId)?.video
    ?.soundtrack;
}
