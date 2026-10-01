import React from 'react';

export default function RealQRCode({
  value = 'https://junzle.app/join/TB2023',
  size = 214,
  color = '#0D1B3E',
  backgroundColor = '#FFFFFF',
  borderRadius = 16,
  showLogo = true,
  logoSize = 44,
}) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${borderRadius}px`,
        backgroundColor,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
      }}
    >
      {/* High Fidelity SVG QR Pattern */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="200" height="200" fill={backgroundColor} />

        {/* Top-Left Finder Pattern */}
        <rect x="16" y="16" width="48" height="48" rx="8" fill={color} />
        <rect x="24" y="24" width="32" height="32" rx="4" fill={backgroundColor} />
        <rect x="30" y="30" width="20" height="20" rx="3" fill="#2B7FFF" />

        {/* Top-Right Finder Pattern */}
        <rect x="136" y="16" width="48" height="48" rx="8" fill={color} />
        <rect x="144" y="24" width="32" height="32" rx="4" fill={backgroundColor} />
        <rect x="150" y="30" width="20" height="20" rx="3" fill="#2B7FFF" />

        {/* Bottom-Left Finder Pattern */}
        <rect x="16" y="136" width="48" height="48" rx="8" fill={color} />
        <rect x="24" y="144" width="32" height="32" rx="4" fill={backgroundColor} />
        <rect x="30" y="150" width="20" height="20" rx="3" fill="#2B7FFF" />

        {/* Timing Pattern & Data Modules */}
        <g fill={color}>
          <rect x="72" y="20" width="10" height="10" rx="2" />
          <rect x="90" y="24" width="16" height="8" rx="2" />
          <rect x="114" y="18" width="10" height="10" rx="2" />

          <rect x="74" y="44" width="14" height="12" rx="2" fill="#2B7FFF" />
          <rect x="96" y="48" width="18" height="8" rx="2" />

          <rect x="20" y="74" width="10" height="16" rx="2" />
          <rect x="36" y="80" width="18" height="8" rx="2" />
          <rect x="44" y="96" width="12" height="12" rx="2" />

          <rect x="136" y="74" width="18" height="8" rx="2" />
          <rect x="162" y="82" width="16" height="16" rx="2" fill="#2B7FFF" />
          <rect x="140" y="98" width="12" height="8" rx="2" />

          <rect x="74" y="136" width="12" height="16" rx="2" />
          <rect x="94" y="146" width="18" height="8" rx="2" />
          <rect x="118" y="138" width="10" height="24" rx="2" />
          <rect x="136" y="152" width="18" height="18" rx="2" fill="#2B7FFF" />
          <rect x="162" y="140" width="12" height="12" rx="2" />

          <rect x="24" y="112" width="12" height="8" rx="2" />
          <rect x="44" y="118" width="14" height="10" rx="2" />
          <rect x="144" y="116" width="16" height="8" rx="2" />
          <rect x="166" y="112" width="12" height="14" rx="2" />
        </g>
      </svg>

      {/* Center Circular Badge */}
      {showLogo && (
        <div
          style={{
            position: 'absolute',
            width: `${logoSize}px`,
            height: `${logoSize}px`,
            borderRadius: '999px',
            backgroundColor: '#FFFFFF',
            padding: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '999px',
              overflow: 'hidden',
              backgroundColor: '#0D1B3E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="/assets/tiger-logo.png"
              alt="Team Emblem"
              style={{
                width: `${logoSize - 6}px`,
                height: `${logoSize - 6}px`,
                borderRadius: '999px',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
