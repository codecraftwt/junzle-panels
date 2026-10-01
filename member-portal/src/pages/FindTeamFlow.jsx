import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';
import ScreenHeading from '../components/ScreenHeading';
import {
  Search,
  Link as LinkIcon,
  QrCode,
  ArrowRight,
  ChevronRight,
  Camera,
  Image as ImageIcon,
  Sun,
  Moon,
  Check
} from 'lucide-react';

const TEAMS_LIST = [
  {
    id: '1',
    name: 'Riverside Basketball',
    sport: 'Basketball',
    city: 'Austin',
    category: 'Basketball • Austin',
    image: '/assets/riverside.png',
    bg: '#0F1334',
    about: 'Competitive youth basketball team focused on fundamentals, athletic growth, and team chemistry.',
  },
  {
    id: '2',
    name: 'Riverside Phoenix',
    sport: 'Soccer',
    city: 'Phoenix',
    category: 'Soccer • Phoenix',
    image: '/assets/riverside-phoenix.png',
    bg: '#015CFE',
    about: 'Premier youth soccer club emphasizing skill development, tactical awareness, and fair play.',
  },
  {
    id: '3',
    name: 'Riverside Vipers',
    sport: 'Soccer',
    city: 'Phoenix',
    category: 'Soccer • Phoenix',
    image: '/assets/riveside-vipers.png',
    bg: '#0F1334',
    about: 'Elite competitive soccer academy developing champions on and off the field.',
  },
  {
    id: '4',
    name: 'Miami Riverside',
    sport: 'Basketball',
    city: 'Miami',
    category: 'Basketball • Miami',
    image: '/assets/miami-riverside.png',
    bg: '#10B981',
    about: 'Competitive youth basketball team focused on development and teamwork.',
  },
];

const RECENT_SEARCHES = [
  { id: '1', name: 'Baltimore Tigers', division: 'U12 Football', sport: 'Football', icon: '/assets/tiger-logo.png', isImg: true },
  { id: '2', name: 'Wildcats FC', division: 'U11 Soccer', sport: 'Soccer', icon: '🐱', isImg: false },
  { id: '3', name: 'Eagles Basketball', division: 'Youth League', sport: 'Basketball', icon: '🦅', isImg: false },
];

const ROLES_LIST = [
  {
    id: 'parent',
    title: 'Parent',
    subtitle: "Manage your child's team activities",
  },
  {
    id: 'coach',
    title: 'Coach',
    subtitle: 'Organize practices and games.',
  },
  {
    id: 'assistant_coach',
    title: 'Assistant Coach',
    subtitle: 'Help with team management.',
  },
  {
    id: 'team_manager',
    title: 'Team Manager',
    subtitle: 'Handle communication and scheduling.',
  },
  {
    id: 'player',
    title: 'Player',
    subtitle: 'Join your team and stay updated.',
  },
];

export default function FindTeamFlow() {
  const navigate = useNavigate();

  // Steps: 'join_choice' | 'find' | 'scan' | 'role' | 'join' | 'success'
  const [currentStep, setCurrentStep] = useState('join_choice');
  const [activeTab, setActiveTab] = useState('link'); // 'link' | 'search'
  const [inviteUrl, setInviteUrl] = useState('https://junzle.app/join/TB2023');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(TEAMS_LIST[3]); // Miami Riverside default
  const [selectedRecentTeam, setSelectedRecentTeam] = useState(RECENT_SEARCHES[0]);
  const [selectedRole, setSelectedRole] = useState(ROLES_LIST[0]); // Parent default
  const [flashlightOn, setFlashlightOn] = useState(false);

  const filteredTeams = TEAMS_LIST.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
    setCurrentStep('role');
  };

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setCurrentStep('join');
  };

  const handleSendRequest = () => {
    setCurrentStep('success');
  };

  const handleBack = () => {
    if (currentStep === 'join_choice') {
      navigate('/what-would-you-like-to-do');
    } else if (currentStep === 'find' || currentStep === 'scan') {
      setCurrentStep('join_choice');
    } else if (currentStep === 'role') {
      setCurrentStep('join_choice');
    } else if (currentStep === 'join') {
      setCurrentStep('role');
    } else if (currentStep === 'success') {
      navigate('/what-would-you-like-to-do');
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="authWebPage">
      <AuthHeader
        onBack={handleBack}
        rightComponent={
          currentStep === 'find' ? (
            <button
              type="button"
              className="authWebBackBtn"
              onClick={() => setCurrentStep('scan')}
              title="Scan QR Code"
            >
              <QrCode size={18} color="#2B7FFF" />
            </button>
          ) : null
        }
      />

      <main className="authWebContainer">
        <div className="authWebCard authWebCard--wide">
          {/* ═══════════════════════════════════════════════════════════ */}
          {/* 1. INITIAL SCREEN: JOIN YOUR TEAM TABS                     */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentStep === 'join_choice' && (
            <div>
              <ScreenHeading
                title="Join your team"
                subtitle="Enter the team invite link or search for your team to get started."
              />

              {/* Segmented Tab Headers */}
              <div className="findTeamTabs">
                <button
                  type="button"
                  className={`findTeamTabBtn ${activeTab === 'link' ? 'findTeamTabBtn--active' : ''}`}
                  onClick={() => setActiveTab('link')}
                >
                  <LinkIcon size={16} />
                  <span>Use Invite Link</span>
                </button>
                <button
                  type="button"
                  className={`findTeamTabBtn ${activeTab === 'search' ? 'findTeamTabBtn--active' : ''}`}
                  onClick={() => setActiveTab('search')}
                >
                  <Search size={16} />
                  <span>Search for Team</span>
                </button>
              </div>

              {/* Tab 1: Use Invite Link */}
              {activeTab === 'link' && (
                <div>
                  <div className="authFormGroup">
                    <label className="authFormLabel" htmlFor="invite-link-input">Paste invite link</label>
                    <div className="authInputWrapper">
                      <input
                        id="invite-link-input"
                        type="url"
                        className="authInput"
                        placeholder="https://junzle.app/join/..."
                        value={inviteUrl}
                        onChange={(e) => setInviteUrl(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="authPrimaryBtn"
                    onClick={() => {
                      setSelectedTeam(TEAMS_LIST[3]);
                      setCurrentStep('role');
                    }}
                  >
                    <span>Send Join Request</span>
                    <ArrowRight size={16} color="#FFFFFF" />
                  </button>

                  {/* OR Divider */}
                  <div className="welcomeOrRow" style={{ margin: '20px 0' }}>
                    <div className="welcomeOrLine" />
                    <span className="welcomeOrText">OR</span>
                    <div className="welcomeOrLine" />
                  </div>

                  {/* Scan QR Code Card */}
                  <div
                    className="inviteOptionCard"
                    onClick={() => setCurrentStep('scan')}
                    role="button"
                    tabIndex={0}
                    style={{ padding: 14 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 10,
                          backgroundColor: '#EFF6FF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <QrCode size={22} color="#015CFE" />
                      </div>
                      <div>
                        <div className="welcomeCardOptionTitle">Scan QR Code</div>
                        <div className="welcomeCardOptionSub">Scan the team QR Code to join</div>
                      </div>
                    </div>
                    <ChevronRight size={18} color="#0D1B3E" />
                  </div>
                </div>
              )}

              {/* Tab 2: Search for Team */}
              {activeTab === 'search' && (
                <div>
                  <div className="authFormGroup">
                    <div
                      className="authInputWrapper"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setCurrentStep('find')}
                    >
                      <input
                        type="text"
                        className="authInput"
                        placeholder="Search Team"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentStep('find');
                        }}
                      />
                    </div>
                  </div>

                  <div className="inviteSectionLabel" style={{ fontSize: 14, marginBottom: 10 }}>
                    Recent Searches
                  </div>

                  {RECENT_SEARCHES.map((team) => {
                    const isSelected = selectedRecentTeam?.id === team.id;
                    return (
                      <div
                        key={team.id}
                        className={`recentTeamCard ${isSelected ? 'recentTeamCard--selected' : ''}`}
                        onClick={() => {
                          setSelectedRecentTeam(team);
                          setSelectedTeam(TEAMS_LIST[3]);
                          setCurrentStep('find');
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div className="teamAvatarCircle">
                            {team.isImg ? (
                              <img src={team.icon} alt={team.name} className="teamAvatarImg" />
                            ) : (
                              <span style={{ fontSize: 20 }}>{team.icon}</span>
                            )}
                          </div>
                          <span style={{ fontFamily: 'Rethink Sans', fontWeight: 700, color: '#0D1B3E', fontSize: 14 }}>
                            {team.name}
                          </span>
                        </div>
                        <div
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: '50%',
                            border: `1.5px solid ${isSelected ? '#015CFE' : '#CBD5E1'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {isSelected && (
                            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#015CFE' }} />
                          )}
                        </div>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    className="authPrimaryBtn"
                    style={{ marginTop: 16 }}
                    onClick={() => {
                      setSelectedTeam(TEAMS_LIST[3]);
                      setCurrentStep('role');
                    }}
                  >
                    <span>Send Join Request</span>
                    <ArrowRight size={16} color="#FFFFFF" />
                  </button>
                </div>
              )}

              <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 13, color: '#64748B', textAlign: 'center', marginTop: 20 }}>
                Contact your coach or team admin to get an invite link, QR Code, or team code.
              </p>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* 2. SEARCH RESULTS LIST SCREEN                              */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentStep === 'find' && (
            <div>
              <ScreenHeading
                title="Find My Team"
                subtitle="Search by team name, sport or city to join your team on Junzle."
              />

              {/* Search Bar */}
              <div className="authFormGroup">
                <div className="authInputWrapper">
                  <input
                    type="text"
                    className="authInput"
                    placeholder="Search team, sport, or city"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>

              <div className="inviteSectionLabel" style={{ fontSize: 18, marginTop: 12, marginBottom: 12 }}>
                Result
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filteredTeams.length > 0 ? (
                  filteredTeams.map((team) => (
                    <div
                      key={team.id}
                      className="inviteOptionCard"
                      onClick={() => handleSelectTeam(team)}
                      role="button"
                      tabIndex={0}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div className="teamAvatarCircle">
                          <img src={team.image} alt={team.name} className="teamAvatarImg" />
                        </div>
                        <div>
                          <div className="welcomeCardOptionTitle">{team.name}</div>
                          <div className="welcomeCardOptionSub">{team.category}</div>
                        </div>
                      </div>
                      <ArrowRight size={18} color="#2B7FFF" />
                    </div>
                  ))
                ) : (
                  <div style={{ padding: 24, textAlign: 'center', color: '#64748B', fontFamily: 'Plus Jakarta Sans' }}>
                    No teams found matching "{searchTerm}"
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* 3. SCAN QR CODE VIEWFINDER SCREEN                          */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentStep === 'scan' && (
            <div>
              <ScreenHeading
                title="Scan QR Code"
                subtitle="Scan the team QR Code provided by your coach or team administrator"
              />

              <div className="viewfinderFrame" onClick={() => handleSelectTeam(TEAMS_LIST[3])} style={{ cursor: 'pointer' }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFlashlightOn(!flashlightOn);
                  }}
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#FFFFFF'
                  }}
                  title="Toggle Light"
                >
                  {flashlightOn ? <Sun size={18} color="#FFEF00" /> : <Moon size={18} />}
                </button>

                <div className="viewfinderLaser" />

                <div className="viewfinderTarget">
                  <div className="viewfinderCorner viewfinderCorner--tl" />
                  <div className="viewfinderCorner viewfinderCorner--tr" />
                  <div className="viewfinderCorner viewfinderCorner--bl" />
                  <div className="viewfinderCorner viewfinderCorner--br" />

                  <img
                    src="/assets/qr-code.png"
                    alt="QR Target"
                    style={{ width: 130, height: 130, objectFit: 'contain', opacity: 0.9 }}
                  />
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: 14,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    padding: '8px 16px',
                    borderRadius: 20,
                    color: '#FFFFFF',
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  <ImageIcon size={15} />
                  <span>Upload from Gallery / Tap to Scan</span>
                </div>
              </div>

              <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 13, color: '#64748B', textAlign: 'center', marginTop: 12 }}>
                Contact your coach or team administrator to get an invite link, QR Code, or team code.
              </p>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* 4. ROLE SELECTOR SCREEN ("What is Your Role?")             */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentStep === 'role' && (
            <div>
              {/* Selected Team Banner */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: 12,
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  marginBottom: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img
                    src={selectedTeam.image || '/assets/miami-riverside.png'}
                    alt={selectedTeam.name}
                    style={{ width: 28, height: 28, objectFit: 'contain' }}
                  />
                  <div>
                    <div style={{ fontFamily: 'Rethink Sans', fontWeight: 700, fontSize: 14, color: '#0D1B3E' }}>
                      {selectedTeam.name}
                    </div>
                    <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, color: '#64748B' }}>
                      {selectedTeam.category}
                    </div>
                  </div>
                </div>
                <span
                  style={{
                    backgroundColor: '#015CFE',
                    color: '#FFFFFF',
                    borderRadius: 20,
                    padding: '3px 10px',
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  Selected
                </span>
              </div>

              <ScreenHeading
                title="What is Your Role?"
                subtitle="This helps us customize your experience and will be visible to the team admin for approval."
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {ROLES_LIST.map((role) => (
                  <div
                    key={role.id}
                    className="inviteOptionCard"
                    onClick={() => handleSelectRole(role)}
                    role="button"
                    tabIndex={0}
                  >
                    <div>
                      <div className="welcomeCardOptionTitle">{role.title}</div>
                      <div className="welcomeCardOptionSub">{role.subtitle}</div>
                    </div>
                    <ArrowRight size={18} color="#2B7FFF" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* 5. JOIN TEAM SUMMARY SCREEN                                */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentStep === 'join' && (
            <div>
              <ScreenHeading
                title="Join Team"
                subtitle="Search by team name, sport or city to join your team on Junzle."
              />

              {/* Team Profile Summary Card */}
              <div
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: 16,
                  padding: 20,
                  backgroundColor: '#FFFFFF',
                  marginBottom: 24,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className="teamAvatarCircle">
                      <img src={selectedTeam.image} alt={selectedTeam.name} className="teamAvatarImg" />
                    </div>
                    <div>
                      <div className="welcomeCardOptionTitle">{selectedTeam.name}</div>
                      <div className="welcomeCardOptionSub">{selectedTeam.category}</div>
                    </div>
                  </div>
                  <span
                    style={{
                      backgroundColor: '#EBF2FF',
                      color: '#015CFE',
                      borderRadius: 8,
                      padding: '4px 12px',
                      fontFamily: 'Plus Jakarta Sans',
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {selectedRole.title}
                  </span>
                </div>

                <div style={{ height: 1, backgroundColor: '#F1F5F9', margin: '14px 0' }} />

                <div>
                  <div style={{ fontFamily: 'Rethink Sans', fontWeight: 700, fontSize: 14, color: '#0D1B3E', marginBottom: 4 }}>
                    About Team
                  </div>
                  <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 13, lineHeight: '20px', color: '#52627A' }}>
                    {selectedTeam.about}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="authPrimaryBtn"
                onClick={handleSendRequest}
              >
                Send Request
              </button>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* 6. REQUEST SENT CONFIRMATION SCREEN                        */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentStep === 'success' && (
            <div className="authSuccessBlock">
              <img
                src="/assets/verified.png"
                alt="Request Sent"
                className="authVerifiedBadge"
              />

              <h1 className="screenHeadingTitle" style={{ fontSize: 32, marginBottom: 8 }}>
                Request Sent !
              </h1>
              <p className="screenHeadingSubtitle" style={{ maxWidth: 380, margin: '0 auto 28px' }}>
                Your request to join <strong>{selectedTeam.name}</strong> as a <strong>{selectedRole.title}</strong> has been sent to the team admin for review.
              </p>

              <button
                type="button"
                className="authPrimaryBtn"
                onClick={() => navigate('/what-would-you-like-to-do')}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
