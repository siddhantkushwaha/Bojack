import type { Metadata } from "next";
import Link from "next/link";
import workoutData from "@/data/workouts.json";
import { WorkoutExplorer } from "@/components/WorkoutExplorer";

export const metadata: Metadata = {
  title: "Training",
  description: "Strength training volume, estimated 1RMs, and personal records.",
};

const formatNumber = (value: number) => new Intl.NumberFormat("en-IN").format(value);
const formatCompact = (value: number) => new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(value);
const formatDecimal = (value: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 }).format(value);
const formatDate = (value: string) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
const smoothValues = (values: number[]) => values.map((value, index) => {
  if (index === 0 || index === values.length - 1) return value;
  return values[index - 1] * 0.25 + value * 0.5 + values[index + 1] * 0.25;
});
const chartPoints = (values: number[]) => {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  return values.map((value, index) => `${(index / Math.max(values.length - 1, 1)) * 240},${48 - ((value - min) / range) * 40}`).join(" ");
};

export default function FitnessPage() {
  const maxWeekVolume = Math.max(...workoutData.weeks.map((week) => week.volume));
  const recentMonths = workoutData.months.slice(-8);
  const maxMonthVolume = Math.max(...recentMonths.map((month) => month.volume));
  const maxDaySessions = Math.max(...workoutData.weekdays.map((day) => day.sessions));

  return (
    <div className="fitness-page">
      <header className="fitness-header">
        <div><p className="fitness-kicker">Training</p><h1>Training / 2025-26</h1></div>
        <p className="fitness-meta">{formatDate(workoutData.overview.dateStart)} - {formatDate(workoutData.overview.dateEnd)}<br /><Link href="/split">Current split</Link></p>
      </header>
      <section className="fitness-stats" aria-label="Training totals"><div><span>Sessions</span><strong>{formatNumber(workoutData.overview.sessions)}</strong></div><div><span>Working sets</span><strong>{formatNumber(workoutData.overview.sets)}</strong></div><div><span>Volume</span><strong>{formatNumber(workoutData.overview.volume)} <small>kg</small></strong></div><div><span>Average duration</span><strong>{workoutData.overview.avgSessionMinutes} <small>min</small></strong></div></section>
      <section className="fitness-section"><div className="fitness-section-heading"><div><p className="fitness-kicker">Weekly volume</p><h2>Last 16 weeks</h2></div><span>kg · max {formatNumber(maxWeekVolume)}</span></div><div className="fitness-bars weekly-bars" aria-label="Weekly volume chart">{workoutData.weeks.map((week) => <div className="fitness-bar-column" key={week.label}><strong>{formatCompact(week.volume)}</strong><div className="fitness-bar-track"><i style={{ height: `${Math.max(3, (week.volume / maxWeekVolume) * 100)}%` }} /></div><small>{week.label}</small></div>)}</div><p className="fitness-note">kg per bar · working sets</p></section>
      <section className="fitness-grid"><div className="fitness-section monthly-section"><div className="fitness-section-heading"><div><p className="fitness-kicker">Monthly volume</p><h2>Last 8 months</h2></div><span>kg · max {formatNumber(maxMonthVolume)}</span></div><div className="fitness-bars monthly-bars" aria-label="Monthly volume chart">{recentMonths.map((month) => <div className="fitness-bar-column" key={month.label}><strong>{formatCompact(month.volume)}</strong><div className="fitness-bar-track"><i style={{ height: `${Math.max(4, (month.volume / maxMonthVolume) * 100)}%` }} /></div><small>{month.label.split(" ")[0]}</small></div>)}</div></div><div className="fitness-section frequency-section"><div className="fitness-section-heading"><div><p className="fitness-kicker">Session frequency</p><h2>Weekday split</h2></div><span>sessions</span></div><div className="weekday-grid">{workoutData.weekdays.map((day) => <div key={day.day}><span>{day.day.slice(0, 2)}</span><b style={{ height: `${Math.max(4, (day.sessions / maxDaySessions) * 100)}%` }} /><strong>{day.sessions}</strong></div>)}</div></div></section>
      <section className="fitness-section trends-section"><div className="fitness-section-heading"><div><p className="fitness-kicker">Progression</p><h2>Movement trends</h2></div><span>estimated 1RM</span></div><div className="trend-list">{workoutData.trends.map((trend) => { const points = trend.points.filter((point) => point.estimated1RM > 0); const first = points[0]; const latest = points[points.length - 1]; const change = first && latest ? latest.estimated1RM - first.estimated1RM : 0; return <div className="trend-row" key={trend.name}><strong>{trend.name}</strong><svg viewBox="0 0 240 56" preserveAspectRatio="none" role="img" aria-label={`${trend.name} estimated 1RM trend`}><polyline points={chartPoints(smoothValues(points.map((point) => point.estimated1RM)))} /></svg><span>{latest ? `${formatDecimal(latest.estimated1RM)} kg` : "-"}<small>{change > 0 ? `+${formatDecimal(change)}` : formatDecimal(change)} kg</small></span></div>; })}</div></section>
      <section className="fitness-section pr-section"><div className="fitness-section-heading"><div><p className="fitness-kicker">Personal records</p><h2>Estimated 1RM</h2></div><span>Epley estimate</span></div><div className="pr-table"><div className="pr-table-head"><span>Movement</span><span>Best set</span><span>Max load</span><span>Est. 1RM</span></div>{workoutData.prs.map((exercise, index) => <div className="pr-row" key={exercise.name}><span className="pr-rank">{String(index + 1).padStart(2, "0")}</span><strong>{exercise.name}</strong><span>{exercise.bestSet?.weight} kg x {exercise.bestSet?.reps}</span><span>{exercise.maxWeight} kg</span><b>{formatDecimal(exercise.estimated1RM)} kg</b></div>)}</div><p className="fitness-note">Highest valid estimate per movement.</p></section>
      <section className="fitness-section pr-section"><div className="fitness-section-heading"><div><p className="fitness-kicker">Personal records</p><h2>Best set volume</h2></div><span>single working set</span></div><div className="pr-table"><div className="pr-table-head"><span>Movement</span><span>Best set</span><span>Volume</span></div>{workoutData.volumePrs.map((exercise, index) => <div className="pr-row volume-pr-row" key={exercise.name}><span className="pr-rank">{String(index + 1).padStart(2, "0")}</span><strong>{exercise.name}</strong><span>{exercise.bestVolumeSet?.weight} kg x {exercise.bestVolumeSet?.reps}</span><b>{formatNumber(exercise.bestVolume)} kg</b></div>)}</div><p className="fitness-note">kg x reps</p></section>
      <WorkoutExplorer sessions={workoutData.sessions} />
    </div>
  );
}