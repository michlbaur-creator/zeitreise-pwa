import assert from "node:assert/strict";
import test from "node:test";
import {readFile,access} from "node:fs/promises";
import {createHash} from "node:crypto";
import {loadData,quizEpisodes} from "./load-data.mjs";

const {readingCues,readingTextAt}=await loadData("readingCues");
const one=await loadData("scenes"),two=await loadData("episode2"),three=await loadData("episode3");
const {captionTracks}=await loadData("captions");
const normal=s=>s.replace(/\s+/g," ").trim();

test("Leise-Leseabschnitte enthalten alle unveränderten Sprechertexte und folgen Fortschritt und Rücksprung",()=>{
  const texts=[...one.scenes.map(s=>({text:s.speaker,cues:captionTracks[s.id]})),...two.episodeTwoScenes.map(s=>({text:s.speaker})),...three.episodeThreeScenes.map(s=>({text:s.speakerText.join(" ")}))];
  for(const {text,cues} of texts){
    const result=readingCues(text,cues);
    assert.equal(normal(result.map(c=>c.text).join(" ")),normal(text));
    assert.equal(result[0].at,0);
    assert.ok(result.every((c,i)=>c.at>=0&&c.at<1&&(!i||c.at>result[i-1].at)));
    assert.equal(readingTextAt(result,0),result[0].text);
    assert.equal(readingTextAt(result,1),result.at(-1).text);
    for(let t=0;t<=1;t+=.01)assert.ok(result.some(c=>c.text===readingTextAt(result,t)));
  }
});
test("Vorhandene vollständige Untertitel behalten beim Zusammenfassen ihre Zeitmarken",()=>{
  const cues=[{at:0,text:"A ".repeat(35).trim()},{at:.2,text:"B ".repeat(35).trim()},{at:.7,text:"C ".repeat(55).trim()}];
  const result=readingCues(cues.map(c=>c.text).join(" "),cues);
  assert.equal(result.length,2);assert.equal(result[1].at,.7);
});
test("Quizlösungen aller 128 Fragen sind ausgeglichen und sämtliche Texte unverändert",async()=>{
  const expected=JSON.parse(await readFile(new URL("./approved-quiz-hashes.json",import.meta.url),"utf8"));
  const episodes=await quizEpisodes();
  episodes.forEach((qs,i)=>{
    const count=[0,0,0];qs.forEach(q=>count[q.correctIndex??q.correctAnswer]++);
    assert.equal(qs.length,[44,28,56][i]);assert.ok(Math.max(...count)-Math.min(...count)<=1);
    const canonical=qs.map(q=>({...q,options:[...(q.options??q.answers)].sort(),answers:undefined,correctIndex:(q.options??q.answers)[q.correctIndex??q.correctAnswer],correctAnswer:undefined}));
    assert.equal(createHash("sha256").update(JSON.stringify(canonical)).digest("hex"),expected[i]);
  });
});
test("Alle benötigten Episode-3-Sprecheraufnahmen sind wieder vorhanden",async()=>{
  for(const path of Object.values(three.episodeThreeSceneAudio))await access(new URL(`../public${path}`,import.meta.url));
});
