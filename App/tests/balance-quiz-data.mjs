// One-time editorial migration; no random answer shuffling in the scene Player.
import {readFile,writeFile} from "node:fs/promises";
import ts from "typescript";
import {quizEpisodes} from "./load-data.mjs";
const episodes=await quizEpisodes();
const targets=episodes.map((questions,e)=>{
  const indices=questions.map((_,i)=>i%3);let seed=20261019+e;
  for(let i=indices.length-1;i>0;i--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const j=seed%(i+1);[indices[i],indices[j]]=[indices[j],indices[i]];}
  return new Map(questions.map((q,i)=>[q.question,{q,target:indices[i]}]));
});
function reordered(values, entry) {
  const q=entry.q, shown=q.options??q.answers;
  const live=shown.map(v=>values.find(x=>x.value===v));
  if(live.some(x=>!x)) throw new Error(`Missing answer: ${q.question}`);
  const current=q.correctIndex??q.correctAnswer;
  [live[current],live[entry.target]]=[live[entry.target],live[current]];
  return [...live,...values.filter(v=>!live.includes(v))];
}
for(const [name,e] of [["scenes",0],["episode2",1],["episode3",2]]) {
  const file=new URL(`../app/data/${name}.ts`,import.meta.url), source=await readFile(file,"utf8");
  const ast=ts.createSourceFile(name,source,ts.ScriptTarget.Latest,true), edits=[];
  function visit(node){
    if(ts.isObjectLiteralExpression(node)){
      const props=new Map(node.properties.filter(ts.isPropertyAssignment).map(p=>[p.name.getText(ast),p.initializer]));
      const q=props.get("question"), options=props.get("options")??props.get("answers"), index=props.get("correctIndex")??props.get("correctAnswer");
      if(q&&ts.isStringLiteral(q)&&targets[e].has(q.text)&&options&&ts.isArrayLiteralExpression(options)&&index){
        const entry=targets[e].get(q.text);
        const values=options.elements.map(n=>({value:n.text,code:n.getText(ast)}));
        edits.push({start:options.getStart(ast),end:options.end,text:`[${reordered(values,entry).map(v=>v.code).join(", ")}]`});
        edits.push({start:index.getStart(ast),end:index.end,text:String(entry.target)});
      }
    }
    ts.forEachChild(node,visit);
  }
  visit(ast);let result=source;for(const edit of edits.sort((a,b)=>b.start-a.start))result=result.slice(0,edit.start)+edit.text+result.slice(edit.end);
  await writeFile(file,result);
}
const file=new URL("../app/data/episode2.compact.generated.json",import.meta.url), scenes=JSON.parse(await readFile(file,"utf8"));
for(const scene of scenes){const q=scene.quiz,entry=targets[1].get(q.question);if(!entry)continue;q.options=reordered(q.options.map(value=>({value})),entry).map(v=>v.value);q.correctIndex=entry.target;}
await writeFile(file,JSON.stringify(scenes,null,2)+"\n");
