'use client';

import { useMemo } from 'react';

export interface DonutSlice {
  label: string;
  value: number;
  color: string;
}

export interface DonutChartProps {
  data: readonly DonutSlice[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: string;
  className?: string;
}

/** Simple SVG donut. No animation; we'll add framer-motion when needed. */
export function DonutChart({
  data,
  size = 200,
  thickness = 22,
  centerLabel,
  centerValue,
  className,
}: DonutChartProps) {
  const radius = size / 2 - thickness / 2;
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((acc, s) => acc + s.value, 0) || 1;

  const segments = useMemo(() => {
    let offset = 0;
    return data.map((slice) => {
      const fraction = slice.value / total;
      const length = fraction * circumference;
      const seg = {
        ...slice,
        length,
        offset,
      };
      offset += length;
      return seg;
    });
  }, [data, total, circumference]);

  return (
    <div className={className} style={{ width: size, height: size, position: 'relative' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`translate(${size / 2}, ${size / 2}) rotate(-90)`}>
          <circle
            r={radius}
            fill="none"
            stroke="rgba(35, 27, 85, 0.6)"
            strokeWidth={thickness}
          />
          {segments.map((seg, i) => (
            <circle
              key={i}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={thickness}
              strokeDasharray={`${seg.length} ${circumference - seg.length}`}
              strokeDashoffset={-seg.offset}
              strokeLinecap="butt"
            />
          ))}
        </g>
      </svg>
      {(centerLabel || centerValue) && (
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
          aria-hidden="true"
        >
          {centerValue ? (
            <span className="text-xl font-semibold text-text-primary">{centerValue}</span>
          ) : null}
          {centerLabel ? (
            <span className="mt-0.5 text-xs text-text-tertiary">{centerLabel}</span>
          ) : null}
        </div>
      )}
    </div>
  );
}
