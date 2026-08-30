import type { Metadata } from "next";
import EpisodeThreePreview from "./EpisodeThreePreview";

export const metadata: Metadata = {
  title: "Episode 3 – Vom Wandern zum Bleiben | Zeitreise",
  description: "Technische Vorschau zu Teil 1 von Episode 3: Vom Wandern zum Bleiben.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EpisodeThreePage() {
  return <EpisodeThreePreview />;
}
