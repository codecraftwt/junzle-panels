import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function RoleCard({ title, subtitle, icon: Icon, onClick, badge, accent = 'blue' }) {
  const isYellow = accent === 'yellow';

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: '28px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.borderColor = '#1A56DB';
        e.currentTarget.style.boxShadow = '0 12px 24px -4px rgba(26, 86, 219, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#E2E8F0';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {badge && (
        <span style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '0.5px',
          padding: '4px 10px',
          borderRadius: '999px',
          backgroundColor: isYellow ? '#FFEF00' : '#EFF6FF',
          color: isYellow ? '#0D1B3E' : '#1A56DB',
        }}>
          {badge}
        </span>
      )}

      <div>
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '14px',
          backgroundColor: '#EFF6FF',
          color: '#1A56DB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}>
          <Icon size={26} />
        </div>

        <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0D1B3E', marginBottom: '8px' }}>
          {title}
        </h3>

        <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.6', marginBottom: '24px' }}>
          {subtitle}
        </p>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '14px',
        fontWeight: 700,
        color: '#1A56DB',
      }}>
        <span>Continue Flow</span>
        <ArrowRight size={16} />
      </div>
    </div>
  );
}
