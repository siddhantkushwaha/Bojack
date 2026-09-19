"use client";

import { useState } from "react";

const days = [
  {
    day: "Session 1",
    title: "Upper A",
    exercises: [
      ["Barbell Bench Press", "Build up to 1 top set x 4-6, then reduce load for 3 back-off sets x 5-8"],
      ["Weighted Pull-Up", "4 x 4-8"],
      ["Bent Over Row (Barbell)", "3 x 6-10"],
      ["Incline Bench Press (Dumbbell)", "3 x 8-12"],
      ["Lateral Raise (Dumbbell)", "3 x 12-20"],
      ["Overhead Triceps Extension (Cable)", "2-3 x 10-15"],
    ],
  },
  {
    day: "Session 2",
    title: "Lower A",
    exercises: [
      ["Squat (Barbell)", "Build up to 1 top set x 4-6, then reduce load for 3 back-off sets x 5-8"],
      ["Bulgarian Split Squat (Dumbbell)", "3 x 8-12 each leg"],
      ["Lying Leg Curl (Machine)", "3 x 8-15"],
      ["Standing Calf Raise (Machine)", "3 x 8-15"],
      ["Hip Abduction (Machine) / Cossack Squat", "2-3 x 12-20 or 6-10 each side"],
      ["Decline Crunch or Toes-to-Bar", "3 x 8-15"],
    ],
  },
  {
    day: "Session 3",
    title: "Upper B",
    exercises: [
      ["Dumbbell Bench Press", "4 x 8-12"],
      ["Chest Supported Incline Row (Dumbbell)", "4 x 8-12"],
      ["Shoulder Press (Dumbbell)", "3 x 6-10"],
      ["Lat Pulldown (Cable), medium-to-wide overhand grip", "3 x 8-12"],
      ["Lateral Raise (Cable)", "3 x 12-20"],
      ["Seated Incline Curl (Dumbbell)", "3 x 8-15"],
      ["Face Pull", "2-3 x 12-20"],
    ],
  },
  {
    day: "Session 4",
    title: "Lower B",
    exercises: [
      ["Romanian Deadlift (Barbell) / Single-Leg Romanian Deadlift (Dumbbell)", "3-4 x 6-10"],
      ["Leg Press (Machine)", "3 x 8-12"],
      ["Walking Lunge (Dumbbell)", "3 x 8-12 each leg"],
      ["Lying Leg Curl (Machine)", "3 x 10-15"],
      ["Seated Calf Raise", "3 x 12-20"],
      ["Hip Adduction (Machine) / Hip Internal and External Rotation", "2-3 x 12-20"],
      ["Leg Extension (Machine)", "3 x 10-15"],
    ],
  },
  {
    day: "Optional",
    title: "Optional",
    exercises: [
      ["Incline Bench Press (Dumbbell) / Chest Press (Machine) / Cable Fly Crossovers", "3 x 10-15"],
      ["Seated Cable Row - V Grip (Cable)", "3 x 10-15"],
      ["Lateral Raise (Dumbbell)", "3 x 15-25"],
      ["EZ Bar Biceps Curl", "3 x 10-15"],
      ["Overhead Triceps Extension (Cable)", "3 x 10-15"],
      ["Decline Crunch or Toes-to-Bar", "3 x 8-15"],
      ["Sled Push or Bike Intervals", "10-15 minutes"],
    ],
  },
] as const;

export function SplitViewer() {
  const [selected, setSelected] = useState(0);

  const selectDay = (index: number) => {
    setSelected(index);
    document.getElementById(days[index].day.toLowerCase().replaceAll(" ", "-"))?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="split-page">
      <header className="split-header">
        <div><p className="split-kicker">Training</p><h1>Current split</h1></div>
      </header>
      <nav className="split-tabs" aria-label="Training days">
        {days.map((item, index) => <button className={selected === index ? "is-active" : ""} key={item.day} type="button" onClick={() => selectDay(index)}>{item.title}</button>)}
      </nav>
      <div className="split-days">
        {days.map((item, index) => <section className={`split-day ${selected === index ? "is-selected" : ""}`} key={item.day} id={item.day.toLowerCase().replaceAll(" ", "-")}><div className="split-day-heading"><div><p className="split-kicker">{item.day}</p><h2>{item.title}</h2></div>{item.exercises.length > 0 && <span>{item.exercises.length} exercises</span>}</div>{item.exercises.length > 0 ? <ol>{item.exercises.map(([name, prescription]) => <li key={name}><strong>{name}</strong><span>{prescription}</span></li>)}</ol> : <p className="split-rest">Rest</p>}</section>)}
      </div>
    </main>
  );
}
