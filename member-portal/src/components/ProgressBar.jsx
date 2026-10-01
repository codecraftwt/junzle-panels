import React from 'react';

export default function ProgressBar({ currentStep, totalSteps, stepLabel }) {
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#1A56DB', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Step {currentStep} of {totalSteps}: {stepLabel}
        </span>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>
          {progressPercent}% Complete
        </span>
      </div>

      <div style={{ width: '100%', height: '8px', backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${progressPercent}%`,
            height: '100%',
            backgroundColor: '#1A56DB',
            borderRadius: '999px',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}
