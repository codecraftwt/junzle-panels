import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function EntryScreen() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('coach');

  const handleGetStarted = () => {
    if (selectedRole === 'coach') navigate('/flow/coach');
    else if (selectedRole === 'parent') navigate('/flow/parent');
    else if (selectedRole === 'admin') navigate('/role-picker?path=create');
  };

  const roles = [
    {
      id: 'coach',
      icon: '/assets/coach.png',
      title: "I'm a Coach",
      desc: 'Manage teams, players, events and communicate with parents.',
    },
    {
      id: 'parent',
      icon: '/assets/parent.png',
      title: "I'm a Parent or Guardian",
      desc: "Stay updated on your child's team, events and communications.",
    },
    {
      id: 'admin',
      icon: '/assets/admin.png',
      title: "I'm an Administrator",
      desc: 'Oversee organization, team and system settings.',
    },
  ];

  return (
    <div className="webEntryPage">
      {/* Navbar */}
      <header className="webEntryNavbar">
        <div className="webFlowNavBrand">
          <img src="/assets/dark-logo.png" alt="Junzle" style={{ height: 30, objectFit: 'contain' }} />
        </div>
      </header>

      {/* Two-column hero */}
      <div className="webEntryBody">
        <div className="webEntryGrid">
          {/* Left: hero copy */}
          <div className="webEntryLeft">
            <h1>
              Welcome to<br />
              <span>Junzle</span>
            </h1>
            <p>
              The all-in-one platform to manage your sports teams — connect coaches, parents and players in one place.
            </p>
            <div className="webEntryBullets">
              {[
                'Manage schedules, events & training',
                'Real-time messaging between coach & parents',
                'Track stats, attendance and player development',
                'Streamlined team join flow with invite links & QR',
              ].map((b) => (
                <div key={b} className="webEntryBullet">
                  <div className="webEntryBulletDot" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: role selector card */}
          <div className="webEntryRight">
            <div className="webEntryRightTitle">What describes you best?</div>
            <div className="webEntryRightSub">Choose the option that fits your role.</div>

            {roles.map((r) => (
              <div
                key={r.id}
                className={`webRoleCard ${selectedRole === r.id ? 'webRoleCard--active' : ''}`}
                onClick={() => setSelectedRole(r.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedRole(r.id)}
              >
                <div className={`webRoleIconBox ${selectedRole === r.id ? 'webRoleIconBox--active' : 'webRoleIconBox--inactive'}`}>
                  <img src={r.icon} alt={r.title} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="webRoleTitle">{r.title}</div>
                  <div className="webRoleDesc">{r.desc}</div>
                </div>
                {selectedRole === r.id ? (
                  <img src="/assets/tick.png" alt="Selected" className="webRoleTick" />
                ) : (
                  <div className="webRoleEmptyCircle" />
                )}
              </div>
            ))}

            <button type="button" className="webEntryGetStartedBtn" onClick={handleGetStarted}>
              <span>Get Started</span>
              <span style={{ fontSize: 22 }}>→</span>
            </button>

            <div className="webEntryLoginRow">
              Already have an account?{' '}
              <button type="button" className="webEntryLoginLink" onClick={() => alert('Log In screen — enter email & password.')}>
                Log In
              </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <button
                type="button"
                style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: 12, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                onClick={() => navigate('/role-picker?path=create')}
              >
                Browse All Roles &amp; Paths →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
