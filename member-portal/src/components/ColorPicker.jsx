import React from 'react';
import { Check } from 'lucide-react';

const PRESET_COLORS = [
  { name: 'Junzle Blue', hex: '#1A56DB' },
  { name: 'Canary Yellow', hex: '#FFEF00' },
  { name: 'Dark Navy', hex: '#0D1B3E' },
  { name: 'Crimson Red', hex: '#DC2626' },
  { name: 'Forest Green', hex: '#166534' },
  { name: 'Charcoal Black', hex: '#1E293B' },
  { name: 'Sky Blue', hex: '#0284C7' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Vibrant Orange', hex: '#EA580C' },
  { name: 'Royal Purple', hex: '#7C3AED' },
];

export default function ColorPicker({
  primaryColor,
  setPrimaryColor,
  secondaryColor,
  setSecondaryColor,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Primary Color Picker */}
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#0D1B3E', marginBottom: '8px' }}>
          Primary Jersey Color
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          {PRESET_COLORS.map((c) => {
            const isSelected = primaryColor.toUpperCase() === c.hex.toUpperCase();
            return (
              <button
                key={c.hex}
                type="button"
                onClick={() => setPrimaryColor(c.hex)}
                title={c.name}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: c.hex,
                  border: isSelected ? '3px solid #0D1B3E' : '2px solid #CBD5E1',
                  boxShadow: isSelected ? '0 0 0 2px #FFEF00' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.15s',
                  transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                {isSelected && (
                  <Check
                    size={18}
                    color={c.hex === '#FFFFFF' || c.hex === '#FFEF00' ? '#0D1B3E' : '#FFFFFF'}
                    strokeWidth={3}
                  />
                )}
              </button>
            );
          })}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '8px' }}>
            <span style={{ fontSize: '12px', color: '#64748B' }}>Custom:</span>
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              style={{ width: '34px', height: '34px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'none' }}
            />
          </div>
        </div>
      </div>

      {/* Secondary Color Picker */}
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#0D1B3E', marginBottom: '8px' }}>
          Secondary / Accent Color
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          {PRESET_COLORS.map((c) => {
            const isSelected = secondaryColor.toUpperCase() === c.hex.toUpperCase();
            return (
              <button
                key={c.hex}
                type="button"
                onClick={() => setSecondaryColor(c.hex)}
                title={c.name}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: c.hex,
                  border: isSelected ? '3px solid #0D1B3E' : '2px solid #CBD5E1',
                  boxShadow: isSelected ? '0 0 0 2px #FFEF00' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.15s',
                  transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                {isSelected && (
                  <Check
                    size={18}
                    color={c.hex === '#FFFFFF' || c.hex === '#FFEF00' ? '#0D1B3E' : '#FFFFFF'}
                    strokeWidth={3}
                  />
                )}
              </button>
            );
          })}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '8px' }}>
            <span style={{ fontSize: '12px', color: '#64748B' }}>Custom:</span>
            <input
              type="color"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              style={{ width: '34px', height: '34px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'none' }}
            />
          </div>
        </div>
      </div>

      {/* Live Jersey Preview Badge */}
      <div style={{
        marginTop: '12px',
        padding: '16px',
        backgroundColor: '#F8FAFC',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          backgroundColor: primaryColor,
          border: `4px solid ${secondaryColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: secondaryColor,
          fontWeight: 900,
          fontSize: '24px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        }}>
          #7
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0D1B3E' }}>Team Kit Uniform Preview</div>
          <div style={{ fontSize: '12px', color: '#64748B' }}>
            Primary: <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{primaryColor}</span> • Secondary: <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{secondaryColor}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
