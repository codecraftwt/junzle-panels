import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({ title, value, change, isPositive = true, subtext, icon: Icon, accentColor = '#1A56DB' }) {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '14px',
      border: '1px solid #E2E8F0',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Accent Top Border Line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        backgroundColor: accentColor,
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {title}
          </span>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0D1B3E', marginTop: '6px', letterSpacing: '-0.5px' }}>
            {value}
          </div>
        </div>
        {Icon && (
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            backgroundColor: `${accentColor}14`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: accentColor,
          }}>
            <Icon size={22} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '12px',
          fontWeight: 700,
          color: isPositive ? '#16A34A' : '#DC2626',
        }}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{change}</span>
        </div>
        <span style={{ fontSize: '11px', color: '#94A3B8' }}>{subtext}</span>
      </div>
    </div>
  );
}
