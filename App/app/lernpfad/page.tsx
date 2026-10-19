import type { Metadata } from "next";
import LearningPath from "./LearningPath";
export const metadata: Metadata = { title: "Lernpfad · Vom Wandern zum Bleiben | Zeitreise", description: "Fünf Stationen, zehn Quizfragen und dein persönlicher Lernpass." };
export default function Page() { return <LearningPath />; }
