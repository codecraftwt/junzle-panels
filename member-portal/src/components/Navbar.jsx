import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import JunzleLogo from './JunzleLogo';

export default function Navbar({ showBack = false, onBack, title }) {
  const location = useLocation();
  const isFlowRoute =
    location.pathname === '/' ||
    location.pathname === '/role-picker' ||
    location.pathname.startsWith('/flow');

  // Flow pages have their own built-in navbar
  if (isFlowRoute) {
    return null;
  }


  return (
    <header
      style={{
        height: '72px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {showBack && (
          <button
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: '#F1F5F9',
              color: '#334155',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        )}

        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/assets/dark-logo.png" alt="Junzle" style={{ height: 32, objectFit: 'contain' }} />
          <span
            style={{
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.8px',
              backgroundColor: '#FFEF00',
              color: '#0D1B3E',
              padding: '2px 8px',
              borderRadius: '4px',
              display: 'inline-block',
            }}
          >
            MEMBER PORTAL
          </span>
        </Link>

        {title && (
          <div style={{ height: '24px', width: '1px', backgroundColor: '#CBD5E1', margin: '0 8px' }} />
        )}
        {title && (
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#0D1B3E' }}>
            {title}
          </span>
        )}
      </div>

    </header>
  );
}
