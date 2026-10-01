import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import RealQRCode from '../../components/RealQRCode';

const FIGMA_PRESET_COLORS = [
  '#0F1334', '#015CFE', '#DD1C35', '#1DA35E', '#A14EEB',
  '#F16410', '#FDBF13', '#2FB8C2', '#FF5EF2',
];

const RAINBOW_HUES = [
  { color: '#FF0000', hex: 'FF0000', percent: 0 },
  { color: '#FF7A00', hex: 'FF7A00', percent: 12 },
  { color: '#FFFF00', hex: 'FFFF00', percent: 25 },
  { color: '#00FF00', hex: '00FF00', percent: 38 },
  { color: '#00FFFF', hex: '00FFFF', percent: 50 },
  { color: '#0A48FF', hex: '0A48FF', percent: 62 },
  { color: '#8B00FF', hex: '8B00FF', percent: 75 },
  { color: '#FF00FF', hex: 'FF00FF', percent: 88 },
  { color: '#FF0055', hex: 'FF0055', percent: 100 },
];

const STEPS = [
  { num: 1, label: 'Your Profile', desc: 'Personal info & role' },
  { num: 2, label: 'Create Team', desc: 'Team name, logo & colors' },
  { num: 3, label: 'Team Colors', desc: 'Choose palette' },
  { num: 4, label: 'Invite Parents', desc: 'Share your invite link' },
  { num: 5, label: "You're All Set!", desc: 'Team created!' },
];

function FlowNavbar({ onBack }) {
  return (
    <header className="webFlowNavbar">
      <button
        style={{ margin: 0, border: '1px solid #E2E8F0', background: '#F8FAFC', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#475569' }}
        onClick={onBack}
      >
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

export default function CoachFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Step 1
  const [firstName, setFirstName] = useState('Marcus');
  const [lastName, setLastName] = useState('Vance');
  const [email, setEmail] = useState('marcus.vance@baltimore.org');
  const [phone, setPhone] = useState('(555) 234-8901');

  // Step 2
  const [teamName, setTeamName] = useState('Baltimore Tigers');
  const [sport, setSport] = useState('U12 Football');
  const [cityState, setCityState] = useState('Baltimore, MD');
  const [logoUploaded, setLogoUploaded] = useState(true);

  // Step 3
  const [primaryColor, setPrimaryColor] = useState('#E63A19');
  const [secondaryColor, setSecondaryColor] = useState('#FF7A00');
  const [showCustomColorScreen, setShowCustomColorScreen] = useState(false);
  const [customColorHex, setCustomColorHex] = useState('0A48FF');
  const [customHue, setCustomHue] = useState('#0A48FF');
  const [hueThumbPercent, setHueThumbPercent] = useState(62);
  const [customTarget, setCustomTarget] = useState('primary');

  // Step 4
  const inviteUrl = 'https://junzle.app/join/B1833';
  const [linkCopied, setLinkCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(inviteUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleOpenCustomColor = (target) => {
    setCustomTarget(target);
    const currentColor = target === 'primary' ? primaryColor : secondaryColor;
    const cleanHex = currentColor.replace('#', '').toUpperCase();
    setCustomColorHex(cleanHex);
    setCustomHue(`#${cleanHex}`);
    setShowCustomColorScreen(true);
  };

  const handleSelectHue = (hueColor, hex, percent) => {
    setCustomHue(hueColor);
    setCustomColorHex(hex);
    setHueThumbPercent(percent);
  };

  const handleApplyCustomColor = () => {
    const formattedHex = customColorHex.startsWith('#') ? customColorHex : `#${customColorHex}`;
    if (customTarget === 'primary') setPrimaryColor(formattedHex);
    else setSecondaryColor(formattedHex);
    setShowCustomColorScreen(false);
  };

  const handleNext = () => { if (step < 5) setStep(step + 1); };
  const handlePrev = () => {
    if (showCustomColorScreen) { setShowCustomColorScreen(false); return; }
    if (step > 1) setStep(step - 1);
    else navigate(-1);
  };

  // Custom Color Sub-Screen
  if (showCustomColorScreen) {
    return (
      <div className="webFlowPage">
        <FlowNavbar onBack={handlePrev} />
        <div className="webFlowLayout">
          <div className="webFlowInner">
            <SidebarStepper step={step} />
            <div className="webFlowContent">
              <div className="webFlowScreenTitle">
                <h2>Add Custom Color</h2>
                <p>This color will represent your team across Junzle.</p>
              </div>

              <div className="webCard">
                {/* Gradient box */}
                <div className="webGradientBox" style={{ marginBottom: 20 }}>
                  <svg width="100%" height={200} viewBox="0 0 560 200" style={{ borderRadius: 12 }}>
                    <defs>
                      <linearGradient id="satGradWeb" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor={customHue} />
                      </linearGradient>
                      <linearGradient id="valGradWeb" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                    <rect x="0" y="0" width="560" height="200" rx="12" fill="url(#satGradWeb)" />
                    <rect x="0" y="0" width="560" height="200" rx="12" fill="url(#valGradWeb)" />
                  </svg>
                  <div className="webGradientSelectorRing" />
                </div>

                {/* Rainbow hue slider */}
                <div className="webHueSliderWrap" style={{ marginBottom: 24 }}>
                  <svg width="100%" height={20} viewBox="0 0 560 20" style={{ borderRadius: 10 }}>
                    <defs>
                      <linearGradient id="rainbowGradWeb" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FF0000" />
                        <stop offset="17%" stopColor="#FFFF00" />
                        <stop offset="33%" stopColor="#00FF00" />
                        <stop offset="50%" stopColor="#00FFFF" />
                        <stop offset="67%" stopColor="#0000FF" />
                        <stop offset="83%" stopColor="#FF00FF" />
                        <stop offset="100%" stopColor="#FF0000" />
                      </linearGradient>
                    </defs>
                    <rect x="0" y="0" width="560" height="20" rx="10" fill="url(#rainbowGradWeb)" />
                  </svg>
                  <div className="webHueTapOverlay">
                    {RAINBOW_HUES.map((hueItem, idx) => (
                      <div
                        key={`hue-${idx}`}
                        className="webHueTapSegment"
                        onClick={() => handleSelectHue(hueItem.color, hueItem.hex, hueItem.percent)}
                      />
                    ))}
                  </div>
                  <div
                    className="webHueThumb"
                    style={{ left: `${hueThumbPercent}%`, backgroundColor: customHue }}
                  />
                </div>

                {/* Hex input */}
                <div className="webHexInputSection">
                  <label className="webHexInputLabel">Hex Color</label>
                  <input
                    type="text"
                    className="webHexInput"
                    value={customColorHex}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace('#', '').toUpperCase();
                      setCustomColorHex(cleaned);
                      if (cleaned.length === 6) setCustomHue(`#${cleaned}`);
                    }}
                    placeholder="0A48FF"
                    maxLength={7}
                  />
                </div>

                {/* Color preview */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, border: '2px solid #E2E8F0', backgroundColor: customColorHex.startsWith('#') ? customColorHex : `#${customColorHex}` }} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700, color: '#0D1B3E' }}>
                    #{customColorHex.replace('#', '')}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button type="button" className="webBtnPrimary" style={{ flex: 1 }} onClick={handleApplyCustomColor}>
                  <span>Add Color</span>
                  <div className="webBtnArrow"><img src="/assets/forwardarrow.png" alt="→" /></div>
                </button>
                <button
                  type="button"
                  onClick={() => setShowCustomColorScreen(false)}
                  style={{ padding: '0 20px', height: 52, borderRadius: 8, border: '1px solid #E2E8F0', background: '#F8FAFC', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="webFlowPage">
      <FlowNavbar onBack={handlePrev} />

      <div className="webFlowLayout">
        <div className="webFlowInner">
          <SidebarStepper step={step} />

          <div className="webFlowContent">

            {/* ── STEP 1: Profile ────────────────────────────────────────────── */}
            {step === 1 && (
              <>
                <div className="webFlowScreenTitle">
                  <h2>Let's Set Up Your Profile</h2>
                  <p>This helps us personalize your experience as a coach.</p>
                </div>

                <div className="webCard">
                  <div className="webCardTitle">Personal Information</div>
                  <div className="webFieldGroup">
                    <div className="webFieldRow">
                      <div className="webFieldCol">
                        <label className="webFieldLabel">First Name</label>
                        <div className="webInputWrap">
                          <div className="webInputIcon"><img src="/assets/person.png" alt="Person" /></div>
                          <input className="webInput" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                      </div>
                      <div className="webFieldCol">
                        <label className="webFieldLabel">Last Name</label>
                        <div className="webInputWrap">
                          <input className="webInput" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                      </div>
                    </div>
                    <div className="webFieldCol">
                      <label className="webFieldLabel">Email Address</label>
                      <div className="webInputWrap">
                        <div className="webInputIcon"><img src="/assets/email.png" alt="Email" /></div>
                        <input className="webInput" type="email" placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                    </div>
                    <div className="webFieldCol">
                      <label className="webFieldLabel">Phone Number</label>
                      <div className="webInputWrap">
                        <div className="webInputIcon"><img src="/assets/phone.png" alt="Phone" /></div>
                        <input className="webInput" type="tel" placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Role card */}
                <div className="webCard">
                  <div className="webCardTitle">Role Details</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 10, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <img src="/assets/coach.png" alt="Coach" style={{ width: 26, height: 26, objectFit: 'contain' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 700, fontSize: 15, color: '#0D1B3E' }}>I'm a Coach</div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#64748B', marginTop: 2 }}>Manage teams, players, events and communicate with parents.</div>
                    </div>
                    <button
                      type="button"
                      style={{ background: 'none', border: '1px solid #E2E8F0', borderRadius: 8, padding: '6px 14px', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700, color: '#015CFE', cursor: 'pointer' }}
                      onClick={() => navigate('/role-picker?path=create')}
                    >
                      Change
                    </button>
                  </div>
                </div>

                <button type="button" className="webBtnPrimary" onClick={handleNext}>
                  <span>Continue</span>
                  <div className="webBtnArrow"><img src="/assets/forwardarrow.png" alt="→" /></div>
                </button>
              </>
            )}

            {/* ── STEP 2: Create Team ─────────────────────────────────────────── */}
            {step === 2 && (
              <>
                <div className="webFlowScreenTitle">
                  <h2>Create Your Team</h2>
                  <p>Set up your team profile to start organizing your squad.</p>
                </div>

                <div className="webCard">
                  <div className="webCardTitle">Team Details</div>
                  <div className="webFieldGroup">
                    <div className="webFieldCol">
                      <label className="webFieldLabel">Team Name</label>
                      <div className="webInputWrap">
                        <div className="webInputIcon"><img src="/assets/coach.png" alt="Team" /></div>
                        <input className="webInput" placeholder="Enter Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                      </div>
                    </div>
                    <div className="webFieldCol">
                      <label className="webFieldLabel">Sport &amp; Age Group</label>
                      <div className="webInputWrap">
                        <div className="webInputIcon"><img src="/assets/email.png" alt="Sport" /></div>
                        <input className="webInput" placeholder="Enter Sport" value={sport} onChange={(e) => setSport(e.target.value)} />
                      </div>
                    </div>
                    <div className="webFieldCol">
                      <label className="webFieldLabel">Location</label>
                      <div className="webInputWrap">
                        <div className="webInputIcon"><img src="/assets/phone.png" alt="Location" /></div>
                        <input className="webInput" placeholder="City, State" value={cityState} onChange={(e) => setCityState(e.target.value)} />
                      </div>
                    </div>

                    {/* Logo upload */}
                    <div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 10 }}>Team Logo</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div
                          style={{ width: 72, height: 72, borderRadius: 16, border: logoUploaded ? '2px solid #E2E8F0' : '2px dashed #CBD5E1', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden', flexShrink: 0 }}
                          onClick={() => setLogoUploaded(!logoUploaded)}
                          role="button" tabIndex={0}
                        >
                          {logoUploaded ? (
                            <img src="/assets/tiger-logo.png" alt="Logo" style={{ width: 54, height: 54, objectFit: 'contain' }} />
                          ) : (
                            <span style={{ fontSize: 24, color: '#CBD5E1' }}>+</span>
                          )}
                        </div>
                        <div
                          style={{ flex: 1, border: '1px solid #E2E8F0', borderRadius: 10, padding: '14px 16px', cursor: 'pointer', background: '#F8FAFC', display: 'flex', alignItems: 'center', gap: 10 }}
                          onClick={() => setLogoUploaded(true)}
                          role="button" tabIndex={0}
                        >
                          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#2B7FFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <path d="M17 8l-5-5-5 5" /><path d="M12 3v12" />
                          </svg>
                          <div>
                            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, color: '#2B7FFF' }}>Upload Logo</div>
                            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#94A3B8', marginTop: 2 }}>PNG or JPG, Max 5MB</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Team colors preview */}
                    <div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 10 }}>Team Colors</div>
                      <div style={{ display: 'flex', gap: 12 }}>
                        <button
                          type="button"
                          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer' }}
                          onClick={() => { setCustomTarget('primary'); setStep(3); }}
                        >
                          <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: primaryColor, border: '2px solid #E2E8F0' }} />
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#64748B', fontWeight: 600 }}>Primary</span>
                        </button>
                        <button
                          type="button"
                          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer' }}
                          onClick={() => { setCustomTarget('secondary'); setStep(3); }}
                        >
                          <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: secondaryColor, border: '2px solid #E2E8F0' }} />
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#64748B', fontWeight: 600 }}>Secondary</span>
                        </button>
                        <button
                          type="button"
                          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer' }}
                          onClick={() => { setCustomTarget('secondary'); setStep(3); }}
                        >
                          <div style={{ width: 44, height: 44, borderRadius: 10, border: '2px dashed #CBD5E1', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#CBD5E1' }}>+</div>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#64748B', fontWeight: 600 }}>Add Color</span>
                        </button>
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

            {/* ── STEP 3: Team Colors ─────────────────────────────────────────── */}
            {step === 3 && (
              <>
                <div className="webFlowScreenTitle">
                  <h2>Choose Your Team Colors</h2>
                  <p>These colors will represent your team across Junzle.</p>
                </div>

                <div className="webCard">
                  {/* Primary Color */}
                  <div style={{ marginBottom: 28 }}>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 12 }}>Primary Color</div>
                    <div className="webColorPaletteGrid">
                      {FIGMA_PRESET_COLORS.map((hex, idx) => {
                        const isSel = primaryColor.toLowerCase() === hex.toLowerCase();
                        return (
                          <div
                            key={`p-${idx}`}
                            className={`webColorSwatch ${isSel ? 'webColorSwatch--selected' : ''}`}
                            style={{ backgroundColor: hex }}
                            onClick={() => setPrimaryColor(hex)}
                            role="button" tabIndex={0}
                          />
                        );
                      })}
                      <div className="webColorSwatchCustom" onClick={() => handleOpenCustomColor('primary')} role="button" tabIndex={0}>
                        +
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: primaryColor, border: '2px solid #E2E8F0' }} />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#0D1B3E' }}>Primary: {primaryColor}</span>
                    </div>
                  </div>

                  {/* Secondary Color */}
                  <div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 12 }}>Secondary Color</div>
                    <div className="webColorPaletteGrid">
                      {FIGMA_PRESET_COLORS.map((hex, idx) => {
                        const isSel = secondaryColor.toLowerCase() === hex.toLowerCase();
                        return (
                          <div
                            key={`s-${idx}`}
                            className={`webColorSwatch ${isSel ? 'webColorSwatch--selected' : ''}`}
                            style={{ backgroundColor: hex }}
                            onClick={() => setSecondaryColor(hex)}
                            role="button" tabIndex={0}
                          />
                        );
                      })}
                      <div className="webColorSwatchCustom" onClick={() => handleOpenCustomColor('secondary')} role="button" tabIndex={0}>
                        +
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: secondaryColor, border: '2px solid #E2E8F0' }} />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#0D1B3E' }}>Secondary: {secondaryColor}</span>
                    </div>
                  </div>
                </div>

                <button type="button" className="webBtnPrimary" onClick={handleNext}>
                  <span>Continue</span>
                  <div className="webBtnArrow"><img src="/assets/forwardarrow.png" alt="→" /></div>
                </button>
              </>
            )}

            {/* ── STEP 4: Invite Parents ──────────────────────────────────────── */}
            {step === 4 && (
              <>
                <div className="webFlowScreenTitle">
                  <h2>Invite Parents to Join Your Team</h2>
                  <p>Invite parents to connect and stay updated with the team.</p>
                </div>

                {/* Team Invite Link Card */}
                <div className="webInviteLinkCard">
                  <div style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 700, fontSize: 14, color: '#0D1B3E', marginBottom: 14 }}>Team Invite Link</div>
                  <div className="webInviteLinkRow">
                    <img src="/assets/link.png" alt="Link" style={{ width: 16, height: 16, flexShrink: 0 }} />
                    <span className="webInviteLinkText">{inviteUrl}</span>
                    <button type="button" className={`webCopyBtn ${linkCopied ? 'webCopyBtn--copied' : ''}`} onClick={handleCopyLink}>
                      {linkCopied ? '✓ Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#94A3B8' }}>
                    Anyone with this link can join your team.
                  </div>
                </div>

                <div className="webOrDivider">
                  <div className="webDividerLine" /><span>OR</span><div className="webDividerLine" />
                </div>

                {/* Share Invite Via List */}
                <div className="webShareList">
                  <div className="webShareListTitle">Share Invite Via</div>
                  {[
                    { icon: '/assets/sned-msg.png', title: 'Text Message', sub: 'Send invite link via SMS', action: () => alert('Sending via SMS...') },
                    { icon: '/assets/email.png', title: 'Email', sub: 'Send invite link via Email', action: () => alert('Opening email composer...') },
                    { icon: '/assets/qr.png', title: 'QR Code', sub: 'Show QR code to scan', action: () => setShowQrModal(true) },
                    { icon: '/assets/share-link.png', title: 'Share Link', sub: 'Share link using other apps', action: () => alert('Opening share sheet...') },
                  ].map((item) => (
                    <div key={item.title} className="webShareItem" onClick={item.action} role="button" tabIndex={0}>
                      <div className="webShareIconBox">
                        <img src={item.icon} alt={item.title} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="webShareItemTitle">{item.title}</div>
                        <div className="webShareItemSub">{item.sub}</div>
                      </div>
                      <span className="webShareChevron">›</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <button type="button" className="webBtnPrimary" onClick={handleNext}>
                    <span>Continue</span>
                    <div className="webBtnArrow"><img src="/assets/forwardarrow.png" alt="→" /></div>
                  </button>
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#64748B', cursor: 'pointer', padding: '8px 0' }}
                    onClick={handleNext}
                  >
                    Skip for now
                  </button>
                </div>
              </>
            )}

            {/* ── STEP 5: All Set ─────────────────────────────────────────────── */}
            {step === 5 && (
              <>
                <div className="webAllSetBanner">
                  <div className="webAllSetEmoji">🎉</div>
                  <div className="webAllSetTitle">You're all set!</div>
                  <p className="webAllSetSub">
                    You've successfully created your team.<br />Let's get you started.
                  </p>
                </div>

                {/* Team card */}
                <div className="webCard" style={{ marginBottom: 16 }}>
                  <div style={{ fontFamily: 'Satoshi, sans-serif', fontSize: 12, fontWeight: 700, color: '#94A3B8', marginBottom: 12, letterSpacing: '0.5px', textTransform: 'uppercase' }}>You've Created</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 12, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      <img src="/assets/tiger-logo.png" alt="Tigers" style={{ width: 44, height: 44, objectFit: 'contain' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 700, fontSize: 16, color: '#0D1B3E' }}>{teamName}</div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#64748B', marginTop: 2 }}>{sport} • {cityState}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: primaryColor }} />
                      <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: secondaryColor }} />
                    </div>
                  </div>
                </div>

                {/* What's next */}
                <div style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 700, fontSize: 16, color: '#0D1B3E', marginBottom: 4 }}>What's next?</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#64748B', marginBottom: 16 }}>Here are a few things you can do now.</div>

                <div className="webActionCardsGrid">
                  {[
                    { emoji: '📅', title: 'View Team Schedule', sub: 'See upcoming games, practices, and events', tab: 'schedule' },
                    { emoji: '💬', title: 'Introduce Yourself', sub: 'Send a message to coaches and parents', tab: 'messages' },
                    { emoji: '👥', title: 'Explore Your Team', sub: 'Browse players, staff, and team information', tab: 'roster' },
                    { emoji: '🔔', title: 'Manage Notifications', sub: "Choose how you'd like to stay updated", tab: null },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="webActionCard"
                      onClick={() => card.tab ? navigate('/portal-dashboard', { state: { role: 'coach', teamName, tab: card.tab } }) : alert('Notification settings saved.')}
                      role="button" tabIndex={0}
                    >
                      <div className="webActionCardIcon">{card.emoji}</div>
                      <div className="webActionCardTitle">{card.title}</div>
                      <div className="webActionCardSub">{card.sub}</div>
                    </div>
                  ))}
                </div>

                <button type="button" className="webBtnPrimary" onClick={() => navigate('/portal-dashboard', { state: { role: 'coach', teamName } })}>
                  <span>Continue to Team Dashboard</span>
                  <div className="webBtnArrow"><img src="/assets/forwardarrow.png" alt="→" /></div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="webModalOverlay" onClick={() => setShowQrModal(false)}>
          <div className="webModalBox" onClick={(e) => e.stopPropagation()}>
            <div className="webModalTitle">Team QR Code</div>
            <p className="webModalSub">
              Share this QR code with parents so they can scan and join {teamName}.
            </p>
            <RealQRCode value={inviteUrl} size={220} showLogo={true} logoSize={44} />
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#94A3B8', marginTop: 12 }}>
              {inviteUrl}
            </div>
            <button type="button" className="webModalCloseBtn" onClick={() => setShowQrModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
