import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';

const MOCK_TEAMS = [
  { id: '1', name: 'Baltimore Tigers', sport: 'Football', location: 'Baltimore, MD', icon: '🐅' },
  { id: '2', name: 'Wildcats FC', sport: 'Soccer', location: 'Austin, TX', icon: '🐱' },
  { id: '3', name: 'Eagles Basketball', sport: 'Basketball', location: 'Dallas, TX', icon: '🦅' },
];

const STEPS = [
  { num: 1, label: 'Follow Teams', desc: 'Pick teams to follow' },
  { num: 2, label: 'Alert Settings', desc: 'Score & schedule alerts' },
  { num: 3, label: 'Now Following!', desc: "You're all set!" },
];

export default function FanFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeams, setSelectedTeams] = useState(['1']);
  const [contact, setContact] = useState('fan.spectator@example.com');
  const [scoreAlerts, setScoreAlerts] = useState(true);
  const [scheduleAlerts, setScheduleAlerts] = useState(true);

  const toggleTeam = (id) => {
    if (selectedTeams.includes(id)) setSelectedTeams(selectedTeams.filter((t) => t !== id));
    else setSelectedTeams([...selectedTeams, id]);
  };

  const handleNext = () => { if (step < 3) setStep(step + 1); };
  const handlePrev = () => { if (step > 1) setStep(step - 1); else navigate(-1); };

  const filteredTeams = MOCK_TEAMS.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.sport.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="webFlowPage">
      <header className="webFlowNavbar">
        <button style={{ margin: 0, border: '1px solid #E2E8F0', background: '#F8FAFC', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#475569' }} onClick={handlePrev}>
          <ArrowLeft size={14} /> Back
        </button>
        <img src="/assets/dark-logo.png" alt="Junzle" style={{ height: 28, objectFit: 'contain' }} />
      </header>

      <div className="webFlowLayout">
        <div className="webFlowInner">
          <div className="webFlowSidebar">
            <div className="webFlowSidebarHeading">Setup Progress</div>
            {STEPS.map((s) => {
              const isDone = step > s.num;
              const isActive = step === s.num;
              return (
                <div key={s.num} className={`webFlowStep ${isDone ? 'webFlowStep--completed' : isActive ? 'webFlowStep--active' : ''}`}>
                  <div className="webFlowStepBubble">{isDone ? <Check size={13} /> : s.num}</div>
                  <div className="webFlowStepInfo">
                    <div className="webFlowStepLabel">{s.label}</div>
                    <div className="webFlowStepDesc">{s.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="webFlowContent">
            {/* Step 1 */}
            {step === 1 && (
              <>
                <div className="webFlowScreenTitle">
                  <h2>Follow Teams</h2>
                  <p>Pick teams you want to follow for game scores and schedules.</p>
                </div>
                <div className="webCard">
                  <div style={{ position: 'relative', marginBottom: 20 }}>
                    <img src="/assets/search.png" alt="Search" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, objectFit: 'contain' }} />
                    <input type="text" placeholder="Search by team or sport..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ width: '100%', height: 44, border: '1px solid #E2E8F0', borderRadius: 8, paddingLeft: 44, paddingRight: 14, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#0D1B3E', background: '#F8FAFC', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div className="webRecentLabel">Available Teams</div>
                  {filteredTeams.map((team) => {
                    const isSel = selectedTeams.includes(team.id);
                    return (
                      <div key={team.id} className={`webTeamCard ${isSel ? 'webTeamCard--selected' : ''}`} onClick={() => toggleTeam(team.id)} role="button" tabIndex={0}>
                        <div className="webTeamIconBox">
                          {team.name === 'Baltimore Tigers' ? <img src="/assets/tiger-logo.png" alt="Tigers" /> : <span style={{ fontSize: 20 }}>{team.icon}</span>}
                        </div>
                        <div>
                          <div className="webTeamName">{team.name}</div>
                          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#64748B' }}>{team.sport} • {team.location}</div>
                        </div>
                        <div style={{ width: 22, height: 22, borderRadius: 4, border: `2px solid ${isSel ? '#2B7FFF' : '#CBD5E1'}`, background: isSel ? '#2B7FFF' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {isSel && <Check size={13} color="#FFFFFF" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button type="button" className="webBtnPrimary" onClick={handleNext}>
                  <span>Continue</span>
                  <div className="webBtnArrow"><img src="/assets/forwardarrow.png" alt="→" /></div>
                </button>
              </>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <>
                <div className="webFlowScreenTitle">
                  <h2>Alert Settings</h2>
                  <p>Choose what updates you want to receive.</p>
                </div>
                <div className="webCard">
                  <div className="webCardTitle">Notification Preferences</div>
                  <div className="webFieldGroup">
                    <div className="webFieldCol">
                      <label className="webFieldLabel">Email / Phone for Score Alerts</label>
                      <div className="webInputWrap">
                        <input className="webInput" value={contact} onChange={(e) => setContact(e.target.value)} />
                      </div>
                    </div>
                    {[
                      { label: 'Final Score Alerts', sub: 'Instant notification after each match', val: scoreAlerts, set: setScoreAlerts },
                      { label: 'Schedule Changes', sub: 'Updates on rainouts and time changes', val: scheduleAlerts, set: setScheduleAlerts },
                    ].map((item) => (
                      <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid #F1F5F9' }}>
                        <div>
                          <div style={{ fontFamily: 'Satoshi, sans-serif', fontSize: 14, fontWeight: 700, color: '#0D1B3E' }}>{item.label}</div>
                          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#64748B', marginTop: 2 }}>{item.sub}</div>
                        </div>
                        <div
                          style={{ width: 44, height: 24, borderRadius: 12, background: item.val ? '#2B7FFF' : '#E2E8F0', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}
                          onClick={() => item.set(!item.val)}
                        >
                          <div style={{ width: 18, height: 18, borderRadius: 9, background: '#FFFFFF', position: 'absolute', top: 3, left: item.val ? 23 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button type="button" className="webBtnPrimary" onClick={handleNext}>
                  <span>Save Preferences</span>
                  <div className="webBtnArrow"><img src="/assets/forwardarrow.png" alt="→" /></div>
                </button>
              </>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <>
                <div className="webAllSetBanner">
                  <div className="webAllSetEmoji">📣</div>
                  <div className="webAllSetTitle">Now Following!</div>
                  <p className="webAllSetSub">You'll receive live scores and schedule alerts for selected teams.</p>
                </div>
                <div className="webCard">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 12, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      <img src="/assets/tiger-logo.png" alt="Tigers" style={{ width: 44, height: 44, objectFit: 'contain' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 700, fontSize: 16, color: '#0D1B3E' }}>Baltimore Tigers</div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#64748B', marginTop: 2 }}>Alerts sent to: {contact}</div>
                    </div>
                  </div>
                </div>
                <button type="button" className="webBtnPrimary" style={{ marginTop: 8 }} onClick={() => navigate('/portal-dashboard', { state: { role: 'fan', teamName: 'Baltimore Tigers' } })}>
                  <span>Continue to Fan Hub</span>
                  <div className="webBtnArrow"><img src="/assets/forwardarrow.png" alt="→" /></div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
