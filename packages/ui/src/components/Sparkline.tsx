'use client';

import { useMemo } from 'react';

export interface SparklineProps {
  data: readonly number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  className?: string;
}

/**
 * Pure-SVG, dependency-free sparkline. Recharts is overkill at this scale and
 * bloats the bundle; this primitive is used by the dashboard stat cards.
 */
export function Sparkline({
  data,
  width = 120,
  height = 40,
  stroke = '#8159FF',
  fill = 'url(#sparkFill)',
  strokeWidth = 1.5,
  className,
}: SparklineProps) {
  const { path, area } = useMemo(() => buildPaths(data, width, height), [data, width, height]);
  const gradientId = useMemo(
    () => `spark-fill-${Math.random().toString(36).slice(2, 8)}`,
    [],
  );

  if (data.length < 2) {
    return <svg width={width} height={height} className={className} />;
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity={0.45} />
          <stop offset="100%" stopColor={stroke} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill={fill === 'url(#sparkFill)' ? `url(#${gradientId})` : fill} />
      <path d={path} stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
    </svg>
  );
}

function buildPaths(data: readonly number[], width: number, height: number) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);

  const points = data.map((value, i) => {
    const x = i * stepX;
    const y = height - ((value - min) / range) * (height - 4) - 2;
    return [x, y] as const;
  });

  const path = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(' ');

  const first = points[0];
  const last = points[points.length - 1];
  const area = first && last
    ? `${path} L${last[0].toFixed(2)},${height} L${first[0].toFixed(2)},${height} Z`
    : '';

  return { path, area };
}
