import type { Metadata } from "next";
import EpisodeThreePreview from "./EpisodeThreePreview";

export const metadata: Metadata = {
  title: "Episode 3 – Vom Wandern zum Bleiben | Zeitreise",
  description: "Episode 3 der Zeitreise: Vom Wandern zum Bleiben.",
};

export default function EpisodeThreePage() {
  return <EpisodeThreePreview />;
}
