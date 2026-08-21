import type { Metadata } from "next";
import EpisodeTwoApp from "./EpisodeTwoApp";

export const metadata: Metadata = {
  title: "Episode 2 – Die Entwicklung des Menschen | Zeitreise",
  description: "Noch unvollständige Testfassung: Eine verzweigte Geschichte der Entwicklung des Menschen.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EpisodeTwoPage() {
  return <EpisodeTwoApp />;
}
