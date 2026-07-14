'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export type SalyChartPoint = { label: string; value: number };

const MONO = ['#7C3AED', '#a1a1aa', '#52525b', '#71717a', '#3f3f46', '#27272a'];

export function SalyBarChart({
  data,
  height = 240,
  horizontal = false,
}: {
  data: SalyChartPoint[];
  height?: number;
  horizontal?: boolean;
}) {
  const chartData = data.map((d) => ({ name: d.label, value: d.value }));

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout={horizontal ? 'vertical' : 'horizontal'}
          margin={{ top: 4, right: 8, left: horizontal ? 8 : 0, bottom: 0 }}
        >
          <CartesianGrid stroke="rgba(255,255,255,0.04)" horizontal={!horizontal} vertical={horizontal} />
          {horizontal ? (
            <>
              <XAxis type="number" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                width={100}
                tick={{ fill: '#71717a', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
            </>
          ) : (
            <>
              <XAxis dataKey="name" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} dy={8} />
              <YAxis tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
            </>
          )}
          <Tooltip
            contentStyle={{
              background: '#11131A',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              fontSize: 12,
            }}
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={32}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={i === 0 ? '#7C3AED' : MONO[(i + 1) % MONO.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SalyDonutChart({
  data,
  centerLabel,
  centerValue,
  size = 140,
}: {
  data: { label: string; value: number; color?: string }[];
  centerLabel?: string;
  centerValue?: string;
  size?: number;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius="68%"
            outerRadius="100%"
            stroke="none"
            paddingAngle={2}
          >
            {data.map((entry, i) => (
              <Cell key={entry.label} fill={entry.color ?? MONO[i % MONO.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: '#11131A',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(value, name) => {
              const n = Number(value ?? 0);
              return [
                `${n.toLocaleString()} (${total > 0 ? ((n / total) * 100).toFixed(1) : 0}%)`,
                String(name),
              ];
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      {centerValue ? (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-mono text-lg font-medium text-saly-text-primary">{centerValue}</p>
          {centerLabel ? <p className="text-[10px] uppercase tracking-wider text-saly-text-faint">{centerLabel}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
