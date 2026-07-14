'use client';

import { useMemo } from 'react';

export interface AreaChartPoint {
  label: string;
  value: number;
}

/**
 * Serializable format presets. Prefer these over `yFormat` when rendering the
 * chart from a React Server Component — functions cannot cross the server →
 * client boundary, but a string preset can.
 */
export type ValueFormat = 'number' | 'compact' | 'compact-usd' | 'usd-millions';

export function formatValue(format: ValueFormat, value: number): string {
  switch (format) {
    case 'compact':
      return Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
    case 'compact-usd':
      return `$${Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 2 }).format(value)}`;
    case 'usd-millions':
      return `$${value.toFixed(0)}M`;
    case 'number':
    default:
      return value.toLocaleString();
  }
}

export interface AreaChartProps {
  data: readonly AreaChartPoint[];
  height?: number;
  yTicks?: number;
  /** Function formatter (client components only). */
  yFormat?: (value: number) => string;
  /** Serializable format preset (safe to pass from server components). */
  valueFormat?: ValueFormat;
  stroke?: string;
  fillGradient?: [string, string];
  className?: string;
}

/**
 * Minimal SVG area chart used for the dashboard transaction-volume panel.
 * Switching to Recharts later is a drop-in if interactive tooltips are needed.
 */
export function AreaChart({
  data,
  height = 260,
  yTicks = 5,
  yFormat,
  valueFormat = 'number',
  stroke = '#8159FF',
  fillGradient = ['rgba(129, 89, 255, 0.45)', 'rgba(129, 89, 255, 0)'],
  className,
}: AreaChartProps) {
  const format = yFormat ?? ((v: number) => formatValue(valueFormat, v));
  const width = 1000; // virtual width — scales via viewBox
  const paddingLeft = 56;
  const paddingRight = 16;
  const paddingTop = 8;
  const paddingBottom = 28;
  const innerW = width - paddingLeft - paddingRight;
  const innerH = height - paddingTop - paddingBottom;

  const { path, area, ticks, xLabels } = useMemo(() => {
    if (data.length < 2) return { path: '', area: '', ticks: [], xLabels: [] };
    const values = data.map((d) => d.value);
    const max = Math.max(...values);
    const min = 0;
    const range = max - min || 1;
    const stepX = innerW / (data.length - 1);

    const points = data.map((d, i) => {
      const x = paddingLeft + i * stepX;
      const y = paddingTop + innerH - ((d.value - min) / range) * innerH;
      return [x, y, d] as const;
    });

    const pathStr = points
      .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
      .join(' ');

    const first = points[0];
    const last = points[points.length - 1];
    const areaStr = first && last
      ? `${pathStr} L${last[0].toFixed(2)},${paddingTop + innerH} L${first[0].toFixed(2)},${paddingTop + innerH} Z`
      : '';

    const ticksArr = Array.from({ length: yTicks }, (_, i) => {
      const t = i / (yTicks - 1);
      const value = max - t * range;
      const y = paddingTop + t * innerH;
      return { value, y };
    });

    const labelStep = Math.max(1, Math.floor(data.length / 6));
    const labels = data
      .map((d, i) => ({ x: paddingLeft + i * stepX, label: d.label, i }))
      .filter(({ i }) => i % labelStep === 0);

    return { path: pathStr, area: areaStr, ticks: ticksArr, xLabels: labels };
  }, [data, innerH, innerW, paddingLeft, paddingTop, yTicks]);

  if (data.length < 2) {
    return <div className={className} style={{ height }} />;
  }

  const gradientId = `area-fill-${data.length}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      width="100%"
      height={height}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fillGradient[0]} />
          <stop offset="100%" stopColor={fillGradient[1]} />
        </linearGradient>
      </defs>
      {ticks.map((t, i) => (
        <g key={i}>
          <line
            x1={paddingLeft}
            x2={width - paddingRight}
            y1={t.y}
            y2={t.y}
            stroke="rgba(35, 27, 85, 0.6)"
            strokeDasharray="3 6"
          />
          <text
            x={paddingLeft - 8}
            y={t.y + 4}
            textAnchor="end"
            fontSize="11"
            fill="#7A75A8"
          >
            {format(Math.max(0, Math.round(t.value)))}
          </text>
        </g>
      ))}
      <path d={area} fill={`url(#${gradientId})`} />
      <path d={path} stroke={stroke} strokeWidth={2} fill="none" strokeLinecap="round" />
      {xLabels.map((l, i) => (
        <text
          key={i}
          x={l.x}
          y={height - 8}
          textAnchor="middle"
          fontSize="11"
          fill="#7A75A8"
        >
          {l.label}
        </text>
      ))}
    </svg>
  );
}
