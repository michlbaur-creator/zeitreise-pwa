import type { Metadata } from "next";
import LearningPath from "../lernpfad/LearningPath";
export const metadata: Metadata = { title: "Lernpfad · Vom Dorf zur Stadt | Zeitreise", description: "Vorräte, Schrift und Macht: fünf Stationen mit deinem eigenen Lernpass." };
export default function Page() { return <LearningPath pathId="stadt" />; }
