"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type BarDatum = { label: string; value: number };
type ValueFormat = "compact" | "number";

const formatValue = (value: number, format: ValueFormat) => new Intl.NumberFormat("en-IN", format === "compact" ? { notation: "compact", maximumFractionDigits: 1 } : undefined).format(value);

export function FitnessBarChart({
  bars,
  max,
  className = "",
  valueFormat,
  ariaLabel,
}: {
  bars: BarDatum[];
  max: number;
  className?: string;
  valueFormat: ValueFormat;
  ariaLabel: string;
}) {
  const [isNarrow, setIsNarrow] = useState(false);
  const isLongChart = bars.length > 10;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    const update = () => setIsNarrow(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const chartWidth = isLongChart ? 520 : 280;

  return (
    <div className="fitness-chart-scroll">
      <div className={`fitness-recharts ${className}`} style={{ width: isNarrow ? `${chartWidth}px` : "100%", minWidth: `${chartWidth}px` }} role="img" aria-label={ariaLabel}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bars} margin={{ top: 28, right: 0, bottom: 10, left: 0 }} barCategoryGap={0} barGap={0} barSize={isLongChart ? (isNarrow ? 30 : 52) : (isNarrow ? 32 : 48)}>
            <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "var(--fitness-muted)", fontSize: 12 }} interval={isNarrow && isLongChart ? 1 : 0} />
            <YAxis domain={[0, max]} hide />
            <Tooltip cursor={{ fill: "color-mix(in srgb, var(--fitness-accent) 8%, transparent)" }} formatter={(value) => formatValue(Number(value), valueFormat)} labelFormatter={(label) => String(label)} contentStyle={{ border: "1px solid var(--fitness-grid)", background: "var(--fitness-bg)", color: "var(--fitness-fg)", fontSize: 12 }} />
            <Bar dataKey="value" fill="var(--fitness-accent)" radius={[1, 1, 0, 0]}>
              <LabelList dataKey="value" position="top" formatter={(value) => formatValue(Number(value), valueFormat)} fill="var(--fitness-muted)" fontSize={11} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
