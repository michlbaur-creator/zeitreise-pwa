import { jsPDF } from "jspdf";
import type { LearningPathDefinition, LearningProgress } from "../data/learningPath";

/** Render with browser fonts so pupils' Unicode names survive PDF export on iOS too. */
export function createCertificatePdf(path: LearningPathDefinition, saved: LearningProgress, name: string, date: string): Blob {
  const canvas = document.createElement("canvas");
  canvas.width = 1240;
  canvas.height = 1754;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.fillStyle = "#fffdf7";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#176b73";
  ctx.lineWidth = 5;
  ctx.strokeRect(50, 50, 1140, 1654);
  ctx.lineWidth = 1;
  ctx.strokeRect(65, 65, 1110, 1624);
  ctx.fillStyle = "#203d46";
  ctx.textBaseline = "top";
  function lines(text: string, x: number, y: number, width: number, size: number, bold = false, centered = false) {
    ctx!.font = `${bold ? "700" : "400"} ${size}px Arial, sans-serif`;
    const rows: string[] = [];
    let row = "";
    // Character wrapping also handles a long unbroken name without clipping.
    for (const word of text.split(/\s+/)) {
      const candidate = row ? `${row} ${word}` : word;
      if (ctx!.measureText(candidate).width <= width) { row = candidate; continue; }
      if (row) rows.push(row);
      row = "";
      for (const char of word) {
        if (ctx!.measureText(row + char).width > width && row) { rows.push(row); row = ""; }
        row += char;
      }
    }
    if (row) rows.push(row);
    for (const value of rows) {
      ctx!.fillText(value, centered ? x + (width - ctx!.measureText(value).width) / 2 : x, y);
      y += size * 1.45;
    }
    return y;
  }
  lines("ZEITREISE · DEIN LERNPASS", 130, 125, 980, 25, true, true);
  lines("Urkunde", 130, 210, 980, 80, true, true);
  lines("für", 130, 340, 980, 25, false, true);
  let y = lines(name.trim() || "________________________________", 130, 395, 980, 43, true, true) + 40;
  y = lines("Du hast im Lernpfad", 130, y, 980, 27, false, true) + 18;
  y = lines(path.title, 130, y, 980, 43, true, true) + 35;
  const completed = saved.scores.filter(s => s !== null).length;
  const points = saved.scores.reduce<number>((sum, s) => sum + (s ?? 0), 0);
  y = lines(`${completed} von 5 Stationen bearbeitet und`, 130, y, 980, 29, false, true);
  y = lines(`${points} von 10 Wissenspunkten gesammelt.`, 130, y, 980, 29, true, true) + 55;
  for (const [i, station] of path.stations.entries()) {
    const end = lines(station.title, 140, y, 740, 27);
    lines(saved.scores[i] === null ? "noch offen" : `${saved.scores[i]} / 2`, 915, y, 190, 25, true);
    y = Math.max(end, y + 39) + 20;
    ctx.strokeStyle = "#cbd9d6";
    ctx.beginPath(); ctx.moveTo(140, y); ctx.lineTo(1100, y); ctx.stroke();
    y += 20;
  }
  lines(`${completed === 5 ? "Lernpfad abgeschlossen" : "Persönlicher Zwischenstand"} · ${date}`, 130, Math.max(y + 35, 1450), 980, 26, false, true);
  lines("Zeitreise · evo.mibaso.de · Persönlicher Lernnachweis", 130, 1610, 980, 22, false, true);
  const pdf = new jsPDF({ unit: "mm", format: "a4", compress: true });
  pdf.setProperties({ title: `Zeitreise – ${path.title}`, author: "Zeitreise · mibaso.de" });
  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297);
  return pdf.output("blob");
}
