import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft, Building2, Plus, Trash2, Mail, Phone, Trophy } from 'lucide-react';
import ProgressBar from '../../components/ProgressBar';

export default function ClubOwnerFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Profile
  const [profile, setProfile] = useState({
    name: 'Elena Rostova',
    phone: '(555) 302-3344',
    title: 'Executive Director & Founder',
  });

  // Organization
  const [org, setOrg] = useState({
    name: 'Metro Elite Soccer Academy',
    sport: 'Soccer',
    cityState: 'Austin, TX',
    taxId: 'XX-XXXXXXX',
  });

  // Teams under org
  const [teams, setTeams] = useState([
    { id: 1, name: 'Metro Elite 2014 Boys (U11)', age: 'U11' },
    { id: 2, name: 'Metro Elite 2012 Girls (U13)', age: 'U13' },
    { id: 3, name: 'Metro Elite Premier High School', age: 'U17' },
  ]);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamAge, setNewTeamAge] = useState('');

  // Coaches to invite
  const [coaches, setCoaches] = useState([
    { id: 1, name: 'Marcus Vance', email: 'marcus.vance@metroelite.org', teamAssigned: 'Metro Elite 2014 Boys (U11)' },
    { id: 2, name: 'David Kim', email: 'dkim@raptorsfc.org', teamAssigned: 'Metro Elite 2012 Girls (U13)' },
  ]);
  const [newCoachName, setNewCoachName] = useState('');
  const [newCoachEmail, setNewCoachEmail] = useState('');

  const handleAddTeam = () => {
    if (newTeamName.trim()) {
      setTeams([...teams, { id: Date.now(), name: newTeamName, age: newTeamAge || 'All' }]);
      setNewTeamName('');
      setNewTeamAge('');
    }
  };

  const handleRemoveTeam = (id) => {
    setTeams(teams.filter((t) => t.id !== id));
  };

  const handleAddCoach = () => {
    if (newCoachName.trim() && newCoachEmail.trim()) {
      setCoaches([...coaches, { id: Date.now(), name: newCoachName, email: newCoachEmail, teamAssigned: 'Assigned by Club' }]);
      setNewCoachName('');
      setNewCoachEmail('');
    }
  };

  const getStepLabel = () => {
    switch (step) {
      case 1: return 'Owner Profile';
      case 2: return 'Create Organization';
      case 3: return 'Add Club Teams';
      case 4: return 'Invite Coaches';
      case 5: return 'Confirmation';
      default: return '';
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 72px)',
      padding: '40px 24px',
      backgroundColor: '#F8FAFC',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{ width: '100%', maxWidth: '680px' }}>
        <ProgressBar currentStep={step} totalSteps={5} stepLabel={getStepLabel()} />

        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          padding: '36px',
          boxShadow: '0 4px 20px -2px rgba(13, 27, 62, 0.06)',
        }}>
          {/* STEP 1: Owner Profile */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0D1B3E', marginBottom: '8px' }}>
                Club Owner Profile
              </h2>
              <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '28px' }}>
                Primary administrative contact for your organization and league affiliations.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Full Legal Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    style={{ width: '100%', padding: '11px 16px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Phone Number</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    style={{ width: '100%', padding: '11px 16px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Official Title</label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    style={{ width: '100%', padding: '11px 16px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Create Organization */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0D1B3E', marginBottom: '8px' }}>
                Create Your Organization
              </h2>
              <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '28px' }}>
                This is your parent entity (club or academy) that holds all divisions and teams.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Organization / Club Name</label>
                  <input
                    type="text"
                    value={org.name}
                    onChange={(e) => setOrg({ ...org, name: e.target.value })}
                    style={{ width: '100%', padding: '11px 16px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Primary Sport</label>
                    <select
                      value={org.sport}
                      onChange={(e) => setOrg({ ...org, sport: e.target.value })}
                      style={{ width: '100%', padding: '11px 16px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none', backgroundColor: '#FFFFFF' }}
                    >
                      <option value="Soccer">Soccer</option>
                      <option value="Basketball">Basketball</option>
                      <option value="Baseball">Baseball</option>
                      <option value="Volleyball">Volleyball</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>City & State</label>
                    <input
                      type="text"
                      value={org.cityState}
                      onChange={(e) => setOrg({ ...org, cityState: e.target.value })}
                      style={{ width: '100%', padding: '11px 16px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Add Teams Under Organization */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0D1B3E', marginBottom: '8px' }}>
                Add Teams Under {org.name}
              </h2>
              <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>
                Set up the individual age divisions and rosters operating under your club umbrella.
              </p>

              {/* Add Team Box */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <input
                  type="text"
                  placeholder="Team Name (e.g. Metro Elite U12 Red)"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  style={{ flex: 2, padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
                />
                <input
                  type="text"
                  placeholder="Age (e.g. U12)"
                  value={newTeamAge}
                  onChange={(e) => setNewTeamAge(e.target.value)}
                  style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
                />
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleAddTeam}
                  style={{ padding: '10px 16px' }}
                >
                  <Plus size={16} />
                  <span>Add</span>
                </button>
              </div>

              {/* List of Teams */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {teams.map((t) => (
                  <div
                    key={t.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      backgroundColor: '#F8FAFC',
                      borderRadius: '10px',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#0D1B3E' }}>{t.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>Division: {t.age}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveTeam(t.id)}
                      style={{ color: '#EF4444', padding: '6px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Invite Coaches */}
          {step === 4 && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0D1B3E', marginBottom: '8px' }}>
                Invite Coaching Staff
              </h2>
              <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>
                Send coach onboarding invites to manage roster assignments and lead communication.
              </p>

              {/* Add Coach Bar */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <input
                  type="text"
                  placeholder="Coach Full Name"
                  value={newCoachName}
                  onChange={(e) => setNewCoachName(e.target.value)}
                  style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newCoachEmail}
                  onChange={(e) => setNewCoachEmail(e.target.value)}
                  style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
                />
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleAddCoach}
                  style={{ padding: '10px 16px' }}
                >
                  <Plus size={16} />
                  <span>Invite</span>
                </button>
              </div>

              {/* Coaches List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {coaches.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      backgroundColor: '#F8FAFC',
                      borderRadius: '10px',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#0D1B3E' }}>{c.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>{c.email} • {c.teamAssigned}</div>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#16A34A', backgroundColor: '#DCFCE7', padding: '3px 8px', borderRadius: '999px' }}>
                      Invite Ready
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Confirmation */}
          {step === 5 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                backgroundColor: '#DCFCE7',
                color: '#16A34A',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}>
                <Check size={44} strokeWidth={3} />
              </div>

              <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#0D1B3E', marginBottom: '8px' }}>
                Organization Established!
              </h2>

              <p style={{ fontSize: '15px', color: '#64748B', maxWidth: '480px', margin: '0 auto 28px auto' }}>
                <strong>{org.name}</strong> is live with <strong>{teams.length} teams</strong> and <strong>{coaches.length} invited coaches</strong>.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <button
                  className="btn-primary"
                  onClick={() => navigate('/portal-dashboard?role=club-owner&org=' + encodeURIComponent(org.name))}
                >
                  <Building2 size={16} />
                  <span>Open Club Headquarters</span>
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => navigate('/')}
                >
                  Back to Portal Home
                </button>
              </div>
            </div>
          )}

          {/* Bottom Navigation */}
          {step < 5 && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '36px',
              paddingTop: '20px',
              borderTop: '1px solid #E2E8F0',
            }}>
              {step > 1 ? (
                <button type="button" className="btn-secondary" onClick={() => setStep(step - 1)}>
                  <ArrowLeft size={16} />
                  <span>Previous</span>
                </button>
              ) : (
                <button type="button" className="btn-secondary" onClick={() => navigate('/role-picker?path=create')}>
                  <ArrowLeft size={16} />
                  <span>Change Role</span>
                </button>
              )}

              <button type="button" className="btn-primary" onClick={() => setStep(step + 1)}>
                <span>{step === 4 ? 'Finish Setup' : 'Continue'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
