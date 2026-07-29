import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const projectRoot = new URL("../", import.meta.url);
const sourcePath = new URL("../app/data/scenes.ts", import.meta.url);
const envPath = new URL("../.env.local", import.meta.url);

const voiceInstructions =
  "Sprich auf Deutsch. Warme, klare und natürliche männliche Erzählstimme. Neugierig, freundlich und leicht humorvoll, niemals belehrend oder übertrieben dramatisch. Direkte Du-Ansprache. Ruhiges mittleres Tempo, deutliche Aussprache und kurze natürliche Pausen. Staunen bei großen Zeiträumen, ein kleines Augenzwinkern bei humorvollen Sätzen. Wissenschaftliche Begriffe sicher und selbstverständlich aussprechen.";

function parseApiKey(envSource) {
  const line = envSource
    .split(/\r?\n/)
    .find((entry) => entry.startsWith("OPENAI_API_KEY="));
  const value = line?.slice("OPENAI_API_KEY=".length).trim();
  if (!value?.startsWith("sk-")) {
    throw new Error("OPENAI_API_KEY fehlt oder hat ein unerwartetes Format.");
  }
  return value;
}

function parseScenes(source) {
  const scenes = [];
  const scenePattern =
    /\n\s+id:\s+(\d+),[\s\S]*?\n\s+title:\s+("(?:[^"\\]|\\.)*"),[\s\S]*?\n\s+speaker:\s*\n?\s*("(?:[^"\\]|\\.)*"),/g;

  for (const match of source.matchAll(scenePattern)) {
    scenes.push({
      id: Number(match[1]),
      title: JSON.parse(match[2]),
      speaker: JSON.parse(match[3]),
    });
  }

  if (scenes.length !== 22) {
    throw new Error(
      `Es wurden ${scenes.length} statt 22 Sprechertexte gefunden.`,
    );
  }
  return scenes;
}

async function hasUsableAudio(path) {
  try {
    return (await stat(path)).size > 10_000;
  } catch {
    return false;
  }
}

async function generateScene(apiKey, scene) {
  const folder = join(
    projectRoot.pathname,
    "public",
    "assets",
    "episode1",
    `scene${String(scene.id).padStart(2, "0")}`,
  );
  const destination = join(folder, "sprecher-cedar-v2.mp3");

  if (await hasUsableAudio(destination)) {
    process.stdout.write(
      `Szene ${String(scene.id).padStart(2, "0")} vorhanden – übersprungen\n`,
    );
    return;
  }

  process.stdout.write(
    `Szene ${String(scene.id).padStart(2, "0")} „${scene.title}“ … `,
  );

  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini-tts",
      voice: "cedar",
      input: scene.speaker,
      instructions: voiceInstructions,
      response_format: "mp3",
    }),
  });

  if (!response.ok) {
    const details = (await response.text()).slice(0, 800);
    throw new Error(`API-Fehler ${response.status}: ${details}`);
  }

  const audio = Buffer.from(await response.arrayBuffer());
  if (audio.length < 10_000) {
    throw new Error(`Audiodatei für Szene ${scene.id} ist unerwartet klein.`);
  }

  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, audio);
  process.stdout.write(`${Math.round(audio.length / 1024)} KB\n`);
}

const apiKey = parseApiKey(await readFile(envPath, "utf8"));
const scenes = parseScenes(await readFile(sourcePath, "utf8"));

for (const scene of scenes) {
  await generateScene(apiKey, scene);
}

process.stdout.write("Alle Cedar-Sprecherdateien sind vorhanden.\n");
