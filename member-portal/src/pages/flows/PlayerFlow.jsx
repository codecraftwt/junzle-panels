import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';

const MOCK_TEAMS = [
  { id: '1', name: 'Baltimore Tigers', division: 'U12 Football', sport: 'Football', icon: '🐅', coach: 'Coach Marcus Vance' },
  { id: '2', name: 'Wildcats FC', division: 'U11 Soccer', sport: 'Soccer', icon: '🐱', coach: 'Coach Sarah Jenkins' },
  { id: '3', name: 'Eagles Basketball', division: 'Youth League', sport: 'Basketball', icon: '🦅', coach: 'Coach Darnell Washington' },
];

const STEPS = [
  { num: 1, label: 'Athlete Profile', desc: 'Name, jersey & position' },
  { num: 2, label: 'Find Your Team', desc: 'Search by team or coach' },
  { num: 3, label: 'Request Roster Spot', desc: 'Confirm & submit' },
  { num: 4, label: "You're All Set!", desc: 'Request sent!' },
];

export default function PlayerFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({ name: 'Liam Miller', phone: '(555) 404-5567', jerseyNumber: '7', position: 'Central Midfielder / Winger' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(MOCK_TEAMS[0]);

  const handleNext = () => { if (step < 4) setStep(step + 1); };
  const handlePrev = () => { if (step > 1) setStep(step - 1); else navigate(-1); };

  const filteredTeams = MOCK_TEAMS.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.sport.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="webFlowPage">
      {/* Navbar */}
      <header className="webFlowNavbar">
        <button style={{ margin: 0, border: '1px solid #E2E8F0', background: '#F8FAFC', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#475569' }} onClick={handlePrev}>
          <ArrowLeft size={14} /> Back
        </button>
        <img src="/assets/dark-logo.png" alt="Junzle" style={{ height: 28, objectFit: 'contain' }} />
      </header>

      <div className="webFlowLayout">
        <div className="webFlowInner">
          {/* Sidebar */}
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

          {/* Content */}
          <div className="webFlowContent">
            {/* Step 1 */}
            {step === 1 && (
              <>
                <div className="webFlowScreenTitle">
                  <h2>Athlete Profile</h2>
                  <p>Set up your player card, jersey number preference, and position.</p>
                </div>
                <div className="webCard">
                  <div className="webCardTitle">Player Information</div>
                  <div className="webFieldGroup">
                    <div className="webFieldCol">
                      <label className="webFieldLabel">Player Full Name</label>
                      <div className="webInputWrap">
                        <div className="webInputIcon"><img src="/assets/person.png" alt="Person" /></div>
                        <input className="webInput" placeholder="e.g. Liam Miller" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                      </div>
                    </div>
                    <div className="webFieldRow">
                      <div className="webFieldCol" style={{ maxWidth: 120 }}>
                        <label className="webFieldLabel">Jersey #</label>
                        <input type="number" className="webInput" style={{ border: '1px solid #E2E8F0', borderRadius: 8, height: 44, padding: '0 14px', fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 16, color: '#015CFE', textAlign: 'center', outline: 'none', width: '100%', boxSizing: 'border-box' }} value={profile.jerseyNumber} onChange={(e) => setProfile({ ...profile, jerseyNumber: e.target.value })} />
                      </div>
                      <div className="webFieldCol">
                        <label className="webFieldLabel">Position</label>
                        <div className="webInputWrap">
                          <input className="webInput" value={profile.position} onChange={(e) => setProfile({ ...profile, position: e.target.value })} />
                        </div>
                      </div>
                    </div>
                    <div className="webFieldCol">
                      <label className="webFieldLabel">Contact Phone (Optional)</label>
                      <div className="webInputWrap">
                        <div className="webInputIcon"><img src="/assets/phone.png" alt="Phone" /></div>
                        <input className="webInput" type="tel" placeholder="(555) 000-0000" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                      </div>
                    </div>
                  </div>
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
                  <h2>Find Your Team</h2>
                  <p>Search by team name or coach to join the squad roster.</p>
                </div>
                <div className="webCard">
                  <div style={{ position: 'relative', marginBottom: 20 }}>
                    <img src="/assets/search.png" alt="Search" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, objectFit: 'contain' }} />
                    <input type="text" placeholder="Search by team or coach..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ width: '100%', height: 44, border: '1px solid #E2E8F0', borderRadius: 8, paddingLeft: 44, paddingRight: 14, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#0D1B3E', background: '#F8FAFC', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div className="webRecentLabel">Available Teams</div>
                  {filteredTeams.map((team) => {
                    const isSel = selectedTeam?.id === team.id;
                    return (
                      <div key={team.id} className={`webTeamCard ${isSel ? 'webTeamCard--selected' : ''}`} onClick={() => setSelectedTeam(team)} role="button" tabIndex={0}>
                        <div className="webTeamIconBox">
                          {team.name === 'Baltimore Tigers' ? <img src="/assets/tiger-logo.png" alt="Tigers" /> : <span style={{ fontSize: 20 }}>{team.icon}</span>}
                        </div>
                        <div>
                          <div className="webTeamName">{team.name}</div>
                          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#64748B' }}>{team.coach}</div>
                        </div>
                        <div className={`webRadioCircle ${isSel ? 'webRadioCircle--active' : ''}`}>
                          {isSel && <div className="webRadioDot" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button type="button" className="webBtnPrimary" onClick={handleNext}>
                  <span>Select Team</span>
                  <div className="webBtnArrow"><img src="/assets/forwardarrow.png" alt="→" /></div>
                </button>
              </>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <>
                <div className="webFlowScreenTitle">
                  <h2>Request Roster Spot</h2>
                  <p>Confirm your jersey selection and submit request to Coach.</p>
                </div>
                <div className="webCard">
                  <div className="webTeamVerifiedRow">
                    <div className="webTigerBox">
                      {selectedTeam?.name === 'Baltimore Tigers' || !selectedTeam ? <img src="/assets/tiger-logo.png" alt="Tigers" /> : <span style={{ fontSize: 26 }}>{selectedTeam?.icon}</span>}
                    </div>
                    <div>
                      <div className="webVerifiedTeamName">{selectedTeam?.name || 'Baltimore Tigers'}</div>
                      <div className="webVerifiedTeamSub">{selectedTeam?.sport || 'Football'} • {selectedTeam?.coach || 'Coach Marcus Vance'}</div>
                    </div>
                  </div>
                  <div className="webCardSep" />
                  {[['Athlete', profile.name], ['Jersey Requested', `#${profile.jerseyNumber}`], ['Position', profile.position]].map(([label, value]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#64748B' }}>{label}:</span>
                      <span style={{ fontFamily: 'Satoshi, sans-serif', fontSize: 14, fontWeight: 700, color: label === 'Jersey Requested' ? '#015CFE' : '#0D1B3E' }}>{value}</span>
                    </div>
                  ))}
                </div>
                <button type="button" className="webBtnPrimary" onClick={handleNext}>
                  <span>Submit Request</span>
                  <div className="webBtnArrow"><img src="/assets/forwardarrow.png" alt="→" /></div>
                </button>
              </>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <>
                <div className="webAllSetBanner">
                  <div className="webAllSetEmoji">🏆</div>
                  <div className="webAllSetTitle">You're all set!</div>
                  <p className="webAllSetSub">Your roster request has been sent to the coaching staff.</p>
                </div>
                <div className="webCard">
                  <div className="webTeamVerifiedRow" style={{ marginBottom: 0 }}>
                    <div className="webTigerBox">
                      {selectedTeam?.name === 'Baltimore Tigers' || !selectedTeam ? <img src="/assets/tiger-logo.png" alt="Tigers" /> : <span style={{ fontSize: 26 }}>{selectedTeam?.icon}</span>}
                    </div>
                    <div>
                      <div className="webVerifiedTeamName">{selectedTeam?.name || 'Baltimore Tigers'}</div>
                      <div className="webVerifiedTeamSub">Requested Jersey #{profile.jerseyNumber}</div>
                    </div>
                  </div>
                </div>
                <button type="button" className="webBtnPrimary" style={{ marginTop: 8 }} onClick={() => navigate('/portal-dashboard', { state: { role: 'player', teamName: selectedTeam?.name } })}>
                  <span>Continue to Team Dashboard</span>
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
