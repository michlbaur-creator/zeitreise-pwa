import { readFile } from "node:fs/promises";
import ts from "typescript";

export async function loadData(name) {
  async function asURL(url) {
    if (url.pathname.endsWith(".json")) return `data:text/javascript;base64,${Buffer.from(`export default ${await readFile(url,"utf8")}`).toString("base64")}`;
    let code = ts.transpileModule(await readFile(url,"utf8"), {compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
    for(const match of code.matchAll(/from ["'](\.[^"']+)["']/g)) {
      const file=match[1].endsWith(".json")?match[1]:`${match[1]}.ts`;
      code=code.replace(match[1],await asURL(new URL(file,url)));
    }
    return `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
  }
  return import(await asURL(new URL(`../app/data/${name}.ts`,import.meta.url)));
}

export async function quizEpisodes() {
  const a=await loadData("scenes"); const b=await loadData("episode2"); const c=await loadData("episode3");
  return [a.scenes.flatMap(s=>[s.quiz,a.followUpQuizzes[s.id]].filter(Boolean)), b.episodeTwoScenes.flatMap(s=>[s.quiz,s.followUpQuiz]), c.episodeThreeScenes.flatMap(s=>s.quiz)];
}
