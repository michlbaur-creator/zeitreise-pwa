import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("rendert die Zeitreise-Vorschau", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Zeitreise – Die Geschichte des Lebens<\/title>/i,
  );
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
  assert.match(html, /lang="de"/i);
  assert.match(html, /manifest\.webmanifest/i);
});

test("enthält genau 22 geordnete Szenen mit finalen Sprechertexten", async () => {
  const source = await readFile(
    new URL("../app/data/scenes.ts", import.meta.url),
    "utf8",
  );
  const ids = [...source.matchAll(/^\s+id:\s+(\d+),$/gm)].map((match) =>
    Number(match[1]),
  );
  assert.deepEqual(
    ids,
    Array.from({ length: 22 }, (_, index) => index + 1),
  );
  assert.equal((source.match(/^\s+speaker:$/gm) ?? []).length, 22);
  assert.equal((source.match(/^\s+timeLabel:/gm) ?? []).length, 22);
  assert.equal((source.match(/correctIndex:\s+\d+,/g) ?? []).length, 44);
  const answerPositions = [
    ...source.matchAll(/correctIndex:\s+(\d+),/g),
  ].map((match) => Number(match[1]));
  assert.deepEqual(
    [0, 1, 2, 3].map(
      (position) => answerPositions.filter((value) => value === position).length,
    ),
    [11, 11, 11, 11],
  );
  assert.match(source, /weder Bademeister noch Nachschub aus dem Meer/);
  assert.match(source, /Tadaa! Du landest auf der jungen Erde/);
  assert.match(source, /niemand muss dafür einen Bauantrag stellen/);
  assert.match(source, /das erste Sitzungsprotokoll erfand/);
  assert.match(source, /es ging einfach alles verdammt schnell/);
  assert.match(source, /Laufen\? Muss ich das erst üben\?/);
  assert.match(source, /ihr eigenes Kinderzimmer einfach mit/);
  assert.match(source, /aus dem dritten Stock die Dachrinne putzen/);
});

test("synchronisiert die Texteinblendungen mit Michas Aufnahmen", async () => {
  const captions = await readFile(
    new URL("../app/data/captions.ts", import.meta.url),
    "utf8",
  );
  const visual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );

  assert.equal((captions.match(/^\s{2}\d+: \[$/gm) ?? []).length, 22);
  assert.equal((captions.match(/\{ at: 0,/g) ?? []).length, 22);
  assert.match(captions, /Vulkane husten Asche/);
  assert.match(captions, /Kambrische Explosion/);
  assert.match(captions, /Superstars der Urzeit/);
  assert.match(visual, /captionTracks\[scene\.id\]/);
  assert.match(visual, /progress >= cue\.at/);
});

test("kündigt Episode 2 mit ihrem freigegebenen Titel an", async () => {
  const visual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );
  const sceneData = await readFile(
    new URL("../app/data/scenes.ts", import.meta.url),
    "utf8",
  );

  assert.match(visual, /Episode 2 „Die Entwicklung des Menschen“/);
  assert.match(sceneData, /Episode 2 „Die Entwicklung des Menschen“/);
  assert.doesNotMatch(
    visual,
    /Episode 2 „Das Zeitalter der Giganten“/,
  );
});

test("enthält Episode 2 vollständig und getrennt von Episode 1", async () => {
  const episodeTwo = JSON.parse(
    await readFile(
      new URL("../app/data/episode2.compact.generated.json", import.meta.url),
      "utf8",
    ),
  );
  const episodeTwoApp = await readFile(
    new URL("../app/episode-2/EpisodeTwoApp.tsx", import.meta.url),
    "utf8",
  );
  const episodeTwoData = await readFile(
    new URL("../app/data/episode2.ts", import.meta.url),
    "utf8",
  );
  const episodeTwoVisual = await readFile(
    new URL("../app/episode-2/EpisodeTwoVisual.tsx", import.meta.url),
    "utf8",
  );
  const home = await readFile(
    new URL("../app/ZeitreiseApp.tsx", import.meta.url),
    "utf8",
  );

  assert.equal(episodeTwo.length, 14);
  assert.deepEqual(
    episodeTwo.map((scene) => scene.id),
    Array.from({ length: 14 }, (_, index) => index + 1),
  );
  assert.equal(episodeTwo[0].title, "Der nächste Zeitsprung");
  assert.equal(episodeTwo[13].title, "Eine Menschheit");
  assert.deepEqual(
    episodeTwo.filter((scene) => scene.quiz.kind === "stop").map((scene) => scene.id),
    [],
  );
  assert.ok(episodeTwo.every((scene) => scene.hotspots.length === 2));
  assert.ok(episodeTwo.every((scene) => scene.quiz.options.length >= 3));
  assert.ok(episodeTwo.every((scene) => scene.audioPath.endsWith(".m4a")));
  await Promise.all(
    episodeTwo.map((scene) =>
      access(
        new URL(`../public${scene.audioPath}`, import.meta.url),
      ),
    ),
  );
  assert.match(episodeTwoApp, /Sprecher: Micha/);
  assert.doesNotMatch(episodeTwoApp, /Arbeitsfassung|noch nicht vollständig/);
  assert.doesNotMatch(episodeTwoApp, /Was ist sicher\?|So sicher ist die Darstellung/);
  assert.match(home, /href="\/episode-2\/\?start=1"/);
  assert.match(home, /aria-label="Weiter zu Episode 2"/);
  assert.match(episodeTwoApp, /← Episode 1: Geschichte des Lebens/);
  assert.match(episodeTwoApp, /<FinalEpisodeQuiz scenes=\{finalQuizScenes\} episode=\{2\} \/>/);
  assert.match(episodeTwoApp, /currentIndex === episodeTwoScenes\.length - 1/);
  assert.match(episodeTwoApp, />Text lesen<\/button>/);
  assert.match(episodeTwoApp, />Entdecken<\/button>/);
  assert.match(episodeTwoApp, />Quiz<\/button>/);
  assert.match(episodeTwoApp, /Quiz · Frage \{quizQuestionIndex \+ 1\} von \{sceneQuizzes\.length\}/);
  assert.match(episodeTwoApp, /Beide Fragen geschafft\./);
  assert.equal((episodeTwoData.match(/kind: "optional",/g) ?? []).length, 14);
  assert.match(episodeTwoData, /followUpQuiz: EpisodeTwoQuiz/);
  assert.match(episodeTwoData, /compactQuizOptions/);
  assert.match(episodeTwoApp, /const \[detailsOpen, setDetailsOpen\] = useState\(true\)/);
  assert.match(episodeTwoVisual, /<EpisodeThreeChapterEnding/);
  assert.match(episodeTwoVisual, /partId=\{1\}/);
  assert.match(episodeTwoVisual, /href="\/episode-3\/\?start=1"/);
  assert.match(episodeTwoApp, /isEndingQuizScene = scene\.id === 14/);
  assert.match(episodeTwoApp, /panel === "quiz" && !isEndingQuizScene/);
  assert.match(episodeTwoApp, /searchParams\.get\("start"\) === "1"/);
  assert.match(episodeTwoApp, /<EpisodeSeriesNav currentEpisode=\{2\} onSelectCurrentEpisode=\{\(\) => goToScene\(0\)\} \/>/);
  assert.match(episodeTwoApp, /Weiter zu Episode 3/);
  assert.doesNotMatch(episodeTwoApp, /Übergangsentwurf|nur per Direktlink/);
  assert.doesNotMatch(episodeTwoApp, /Quiz-Halt|stopIsOpen|episode2-quizstops/);
  assert.doesNotMatch(episodeTwoApp, /ep2-scene-overview|14 Stationen, viele Äste/);
  assert.match(episodeTwoApp, /className="interaction-block ep2-hotspot-list"/);
  assert.doesNotMatch(episodeTwoVisual, /ep2-hotspot/);
  assert.doesNotMatch(episodeTwoApp, /ep2-intro-tree/);
  assert.match(episodeTwoVisual, /CompactFamilyTree/);
  assert.doesNotMatch(
    episodeTwoVisual,
    /ep2-(sky|landscape|forest-elements|branching-elements|trace-elements|tool-elements|fire-elements|science-elements|time-rock-elements|dust)/,
  );
  await access(
    new URL(
      "../public/assets/episode2/scene18/hintergrund-homo-sapiens-entsteht-v2.png",
      import.meta.url,
    ),
  );
});

test("legt Episode 3 mit Sprecheraufnahmen im Format von Episode 2 an", async () => {
  const episodeThreeData = await readFile(
    new URL("../app/data/episode3.ts", import.meta.url),
    "utf8",
  );
  const episodeThreeApp = await readFile(
    new URL("../app/episode-3/EpisodeThreePreview.tsx", import.meta.url),
    "utf8",
  );
  const episodeThreeVisual = await readFile(
    new URL("../app/episode-3/EpisodeThreeVisual.tsx", import.meta.url),
    "utf8",
  );
  const episodeThreePage = await readFile(
    new URL("../app/episode-3/page.tsx", import.meta.url),
    "utf8",
  );
  const episodeTwoApp = await readFile(
    new URL("../app/episode-2/EpisodeTwoApp.tsx", import.meta.url),
    "utf8",
  );
  const episodeTwoVisual = await readFile(
    new URL("../app/episode-2/EpisodeTwoVisual.tsx", import.meta.url),
    "utf8",
  );
  const episodeOneApp = await readFile(
    new URL("../app/ZeitreiseApp.tsx", import.meta.url),
    "utf8",
  );
  const episodeSeriesNav = await readFile(
    new URL("../app/components/EpisodeSeriesNav.tsx", import.meta.url),
    "utf8",
  );
  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );
  const ambientSound = await readFile(
    new URL("../app/audio/useAmbientSound.ts", import.meta.url),
    "utf8",
  );

  const sceneIds = [...episodeThreeData.matchAll(/\{ id: (\d+), title:/g)].map(
    (match) => Number(match[1]),
  );
  assert.deepEqual(
    sceneIds,
    Array.from({ length: 28 }, (_, index) => index + 1),
  );
  const sceneTitles = [
    ...episodeThreeData.matchAll(/\{ id: \d+, title: "([^"]+)"/g),
  ].map((match) => match[1]);
  assert.deepEqual(sceneTitles.slice(9), [
    "Wer zählt eigentlich das ganze Getreide?",
    "Nicht alle machen alles",
    "Wenn Zahlen zu Zeichen werden",
    "Die Macht der Liste",
    "Eine Stadt aus Lehm und Wasser",
    "Wer entscheidet für die Stadt?",
    "Ein Segel macht die Welt kleiner",
    "Keine Straße, sondern ein Netz",
    "Ein Blatt macht Karriere",
    "Unsichtbare Passagiere",
    "Ein Ozean wird zur Kreuzung",
    "Menschen werden zur Ware gemacht",
    "Ein schwarzer Stein übernimmt die Schicht",
    "Die Landschaft bekommt einen Fahrplan",
    "Die Nacht bekommt einen Schalter",
    "Brot aus Luft?",
    "Der Brennstoff fährt mit",
    "Ein Zimmer schrumpft in die Hosentasche",
    "Der Zeitfelsen fragt zurück",
  ]);
  assert.equal(
    [...episodeThreeData.matchAll(/\{ id: \d+, title: [^\n]+imageStatus: "ready" \}/g)].length,
    23,
  );
  assert.match(episodeThreeData, /Noch einmal zurück/);
  assert.match(episodeThreeData, /Der Preis des Bleibens/);
  assert.equal(
    [...episodeThreeData.matchAll(/speakerText: episodeThreeSpeakerTexts\[\d+\]/g)].length,
    28,
  );
  assert.equal(
    [...episodeThreeData.matchAll(/discoveries: episodeThreeDiscoveries\[\d+\]/g)].length,
    28,
  );
  assert.equal(
    [...episodeThreeData.matchAll(/quiz: \[episodeThreeQuizzes\[\d+\]\[\d+\], episodeThreeQuizzes\[\d+\]\[\d+\]\]/g)].length,
    28,
  );
  assert.equal(
    [...episodeThreeData.matchAll(/focusLabel: "[^"]+"/g)].length,
    28,
  );
  assert.match(episodeThreeData, /focusLabel: "Tontafel"/);
  assert.match(episodeThreeData, /focusLabel: "Elektrizität"/);
  assert.match(episodeThreeVisual, /className="ep3-focus-card"/);
  assert.match(episodeThreeVisual, /\{scene\.focusLabel\}/);
  assert.doesNotMatch(episodeThreeVisual, /className="time-card"/);
  assert.equal([...episodeThreeData.matchAll(/question: "/g)].length, 74);
  assert.equal([...episodeThreeData.matchAll(/correctAnswer: \d/g)].length, 74);
  assert.match(episodeThreeData, /kein WLAN/);
  assert.match(episodeThreeData, /nicht die Köpfe/);
  assert.match(episodeThreeData, /beachtliche Kulturleistung/);
  assert.match(episodeThreeData, /genialen Urbauern/);
  assert.match(episodeThreeData, /Berufsverkehr verläuft über die Dächer/);
  assert.match(episodeThreeData, /Städte, Schrift, Herrscher und Steuern/);
  assert.match(episodeThreeData, /Der Hund war schon da/);
  assert.match(episodeThreeData, /Leben mit den Verstorbenen/);
  assert.match(episodeThreeData, /unabhängig in mehreren Regionen/);
  assert.match(episodeThreeApp, /<h1>Zeitreise<\/h1>/);
  assert.match(episodeThreeApp, /<strong>Episode 3<\/strong><span aria-hidden="true"> · <\/span>\{currentPart\.title\}/);
  assert.match(episodeThreeData, /Leben ohne Acker/);
  assert.match(episodeThreeData, /Steine für die Ewigkeit/);
  assert.match(episodeThreeData, /Ein Ort bleibt/);
  assert.match(episodeThreeData, /Eine Ähre verändert sich/);
  assert.match(episodeThreeData, /Aus Jagd wird Herde/);
  assert.match(episodeThreeData, /Eine Idee entsteht immer wieder/);
  assert.match(episodeThreeData, /Leben Wand an Wand/);
  assert.match(episodeThreeData, /Der Preis des Bleibens/);
  assert.match(episodeThreeData, /Wer zählt eigentlich das ganze Getreide/);
  assert.match(episodeThreeData, /Eine Stadt aus Lehm und Wasser/);
  assert.match(episodeThreeData, /Nicht alle machen alles/);
  assert.match(episodeThreeData, /Wenn Zahlen zu Zeichen werden/);
  assert.match(episodeThreeData, /Die Macht der Liste/);
  assert.match(episodeThreeData, /Wer entscheidet für die Stadt/);
  assert.match(episodeThreeData, /Ein Segel macht die Welt kleiner/);
  assert.match(episodeThreeData, /Keine Straße, sondern ein Netz/);
  assert.match(episodeThreeData, /Ein Blatt macht Karriere/);
  assert.match(episodeThreeData, /Unsichtbare Passagiere/);
  assert.match(episodeThreeData, /Ein Ozean wird zur Kreuzung/);
  assert.match(episodeThreeData, /Menschen werden zur Ware gemacht/);
  assert.match(episodeThreeData, /Ein schwarzer Stein übernimmt die Schicht/);
  assert.match(episodeThreeData, /Die Landschaft bekommt einen Fahrplan/);
  assert.match(episodeThreeData, /Die Nacht bekommt einen Schalter/);
  assert.match(episodeThreeData, /Brot aus Luft/);
  assert.match(episodeThreeData, /Der Brennstoff fährt mit/);
  assert.match(episodeThreeData, /Ein Zimmer schrumpft in die Hosentasche/);
  assert.match(episodeThreeData, /Der Zeitfelsen fragt zurück/);
  assert.match(episodeThreeApp, /className="workspace"/);
  assert.match(episodeThreeApp, /className="player-controls"/);
  assert.match(episodeThreeApp, /<EpisodeThreeTimeline/);
  assert.match(episodeThreeApp, /<EpisodeThreeVisual/);
  assert.match(episodeThreeApp, />Text lesen</);
  assert.match(episodeThreeApp, />Entdecken</);
  assert.match(episodeThreeApp, />Quiz</);
  assert.match(episodeThreeApp, /setIsPlaying\(true\)/);
  assert.match(episodeThreeApp, /<audio/);
  assert.match(episodeThreeApp, /autoPlay=\{isPlaying\}/);
  assert.match(episodeThreeApp, /onCanPlay/);
  assert.match(episodeThreeApp, /onTimeUpdate/);
  assert.match(episodeThreeApp, /audioRef\.current\.currentTime = 0/);
  assert.match(episodeThreeApp, /useAmbientSound/);
  assert.match(episodeThreeApp, /ambientEnabled && !soundMuted && !sceneHasVideo/);
  assert.match(episodeThreeApp, /Quiz · Frage \{quizQuestionIndex \+ 1\} von \{scene\.quiz\.length\}/);
  assert.match(episodeThreeApp, /Beide Fragen geschafft/);
  assert.match(episodeThreeApp, /setQuizQuestionIndex\(\(value\) => value \+ 1\)/);
  assert.match(episodeThreeData, /Welche Folgen hatte die Sesshaftigkeit\?/);
  assert.match(episodeThreeData, /episodeThreeSceneImageSequences/);
  assert.match(episodeThreeData, /scene13\/hintergrund-listenmacht-v1\.png/);
  assert.match(episodeThreeVisual, /ep3-scene-image-sequence/);
  assert.match(episodeThreeVisual, /sequenceBlend/);
  assert.match(episodeThreeApp, /questionCount=\{5\}/);
  assert.match(episodeThreeApp, /randomize/);
  assert.doesNotMatch(episodeThreeVisual, /<EpisodeThreeChapterEnding/);
  assert.match(episodeThreeApp, /<span>\{item\.focusLabel\}<\/span>/);
  assert.match(episodeThreeApp, /<h2>\{scene\.title\}<\/h2>/);
  assert.doesNotMatch(episodeThreeApp, /<div className="scene-facts"><span>\{scene\.timeLabel\}<\/span><\/div>/);
  assert.doesNotMatch(episodeThreeApp, /<span>Du bist hier<\/span>/);
  assert.match(episodeThreeApp, /className="ep3-brand-subtitle"/);
  assert.match(episodeThreeApp, /aria-label="Anfang ansehen"/);
  assert.match(episodeThreeApp, /<EpisodeThreeNextPartCard partId=\{2\}/);
  assert.match(episodeThreeApp, /<EpisodeThreeNextPartCard partId=\{3\}/);
  assert.match(episodeThreeApp, /<EpisodeThreeNextPartCard partId=\{4\}/);
  assert.doesNotMatch(episodeThreeApp, /Aus Dörfern werden Städte/);
  assert.match(episodeThreeApp, /episodePart=\{2\}/);
  assert.match(episodeThreeApp, /episodePart=\{3\}/);
  assert.match(episodeThreeApp, /episodePart=\{4\}/);
  assert.match(episodeThreeApp, /celebratePerfect/);
  assert.match(episodeThreeVisual, /ClayWritingTimeline/);
  assert.match(episodeThreeVisual, /KnowledgeJourney/);
  assert.match(episodeThreeVisual, /NitrogenJourney/);
  assert.match(episodeThreeVisual, /sequenceWindowForScene/);
  assert.match(episodeThreeVisual, /sceneId === 13\) return \[0\.44, 0\.62\]/);
  assert.doesNotMatch(episodeThreeApp, /scene\.id === 9 \? 1\.2 : 1/);
  assert.doesNotMatch(episodeThreeApp, /audio\.playbackRate/);
  assert.match(episodeThreeApp, /setSceneDuration\(audio\.duration\)/);
  assert.match(ambientSound, /209: \["footsteps", "goats", "rustle"\]/);
  assert.match(ambientSound, /210: \["footsteps", "rustle"\]/);
  assert.match(ambientSound, /215: \["footsteps", "rustle"\]/);
  assert.match(ambientSound, /216: \["waves", "footsteps", "rustle"\]/);
  assert.match(ambientSound, /217: \["footsteps", "rustle"\]/);
  assert.match(ambientSound, /218: \["rustle"\]/);
  assert.match(ambientSound, /222: \["steam", "footsteps", "rustle"\]/);
  assert.match(ambientSound, /228: \["birds", "rustle"\]/);
  assert.match(ambientSound, /progress >= 0\.94/);
  assert.match(ambientSound, /from: 92/);
  assert.equal((episodeThreeData.match(/sprecher-(?:und-veo-)?szene-\d{2}-v1\.m4a/g) ?? []).length, 28);
  assert.equal((episodeThreeData.match(/sprecher-und-veo-szene-\d{2}-v1\.m4a/g) ?? []).length, 8);
  assert.doesNotMatch(episodeThreeData, /vorschau-szene-\d{2}-v1\.wav/);
  assert.match(episodeThreeApp, /Noch nicht richtig/);
  assert.doesNotMatch(
    episodeThreeApp,
    /Arbeitsentwurf|Bildprüfung noch offen|Freigabe des Bildes noch offen/,
  );
  assert.doesNotMatch(
    episodeThreeApp,
    /Öffentliche Vorschau|vollständige technische Bildfolge|Szenenbilder freigegeben|Rekonstruierte Arbeitsgrundlage|Sprecheraufnahme steht noch aus|Freigegebene Texte bleiben unangetastet/,
  );
  assert.match(episodeOneApp, /<EpisodeSeriesNav currentEpisode=\{1\} onSelectCurrentEpisode=\{\(\) => goToScene\(0\)\} \/>/);
  assert.match(episodeTwoApp, /<EpisodeSeriesNav currentEpisode=\{2\} onSelectCurrentEpisode=\{\(\) => goToScene\(0\)\} \/>/);
  assert.match(episodeThreeApp, /<EpisodeSeriesNav currentEpisode=\{3\} onSelectCurrentEpisode=\{\(\) => goToScene\(0\)\} \/>/);
  assert.equal((episodeSeriesNav.match(/\{ id: \d,/g) ?? []).length, 3);
  assert.match(episodeSeriesNav, /href: "\/\?start=1"/);
  assert.match(episodeSeriesNav, /href: "\/episode-2\/\?start=1"/);
  assert.match(episodeSeriesNav, /href: "\/episode-3\/\?start=1"/);
  assert.match(episodeSeriesNav, /onSelectCurrentEpisode\(\)/);
  assert.doesNotMatch(episodeSeriesNav, /episode\.id === 3|aria-disabled="true"|Nur per Direktlink|Direktlink geöffnet/);
  assert.match(episodeSeriesNav, /aria-current=\{isCurrent \? "page" : undefined\}/);
  assert.equal((episodeThreeData.match(/bewegung-[^"\n]+\.mp4/g) ?? []).length, 8);
  assert.match(episodeThreeVisual, /playsInline/);
  assert.match(episodeThreeVisual, /element\.currentTime = 0/);
  assert.match(episodeThreeVisual, /element\.play\(\)/);
  assert.match(styles, /min-height: clamp\(320px, 38vw, 520px\)/);
  assert.doesNotMatch(episodeThreeData, /playback:|"loop"/);
  assert.doesNotMatch(episodeThreeVisual, /\sloop(?:=|\s|>)/);
  assert.doesNotMatch(episodeThreePage, /index: false|Öffentliche Vorschau/);
  assert.doesNotMatch(episodeTwoApp, /Arbeitsfassung|nur per Direktlink|Übergangsentwurf/);
  assert.match(episodeTwoApp, /aria-label="Weiter zu Episode 3"/);
  assert.match(episodeTwoVisual, /href="\/episode-3\/\?start=1"/);
  await Promise.all([
    access(
      new URL(
        "../public/assets/episode3/scene01/hintergrund-zeitfelsen-heute-v1.png",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/assets/episode3/scene01/hintergrund-zeitfelsen-12000-vchr-v1.png",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/assets/episode3/scene02/hintergrund-leben-ohne-acker-entwurf-v1.png",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/assets/episode3/scene03/hintergrund-goebekli-tepe-entwurf-v1.png",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/assets/episode3/scene04/hintergrund-jericho-entwurf-v1.png",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/assets/episode3/scene05/hintergrund-aehre-veraendert-sich-entwurf-v1.png",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/assets/episode3/scene06/hintergrund-aus-jagd-wird-herde-entwurf-v1.png",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/assets/episode3/scene07/hintergrund-idee-entsteht-wieder-entwurf-v1.png",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/assets/episode3/scene08/hintergrund-catalhoeyuek-entwurf-v1.png",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/assets/episode3/scene09/hintergrund-dorf-waechst-v1.png",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/assets/episode3/scene09/hintergrund-dorf-belastungen-v1.png",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/assets/episode3/scene01/bewegung-zeitsprung-veo-v1.mp4",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/assets/episode3/scene02/bewegung-leben-ohne-acker-veo-v1.mp4",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/assets/episode3/scene04/bewegung-jericho-veo-v1.mp4",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/assets/episode3/scene03/bewegung-goebekli-tepe-veo-v1.mp4",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/assets/episode3/scene06/bewegung-ziegenherde-veo-v1.mp4",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/assets/episode3/scene08/bewegung-catalhoeyuek-veo-v1.mp4",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/assets/episode3/scene14/bewegung-uruk-kanalstadt-veo-v1.mp4",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/assets/episode3/scene16/bewegung-segelhandel-veo-v1.mp4",
        import.meta.url,
      ),
    ),
  ]);
  await Promise.all(
    [
      "sprecher-und-veo-szene-01-v1.m4a",
      "sprecher-und-veo-szene-02-v1.m4a",
      "sprecher-und-veo-szene-03-v1.m4a",
      "sprecher-und-veo-szene-04-v1.m4a",
      "sprecher-szene-05-v1.m4a",
      "sprecher-und-veo-szene-06-v1.m4a",
      "sprecher-szene-07-v1.m4a",
      "sprecher-und-veo-szene-08-v1.m4a",
      "sprecher-szene-09-v1.m4a",
    ].map((fileName) =>
      access(
        new URL(`../public/assets/episode3/audio/${fileName}`, import.meta.url),
      ),
    ),
  );
  await Promise.all(
    [
      "scene10/hintergrund-dorfvorrat-v1.png",
      "scene10/hintergrund-stadtspeicher-v1.png",
      "scene11/hintergrund-uruk-kanalstadt-v1.png",
      "scene12/hintergrund-nahrungsanlieferung-v1.png",
      "scene12/hintergrund-spezialisierte-werkstaetten-v1.png",
      "scene14/hintergrund-rationsverwaltung-v1.png",
      "scene13/hintergrund-listenmacht-v1.png",
      "scene15/hintergrund-gemeinschaftsarbeit-v1.png",
      "scene15/hintergrund-macht-buendelt-sich-v1.png",
      "scene16/hintergrund-segelhandel-v1.png",
      "scene17/hintergrund-seidenstrassen-karawane-v1.png",
      "scene17/hintergrund-seidenstrassen-handelsstadt-v1.png",
      "scene19/hintergrund-hafen-vor-pest-v1.png",
      "scene19/hintergrund-hafen-nach-pest-v1.png",
      "scene20/hintergrund-atlantische-begegnung-v1.png",
      "scene21/hintergrund-versklavung-register-v1.png",
      "scene21/hintergrund-widerstand-gemeinschaft-v1.png",
    ].map((assetPath) =>
      access(new URL(`../public/assets/episode3/${assetPath}`, import.meta.url)),
    ),
  );
  await Promise.all(
    [
      "sprecher-szene-10-v1.m4a",
      "sprecher-szene-11-v1.m4a",
      "sprecher-szene-12-v1.m4a",
      "sprecher-szene-13-v1.m4a",
      "sprecher-szene-14-v1.m4a",
      "sprecher-und-veo-szene-14-v1.m4a",
      "sprecher-szene-15-v1.m4a",
      "sprecher-szene-16-v1.m4a",
      "sprecher-und-veo-szene-16-v1.m4a",
      "sprecher-szene-17-v1.m4a",
      "sprecher-szene-18-v1.m4a",
      "sprecher-szene-19-v1.m4a",
      "sprecher-szene-20-v1.m4a",
      "sprecher-szene-21-v1.m4a",
      "sprecher-szene-22-v1.m4a",
      "sprecher-szene-23-v1.m4a",
      "sprecher-szene-24-v1.m4a",
      "sprecher-szene-25-v1.m4a",
      "sprecher-szene-26-v1.m4a",
      "sprecher-szene-27-v1.m4a",
      "sprecher-szene-28-v1.m4a",
    ].map((fileName) =>
      access(
        new URL(`../public/assets/episode3/audio/${fileName}`, import.meta.url),
      ),
    ),
  );
});

test("erklärt die drei Zeitebenen mit einem wiederkehrenden Zeit-Zoom", async () => {
  const episodeOneApp = await readFile(
    new URL("../app/ZeitreiseApp.tsx", import.meta.url),
    "utf8",
  );
  const episodeTwoApp = await readFile(
    new URL("../app/episode-2/EpisodeTwoApp.tsx", import.meta.url),
    "utf8",
  );
  const episodeThreeApp = await readFile(
    new URL("../app/episode-3/EpisodeThreePreview.tsx", import.meta.url),
    "utf8",
  );
  const timeZoom = await readFile(
    new URL("../app/components/TimeZoom.tsx", import.meta.url),
    "utf8",
  );
  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(timeZoom, /12 Stunden Erdzeit/);
  assert.match(timeZoom, /letzte 67 Sekunden/);
  assert.match(timeZoom, /letzte 0,13 Sekunden/);
  assert.match(episodeOneApp, /<TimeZoomMark level=\{1\}/);
  assert.match(episodeOneApp, /<TimeZoomTransition\s+level=\{1\}/);
  assert.match(episodeTwoApp, /<TimeZoomMark level=\{2\}/);
  assert.match(episodeTwoApp, /<TimeZoomTransition\s+level=\{2\}/);
  assert.match(episodeThreeApp, /<TimeZoomMark level=\{3\}/);
  assert.equal((episodeThreeApp.match(/<TimeZoomTransition/g) ?? []).length, 1);
  assert.match(styles, /\.time-zoom-transition/);
  assert.match(styles, /@keyframes time-zoom-focus/);
});

test("führt Episode 3 mit vier Leitfragen und sichtbaren Kapitelübergängen", async () => {
  const parts = await readFile(
    new URL("../app/data/episode3Parts.ts", import.meta.url),
    "utf8",
  );
  const guide = await readFile(
    new URL("../app/episode-3/EpisodeThreePartGuide.tsx", import.meta.url),
    "utf8",
  );
  const episodeTwoApp = await readFile(
    new URL("../app/episode-2/EpisodeTwoApp.tsx", import.meta.url),
    "utf8",
  );
  const episodeTwoVisual = await readFile(
    new URL("../app/episode-2/EpisodeTwoVisual.tsx", import.meta.url),
    "utf8",
  );
  const sceneVisual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );
  const episodeThreeApp = await readFile(
    new URL("../app/episode-3/EpisodeThreePreview.tsx", import.meta.url),
    "utf8",
  );
  const visual = await readFile(
    new URL("../app/episode-3/EpisodeThreeVisual.tsx", import.meta.url),
    "utf8",
  );
  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(parts, /Was verändert sich, wenn Menschen bleiben\?/);
  assert.match(parts, /Was passiert, wenn Vorräte organisiert werden müssen\?/);
  assert.match(parts, /Waren, Ideen, Menschen – und Krankheiten – immer weiter reisen\?/);
  assert.match(parts, /fossile Energie menschliche Möglichkeiten vervielfacht\?/);
  assert.match(parts, /"Vorräte"[\s\S]*"Organisation"[\s\S]*"Vernetzung"[\s\S]*"Beschleunigung"[\s\S]*"planetare Wirkung"/);
  assert.match(guide, /Vier Teile · vier Leitfragen/);
  assert.match(episodeTwoVisual, /<EpisodeThreeChapterEnding/);
  assert.match(episodeTwoVisual, /scene\.id === 14 && progress >= 0\.72/);
  assert.match(episodeTwoVisual, /href="\/episode-3\/\?start=1"/);
  assert.doesNotMatch(episodeTwoApp, /<section className="ep3-outlook"/);
  assert.match(episodeThreeApp, /<EpisodeThreePartOverview activePart=\{1\} \/>/);
  assert.doesNotMatch(episodeThreeApp, /<section className="ep3-outlook"/);
  assert.doesNotMatch(episodeThreeApp, /Aus Dörfern werden Städte/);
  assert.doesNotMatch(visual, /const transitionStart|<EpisodeThreeChapterEnding/);
  assert.match(episodeThreeApp, /<EpisodeThreeNextPartCard partId=\{2\} onContinue=\{\(\) => goToScene\(9\)\} \/>/);
  assert.match(episodeThreeApp, /<EpisodeThreeNextPartCard partId=\{3\} onContinue=\{\(\) => goToScene\(15\)\} \/>/);
  assert.match(episodeThreeApp, /<EpisodeThreeNextPartCard partId=\{4\} onContinue=\{\(\) => goToScene\(21\)\} \/>/);
  assert.match(guide, /className="ep3-chapter-ending is-clickable"/);
  assert.match(guide, /className="ep3-next-part-card"/);
  assert.match(sceneVisual, /className="ending-title is-clickable"/);
  assert.match(sceneVisual, /href="\/episode-2\/\?start=1"/);
  assert.match(episodeThreeApp, /isPartEndingScene = scene\.id === 9 \|\| scene\.id === 15 \|\| scene\.id === 21 \|\| scene\.id === 28/);
  assert.match(episodeThreeApp, /panel === "quiz" && !isPartEndingScene/);
  assert.match(episodeThreeApp, /searchParams\.get\("start"\) === "1"/);
  assert.match(styles, /\.player-column > \.final-quiz/);
  assert.match(styles, /\.ep3-chapter-ending/);
  assert.match(styles, /\.ep3-chapter-ending\.is-clickable/);
  assert.match(styles, /\.ep3-next-part-card/);
  assert.match(styles, /\.app-shell > \.final-quiz/);
});

test("enthält die Medienbestände für die Vorschau der Szenen 1 bis 22", async () => {
  const assetPaths = [
    "scene01/hintergrund-vulkanische-kueste.png",
    "scene01/hintergrund-feuerplanet-v1.png",
    "scene01/hintergrund-sternsystem-v1.png",
    "scene01/hintergrund-vulkanische-kueste-neu-v1.png",
    "scene01/sprecher-micha-v1.m4a",
    "scene01/overlay-dampf.png",
    "scene01/overlay-rauch.png",
    "scene01/overlay-glutspalten.png",
    "scene01/overlay-asche-funken.png",
    "scene01/overlay-lavafontaene.png",
    "scene02/hintergrund-vulkanische-kueste.png",
    "scene02/overlay-dampf-rauch.png",
    "scene02/overlay-dampf.png",
    "scene02/overlay-lavafluss.png",
    "scene02/overlay-regen.png",
    "scene03/hintergrund-urmeer-v1.png",
    "scene03/overlay-regen.png",
    "scene03/overlay-dampf.png",
    "scene04/hintergrund-ursuppe-lagune-v1.png",
    "scene04/overlay-dampf.png",
    "scene04/overlay-hitzeflimmern.png",
    "scene05/hintergrund-erste-zelle-v1.png",
    "scene06/hintergrund-ausbreitung-leben-v1.png",
    "scene07/hintergrund-cyanobakterien-v1.png",
    "scene08/hintergrund-sauerstoffwende-v1.png",
    "scene09/hintergrund-endosymbiose-v1.png",
    "scene10/hintergrund-komplexe-einzeller-v1.png",
    "scene11/hintergrund-erste-vielzeller-v1.png",
    "scene12/hintergrund-ediacara-v1.png",
    "scene13/hintergrund-kambrische-explosion-v1.png",
    "scene14/hintergrund-erste-landpflanzen-v1.png",
    "scene14/overlay-nebel-v1.png",
    "scene15/hintergrund-erste-landtiere-v1.png",
    "scene16/hintergrund-tiktaalik-v1.png",
    "scene16/overlay-wassersplash-v1.png",
    "scene17/hintergrund-amniotenei-v1.png",
    "scene18/hintergrund-dinosaurier-v1.png",
    "scene19/hintergrund-asteroid-morgen-v1.png",
    "scene19/overlay-meteor-v1.png",
    "scene20/hintergrund-nach-einschlag-v1.png",
    "scene20/overlay-staubwolke-v1.png",
    "scene21/hintergrund-saeugetiere-v1.png",
    "scene22/hintergrund-zeitfelsen-heute-v1.png",
  ];

  await Promise.all(
    assetPaths.map((path) =>
      access(new URL(`../public/assets/episode1/${path}`, import.meta.url)),
    ),
  );
  await Promise.all(
    Array.from({ length: 22 }, (_, index) => {
      const scene = String(index + 1).padStart(2, "0");
      return access(
        new URL(
          `../public/assets/episode1/scene${scene}/sprecher-micha-v1.m4a`,
          import.meta.url,
        ),
      );
    }),
  );

  const visual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(visual, /const hotspotPositions/);
  assert.doesNotMatch(visual, /sceneHotspotPositions/);
  assert.doesNotMatch(visual, /Technische Bildvorschau/);
  assert.doesNotMatch(visual, /Medienplatzhalter/);
  assert.doesNotMatch(visual, /· Vorschau/);
  assert.doesNotMatch(visual, /Zeitfelsen und Kinderhand fehlen/);
  assert.match(visual, /hintergrund-feuerplanet-v1\.png/);
});

test("verknüpft Michas Aufnahmen für alle 22 Szenen", async () => {
  const narration = await readFile(
    new URL("../app/data/narration.ts", import.meta.url),
    "utf8",
  );
  const app = await readFile(
    new URL("../app/ZeitreiseApp.tsx", import.meta.url),
    "utf8",
  );
  assert.match(narration, /model: "gpt-4o-mini-tts"/);
  assert.match(narration, /voice: "cedar"/);
  assert.equal(
    (narration.match(/sprecher-micha-v1\.m4a/g) ?? []).length,
    22,
  );
  assert.match(narration, /displayName: "Micha"/);
  assert.match(narration, /narrationVoiceForScene/);
  assert.match(narration, /return michaNarrationVoice;/);
  assert.doesNotMatch(app, /`KI-Stimme/);
  assert.match(narration, /sprecher-micha-test-v1\.m4a/);
  assert.match(narration, /sprecher-rosi-test-v1\.m4a/);
  await access(
    new URL(
      "../public/assets/episode1/scene14/sprecher-micha-test-v1.m4a",
      import.meta.url,
    ),
  );
  await access(
    new URL(
      "../public/assets/episode1/scene14/sprecher-rosi-test-v1.m4a",
      import.meta.url,
    ),
  );
});

test("hält die Filmsteuerung sichtbar und startet die nächste Szene sofort", async () => {
  const app = await readFile(
    new URL("../app/ZeitreiseApp.tsx", import.meta.url),
    "utf8",
  );
  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(app, /goToScene\(currentIndex \+ 1, true\)/);
  assert.doesNotMatch(app, /key=\{`\$\{scene\.id\}-\$\{narrationPath\}`\}/);
  assert.match(app, /autoPlay=\{isPlaying\}/);
  assert.match(app, /onCanPlay=\{\(event\) =>/);
  assert.match(app, /className="next-control"/);
  assert.match(app, /Weiter <span aria-hidden="true">→<\/span>/);
  assert.match(app, /className="play-orb"/);
  assert.match(app, /className="play-wave"/);
  assert.match(app, /"Szene starten"/);
  assert.match(styles, /height: clamp\(380px, calc\(100svh - 350px\), 620px\)/);
  assert.match(styles, /@media \(min-width: 761px\) and \(max-height: 900px\)/);
  assert.match(styles, /animation: intro-stars 15\.5s ease-in-out both/);
  assert.match(styles, /transition: opacity 1500ms ease/);
  assert.match(app, /setIntroReady\(true\), 14800/);
  assert.match(app, /zeitreise-intro-seen/);
  assert.match(app, /Intro überspringen/);
  assert.match(app, /onClick=\{\(\) => answerQuiz\(index\)\}/);
  assert.doesNotMatch(app, /Antwort prüfen/);
});

test("optimiert Film und Bedienung für Smartphones", async () => {
  const app = await readFile(
    new URL("../app/ZeitreiseApp.tsx", import.meta.url),
    "utf8",
  );
  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(styles, /bottom: max\(7px, env\(safe-area-inset-bottom\)\)/);
  assert.match(styles, /aspect-ratio: 16 \/ 9/);
  assert.match(styles, /\.ep2-visual \{[\s\S]*?aspect-ratio: 16 \/ 9/);
  assert.match(styles, /-webkit-line-clamp: 2/);
  assert.match(styles, /@media \(max-width: 390px\)/);
  assert.match(
    styles,
    /@media \(max-width: 760px\) and \(orientation: landscape\) and \(max-height: 500px\)/,
  );
  assert.match(app, /className="sound-label">Ton/);
  assert.match(app, /aria-label=\{`Ton \$\{soundMuted/);
  assert.match(app, /muted=\{soundMuted\}/);
  assert.match(app, /soundMutedRef\.current = nextMuted/);
  assert.match(app, /const \[detailsOpen, setDetailsOpen\] = useState\(true\)/);
  assert.match(app, /<SceneVisual\s+key=\{scene\.id\}/);
  assert.match(app, /const \[ambientEnabled, setAmbientEnabled\] = useState\(false\)/);
  assert.match(app, /activateAmbientSound\(\)/);
  assert.match(app, /className="scene-swipe-surface"/);
  assert.match(app, /onPointerDown=\{startSceneSwipe\}/);
  assert.match(app, /onPointerUp=\{finishSceneSwipe\}/);
  assert.match(app, /Math\.abs\(horizontalDistance\) >= 70/);
  assert.match(styles, /\.scene-swipe-surface \{/);
  assert.match(styles, /touch-action: pan-y/);
  assert.match(app, /zeitreise-update=\$\{Date\.now\(\)\}/);
  assert.match(app, /window\.setInterval\(checkForUpdate, 3 \* 60 \* 1000\)/);
  assert.match(app, /updateViaCache: "none"/);
  assert.match(app, /zeitreise-resume-after-update/);
});

test("aktualisiert Episode 2 und 3 automatisch und ohne Unterbrechung der Sprecheraufnahme", async () => {
  const app = await readFile(
    new URL("../app/episode-2/EpisodeTwoApp.tsx", import.meta.url),
    "utf8",
  );
  const episodeThreeApp = await readFile(
    new URL("../app/episode-3/EpisodeThreePreview.tsx", import.meta.url),
    "utf8",
  );
  const worker = await readFile(
    new URL("../public/sw.js", import.meta.url),
    "utf8",
  );

  assert.match(app, /\/episode-2\/\?zeitreise-update=\$\{Date\.now\(\)\}/);
  assert.match(app, /window\.setInterval\(checkForUpdate, 3 \* 60 \* 1000\)/);
  assert.match(app, /updateViaCache: "none"/);
  assert.match(app, /zeitreise-episode2-resume-after-update/);
  assert.match(app, /if \(isPlayingRef\.current\)/);
  assert.match(app, /updateUrl\.searchParams\.set\("zeitreise-update"/);
  assert.match(app, /window\.location\.replace\(updateUrl\.href\)/);
  assert.doesNotMatch(app, /Boolean\(knownSignature\)/);
  assert.match(episodeThreeApp, /\/episode-3\/\?zeitreise-update=\$\{Date\.now\(\)\}/);
  assert.match(episodeThreeApp, /zeitreise-episode3-resume-after-update/);
  assert.match(episodeThreeApp, /zeitreise-episode3-app-version/);
  assert.match(episodeThreeApp, /if \(isPlayingRef\.current\)/);
  assert.match(episodeThreeApp, /window\.location\.replace\(updateUrl\.href\)/);
  assert.doesNotMatch(episodeThreeApp, /Boolean\(knownSignature\)/);
  assert.match(worker, /const CACHE_NAME = "zeitreise-v131"/);
  assert.match(worker, /url\.searchParams\.set\("zeitreise-update", CACHE_NAME\)/);
  assert.match(worker, /client\.navigate\(url\.href\)/);
});

test("spielt Veo-Clips in Episode 2 als Schleife oder einmal bis zum Standbild", async () => {
  const app = await readFile(
    new URL("../app/episode-2/EpisodeTwoApp.tsx", import.meta.url),
    "utf8",
  );
  const visual = await readFile(
    new URL("../app/episode-2/EpisodeTwoVisual.tsx", import.meta.url),
    "utf8",
  );
  const visuals = await readFile(
    new URL("../app/data/episode2CompactVisuals.ts", import.meta.url),
    "utf8",
  );
  const worker = await readFile(
    new URL("../public/sw.js", import.meta.url),
    "utf8",
  );

  assert.match(visuals, /bewegung-primaten-veo-v1\.mp4/);
  assert.match(visuals, /bewegung-frueher-primat-veo-v1\.mp4/);
  assert.match(visuals, /bewegung-getrennte-wege-veo-v1\.mov/);
  assert.match(visuals, /bewegung-erste-reise-veo-v1\.mov/);
  assert.match(visuals, /playback: "loop"/);
  assert.match(visuals, /bewegung-feuer-veo-v1\.mp4/);
  assert.match(visuals, /bewegung-neandertaler-veo-v1\.mp4/);
  assert.match(visuals, /playback: "hold"/);
  assert.match(visuals, /sprecher-und-veo-szene-01-v2\.m4a/);
  assert.match(visuals, /sprecher-und-veo-szene-11-v2\.m4a/);
  assert.match(app, /episodeTwoSceneSoundtrack\(scene\.id\) \?\? scene\.audioPath/);
  assert.match(visual, /poster=\{visual\.video\.poster\}/);
  assert.match(visual, /video\.pause\(\)/);
  assert.match(visual, /video\.play\(\)/);
  assert.match(visual, /video\.muted = true/);
  assert.match(visual, /muted/);
  assert.match(app, /ambientEnabled && !soundMuted && !sceneUsesVideoSound/);
  assert.match(app, /muted=\{soundMuted\}/);
  assert.match(app, /onClick=\{toggleSound\}/);
  await Promise.all(
    ["01", "02", "03", "08", "09", "11"].map((scene) =>
      access(
        new URL(
          `../public/assets/episode2/audio/sprecher-und-veo-szene-${scene}-v2.m4a`,
          import.meta.url,
        ),
      ),
    ),
  );
  assert.match(worker, /sprecher-und-veo-szene-01-v2\.m4a/);
  assert.match(worker, /sprecher-und-veo-szene-11-v2\.m4a/);
  assert.doesNotMatch(worker, /bewegung-primaten-veo-v1\.mp4/);
  assert.doesNotMatch(worker, /bewegung-feuer-veo-v1\.mp4/);
  assert.doesNotMatch(worker, /bewegung-neandertaler-veo-v1\.mp4/);
  assert.match(worker, /isStreamingVideo/);
  assert.match(worker, /event\.respondWith\(fetch\(event\.request\)\)/);
});

test("spielt sieben ausgewählte Veo-Clips in Episode 1 mit gemeinsamer Tonspur", async () => {
  const app = await readFile(
    new URL("../app/ZeitreiseApp.tsx", import.meta.url),
    "utf8",
  );
  const visual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );
  const videos = await readFile(
    new URL("../app/data/episode1Videos.ts", import.meta.url),
    "utf8",
  );
  const worker = await readFile(
    new URL("../public/sw.js", import.meta.url),
    "utf8",
  );
  const selectedScenes = [10, 11, 13, 15, 16, 18, 21];

  assert.equal((videos.match(/sceneId: \d+/g) ?? []).length, 7);
  assert.match(videos, /bewegung-komplexe-einzeller-veo-v1\.mp4/);
  assert.match(videos, /bewegung-tiktaalik-veo-v1\.mp4[\s\S]*playback: "hold"/);
  assert.match(videos, /bewegung-dinosaurier-veo-v1\.mp4/);
  assert.match(videos, /playback: "loop"/);
  assert.match(visual, /poster=\{sceneVideo\.poster\}/);
  assert.match(visual, /loop=\{sceneVideo\.playback === "loop"\}/);
  assert.match(visual, /video\.muted = true/);
  assert.match(visual, /video\.play\(\)/);
  assert.match(visual, /video\.pause\(\)/);
  assert.match(app, /episodeOneSceneSoundtrack\(scene\.id\) \?\? narrationTracks\[scene\.id\]/);
  assert.match(app, /ambientEnabled && !soundMuted && !sceneUsesVideoSound/);
  assert.match(app, /muted=\{soundMuted\}/);
  assert.match(app, /onClick=\{toggleSound\}/);

  await Promise.all(
    selectedScenes.flatMap((scene) => [
      access(
        new URL(
          `../public/assets/episode1/scene${scene}/sprecher-und-veo-v1.m4a`,
          import.meta.url,
        ),
      ),
      access(
        new URL(
          `../public/assets/episode1/scene${scene}/${
            {
              10: "bewegung-komplexe-einzeller-veo-v1.mp4",
              11: "bewegung-zellverbaende-veo-v1.mp4",
              13: "bewegung-kambrium-veo-v1.mp4",
              15: "bewegung-landtiere-veo-v1.mp4",
              16: "bewegung-tiktaalik-veo-v1.mp4",
              18: "bewegung-dinosaurier-veo-v1.mp4",
              21: "bewegung-saeugetiere-veo-v1.mp4",
            }[scene]
          }`,
          import.meta.url,
        ),
      ),
    ]),
  );

  assert.doesNotMatch(worker, /bewegung-komplexe-einzeller-veo-v1\.mp4/);
  assert.match(worker, /isStreamingVideo/);
});

test("erklärt Episode-1-Hotspots unter dem Bild ohne dauerhafte Pluszeichen", async () => {
  const app = await readFile(
    new URL("../app/ZeitreiseApp.tsx", import.meta.url),
    "utf8",
  );
  const visual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );

  assert.match(app, /Im Bild erklärt/);
  assert.match(app, /scene\.hotspots\.map/);
  assert.doesNotMatch(visual, /hotspot-layer|hotspot-marker/);
});

test("zeigt in Episode 2 die Jahreszahl im Bild und wechselt per Wischbewegung", async () => {
  const app = await readFile(
    new URL("../app/episode-2/EpisodeTwoApp.tsx", import.meta.url),
    "utf8",
  );
  const visual = await readFile(
    new URL("../app/episode-2/EpisodeTwoVisual.tsx", import.meta.url),
    "utf8",
  );

  assert.match(app, /className="scene-swipe-surface"/);
  assert.match(app, /Math\.abs\(horizontalDistance\) >= 70/);
  assert.match(app, /horizontalDistance < 0/);
  assert.doesNotMatch(app, /stopIsOpen/);
  assert.match(app, /goToScene\(currentIndex \+ 1, true\)/);
  assert.match(visual, /className="time-card"/);
  assert.match(visual, /\{scene\.timeLabel\}/);
});

test("enthält Abschlussquiz sowie Über-mich- und Impressumsseite", async () => {
  const app = await readFile(
    new URL("../app/ZeitreiseApp.tsx", import.meta.url),
    "utf8",
  );
  const finalQuiz = await readFile(
    new URL("../app/components/FinalEpisodeQuiz.tsx", import.meta.url),
    "utf8",
  );
  const footer = await readFile(
    new URL("../app/components/SiteFooter.tsx", import.meta.url),
    "utf8",
  );
  const about = await readFile(
    new URL("../app/ueber/page.tsx", import.meta.url),
    "utf8",
  );
  const imprint = await readFile(
    new URL("../app/impressum/page.tsx", import.meta.url),
    "utf8",
  );
  const historyBack = await readFile(
    new URL("../app/components/HistoryBackLink.tsx", import.meta.url),
    "utf8",
  );
  const worker = await readFile(
    new URL("../public/sw.js", import.meta.url),
    "utf8",
  );

  assert.match(app, /new Set\(\[1, 3, 5, 8, 11, 14, 17, 19, 21\]\)/);
  assert.match(app, /<FinalEpisodeQuiz scenes=\{finalQuizScenes\} \/>/);
  assert.match(finalQuiz, /Das große Episode-1-Quiz/);
  assert.match(finalQuiz, /Das Abschlussquiz zu Teil 1/);
  assert.match(finalQuiz, /Das Abschlussquiz zu Städte, Schrift und Macht/);
  assert.match(finalQuiz, /Das Abschlussquiz zu „Die Welt rückt zusammen“/);
  assert.match(finalQuiz, /Fünf zufällig ausgewählte Fragen/);
  assert.match(finalQuiz, /final-quiz-fireworks/);
  assert.match(finalQuiz, /playPerfectFanfare/);
  assert.match(finalQuiz, /Frage \{questionIndex \+ 1\} von/);
  assert.match(finalQuiz, /onClick=\{\(\) => answer\(index\)\}/);
  assert.doesNotMatch(finalQuiz, /Antwort prüfen/);
  assert.doesNotMatch(finalQuiz, /Richtig ist:/);
  assert.match(app, /Quiz · Frage \{quizQuestionIndex \+ 1\} von/);
  assert.match(app, /Die nächste Frage kommt sofort\./);
  assert.match(footer, /Über mich/);
  assert.match(footer, /Impressum &amp; Datenschutz/);
  assert.doesNotMatch(footer, /site-footer-brand|<strong>Zeitreise<\/strong>/);
  assert.match(footer, /mibaur@me\.com/);
  assert.doesNotMatch(footer, /Fauna entdecken/);
  assert.match(footer, /https:\/\/mibaso\.de/);
  assert.match(footer, /Alle Mibaso-Apps/);
  assert.match(footer, /© 2026 Michael Baur/);
  assert.doesNotMatch(footer, />Kontakt</);
  assert.doesNotMatch(footer, /site-footer-meta/);
  assert.match(about, /Hallo, ich bin Micha\./);
  assert.match(about, /michael-baur-garten\.jpg/);
  assert.match(about, /<HistoryBackLink \/>/);
  assert.doesNotMatch(about, /info-simple-footer/);
  assert.match(imprint, /Nordeckerweg 22E/);
  assert.match(imprint, /Es gibt kein Tracking und keine Werbung/);
  assert.match(imprint, /<HistoryBackLink \/>/);
  assert.doesNotMatch(imprint, /info-simple-footer/);
  assert.match(historyBack, /href="\/\?weiter=1"/);
  assert.doesNotMatch(historyBack, /window\.history\.back/);
  assert.match(worker, /const CACHE_NAME = "zeitreise-v131"/);
  assert.match(worker, /CACHE_SCENES/);
  assert.match(worker, /SCENE_ASSETS/);
  assert.match(app, /registration\.active\?\.postMessage/);
  assert.match(app, /process\.env\.NODE_ENV === "development"/);
  assert.match(app, /registration\.unregister\(\)/);
  assert.match(app, /name\.startsWith\("zeitreise-"\)/);
  assert.match(worker, /"\/tierstammbaum\/"/);
  assert.match(worker, /"\/ueber\/"/);
  assert.match(worker, /"\/impressum\/"/);
  await access(
    new URL(
      "../public/assets/site/michael-baur-garten.jpg",
      import.meta.url,
    ),
  );
});

test("synchronisiert den feinen Regen in Szene 2 und 3", async () => {
  const visual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );
  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );
  const rainTiming = await readFile(
    new URL("../app/data/rainTiming.ts", import.meta.url),
    "utf8",
  );
  const ambientSound = await readFile(
    new URL("../app/audio/useAmbientSound.ts", import.meta.url),
    "utf8",
  );

  assert.match(visual, /isSceneTwo \|\| isSceneThree/);
  assert.match(visual, /driving-rain-scene-\$\{scene\.id\}/);
  assert.match(visual, /rain-curtain-back/);
  assert.match(visual, /rain-curtain-middle/);
  assert.match(visual, /rain-curtain-front/);
  assert.match(visual, /Array\.from\(\{ length: 20 \}/);
  assert.match(styles, /@keyframes driving-rain-fall/);
  assert.match(styles, /@keyframes rain-splash/);
  assert.match(styles, /\.scene-visual\.is-playing \.rain-curtain/);
  assert.match(styles, /opacity: var\(--rain-intensity, 0\)/);
  assert.match(rainTiming, /SCENE_TWO_RAIN_START = 0\.5/);
  assert.match(rainTiming, /rainProgress \/ 0\.12/);
  assert.match(rainTiming, /sceneId === 3/);
  assert.match(ambientSound, /rainBedGainRef/);
  assert.match(ambientSound, /rainIntensityForScene/);
  assert.match(ambientSound, /sceneId === 2 \? profiles\.volcanic/);
  assert.match(ambientSound, /sceneId === 2 \? 0\.09 : 0\.056/);
  assert.match(ambientSound, /contextRevision/);
  assert.match(visual, /rainIntensityForScene/);
});

test("bindet den kompakten Tierstammbaum in Szene 12 ein", async () => {
  const app = await readFile(
    new URL("../app/ZeitreiseApp.tsx", import.meta.url),
    "utf8",
  );
  const tree = await readFile(
    new URL("../app/components/AnimalFamilyTree.tsx", import.meta.url),
    "utf8",
  );
  const treePage = await readFile(
    new URL("../app/tierstammbaum/page.tsx", import.meta.url),
    "utf8",
  );
  const focus = await readFile(
    new URL("../app/components/AnimalEvolutionFocus.tsx", import.meta.url),
    "utf8",
  );
  const footer = await readFile(
    new URL("../app/components/SiteFooter.tsx", import.meta.url),
    "utf8",
  );

  assert.match(app, /12: \{ label: "Tierstammbaum", group: "tierreich" \}/);
  assert.match(app, /16: \{ label: "Fische & Amphibien", group: "amphibien" \}/);
  assert.match(app, /18: \{ label: "Reptilien & Vögel", group: "reptilien" \}/);
  assert.match(app, /href=\{`\/tierstammbaum\/#\$\{familyTreeLink\.group\}`\}/);
  assert.match(tree, /Der Stammbaum der Tiere/);
  assert.match(tree, /Nesseltiere/);
  assert.match(tree, /Fische/);
  assert.match(tree, /Amphibien/);
  assert.match(tree, /Reptilien/);
  assert.match(tree, /Vögel/);
  assert.doesNotMatch(tree, /Keine Rangliste/);
  assert.match(
    tree,
    /https:\/\/fauna\.mibaso\.de\/interaktiv\/stammbaum\.html/,
  );
  assert.match(tree, /window\.location\.hash\.slice\(1\)/);
  assert.match(tree, /scrollIntoView/);
  assert.match(tree, /selectFromStationLink/);
  assert.match(tree, /Diesen Ast aufdecken/);
  assert.doesNotMatch(tree, /Öffne den Stammbaum Ast für Ast/);
  assert.match(tree, /Bilateria/);
  assert.match(tree, /Vertebrata/);
  assert.match(tree, /Neun Fragen bis zur Auszeichnung/);
  assert.match(tree, /Stammbaum-Entdecker/);
  assert.match(tree, /Taraaa!/);
  assert.equal((tree.match(/correctIndex: \d,/g) ?? []).length, 9);
  assert.equal((tree.match(/explanation:/g) ?? []).length, 9);
  assert.match(tree, /Fangfrage/);
  assert.match(treePage, /<AnimalFamilyTree \/>/);
  assert.match(treePage, /<AnimalEvolutionFocus \/>/);
  assert.match(treePage, /href="\/\?weiter=1"/);
  assert.doesNotMatch(treePage, /Die entscheidenden Stationen/);
  assert.doesNotMatch(treePage, /family-tree-learning-path/);
  assert.match(focus, /Von Flossen zu vier Gliedmaßen/);
  assert.match(focus, /Tiktaalik/);
  assert.match(focus, /nicht\s+zwingend ihr direkter Vorfahr/);
  assert.match(focus, /Ichthyosaurier/);
  assert.match(focus, /Meeresschildkröten/);
  assert.match(focus, /Wale/);
  assert.match(focus, /Das nennt man Konvergenz/);
  assert.match(focus, /openFromStationLink/);
  assert.match(focus, /<details/);
  assert.doesNotMatch(footer, /Zur Zeitreise/);
  assert.doesNotMatch(footer, /href="\/tierstammbaum\/"/);
  assert.match(app, /new URLSearchParams\(window\.location\.search\)/);
  assert.match(app, /setIntroOpen\(false\)/);
  assert.match(app, /Tierstammbaum &amp; Stationen/);
  assert.doesNotMatch(app, />\s*Werkstatt\s*</);
  assert.doesNotMatch(app, /Sprechertext – Fassung/);
  assert.doesNotMatch(app, /warm · deutlich humorvoller/);
  assert.doesNotMatch(app, /className=\{`missing-note/);
});

test("vervollständigt die Entdeckungen in Szene 18", async () => {
  const app = await readFile(
    new URL("../app/ZeitreiseApp.tsx", import.meta.url),
    "utf8",
  );
  const sceneData = await readFile(
    new URL("../app/data/scenes.ts", import.meta.url),
    "utf8",
  );

  assert.match(sceneData, /Entdecke fünf Bewohner dieser Welt/);
  assert.match(sceneData, /Vögel sind die heute lebenden Nachfahren/);
  assert.match(sceneData, /Flugsaurier waren keine Dinosaurier/);
  assert.match(sceneData, /explanations:/);
  assert.match(app, /scene\.discovery\?\.explanations/);
});

test("verwendet für Episode 1 und das Schlussdorf passende Geräuschkulissen", async () => {
  const audio = await readFile(
    new URL("../app/audio/useAmbientSound.ts", import.meta.url),
    "utf8",
  );
  const app = await readFile(
    new URL("../app/ZeitreiseApp.tsx", import.meta.url),
    "utf8",
  );

  assert.equal((audio.match(/^\s+\d+: \[/gm) ?? []).length, 41);
  assert.match(audio, /1: \["eruption", "steam"\]/);
  assert.match(audio, /4: \["bubbles", "steam", "waves"\]/);
  assert.match(audio, /18: \["footsteps", "insects", "roar"\]/);
  assert.match(audio, /19: \["impact", "insects", "roar"\]/);
  assert.match(audio, /22: \["birds", "waves"\]/);
  assert.match(audio, /209: \["footsteps", "goats", "rustle"\]/);
  assert.match(audio, /210: \["footsteps", "rustle"\]/);
  assert.match(audio, /215: \["footsteps", "rustle"\]/);
  assert.match(app, /const activateAmbientSound = useAmbientSound\(/);
  assert.match(audio, /const activate = useCallback/);
  assert.match(audio, /return activate/);
});

test("inszeniert in Szene 19 genau einen synchronisierten Einschlag", async () => {
  const sceneVisual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );
  const audio = await readFile(
    new URL("../app/audio/useAmbientSound.ts", import.meta.url),
    "utf8",
  );
  const timing = await readFile(
    new URL("../app/data/impactTiming.ts", import.meta.url),
    "utf8",
  );
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(sceneVisual, /function MeteorImpactAnimation/);
  assert.match(
    sceneVisual,
    /<MeteorImpactAnimation progress=\{progress\} \/>/,
  );
  assert.equal((sceneVisual.match(/className="impact-single-meteor"/g) ?? []).length, 1);
  assert.match(audio, /event !== "impact"/);
  assert.match(audio, /!impactPlayedRef\.current/);
  assert.match(timing, /SCENE_NINETEEN_IMPACT = 0\.625/);
  assert.doesNotMatch(sceneVisual, /Absolute Stille|silence-card/);
  assert.doesNotMatch(timing, /SILENCE_START/);
  assert.match(sceneVisual, /className="impact-aftermath-background"/);
  assert.match(css, /hintergrund-nach-einschlag-v1\.png/);
  assert.match(css, /\.impact-aftermath-background/);
  assert.match(audio, /dinosaurMorningIsAudible/);
  assert.doesNotMatch(css, /collection-meteor 12s ease-in-out infinite/);
});

test("zeigt in Szene 20 erst den Zeitfelsen und dann das kleine Säugetier", async () => {
  const sceneVisual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );
  const audio = await readFile(
    new URL("../app/audio/useAmbientSound.ts", import.meta.url),
    "utf8",
  );
  const timing = await readFile(
    new URL("../app/data/survivorTiming.ts", import.meta.url),
    "utf8",
  );

  assert.match(sceneVisual, /function AftermathSurvivorAnimation/);
  assert.match(
    sceneVisual,
    /<AftermathSurvivorAnimation progress=\{progress\} \/>/,
  );
  assert.match(sceneVisual, /survivor-time-rock-focus/);
  assert.match(sceneVisual, /survivor-mammal-track/);
  assert.match(timing, /SCENE_TWENTY_MAMMAL_EMERGES = 0\.32/);
  assert.match(audio, /survivorRustlePlayedRef/);
  assert.match(audio, /sceneId === 20 && event === "rustle"/);
});

test("synchronisiert Sauerstoffblasen und Atmosphärenwandel in Szene 7 und 8", async () => {
  const sceneVisual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );
  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );
  const timing = await readFile(
    new URL("../app/data/oxygenTiming.ts", import.meta.url),
    "utf8",
  );

  assert.match(sceneVisual, /function OxygenPioneerAnimation/);
  assert.match(sceneVisual, /function OxygenRevolutionAnimation/);
  assert.match(sceneVisual, /<OxygenPioneerAnimation progress=\{progress\} \/>/);
  assert.match(
    sceneVisual,
    /<OxygenRevolutionAnimation progress=\{progress\} \/>/,
  );
  assert.doesNotMatch(sceneVisual, /atmosphere-oxygen-bubbles/);
  assert.doesNotMatch(sceneVisual, /atmosphere-oxygen-shift/);
  assert.match(styles, /\.oxygen-follow-bubble/);
  assert.match(styles, /\.oxygen-blue-wash/);
  assert.match(timing, /SCENE_SEVEN_PHOTOSYNTHESIS_START = 0\.191/);
  assert.match(timing, /SCENE_SEVEN_BUBBLES_BUILD = 0\.437/);
  assert.match(timing, /SCENE_EIGHT_ATMOSPHERE_CHANGE = 0\.842/);
});

test("bewegt die vorhandenen Einzeller in Szene 10 synchron zum Sprechertext", async () => {
  const sceneVisual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );
  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );
  const timing = await readFile(
    new URL("../app/data/complexCellTiming.ts", import.meta.url),
    "utf8",
  );

  assert.match(sceneVisual, /function ComplexCellWorldAnimation/);
  assert.match(
    sceneVisual,
    /<ComplexCellWorldAnimation progress=\{progress\} \/>/,
  );
  assert.doesNotMatch(sceneVisual, /atmosphere-micro-swim/);
  assert.match(sceneVisual, /complex-cell-daughter-a/);
  assert.match(styles, /\.complex-cell-layer/);
  assert.match(styles, /scene-ten-macro-drift/);
  assert.match(timing, /SCENE_TEN_DIVERSE_BEHAVIOR = 0\.169/);
  assert.match(timing, /SCENE_TEN_GENERATIONS = 0\.675/);
  assert.match(timing, /SCENE_TEN_SEA_FILLS = 0\.844/);
});

test("lässt die vorhandenen Zellverbände in Szene 11 zusammenarbeiten", async () => {
  const sceneVisual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );
  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );
  const timing = await readFile(
    new URL("../app/data/multicellTiming.ts", import.meta.url),
    "utf8",
  );

  assert.match(sceneVisual, /function MulticellTeamAnimation/);
  assert.match(sceneVisual, /<MulticellTeamAnimation progress=\{progress\} \/>/);
  assert.doesNotMatch(sceneVisual, /atmosphere-cell-team/);
  assert.match(sceneVisual, /multicell-joining-member/);
  assert.match(sceneVisual, /multicell-signal-path/);
  assert.match(styles, /\.multicell-chain-layer/);
  assert.match(styles, /scene-eleven-gentle-current/);
  assert.match(timing, /SCENE_ELEVEN_SIGNALS = 0\.211/);
  assert.match(timing, /SCENE_ELEVEN_TASKS = 0\.448/);
  assert.match(timing, /SCENE_ELEVEN_MULTICELLS = 0\.737/);
});

test("lässt die Vielfalt in Szene 13 schrittweise lebendig werden", async () => {
  const sceneVisual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );
  const timing = await readFile(
    new URL("../app/data/cambrianTiming.ts", import.meta.url),
    "utf8",
  );

  assert.match(sceneVisual, /function CambrianExplosionAnimation/);
  assert.match(
    sceneVisual,
    /<CambrianExplosionAnimation progress=\{progress\} \/>/,
  );
  assert.match(sceneVisual, /cambrian-trilobite/);
  assert.match(sceneVisual, /cambrian-swimmer/);
  assert.match(sceneVisual, /cambrian-burrowing-worm/);
  assert.match(sceneVisual, /cambrian-transition-trilobite/);
  assert.match(timing, /SCENE_THIRTEEN_DIVERSITY_START = 0\.146/);
  assert.match(timing, /SCENE_THIRTEEN_PREDATOR_PREY_START = 0\.437/);
});

test("lässt Tiktaalik in Szene 16 glaubwürdig im Flachwasser arbeiten", async () => {
  const sceneVisual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );
  const audio = await readFile(
    new URL("../app/audio/useAmbientSound.ts", import.meta.url),
    "utf8",
  );
  const timing = await readFile(
    new URL("../app/data/tiktaalikTiming.ts", import.meta.url),
    "utf8",
  );

  assert.match(sceneVisual, /function TiktaalikShallowWaterAnimation/);
  assert.match(
    sceneVisual,
    /<TiktaalikShallowWaterAnimation progress=\{progress\} \/>/,
  );
  assert.match(sceneVisual, /tiktaalik-head-layer/);
  assert.match(sceneVisual, /tiktaalik-body-layer/);
  assert.match(sceneVisual, /--tiktaalik-body-push/);
  assert.doesNotMatch(sceneVisual, /tiktaalik-support-fin/);
  assert.doesNotMatch(sceneVisual, /tiktaalik-transition-fern/);
  assert.equal((sceneVisual.match(/className="tiktaalik-single-splash"/g) ?? []).length, 1);
  assert.match(timing, /SCENE_SIXTEEN_HEAD_LIFT_START = 0\.163/);
  assert.match(timing, /SCENE_SIXTEEN_CROAK = 0\.88/);
  assert.match(audio, /16: \["bubbles", "insects", "rustle", "croak"\]/);
  assert.match(audio, /!tiktaalikCroakPlayedRef\.current/);
});

test("erzählt die Endosymbiose als synchronisierte Animation", async () => {
  const sceneVisual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );

  assert.match(sceneVisual, /function EndosymbiosisAnimation/);
  assert.match(sceneVisual, /Aufgenommen – aber nicht verdaut/);
  assert.match(sceneVisual, /endo-mitochondrion/);
  assert.match(
    sceneVisual,
    /<EndosymbiosisAnimation progress=\{progress\} \/>/,
  );
});

test("zeigt die Zellteilung als biologisch nachvollziehbare Animation", async () => {
  const sceneVisual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );

  assert.match(sceneVisual, /function BinaryFissionAnimation/);
  assert.match(sceneVisual, /Die Erbinformation wird kopiert/);
  assert.match(sceneVisual, /Die Zellmembran schnürt sich ein/);
  assert.match(sceneVisual, /Aus zwei werden vier/);
  assert.match(
    sceneVisual,
    /<BinaryFissionAnimation progress=\{progress\} \/>/,
  );
});

test("zeigt in Szene 5 die Entstehung und Teilung der ersten Zellblase", async () => {
  const sceneVisual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );

  assert.match(sceneVisual, /function FirstCellFormationAnimation/);
  assert.match(sceneVisual, /first-cell-forming-membrane/);
  assert.match(sceneVisual, /strokeDashoffset=\{membraneLength \* \(1 - closure\)\}/);
  assert.match(sceneVisual, /const division = phaseProgress\(progress, 0\.69, 0\.86\)/);
  assert.match(
    sceneVisual,
    /<FirstCellFormationAnimation progress=\{progress\} \/>/,
  );
});

test("wiegt die vorhandenen Ediacara-Lebewesen in Szene 12 sanft", async () => {
  const sceneVisual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );
  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(sceneVisual, /function EdiacaraLifeAnimation/);
  assert.match(sceneVisual, /scene\.id === 12 \? <EdiacaraLifeAnimation \/>/);
  assert.match(styles, /ediacara-current-sway-left/);
  assert.match(styles, /ediacara-current-sway-right/);
  assert.match(styles, /ediacara-soft-pulse/);
  assert.match(styles, /hintergrund-ediacara-v1\.png/);
});

test("lässt in Szene 15 Tausendfüßer und Spinnentier wirklich laufen", async () => {
  const sceneVisual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );
  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(sceneVisual, /function LandAnimalAnimation/);
  assert.match(sceneVisual, /const spiderRun = phaseProgress\(progress, 0\.46, 0\.64\)/);
  assert.match(sceneVisual, /land-millipede-antenna/);
  assert.match(sceneVisual, /scene\.id === 15 \? <LandAnimalAnimation progress=\{progress\} \/>/);
  assert.match(styles, /land-millipede-step/);
  assert.match(styles, /land-millipede-feel/);
  assert.match(styles, /land-spider-image/);
});

test("erzählt in Szene 17 Mulde, Eiablage, Embryo und Schlüpfen", async () => {
  const sceneVisual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );
  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(sceneVisual, /function AmnioteEggStory/);
  assert.match(sceneVisual, /const dig = phaseProgress\(progress, 0\.04, 0\.24\)/);
  assert.match(sceneVisual, /const lay = phaseProgress\(progress, 0\.22, 0\.48\)/);
  assert.match(sceneVisual, /const embryo =/);
  assert.match(sceneVisual, /const hatch = phaseProgress\(progress, 0\.84, 0\.98\)/);
  assert.match(sceneVisual, /scene\.id === 17 \? <AmnioteEggStory progress=\{progress\} \/>/);
  assert.match(styles, /amniote-leg-dig/);
  assert.match(styles, /amniote-egg-crack/);
  assert.match(styles, /amniote-hatchling/);
});

test("inszeniert Szene 18 als ruhige Dinosaurier-Naturdokumentation", async () => {
  const sceneVisual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );
  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(sceneVisual, /function DinosaurLifeAnimation/);
  assert.match(sceneVisual, /const herdTravel = phaseProgress\(progress, 0\.08, 0\.88\)/);
  assert.match(sceneVisual, /dinosaur-juvenile-body/);
  assert.match(sceneVisual, /dinosaur-feeding-branch/);
  assert.match(sceneVisual, /dinosaur-near-foot/);
  assert.match(sceneVisual, /scene\.id === 18 \? <DinosaurLifeAnimation progress=\{progress\} \/>/);
  assert.match(styles, /dinosaur-camera-shudder/);
  assert.match(styles, /dinosaur-herd-legs/);
  assert.match(styles, /dinosaur-leaf-nibble/);
});

test("lässt in Szene 21 die Säugetierfamilie aufbrechen und die Landschaft altern", async () => {
  const sceneVisual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );
  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(sceneVisual, /function MammalFutureAnimation/);
  assert.match(sceneVisual, /const rise =/);
  assert.match(sceneVisual, /const youngster =/);
  assert.match(sceneVisual, /const timeLapse = phaseProgress\(progress, 0\.46, 0\.98\)/);
  assert.match(sceneVisual, /mammal-adult-head/);
  assert.match(sceneVisual, /mammal-youngster/);
  assert.match(sceneVisual, /scene\.id === 21 \? <MammalFutureAnimation progress=\{progress\} \/>/);
  assert.match(styles, /mammal-landscape-shift/);
  assert.match(styles, /mammal-time-clouds/);
  assert.match(styles, /mammal-sniff-ripple/);
});

test("inszeniert Szene 22 als feierliches und ruhiges Finale", async () => {
  const sceneVisual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );
  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(sceneVisual, /function FinaleAnimation/);
  assert.match(sceneVisual, /const handSettle = phaseProgress\(progress, 0\.34, 0\.54\)/);
  assert.match(sceneVisual, /const glow = phaseProgress\(progress, 0\.54, 0\.76\)/);
  assert.match(sceneVisual, /const retreat = phaseProgress\(progress, 0\.08, 0\.98\)/);
  assert.match(sceneVisual, /scene\.id === 22 \? <FinaleAnimation progress=\{progress\} \/>/);
  assert.match(styles, /finale-rock-glow/);
  assert.match(styles, /finale-golden-breathe/);
  assert.match(styles, /finale-butterfly-wing/);
});

test("belebt Ursuppe und frühe Landküste in Szene 4 und 14", async () => {
  const sceneVisual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );
  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(sceneVisual, /function PrimordialLagoonAnimation/);
  assert.match(sceneVisual, /const shimmer =/);
  assert.match(sceneVisual, /lagoon-gas-bubble/);
  assert.match(sceneVisual, /function LandfallAnimation/);
  assert.match(sceneVisual, /landfall-plant-mat/);
  assert.match(sceneVisual, /landfall-drop/);
  assert.match(sceneVisual, /landfall-surf-one/);
  assert.match(sceneVisual, /scene\.id === 4 \? <PrimordialLagoonAnimation progress=\{progress\} \/>/);
  assert.match(sceneVisual, /scene\.id === 14 \? <LandfallAnimation progress=\{progress\} \/>/);
  assert.match(styles, /lagoon-bubble-rise/);
  assert.match(styles, /landfall-plant-breathe/);
  assert.match(styles, /landfall-surf-wash/);
});
