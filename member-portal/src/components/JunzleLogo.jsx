import React from 'react';

export default function JunzleLogo({
  variant = 'light', // 'dark' (for navy) or 'light' (for white) or 'icon-only'
  height = 36,
  showBadge = false,
  badgeText = 'PORTAL',
}) {
  const isDarkBg = variant === 'dark';
  const textColor = isDarkBg ? '#FFFFFF' : '#0D1B3E';

  if (variant === 'icon-only') {
    return (
      <svg
        width={height}
        height={height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'inline-block', verticalAlign: 'middle' }}
      >
        <rect width="100" height="100" rx="22" fill="#1A56DB" />
        <g transform="translate(18, 16) scale(0.68)">
          {/* Speed Lines */}
          <path d="M 0 68 L 22 68 L 18 73 L -4 73 Z" fill="#FFEF00" />
          <path d="M 8 58 L 28 58 L 24 63 L 4 63 Z" fill="#FFFFFF" />
          {/* Single Bold Italic J */}
          <g transform="skewX(-13) translate(14, 0)">
            <path d="M 32 10 L 68 10 L 65 22 L 53 22 L 48 42 L 40 42 L 43 30 L 43 22 L 32 22 Z" fill="#FFFFFF" />
            <path d="M 53 22 L 65 22 L 60 40 L 48 40 Z" fill="#FFFFFF" />
            <path d="M 46 48 L 57 48 L 53 60 C 51 68, 44 74, 34 74 C 23 74, 16 67, 18 57 L 29 57 C 28 61, 31 64, 35 64 C 39 64, 42 61, 43 57 Z" fill="#FFFFFF" />
            {/* Canary Yellow Lightning Bolt */}
            <polygon points="47,38 62,38 52,48 60,48 44,66 49,50 42,50" fill="#FFEF00" />
          </g>
        </g>
      </svg>
    );
  }

  const logoSrc = isDarkBg ? '/assets/junzle-logo.png' : '/assets/dark-logo.png';

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      <img
        src={logoSrc}
        alt="Junzle"
        style={{ height: `${height}px`, objectFit: 'contain' }}
      />
      {showBadge && (
        <span
          style={{
            fontSize: '10px',
            fontWeight: 800,
            letterSpacing: '0.8px',
            backgroundColor: '#FFEF00',
            color: '#0D1B3E',
            padding: '2px 8px',
            borderRadius: '4px',
            transform: 'skewX(-6deg)',
            display: 'inline-block',
          }}
        >
          {badgeText}
        </span>
      )}
    </div>
  );
}
