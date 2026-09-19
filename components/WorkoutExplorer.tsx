"use client";

import { useState } from "react";

type SetDetail = { type: string; weight: number; reps: number; excluded: boolean };
type Movement = { name: string; sets: number; workingSets: number; volume: number; bestSet: { weight: number; reps: number } | null; setDetails: SetDetail[] };
type WorkoutSession = { title: string; start: string; durationMinutes: number; sets: number; volume: number; exercises: number; movements: Movement[] };

const formatNumber = (value: number) => new Intl.NumberFormat("en-IN").format(value);
const formatDate = (value: string) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
const formatTime = (value: string) => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit" }).format(new Date(value));
const monthLabel = (value: Date) => new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(value);

function MonthlyCalendar({ sessions }: { sessions: WorkoutSession[] }) {
  const months = Array.from(new Set(sessions.map((session) => session.start.slice(0, 7)))).sort();
  const [monthIndex, setMonthIndex] = useState(months.length - 1);
  const [year, month] = (months[monthIndex] ?? months[0]).split("-").map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const leadingDays = (firstDay.getDay() + 6) % 7;
  const workoutDays = new Set(sessions.filter((session) => session.start.slice(0, 7) === months[monthIndex]).map((session) => session.start.slice(0, 10)));
  const cells = Array.from({ length: leadingDays + daysInMonth }, (_, index) => index < leadingDays ? null : index - leadingDays + 1);

  return <section className="calendar-section"><div className="fitness-section-heading"><div><p className="fitness-kicker">Training calendar</p><h2>Workout days</h2></div><span>{workoutDays.size} sessions</span></div><div className="calendar-card"><button type="button" className="calendar-nav" aria-label="Previous month" disabled={monthIndex === 0} onClick={() => setMonthIndex((index) => index - 1)}>&lt;</button><div className="calendar-content"><div className="calendar-title"><strong>{monthLabel(new Date(year, month - 1, 1))}</strong><span>{monthIndex + 1} / {months.length}</span></div><div className="calendar-weekdays">{["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => <span key={day}>{day}</span>)}</div><div className="calendar-days">{cells.map((day, index) => day === null ? <span className="calendar-empty" key={`empty-${index}`} /> : <span className={workoutDays.has(`${months[monthIndex]}-${String(day).padStart(2, "0")}`) ? "is-workout-day" : ""} key={day}>{day}</span>)}</div></div><button type="button" className="calendar-nav" aria-label="Next month" disabled={monthIndex === months.length - 1} onClick={() => setMonthIndex((index) => index + 1)}>&gt;</button></div></section>;
}

export function WorkoutExplorer({ sessions }: { sessions: WorkoutSession[] }) {
  const [query, setQuery] = useState("");
  const [selectedStart, setSelectedStart] = useState(sessions[0]?.start ?? "");
  const selected = sessions.find((session) => session.start === selectedStart) ?? sessions[0];
  const filteredSessions = sessions.filter((session) => `${session.title} ${formatDate(session.start)}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="workout-explorer">
      <div className="fitness-section-heading"><div><p className="fitness-kicker">History</p><h2>{sessions.length} workouts</h2></div><label className="workout-search"><span className="sr-only">Filter</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter" /></label></div>
      <div className="workout-explorer-grid">
        <div className="workout-list" role="listbox" aria-label="Workout history">
          {filteredSessions.map((session) => <button className={`workout-list-item ${selected?.start === session.start ? "is-selected" : ""}`} key={session.start} type="button" onClick={() => setSelectedStart(session.start)}><span>{formatDate(session.start)}</span><strong>{session.title.replace(/ [^ ]+$/, "")}</strong><small>{session.sets} sets · {formatNumber(session.volume)} kg</small></button>)}
          {filteredSessions.length === 0 && <p className="fitness-note">No matches.</p>}
        </div>
        {selected && <div className="workout-detail"><div className="workout-detail-header"><div><p className="fitness-kicker">Selected</p><h3>{formatDate(selected.start)}</h3><span>{formatTime(selected.start)} · {selected.durationMinutes} min</span></div><strong>{formatNumber(selected.volume)}<small> kg</small></strong></div><div className="workout-detail-stats"><span>{selected.exercises} movements</span><span>{selected.sets} working sets</span></div><div className="movement-list">{selected.movements.map((movement) => <details className="movement-detail" key={movement.name}><summary><strong>{movement.name}</strong><span>{movement.workingSets} sets · {formatNumber(movement.volume)} kg</span></summary><div className="set-grid"><span>Set</span><span>Weight</span><span>Reps</span>{movement.setDetails.map((set, index) => <div className={`set-row ${set.excluded ? "is-excluded" : ""}`} key={`${movement.name}-${index}`}><span>{index + 1}{set.type === "warmup" ? " · W" : ""}</span><span>{set.weight ? `${set.weight} kg` : "BW"}</span><span>{set.reps}{set.excluded ? " · filtered" : ""}</span></div>)}</div></details>)}</div></div>}
      </div>
      <MonthlyCalendar sessions={sessions} />
    </section>
  );
}