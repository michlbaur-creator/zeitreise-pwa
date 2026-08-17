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

test("kündigt als zweite Episode den Weg zum Menschen an", async () => {
  const visual = await readFile(
    new URL("../app/components/SceneVisual.tsx", import.meta.url),
    "utf8",
  );
  const sceneData = await readFile(
    new URL("../app/data/scenes.ts", import.meta.url),
    "utf8",
  );

  assert.match(visual, /Episode 2 „Der Weg zum Menschen“/);
  assert.match(sceneData, /Episode 2 „Der Weg zum Menschen“/);
  assert.doesNotMatch(
    visual,
    /Episode 2 „Das Zeitalter der Giganten“/,
  );
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
  assert.match(visual, /Sternsystem → Feuerplanet → Vulkanküste/);
  assert.match(visual, /Altbestand · Teilbestand/);
  assert.match(visual, /Urmeerbild · Vorschau/);
  assert.match(visual, /Lagunenbild · Vorschau/);
  assert.match(visual, /Mikrowelt · Vorschau/);
  assert.match(visual, /Zellwelt · Vorschau/);
  assert.match(visual, /Stromatolithen · Vorschau/);
  assert.match(visual, /Atmosphäre · Vorschau/);
  assert.match(visual, /Endosymbiose · Vorschau/);
  assert.match(visual, /Zellvielfalt · Vorschau/);
  assert.match(visual, /Vielzeller · Vorschau/);
  assert.match(visual, /Ediacara · Vorschau/);
  assert.match(visual, /Kambrium · Vorschau/);
  assert.match(visual, /Landpflanzen · Vorschau/);
  assert.match(visual, /Landtiere · Vorschau/);
  assert.match(visual, /Tiktaalik · Vorschau/);
  assert.match(visual, /Amniotenei · Vorschau/);
  assert.match(visual, /Dinosaurier · Vorschau/);
  assert.match(visual, /Asteroid · Vorschau/);
  assert.match(visual, /Neuanfang · Vorschau/);
  assert.match(visual, /Säugetiere · Vorschau/);
  assert.match(visual, /Zeitfelsen · Finale/);
  assert.doesNotMatch(visual, /Zeitfelsen und Kinderhand fehlen/);
  assert.match(visual, /hintergrund-feuerplanet-v1\.png/);
});

test("verknüpft Michas Aufnahmen für alle 22 Szenen", async () => {
  const narration = await readFile(
    new URL("../app/data/narration.ts", import.meta.url),
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
  assert.match(styles, /-webkit-line-clamp: 2/);
  assert.match(styles, /@media \(max-width: 390px\)/);
  assert.match(
    styles,
    /@media \(max-width: 760px\) and \(orientation: landscape\) and \(max-height: 500px\)/,
  );
  assert.match(app, /className="sound-label">Atmosphäre/);
  assert.match(app, /Hintergrundatmosphäre \$\{/);
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
  assert.match(finalQuiz, /Frage \{questionIndex \+ 1\} von/);
  assert.match(finalQuiz, /onClick=\{\(\) => answer\(index\)\}/);
  assert.doesNotMatch(finalQuiz, /Antwort prüfen/);
  assert.doesNotMatch(finalQuiz, /Richtig ist:/);
  assert.match(app, /Quiz · Frage \{quizQuestionIndex \+ 1\} von/);
  assert.match(app, /Die nächste Frage kommt sofort\./);
  assert.match(footer, /Über mich/);
  assert.match(footer, /Impressum &amp; Datenschutz/);
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
  assert.match(worker, /zeitreise-v54/);
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

test("verwendet für alle 22 Szenen unterschiedliche Geräuschkulissen", async () => {
  const audio = await readFile(
    new URL("../app/audio/useAmbientSound.ts", import.meta.url),
    "utf8",
  );
  const app = await readFile(
    new URL("../app/ZeitreiseApp.tsx", import.meta.url),
    "utf8",
  );

  assert.equal((audio.match(/^\s+\d+: \[/gm) ?? []).length, 22);
  assert.match(audio, /1: \["eruption", "steam"\]/);
  assert.match(audio, /4: \["bubbles", "steam", "waves"\]/);
  assert.match(audio, /18: \["footsteps", "insects", "roar"\]/);
  assert.match(audio, /19: \["impact", "insects", "roar"\]/);
  assert.match(audio, /22: \["birds", "waves"\]/);
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
