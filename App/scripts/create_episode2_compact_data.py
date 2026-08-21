#!/usr/bin/env python3
"""Erzeugt die App-Daten der freigegebenen 14-Szenen-Kompaktfassung."""

from __future__ import annotations

import json
from pathlib import Path

from create_episode2_compact_draft import SCENES


APP_DIR = Path(__file__).resolve().parents[1]
SOURCE = APP_DIR / "app" / "data" / "episode2.generated.json"
TARGET = APP_DIR / "app" / "data" / "episode2.compact.generated.json"

SOURCE_SCENES = {
    1: [1, 2],
    2: [2, 3],
    3: [4, 5],
    4: [6, 7],
    5: [8, 9],
    6: [10],
    7: [11, 12],
    8: [13],
    9: [14],
    10: [15],
    11: [16],
    12: [17],
    13: [18, 19],
    14: [20],
}

AUDIO_DURATIONS = {
    1: 53.162667,
    2: 58.368,
    3: 49.664,
    4: 53.077333,
    5: 62.464,
    6: 58.282667,
    7: 53.930667,
    8: 55.210667,
    9: 43.178667,
    10: 67.157333,
    11: 66.645333,
    12: 58.026667,
    13: 66.986667,
    14: 56.576,
}


def unique(items):
    return list(dict.fromkeys(items))


def main():
    old_scenes = {
        scene["id"]: scene
        for scene in json.loads(SOURCE.read_text(encoding="utf-8"))
    }
    compact_scenes = []

    for compact in SCENES:
        scene_id = compact["id"]
        sources = [old_scenes[source_id] for source_id in SOURCE_SCENES[scene_id]]
        hotspots = [sources[0]["hotspots"][0]]
        second_hotspot = sources[-1]["hotspots"][-1]
        if second_hotspot["title"] == hotspots[0]["title"]:
            second_hotspot = sources[-1]["hotspots"][0]
        hotspots.append(second_hotspot)

        quiz = dict(sources[-1]["quiz"])
        quiz["kind"] = "stop" if scene_id in {6, 13} else "optional"
        duration = AUDIO_DURATIONS[scene_id]

        compact_scenes.append(
            {
                "id": scene_id,
                "title": compact["title"],
                "timeLabel": compact["time"],
                "duration": duration,
                "durationLabel": f"ca. {round(duration)} Sekunden",
                "function": compact["beat"],
                "background": compact["reuse"],
                "camera": unique(
                    item for source in sources for item in source["camera"]
                ),
                "animation": unique(
                    item for source in sources for item in source["animation"]
                ),
                "sounds": unique(
                    item for source in sources for item in source["sounds"]
                ),
                "speaker": compact["speaker"],
                "audioPath": f"/assets/episode2/audio/sprecher-szene-{scene_id:02d}-v1.m4a",
                "hotspots": hotspots,
                "quiz": quiz,
                "transition": sources[-1]["transition"],
                "science": compact["uncertainty"],
            }
        )

    TARGET.write_text(
        json.dumps(compact_scenes, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(TARGET)


if __name__ == "__main__":
    main()
