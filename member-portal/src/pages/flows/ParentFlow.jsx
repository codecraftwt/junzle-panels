import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import RealQRCode from '../../components/RealQRCode';

const RECENT_TEAMS = [
  { id: '1', name: 'Baltimore Tigers', division: 'U12 Football', sport: 'Football', icon: '🐅', coach: 'Coach Marcus Vance' },
  { id: '2', name: 'Wildcats FC', division: 'U11 Soccer', sport: 'Soccer', icon: '🐱', coach: 'Coach Sarah Jenkins' },
  { id: '3', name: 'Eagles Basketball', division: 'Youth League', sport: 'Basketball', icon: '🦅', coach: 'Coach Darnell Washington' },
];

const STEPS = [
  { num: 1, label: 'Your Profile', desc: 'Personal & child info' },
  { num: 2, label: 'Join a Team', desc: 'Invite link or search' },
  { num: 3, label: 'Request to Join', desc: 'Review & send request' },
  { num: 4, label: "You're All Set!", desc: 'Confirmation' },
];

function FlowNavbar({ onBack }) {
  return (
    <header className="webFlowNavbar">
      <button className="webBtnBack" style={{ margin: 0, border: '1px solid #E2E8F0', background: '#F8FAFC', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#475569' }} onClick={onBack}>
        <ArrowLeft size={14} /> Back
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <img src="/assets/dark-logo.png" alt="Junzle" style={{ height: 28, objectFit: 'contain' }} />
      </div>
    </header>
  );
}

function SidebarStepper({ step }) {
  return (
    <div className="webFlowSidebar">
      <div className="webFlowSidebarHeading">Setup Progress</div>
      {STEPS.map((s) => {
        const isDone = step > s.num;
        const isActive = step === s.num;
        return (
          <div
            key={s.num}
            className={`webFlowStep ${isDone ? 'webFlowStep--completed' : isActive ? 'webFlowStep--active' : ''}`}
          >
            <div className="webFlowStepBubble">
              {isDone ? <Check size={13} /> : s.num}
            </div>
            <div className="webFlowStepInfo">
              <div className="webFlowStepLabel">{s.label}</div>
              <div className="webFlowStepDesc">{s.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ParentFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Step 1
  const [parentFirstName, setParentFirstName] = useState('Sarah');
  const [parentLastName, setParentLastName] = useState('Johnson');
  const [parentEmail, setParentEmail] = useState('sarah.johnson@example.com');
  const [parentPhone, setParentPhone] = useState('(555) 432-1098');
  const [childFirstName, setChildFirstName] = useState('Alex');
  const [childLastName, setChildLastName] = useState('Turner');
  const [childDob, setChildDob] = useState('04 / 12 / 2014');
  const [childGender, setChildGender] = useState('U12 Boys');

  // Step 2
  const [activeTab, setActiveTab] = useState('link');
  const [inviteUrl, setInviteUrl] = useState('https://junzle.app/join/TB2023');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(RECENT_TEAMS[0]);
  const [showScannerModal, setShowScannerModal] = useState(false);

  const handleNext = () => { if (step < 4) setStep(step + 1); };
  const handlePrev = () => { if (step > 1) setStep(step - 1); else navigate(-1); };

  return (
    <div className="webFlowPage">
      <FlowNavbar onBack={handlePrev} />

      <div className="webFlowLayout">
        <div className="webFlowInner">
          {/* Left: Step sidebar */}
          <SidebarStepper step={step} />

          {/* Right: Step content */}
          <div className="webFlowContent">

            {/* ── STEP 1: Profile ─────────────────────────────────────────────── */}
            {step === 1 && (
              <>
                <div className="webFlowScreenTitle">
                  <h2>Let's Set Up Your Profile</h2>
                  <p>This helps us personalize your experience as a parent.</p>
                </div>

                {/* Personal Information Card */}
                <div className="webCard">
                  <div className="webCardTitle">Personal Information</div>
                  <div className="webFieldGroup">
                    {/* Name row */}
                    <div className="webFieldRow">
                      <div className="webFieldCol">
                        <label className="webFieldLabel">First Name</label>
                        <div className="webInputWrap">
                          <div className="webInputIcon"><img src="/assets/person.png" alt="Person" /></div>
                          <input className="webInput" placeholder="First Name" value={parentFirstName} onChange={(e) => setParentFirstName(e.target.value)} />
                        </div>
                      </div>
                      <div className="webFieldCol">
                        <label className="webFieldLabel">Last Name</label>
                        <div className="webInputWrap">
                          <input className="webInput" placeholder="Last Name" value={parentLastName} onChange={(e) => setParentLastName(e.target.value)} />
                        </div>
                      </div>
                    </div>

                    <div className="webFieldCol">
                      <label className="webFieldLabel">Email Address</label>
                      <div className="webInputWrap">
                        <div className="webInputIcon"><img src="/assets/email.png" alt="Email" /></div>
                        <input className="webInput" type="email" placeholder="Enter Email Address" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} />
                      </div>
                    </div>

                    <div className="webFieldCol">
                      <label className="webFieldLabel">Phone Number</label>
                      <div className="webInputWrap">
                        <div className="webInputIcon"><img src="/assets/phone.png" alt="Phone" /></div>
                        <input className="webInput" type="tel" placeholder="Enter Phone Number" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Child Information Card */}
                <div className="webCard">
                  <div className="webCardTitle">Child Information</div>
                  <div className="webFieldGroup">
                    <div className="webFieldRow">
                      <div className="webFieldCol">
                        <label className="webFieldLabel">First Name</label>
                        <div className="webInputWrap">
                          <div className="webInputIcon"><img src="/assets/person.png" alt="Person" /></div>
                          <input className="webInput" placeholder="First Name" value={childFirstName} onChange={(e) => setChildFirstName(e.target.value)} />
                        </div>
                      </div>
                      <div className="webFieldCol">
                        <label className="webFieldLabel">Last Name</label>
                        <div className="webInputWrap">
                          <input className="webInput" placeholder="Last Name" value={childLastName} onChange={(e) => setChildLastName(e.target.value)} />
                        </div>
                      </div>
                    </div>

                    <div className="webFieldCol">
                      <label className="webFieldLabel">Date of Birth</label>
                      <div className="webInputWrap">
                        <div className="webInputIcon"><img src="/assets/email.png" alt="Calendar" /></div>
                        <input className="webInput" placeholder="04 / 12 / 2014" value={childDob} onChange={(e) => setChildDob(e.target.value)} />
                      </div>
                    </div>

                    <div className="webFieldCol">
                      <label className="webFieldLabel">Gender / Division</label>
                      <div className="webInputWrap">
                        <div className="webInputIcon"><img src="/assets/person.png" alt="Gender" /></div>
                        <input className="webInput" placeholder="U12 Boys" value={childGender} onChange={(e) => setChildGender(e.target.value)} />
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

            {/* ── STEP 2: Join Team ──────────────────────────────────────────── */}
            {step === 2 && (
              <>
                <div className="webFlowScreenTitle">
                  <h2>Join Your Team</h2>
                  <p>Enter the team invite link or search for your team to get started.</p>
                </div>

                <div className="webTabCard">
                  {/* Tab header */}
                  <div className="webTabHeader">
                    <button
                      type="button"
                      className={`webTabBtn ${activeTab === 'link' ? 'webTabBtn--active' : ''}`}
                      onClick={() => setActiveTab('link')}
                    >
                      <img src="/assets/link.png" alt="Link" style={{ filter: activeTab === 'link' ? 'none' : 'grayscale(1) opacity(0.5)' }} />
                      Use Invite Link
                    </button>
                    <button
                      type="button"
                      className={`webTabBtn ${activeTab === 'search' ? 'webTabBtn--active' : ''}`}
                      onClick={() => setActiveTab('search')}
                    >
                      <img src="/assets/search.png" alt="Search" style={{ filter: activeTab === 'search' ? 'none' : 'grayscale(1) opacity(0.5)' }} />
                      Search for Team
                    </button>
                  </div>

                  <div className="webTabBody">
                    {/* Tab: Invite Link */}
                    {activeTab === 'link' && (
                      <>
                        <label className="webFieldLabel" style={{ marginBottom: 8, display: 'block' }}>Paste invite link</label>
                        <div className="webInviteInputRow">
                          <img src="/assets/link.png" alt="Link" style={{ width: 16, height: 16 }} />
                          <input
                            type="text"
                            placeholder="https://junzle.app/join/..."
                            value={inviteUrl}
                            onChange={(e) => setInviteUrl(e.target.value)}
                            style={{ flex: 1, height: 44, border: 'none', outline: 'none', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#0D1B3E', background: 'transparent', padding: '0 12px 0 0' }}
                          />
                        </div>
                        <button type="button" className="webSendJoinBtn" onClick={() => { setSelectedTeam(RECENT_TEAMS[0]); setStep(3); }}>
                          <span>Send Join Request</span>
                          <div className="webBtnArrow" style={{ width: 24, height: 24 }}><img src="/assets/forwardarrow.png" alt="→" /></div>
                        </button>

                        <div className="webOrDivider">
                          <div className="webDividerLine" /><span>OR</span><div className="webDividerLine" />
                        </div>

                        {/* QR Scan */}
                        <div className="webQrScanCard" onClick={() => setShowScannerModal(true)} role="button" tabIndex={0}>
                          <div className="webQrIconBox"><img src="/assets/qr.png" alt="QR" /></div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 700, fontSize: 14, color: '#0D1B3E' }}>Scan QR Code</div>
                            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#64748B', marginTop: 2 }}>Scan the team QR Code to join</div>
                          </div>
                          <span style={{ fontSize: 20, color: '#94A3B8' }}>›</span>
                        </div>
                      </>
                    )}

                    {/* Tab: Search */}
                    {activeTab === 'search' && (
                      <>
                        <div style={{ position: 'relative', marginBottom: 20 }}>
                          <img src="/assets/search.png" alt="Search" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, objectFit: 'contain' }} />
                          <input
                            type="text"
                            placeholder="Search Team or Coach..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '100%', height: 44, border: '1px solid #E2E8F0', borderRadius: 8, paddingLeft: 44, paddingRight: 14, fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#0D1B3E', background: '#F8FAFC', outline: 'none', boxSizing: 'border-box' }}
                          />
                        </div>

                        <div className="webRecentLabel">Recent Searches</div>

                        {RECENT_TEAMS.map((team) => {
                          const isSel = selectedTeam?.id === team.id;
                          return (
                            <div key={team.id} className={`webTeamCard ${isSel ? 'webTeamCard--selected' : ''}`} onClick={() => setSelectedTeam(team)} role="button" tabIndex={0}>
                              <div className="webTeamIconBox">
                                {team.name === 'Baltimore Tigers' ? (
                                  <img src="/assets/tiger-logo.png" alt="Tigers" />
                                ) : (
                                  <span style={{ fontSize: 20 }}>{team.icon}</span>
                                )}
                              </div>
                              <span className="webTeamName">{team.name}</span>
                              <div className={`webRadioCircle ${isSel ? 'webRadioCircle--active' : ''}`}>
                                {isSel && <div className="webRadioDot" />}
                              </div>
                            </div>
                          );
                        })}

                        <button type="button" className="webSendJoinBtn" style={{ marginTop: 14 }} onClick={() => { if (!selectedTeam) setSelectedTeam(RECENT_TEAMS[0]); setStep(3); }}>
                          <span>Send Join Request</span>
                          <div className="webBtnArrow" style={{ width: 24, height: 24 }}><img src="/assets/forwardarrow.png" alt="→" /></div>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="webFooterNote">
                  Contact your coach or team admin to get an invite link, QR Code, or team code.
                </div>
              </>
            )}

            {/* ── STEP 3: Request to Join ─────────────────────────────────────── */}
            {step === 3 && (
              <>
                <div className="webFlowScreenTitle">
                  <h2>Request to Join</h2>
                  <p>You're requesting to join this team for your child.</p>
                </div>

                <div className="webCard">
                  {/* Team row */}
                  <div className="webTeamVerifiedRow">
                    <div className="webTigerBox">
                      {selectedTeam?.name === 'Baltimore Tigers' || !selectedTeam ? (
                        <img src="/assets/tiger-logo.png" alt="Tigers" />
                      ) : (
                        <span style={{ fontSize: 26 }}>{selectedTeam?.icon || '🐅'}</span>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="webVerifiedTeamName">{selectedTeam?.name || 'Baltimore Tigers'}</div>
                      <div className="webVerifiedTeamSub">{selectedTeam?.division || 'U12 Football'}</div>
                    </div>
                    <div className="webCoachBadge">
                      <img src="/assets/coach.png" alt="Coach" />
                      <span className="webCoachBadgeText">Coach</span>
                    </div>
                  </div>

                  <div className="webCardSep" />

                  {/* Coach row */}
                  <div className="webCoachRow">
                    <div className="webCoachAvatarBox">
                      <img src="/assets/coach.png" alt="Coach Avatar" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="webCoachName">{selectedTeam?.coach || 'Coach Marcus Vance'}</div>
                      <div className="webCoachRole">Head Coach • {selectedTeam?.name || 'Baltimore Tigers'}</div>
                    </div>
                    <div className="webCoachActions">
                      <button type="button" className="webCoachActionBtn" title="Email Coach" onClick={() => alert(`Emailing ${selectedTeam?.coach || 'Coach Marcus Vance'}`)}>
                        <img src="/assets/email.png" alt="Email" />
                      </button>
                      <button type="button" className="webCoachActionBtn" title="Call Coach" onClick={() => alert(`Calling ${selectedTeam?.coach || 'Coach Marcus Vance'}`)}>
                        <img src="/assets/phone.png" alt="Phone" />
                      </button>
                    </div>
                  </div>

                  <div className="webCardSep" />

                  <div className="webAboutTitle">About Team</div>
                  <p className="webAboutText">
                    Competitive youth football team focused on development, teamwork and sportsmanship.
                  </p>
                </div>

                <button type="button" className="webBtnPrimary" onClick={handleNext}>
                  <span>Send Request</span>
                  <div className="webBtnArrow"><img src="/assets/forwardarrow.png" alt="→" /></div>
                </button>
              </>
            )}

            {/* ── STEP 4: All Set ──────────────────────────────────────────────── */}
            {step === 4 && (
              <>
                <div className="webAllSetBanner">
                  <div className="webAllSetEmoji">🎉</div>
                  <div className="webAllSetTitle">You're all set!</div>
                  <p className="webAllSetSub">
                    Your request has been sent to the team administrator. You'll get a notification once you're approved.
                  </p>
                </div>

                {/* Team summary card */}
                <div className="webCard">
                  <div className="webTeamVerifiedRow" style={{ marginBottom: 0 }}>
                    <div className="webTigerBox">
                      {selectedTeam?.name === 'Baltimore Tigers' || !selectedTeam ? (
                        <img src="/assets/tiger-logo.png" alt="Tigers" />
                      ) : (
                        <span style={{ fontSize: 26 }}>{selectedTeam?.icon || '🐅'}</span>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="webVerifiedTeamName">{selectedTeam?.name || 'Baltimore Tigers'}</div>
                      <div className="webVerifiedTeamSub">{selectedTeam?.division || 'U12 Football'}</div>
                    </div>
                    <div className="webCoachBadge">
                      <img src="/assets/coach.png" alt="Coach" />
                      <span className="webCoachBadgeText">Coach</span>
                    </div>
                  </div>
                </div>

                {/* Child info card */}
                <div className="webCard">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src="/assets/person.png" alt="Person" style={{ width: 16, height: 16, objectFit: 'contain' }} />
                    </div>
                    <span style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 700, fontSize: 14, color: '#0D1B3E' }}>Child Information</span>
                  </div>
                  <div style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 700, fontSize: 16, color: '#0D1B3E' }}>{childFirstName} {childLastName}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#64748B', marginTop: 4 }}>{childGender}</div>
                </div>

                <button type="button" className="webBtnPrimary" onClick={() => navigate('/portal-dashboard', { state: { role: 'parent', teamName: selectedTeam?.name } })}>
                  <span>Continue to Team Dashboard</span>
                  <div className="webBtnArrow"><img src="/assets/forwardarrow.png" alt="→" /></div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* QR Scanner Modal */}
      {showScannerModal && (
        <div className="webModalOverlay" onClick={() => setShowScannerModal(false)}>
          <div className="webModalBox" onClick={(e) => e.stopPropagation()}>
            <div className="webModalTitle">Scan QR Code</div>
            <p className="webModalSub">
              Scan the team QR code provided by your coach or team administrator.
            </p>
            <RealQRCode value={inviteUrl || 'https://junzle.app/join/TB2023'} size={220} showLogo={true} logoSize={44} />
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#94A3B8', marginTop: 16 }}>
              Click the QR code to simulate a successful scan
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button type="button" className="webModalCloseBtn" onClick={() => setShowScannerModal(false)}>
                Close
              </button>
              <button
                type="button"
                className="webSendJoinBtn"
                style={{ width: 'auto', padding: '0 24px', marginTop: 0 }}
                onClick={() => { setShowScannerModal(false); setSelectedTeam(RECENT_TEAMS[0]); setStep(3); }}
              >
                Simulate Scan ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
