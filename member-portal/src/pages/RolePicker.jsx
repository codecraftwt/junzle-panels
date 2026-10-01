import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';


export default function RolePicker() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const path = searchParams.get('path') || 'create';
  const isCreate = path === 'create';

  const createRoles = [
    {
      icon: '/assets/coach.png',
      title: 'Coach',
      desc: 'Build a single team roster, customize jersey colors, and invite parents.',
      badge: 'Most Popular',
      badgeStyle: { background: '#FFEF00', color: '#0D1B3E' },
      to: '/flow/coach',
    },
    {
      icon: '/assets/admin.png',
      title: 'Club Owner',
      desc: 'Establish a multi-team organization, assign age division coaches.',
      badge: 'Multi-Team',
      badgeStyle: { background: '#EFF6FF', color: '#015CFE' },
      to: '/flow/club-owner',
    },
    {
      icon: '/assets/admin.png',
      title: 'League Admin',
      desc: 'Govern regional youth leagues, schedule tournament brackets.',
      badge: 'Governance',
      badgeStyle: { background: '#EFF6FF', color: '#015CFE' },
      to: '/flow/league-admin',
    },
  ];

  const findRoles = [
    {
      icon: '/assets/parent.png',
      title: 'Parent',
      desc: "Connect to your athlete's team via invite link or QR scan.",
      badge: 'Primary Contact',
      badgeStyle: { background: '#FFEF00', color: '#0D1B3E' },
      to: '/flow/parent',
    },
    {
      icon: '/assets/person.png',
      title: 'Player',
      desc: 'Search your squad by name, select jersey number, and access schedules.',
      badge: 'Athlete',
      badgeStyle: { background: '#EFF6FF', color: '#015CFE' },
      to: '/flow/player',
    },
    {
      icon: null,
      emoji: '📣',
      title: 'Fan / Spectator',
      desc: 'Follow local teams, receive live game score updates, and view brackets.',
      badge: 'Lightweight',
      badgeStyle: { background: '#EFF6FF', color: '#015CFE' },
      to: '/flow/fan',
    },
  ];

  const roles = isCreate ? createRoles : findRoles;

  return (
    <div className="webRolePickerPage">
      {/* Navbar */}
      <header className="webFlowNavbar">
        <button className="webBtnBack" style={{ margin: 0, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#475569' }} onClick={() => navigate('/')}>
          ← Back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="/assets/dark-logo.png" alt="Junzle" style={{ height: 28, objectFit: 'contain' }} />
        </div>
      </header>

      <div className="webRolePickerBody">
        {/* Path badge */}
        <div style={{ fontSize: 11, fontWeight: 800, color: '#015CFE', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
          {isCreate ? 'Path A: Leadership Roles' : 'Path B: Participation Roles'}
        </div>

        <div className="webRolePickerTitle">
          {isCreate ? 'Select Your Leadership Role' : 'How Are You Joining?'}
        </div>
        <div className="webRolePickerSub">
          {isCreate
            ? 'Choose your administrative level to begin team or league creation.'
            : 'Choose your role to search rosters and connect with your team.'}
        </div>

        <div className="webRolePickerGrid">
          {roles.map((r) => (
            <div
              key={r.title}
              className="webRolePickerCard"
              onClick={() => navigate(r.to)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate(r.to)}
            >
              <div className="webRolePickerIconBox">
                {r.icon ? (
                  <img src={r.icon} alt={r.title} />
                ) : (
                  <span style={{ fontSize: 28 }}>{r.emoji}</span>
                )}
              </div>
              <div className="webRolePickerCardTitle">
                {r.title}
                {r.badge && (
                  <span style={{ ...r.badgeStyle, fontSize: 10, fontWeight: 800, padding: '2px 7px', borderRadius: 4, marginLeft: 8, verticalAlign: 'middle' }}>
                    {r.badge}
                  </span>
                )}
              </div>
              <div className="webRolePickerCardDesc">{r.desc}</div>
              <div style={{ marginTop: 'auto', paddingTop: 16, color: '#015CFE', fontWeight: 700, fontSize: 13 }}>
                Get Started →
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => navigate(isCreate ? '/role-picker?path=find' : '/role-picker?path=create')}
            style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 700, color: '#015CFE', textDecoration: 'underline', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
          >
            {isCreate ? 'Switch to Find My Team (Parents, Players, Fans)' : 'Switch to Create Team / League'}
          </button>
        </div>
      </div>
    </div>
  );
}
