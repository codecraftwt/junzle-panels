import React from 'react';

export default function JunzleLogo({
  variant = 'dark',
  height = 36,
  showBadge = false,
  badgeText = 'SUPER ADMIN',
}) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      <img
        src="/assets/junzle-logo.png"
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
