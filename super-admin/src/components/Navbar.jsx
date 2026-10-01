import React, { useState } from 'react';
import { Search, Bell, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Navbar({ title, subtitle }) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header style={{
      height: '70px',
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E2E8F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      position: 'sticky',
      top: 0,
      zIndex: 40,
    }}>
      {/* Title & Page Header */}
      <div>
        <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#0D1B3E' }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Center Search Input */}
      <div style={{
        position: 'relative',
        width: '380px',
      }}>
        <Search
          size={16}
          color="#94A3B8"
          style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
        />
        <input
          type="text"
          placeholder="Global search teams, users, transaction IDs..."
          style={{
            width: '100%',
            padding: '9px 16px 9px 40px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            outline: 'none',
            fontSize: '13px',
            color: '#1E293B',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = '#1A56DB'; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.backgroundColor = '#F8FAFC'; }}
        />
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* System Health Status Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          backgroundColor: '#F0FDF4',
          border: '1px solid #BBF7D0',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 600,
          color: '#15803D'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#22C55E',
            display: 'inline-block'
          }}></span>
          <span>Phase 1 Dev Mode</span>
        </div>

        {/* Notifications Bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              color: '#475569',
              position: 'relative'
            }}
          >
            <Bell size={18} />
            <span style={{
              position: 'absolute',
              top: '7px',
              right: '7px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#1A56DB',
              border: '2px solid white'
            }}></span>
          </button>

          {showNotifications && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '46px',
              width: '320px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              padding: '16px',
              zIndex: 100
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: 700, fontSize: '14px', color: '#0D1B3E' }}>Admin Notifications</span>
                <span style={{ fontSize: '11px', color: '#1A56DB', fontWeight: 600, cursor: 'pointer' }}>Mark all read</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '8px', fontSize: '12px' }}>
                  <div style={{ fontWeight: 600, color: '#0D1B3E' }}>New Team Pending Review</div>
                  <div style={{ color: '#64748B', marginTop: '2px' }}>Ironclad Baseball Academy 12U submitted registration</div>
                  <div style={{ color: '#94A3B8', fontSize: '11px', marginTop: '4px' }}>15 minutes ago</div>
                </div>
                <div style={{ padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '8px', fontSize: '12px' }}>
                  <div style={{ fontWeight: 600, color: '#0D1B3E' }}>Stripe Payout Succeeded</div>
                  <div style={{ color: '#64748B', marginTop: '2px' }}>$4,280.00 transferred to Metro Elite Soccer</div>
                  <div style={{ color: '#94A3B8', fontSize: '11px', marginTop: '4px' }}>2 hours ago</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
