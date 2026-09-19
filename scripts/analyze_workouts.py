#!/usr/bin/env python3
"""Turn a Hevy CSV export into compact, portfolio-friendly workout data."""

import csv
import json
import sys
from collections import defaultdict
from datetime import datetime, timedelta
from pathlib import Path

DATE_FORMAT = "%d %b %Y, %H:%M"
MAX_WEIGHTED_REPS = 40


def number(value: str | None) -> float:
    try:
        return float(value or 0)
    except ValueError:
        return 0


def round_number(value: float) -> int | float:
    numeric_value = float(value)
    return int(numeric_value) if numeric_value.is_integer() else round(numeric_value, 1)


def analyse(source: Path) -> dict:
    with source.open(newline="", encoding="utf-8-sig") as handle:
        rows = list(csv.DictReader(handle))

    sessions: dict[tuple[str, str], dict] = {}
    exercises: dict[str, dict] = {}
    filtered_weighted_sets = 0
    for row in rows:
        key = (row["title"], row["start_time"])
        start = datetime.strptime(row["start_time"], DATE_FORMAT)
        end = datetime.strptime(row["end_time"], DATE_FORMAT)
        session = sessions.setdefault(key, {"title": row["title"], "start": start.isoformat(), "date": start.strftime("%Y-%m-%d"), "weekday": start.strftime("%a"), "month": start.strftime("%b"), "durationMinutes": round((end - start).total_seconds() / 60), "sets": 0, "volume": 0, "exercises": set(), "movementDetails": {}})
        weight = number(row.get("weight_kg"))
        reps = number(row.get("reps"))
        volume = weight * reps
        is_weighted_outlier = weight > 0 and reps > MAX_WEIGHTED_REPS
        if is_weighted_outlier and row.get("set_type") == "normal":
            filtered_weighted_sets += 1
        if row.get("set_type") == "normal":
            session["sets"] += 1
        if row.get("set_type") == "normal" and not is_weighted_outlier:
            session["volume"] += volume
        session["exercises"].add(row["exercise_title"])
        movement = session["movementDetails"].setdefault(row["exercise_title"], {"name": row["exercise_title"], "sets": 0, "workingSets": 0, "volume": 0, "bestSet": None, "setDetails": []})
        movement["sets"] += 1
        movement["setDetails"].append({"type": row.get("set_type", "normal"), "weight": round_number(weight), "reps": int(reps), "excluded": is_weighted_outlier})
        if row.get("set_type") == "normal":
            movement["workingSets"] += 1
            if not is_weighted_outlier:
                movement["volume"] += volume
                candidate_score = weight * (1 + reps / 30) if weight and 1 <= reps <= 15 else 0
                current_set = movement["bestSet"]
                current_score = current_set["weight"] * (1 + current_set["reps"] / 30) if current_set and current_set["weight"] else 0
                if current_set is None or candidate_score > current_score or (not candidate_score and not current_score and reps > current_set["reps"]):
                    movement["bestSet"] = {"weight": round_number(weight), "reps": int(reps)}
        exercise = exercises.setdefault(row["exercise_title"], {"name": row["exercise_title"], "sets": 0, "volume": 0, "sessions": set(), "bestWeight": 0, "estimated1RM": 0, "bestSet": None, "bestVolume": 0, "bestVolumeSet": None})
        if row.get("set_type") == "normal":
            exercise["sets"] += 1
            exercise["sessions"].add(key)
            if not is_weighted_outlier:
                exercise["volume"] += volume
                exercise["bestWeight"] = max(exercise["bestWeight"], weight)
                if volume > exercise["bestVolume"]:
                    exercise["bestVolume"] = volume
                    exercise["bestVolumeSet"] = {"weight": round_number(weight), "reps": int(reps)}
                if weight and 1 <= reps <= 15:
                    estimated_1rm = weight * (1 + reps / 30)
                    if estimated_1rm > exercise["estimated1RM"]:
                        exercise["estimated1RM"] = estimated_1rm
                        exercise["bestSet"] = {"weight": round_number(weight), "reps": int(reps)}

    clean_sessions = []
    for session in sorted(sessions.values(), key=lambda item: item["start"], reverse=True):
        session["exercises"] = len(session["exercises"])
        session["volume"] = round_number(session["volume"])
        session["movements"] = list(session.pop("movementDetails").values())
        for movement in session["movements"]:
            movement["volume"] = round_number(movement["volume"])
        clean_sessions.append(session)
    clean_exercises = []
    for exercise in exercises.values():
        exercise["sessions"] = len(exercise["sessions"])
        exercise["volume"] = round_number(exercise["volume"])
        exercise["maxWeight"] = round_number(exercise.pop("bestWeight"))
        exercise["estimated1RM"] = round_number(exercise["estimated1RM"])
        exercise["bestVolume"] = round_number(exercise["bestVolume"])
        clean_exercises.append(exercise)
    clean_exercises.sort(key=lambda item: item["volume"], reverse=True)

    trend_candidates = sorted(
        [item for item in clean_exercises if item["estimated1RM"] and item["sessions"] >= 4],
        key=lambda item: item["sessions"],
        reverse=True,
    )[:6]
    trends = []
    for exercise in trend_candidates:
        points = []
        for session in reversed(clean_sessions):
            movement = next((item for item in session["movements"] if item["name"] == exercise["name"]), None)
            if movement is None:
                continue
            best_set = movement["bestSet"]
            estimated_1rm = best_set["weight"] * (1 + best_set["reps"] / 30) if best_set and best_set["weight"] and 1 <= best_set["reps"] <= 15 else 0
            points.append({"date": session["date"], "estimated1RM": round_number(estimated_1rm), "volume": movement["volume"]})
        trends.append({"name": exercise["name"], "points": points})

    months = defaultdict(lambda: {"label": "", "sessions": 0, "volume": 0, "sets": 0})
    weeks = defaultdict(lambda: {"label": "", "sessions": 0, "volume": 0, "sets": 0})
    weekdays = defaultdict(int)
    for session in clean_sessions:
        month = session["start"][:7]
        months[month]["label"] = datetime.strptime(month, "%Y-%m").strftime("%b %Y")
        months[month]["sessions"] += 1
        months[month]["volume"] += session["volume"]
        months[month]["sets"] += session["sets"]
        week_start = datetime.fromisoformat(session["start"]).date() - timedelta(days=datetime.fromisoformat(session["start"]).weekday())
        week = week_start.isoformat()
        weeks[week]["label"] = week_start.strftime("%d %b")
        weeks[week]["sessions"] += 1
        weeks[week]["volume"] += session["volume"]
        weeks[week]["sets"] += session["sets"]
        weekdays[session["weekday"]] += 1

    total_volume = sum(session["volume"] for session in clean_sessions)
    total_sets = sum(session["sets"] for session in clean_sessions)
    prs = sorted([item for item in clean_exercises if item["estimated1RM"]], key=lambda item: item["estimated1RM"], reverse=True)[:8]
    volume_prs = sorted([item for item in clean_exercises if item["bestVolume"]], key=lambda item: item["bestVolume"], reverse=True)[:8]
    return {"generatedAt": datetime.now().isoformat(timespec="seconds"), "dataQuality": {"weightedRepLimit": MAX_WEIGHTED_REPS, "filteredWeightedSets": filtered_weighted_sets}, "overview": {"sessions": len(clean_sessions), "sets": total_sets, "volume": round_number(total_volume), "exercises": len(clean_exercises), "avgSessionMinutes": round(sum(item["durationMinutes"] for item in clean_sessions) / len(clean_sessions)), "dateStart": clean_sessions[-1]["date"], "dateEnd": clean_sessions[0]["date"]}, "sessions": clean_sessions, "exercises": clean_exercises, "prs": prs, "volumePrs": volume_prs, "trends": trends, "months": [months[key] for key in sorted(months)], "weeks": [weeks[key] for key in sorted(weeks)[-16:]], "weekdays": [{"day": day, "sessions": weekdays.get(day, 0)} for day in ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]]}


def main() -> None:
    source = Path(sys.argv[1] if len(sys.argv) > 1 else "temp/workout_data.csv")
    destination = Path(sys.argv[2] if len(sys.argv) > 2 else "data/workouts.json")
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(analyse(source), indent=2), encoding="utf-8")
    print(f"Wrote {destination} from {source}")


if __name__ == "__main__":
    main()