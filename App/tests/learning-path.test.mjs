import test from 'node:test';
import assert from 'node:assert/strict';
import { loadData } from './load-data.mjs';
const { learningStations, emptyProgress, readProgress, recordResult }=await loadData('learningPath');
const { episodeThreeScenes }=await loadData('episode3');
test('Der Pilot verwendet alle neun Szenen einmal und zehn unveränderte Originalfragen',()=>{
  assert.deepEqual(learningStations.flatMap(s=>s.sceneIds),[1,2,3,4,5,6,7,8,9]);
  assert.equal(learningStations.flatMap(s=>s.quizzes).length,10);
  assert.deepEqual([0,1,2].map(i=>learningStations.flatMap(s=>s.quizzes).filter(q=>q.correctAnswer===i).length),[3,3,4]);
  for(const station of learningStations) for(const q of station.quizzes){
    const original=episodeThreeScenes.flatMap(s=>s.quiz).find(a=>a.question===q.question);
    assert.ok(original); assert.deepEqual(q.answers,original.answers); assert.equal(q.correctAnswer,original.correctAnswer); assert.ok(q.explanation);
  }
});
test('Wiederholung zählt nur Bestwerte, Fehler blockieren den Abschluss nicht',()=>{
  let p=emptyProgress(); p=recordResult(p,0,1,'2026-10-19');
  p=recordResult(p,0,0,'2026-10-20'); assert.equal(p.scores[0],1);
  p=recordResult(p,0,2,'2026-10-20'); p=recordResult(p,0,2,'2026-10-20'); assert.equal(p.scores[0],2);
  for(let i=1;i<5;i++) p=recordResult(p,i,0,'2026-10-20');
  assert.equal(p.completedAt,'2026-10-20'); assert.deepEqual(p.scores,[2,0,0,0,0]);
  p=recordResult(p,1,2,'2026-10-21'); assert.equal(p.completedAt,'2026-10-20');
});
test('Beschädigter Speicher und ungültige Ergebnisse bleiben beherrschbar',()=>{
  assert.deepEqual(readProgress('{'),emptyProgress()); assert.deepEqual(readProgress('null'),emptyProgress());
  assert.deepEqual(readProgress(JSON.stringify({scores:[-1,3,'2',null,2]})).scores,[null,null,null,null,2]);
  let p=emptyProgress(); for(const [i,n] of [[-1,2],[5,2],[0,3],[0,-1],[0,1.5]]) assert.equal(recordResult(p,i,n,'2026-10-19'),p);
});
test('Lernpass übersteht Speichern und Neuladen',()=>{
  let p=emptyProgress();for(let i=0;i<5;i++)p=recordResult(p,i,2,'2026-10-19');
  assert.deepEqual(readProgress(JSON.stringify(p)),p);
  assert.equal(p.scores.reduce((a,b)=>a+b,0),10);
});

test('Lernpfad 2 verwendet Szenen 10–15 und unveränderte Fragen; Lernpässe bleiben getrennt',async()=>{
  const { learningPaths, cityStations } = await loadData('learningPath');
  assert.deepEqual(cityStations.flatMap(s=>s.sceneIds),[10,11,12,13,14,15]);
  assert.equal(cityStations.flatMap(s=>s.quizzes).length,10);
  for(const station of cityStations) for(const q of station.quizzes){
    const original=station.scenes.flatMap(s=>s.quiz).find(a=>a.question===q.question);
    assert.ok(original); assert.deepEqual(q.answers,original.answers); assert.equal(q.correctAnswer,original.correctAnswer);
  }
  assert.equal(new Set(learningPaths.map(p=>p.key)).size,4);
  assert.equal(learningPaths[0].key,'zeitreise-lernpfad-bleiben-v1');
  const pilot=recordResult(emptyProgress(),0,1,'2026-10-20');
  let city=emptyProgress(cityStations);
  for(let i=0;i<5;i++) city=recordResult(city,i,2,'2026-10-20',cityStations);
  assert.deepEqual(readProgress(JSON.stringify(city),cityStations),city);
  assert.deepEqual(pilot.scores,[1,null,null,null,null]);
  assert.equal(city.completedAt,'2026-10-20');
});

test('Neue Einheiten verwenden Originaltexte, Originalfragen und getrennte Lernpässe', async()=>{
  const { learningPaths } = await loadData('learningPath');
  const { scenes, followUpQuizzes } = await loadData('scenes');
  const { episodeTwoScenes } = await loadData('episode2');
  for(const path of learningPaths.filter(p=>p.episode!==3)) {
    assert.equal(path.stations.length,5);
    const originals=path.episode===1?scenes:episodeTwoScenes;
    const pool=originals.flatMap(s=>[s.quiz,path.episode===1?followUpQuizzes[s.id]:s.followUpQuiz]);
    for(const station of path.stations) {
      assert.equal(station.quizzes.length,2);
      for(const scene of station.scenes) assert.equal(scene.speakerText.join(' '),originals.find(s=>s.id===scene.id).speaker);
      for(const question of station.quizzes) {
        const original=pool.find(q=>q.question===question.question);
        assert.ok(original);assert.deepEqual(question.answers,original.options);assert.equal(question.correctAnswer,original.correctIndex);
      }
    }
    assert.deepEqual(readProgress(JSON.stringify(recordResult(emptyProgress(path.stations),0,2,'2026-10-20',path.stations)),path.stations).scores,[2,null,null,null,null]);
    assert.ok(path.opening && path.assignment && path.discussion && path.extension);
  }
});
