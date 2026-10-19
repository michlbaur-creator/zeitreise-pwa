export type ReadingCue = { at: number; text: string };

/** Keep existing timestamps when the cues cover exactly the approved narration. */
export function readingCues(text: string, timed?: readonly ReadingCue[]): ReadingCue[] {
  const normal = (value: string) => value.replace(/\s+/g, " ").trim();
  if (timed?.length && normal(timed.map(c=>c.text).join(" ")) === normal(text)) {
    const grouped: ReadingCue[] = [];
    let current: ReadingCue | undefined;
    for (const cue of timed) {
      if (current && current.text.length + cue.text.length > 220) {
        grouped.push(current); current = undefined;
      }
      current = current ? { at: current.at, text: `${current.text} ${cue.text}` } : { ...cue };
    }
    if (current) grouped.push(current);
    return grouped;
  }
  const sections: string[] = [];
  let current = "";
  for (const word of text.match(/\S+\s*/g) ?? []) {
    if (current && current.length + word.length > 200) { sections.push(current); current = ""; }
    current += word;
    if (current.length >= 130 && /[.!?;:][“”»)]?\s*$/.test(current)) { sections.push(current); current = ""; }
  }
  if (current) sections.push(current);
  const weights = sections.map(s=>(s.match(/\S+/g)?.length ?? 0)+(s.match(/[.!?;:]/g)?.length ?? 0)*1.5);
  const total = weights.reduce((a,b)=>a+b,0);
  let passed = 0;
  return sections.map((section,i)=>{ const cue = {at: total ? passed / total : 0, text:section}; passed+=weights[i]; return cue; });
}

export function readingTextAt(cues: readonly ReadingCue[], progress: number): string {
  return cues.reduce((found,cue)=>progress>=cue.at ? cue.text : found,cues[0]?.text ?? "");
}
