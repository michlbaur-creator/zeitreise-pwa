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
  assert.equal((source.match(/correctIndex:\s+\d+,/g) ?? []).length, 20);
  assert.match(source, /weder Bademeister noch Nachschub aus dem Meer/);
  assert.match(source, /dein Reisebüro hat eindeutig die Warnhinweise vergessen/);
  assert.match(source, /niemand muss dafür einen Bauantrag stellen/);
  assert.match(source, /das erste Sitzungsprotokoll erfand/);
  assert.match(source, /außer vielleicht beim Abendessen/);
  assert.match(source, /Laufen\? Muss ich das erst üben\?/);
  assert.match(source, /ihr eigenes „Kinderzimmer“ einfach mit/);
  assert.match(source, /aus dem dritten Stock die Dachrinne putzen/);
});

test("enthält die Medienbestände für die Vorschau der Szenen 1 bis 22", async () => {
  const assetPaths = [
    "scene01/hintergrund-vulkanische-kueste.png",
    "scene01/hintergrund-feuerplanet-v1.png",
    "scene01/hintergrund-sternsystem-v1.png",
    "scene01/hintergrund-vulkanische-kueste-neu-v1.png",
    "scene01/sprecher-cedar-v2.mp3",
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
      const version = [14, 15, 17, 18].includes(index + 1) ? "v3" : "v2";
      return access(
        new URL(
          `../public/assets/episode1/scene${scene}/sprecher-cedar-${version}.mp3`,
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

test("legt Cedar verbindlich fest und verknüpft alle 22 Sprecherdateien", async () => {
  const narration = await readFile(
    new URL("../app/data/narration.ts", import.meta.url),
    "utf8",
  );
  assert.match(narration, /model: "gpt-4o-mini-tts"/);
  assert.match(narration, /voice: "cedar"/);
  assert.equal(
    (narration.match(/sprecher-cedar-v2\.mp3/g) ?? []).length,
    18,
  );
  assert.equal(
    (narration.match(/sprecher-cedar-v3\.mp3/g) ?? []).length,
    4,
  );
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
  assert.match(app, /className="next-control"/);
  assert.match(app, /Weiter <span aria-hidden="true">→<\/span>/);
  assert.match(styles, /height: clamp\(380px, calc\(100svh - 350px\), 620px\)/);
  assert.match(styles, /@media \(min-width: 761px\) and \(max-height: 900px\)/);
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
  assert.match(app, /zeitreise-update=\$\{Date\.now\(\)\}/);
  assert.match(app, /window\.setInterval\(checkForUpdate, 3 \* 60 \* 1000\)/);
  assert.match(app, /updateViaCache: "none"/);
  assert.match(app, /zeitreise-resume-after-update/);
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
