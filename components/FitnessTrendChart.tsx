"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";

export function FitnessTrendChart({
  points,
  label,
}: {
  points: { value: number }[];
  label: string;
}) {
  return (
    <div className="fitness-trend-chart" role="img" aria-label={label}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points} margin={{ top: 3, right: 0, bottom: 3, left: 0 }}>
          <YAxis domain={["dataMin", "dataMax"]} hide />
          <Tooltip formatter={(value) => `${Number(value).toFixed(1)} kg`} labelFormatter={() => ""} contentStyle={{ border: "1px solid var(--fitness-grid)", background: "var(--fitness-bg)", color: "var(--fitness-fg)", fontSize: 12 }} />
          <Line type="monotone" dataKey="value" stroke="var(--fitness-accent)" strokeWidth={2} dot={false} activeDot={{ r: 3 }} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
