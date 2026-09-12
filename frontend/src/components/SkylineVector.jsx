import React from 'react';

const SKYLINE_PATH = "M0,120 L0,90 L30,90 L30,70 L50,70 L50,90 L80,90 L80,50 L110,50 L110,90 L140,90 L140,40 L160,40 L160,20 L180,20 L180,40 L200,40 L200,90 L230,90 L230,60 L260,60 L260,90 L300,90 L300,30 L330,30 L330,90 L370,90 L370,50 L400,50 L400,90 L450,90 L450,15 L480,15 L480,90 L520,90 L520,40 L550,40 L550,90 L600,90 L600,60 L630,60 L630,90 L680,90 L680,25 L710,25 L710,90 L760,90 L760,45 L790,45 L790,90 L840,90 L840,35 L870,35 L870,90 L920,90 L920,55 L950,55 L950,90 L1000,90 L1000,20 L1030,20 L1030,90 L1080,90 L1080,50 L1110,50 L1110,90 L1150,90 L1150,65 L1200,65 L1200,120 Z";

// Lighten/darken a hex color by percent (-100 to 100)
const shade = (hex, percent) => {
  const n = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const r = Math.min(255, Math.max(0, (n >> 16) + amt));
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + amt));
  const b = Math.min(255, Math.max(0, (n & 0xff) + amt));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

export default function SkylineVector({ opacity = 0.15, fill = "#0B1F3A", height = "70px" }) {
  const top = shade(fill, 22);
  const bottom = shade(fill, -32);

  return (
    <div style={{ width: '100%', height, overflow: 'hidden', pointerEvents: 'none' }}>
      <div
        className="skyline-drift"
        style={{
          display: 'flex', width: '200%', height: '100%', opacity,
          filter: `drop-shadow(0 -3px 14px ${fill}66)`,
        }}
      >
        {[0, 1].map((i) => (
          <svg
            key={i}
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ width: '50%', height: '100%', flexShrink: 0 }}
          >
            <defs>
              <linearGradient id={`skylineGrad-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={top} />
                <stop offset="55%" stopColor={fill} />
                <stop offset="100%" stopColor={bottom} />
              </linearGradient>
            </defs>
            <path fill={`url(#skylineGrad-${i})`} d={SKYLINE_PATH} />
          </svg>
        ))}
      </div>
    </div>
  );
}
