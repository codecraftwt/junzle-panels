import React from 'react';

export default function ScreenHeading({ title, subtitle, centered = false }) {
  return (
    <div className={`screenHeadingBlock ${centered ? 'screenHeadingBlock--centered' : ''}`}>
      <h1 className="screenHeadingTitle">{title}</h1>
      {subtitle && <div className="screenHeadingSubtitle">{subtitle}</div>}
    </div>
  );
}
