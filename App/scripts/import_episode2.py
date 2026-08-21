#!/usr/bin/env python3
"""Importiert die freigegebenen Szenenblätter von Episode 2 in App-Daten."""

from __future__ import annotations

import json
import re
from pathlib import Path
from xml.etree import ElementTree as ET
from zipfile import ZipFile


APP_DIR = Path(__file__).resolve().parents[1]
SOURCE = (
    APP_DIR.parent
    / "Dokumente"
    / "02_Verbindlich"
    / "Zeitreise_Episode2_Musterepisode_V1.0.docx"
)
TARGET = APP_DIR / "app" / "data" / "episode2.generated.json"
W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"

SECTION_LABELS = {
    "Dramaturgische Funktion": "function",
    "Hintergrund und Bildinhalt": "background",
    "Kamera": "camera",
    "Animation in der App": "animation",
    "Geräusche und Atmosphäre": "sounds",
    "Sprechertext - final": "speaker",
    "Übergang": "transition",
    "Fachlicher Hinweis": "science",
}


def paragraphs() -> list[tuple[str, str]]:
    with ZipFile(SOURCE) as archive:
        root = ET.fromstring(archive.read("word/document.xml"))
    result: list[tuple[str, str]] = []
    for para in root.findall(f".//{W}body/{W}p"):
        text = "".join(node.text or "" for node in para.findall(f".//{W}t")).strip()
        if not text:
            continue
        style_node = para.find(f"./{W}pPr/{W}pStyle")
        style = style_node.get(f"{W}val", "") if style_node is not None else ""
        result.append((style, text))
    return result


def parse_scenes() -> list[dict]:
    rows = paragraphs()
    starts: list[int] = []
    for index, (style, text) in enumerate(rows):
        if style == "berschrift2" and re.match(r"^(?:[1-9]|1\d|20)\. ", text):
            starts.append(index)

    scenes: list[dict] = []
    for scene_index, start in enumerate(starts):
        if scene_index + 1 < len(starts):
            end = starts[scene_index + 1]
        else:
            end = next(
                (
                    index
                    for index in range(start + 1, len(rows))
                    if rows[index][0] == "berschrift1"
                ),
                len(rows),
            )
        block = rows[start:end]
        match = re.match(r"^(\d+)\. (.+)$", block[0][1])
        if not match:
            raise ValueError(f"Ungültige Szenenüberschrift: {block[0][1]}")

        scene: dict = {
            "id": int(match.group(1)),
            "title": match.group(2),
            "timeLabel": "",
            "duration": 0,
            "durationLabel": "",
            "function": "",
            "background": "",
            "camera": [],
            "animation": [],
            "sounds": [],
            "speaker": "",
            "hotspots": [],
            "quiz": None,
            "transition": "",
            "science": "",
        }
        current: str | None = None
        hotspot: dict | None = None
        quiz: dict | None = None

        for style, text in block[1:]:
            if text.startswith("Zeitangabe: "):
                scene["timeLabel"] = text.removeprefix("Zeitangabe: ")
                current = None
                continue
            if text.startswith("Dauer: "):
                scene["durationLabel"] = text.removeprefix("Dauer: ")
                seconds = re.search(r"(\d+) Sekunden", text)
                scene["duration"] = int(seconds.group(1)) if seconds else 0
                current = None
                continue
            if text in SECTION_LABELS:
                current = SECTION_LABELS[text]
                hotspot = None
                quiz = None
                continue
            hotspot_match = re.match(r"^Hotspot (\d+): (.+)$", text)
            if hotspot_match:
                hotspot = {"label": f"Hotspot {hotspot_match.group(1)}", "title": hotspot_match.group(2), "text": ""}
                scene["hotspots"].append(hotspot)
                current = "hotspot"
                quiz = None
                continue
            if "Quizfrage - verbindlich" in text or "Quizmoment" in text:
                quiz = {"kind": "stop" if "Quizmoment" in text else "optional", "question": "", "options": [], "correctIndex": -1}
                scene["quiz"] = quiz
                current = "quiz-question"
                hotspot = None
                continue
            if current == "hotspot" and hotspot is not None:
                hotspot["text"] = text
                continue
            if current == "quiz-question" and quiz is not None:
                quiz["question"] = text
                current = "quiz-options"
                continue
            if current == "quiz-options" and quiz is not None and style == "Aufzhlungszeichen":
                is_correct = text.startswith("[RICHTIG]")
                option = re.sub(r"^\[(?:RICHTIG| )\]\s*", "", text)
                if is_correct:
                    quiz["correctIndex"] = len(quiz["options"])
                quiz["options"].append(option)
                continue
            if current in {"camera", "animation", "sounds"}:
                scene[current].append(text)
                continue
            if current in {"function", "background", "speaker", "transition", "science"}:
                scene[current] = text if not scene[current] else f"{scene[current]} {text}"

        if len(scene["hotspots"]) != 2 or scene["quiz"] is None:
            raise ValueError(f"Szene {scene['id']}: Hotspots oder Quiz unvollständig")
        if scene["quiz"]["correctIndex"] < 0 or len(scene["quiz"]["options"]) != 4:
            raise ValueError(f"Szene {scene['id']}: Quizantworten unvollständig")
        scenes.append(scene)

    if [scene["id"] for scene in scenes] != list(range(1, 21)):
        raise ValueError("Episode 2 muss genau die Szenen 1 bis 20 enthalten")
    return scenes


def main() -> None:
    TARGET.parent.mkdir(parents=True, exist_ok=True)
    TARGET.write_text(json.dumps(parse_scenes(), ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{TARGET}: 20 Szenen importiert")


if __name__ == "__main__":
    main()
