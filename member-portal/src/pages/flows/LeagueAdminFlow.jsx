import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft, Trophy, Plus, Trash2, Globe, Shield } from 'lucide-react';
import ProgressBar from '../../components/ProgressBar';

export default function LeagueAdminFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Profile
  const [profile, setProfile] = useState({
    name: 'David Reynolds',
    phone: '(555) 201-1122',
    title: 'League Commissioner',
  });

  // League details
  const [league, setLeague] = useState({
    name: 'Texas Premier Youth Soccer League',
    sport: 'Soccer',
    region: 'Central Texas (Austin, Round Rock, San Antonio)',
    season: '2026-2027 Annual Championship',
  });

  // Clubs under the league
  const [clubs, setClubs] = useState([
    { id: 1, name: 'Metro Elite Soccer Academy', teamsCount: 8, location: 'Austin, TX' },
    { id: 2, name: 'Lone Star Youth Sports', teamsCount: 6, location: 'Round Rock, TX' },
    { id: 3, name: 'Hill Country Athletics', teamsCount: 4, location: 'San Antonio, TX' },
  ]);
  const [newClubName, setNewClubName] = useState('');
  const [newClubLocation, setNewClubLocation] = useState('');

  const handleAddClub = () => {
    if (newClubName.trim()) {
      setClubs([...clubs, { id: Date.now(), name: newClubName, teamsCount: 0, location: newClubLocation || 'Texas' }]);
      setNewClubName('');
      setNewClubLocation('');
    }
  };

  const handleRemoveClub = (id) => {
    setClubs(clubs.filter((c) => c.id !== id));
  };

  const getStepLabel = () => {
    switch (step) {
      case 1: return 'Commissioner Profile';
      case 2: return 'Create League';
      case 3: return 'Affiliate Clubs';
      case 4: return 'Confirmation';
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
        <ProgressBar currentStep={step} totalSteps={4} stepLabel={getStepLabel()} />

        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          padding: '36px',
          boxShadow: '0 4px 20px -2px rgba(13, 27, 62, 0.06)',
        }}>
          {/* STEP 1: Commissioner Profile */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0D1B3E', marginBottom: '8px' }}>
                League Commissioner Profile
              </h2>
              <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '28px' }}>
                Governing official contact for rules, tournament registrations, and sanctions.
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
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Official Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    style={{ width: '100%', padding: '11px 16px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Governance Title</label>
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

          {/* STEP 2: Create League */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0D1B3E', marginBottom: '8px' }}>
                Create League
              </h2>
              <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '28px' }}>
                Define your regional youth league jurisdiction, sports category, and boundaries.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>League Name</label>
                  <input
                    type="text"
                    value={league.name}
                    onChange={(e) => setLeague({ ...league, name: e.target.value })}
                    style={{ width: '100%', padding: '11px 16px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Sport</label>
                    <select
                      value={league.sport}
                      onChange={(e) => setLeague({ ...league, sport: e.target.value })}
                      style={{ width: '100%', padding: '11px 16px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none', backgroundColor: '#FFFFFF' }}
                    >
                      <option value="Soccer">Soccer</option>
                      <option value="Basketball">Basketball</option>
                      <option value="Baseball">Baseball</option>
                      <option value="Volleyball">Volleyball</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Region / Jurisdiction</label>
                    <input
                      type="text"
                      value={league.region}
                      onChange={(e) => setLeague({ ...league, region: e.target.value })}
                      style={{ width: '100%', padding: '11px 16px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Add Clubs under the League */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0D1B3E', marginBottom: '8px' }}>
                Add Clubs & Organizations Under League
              </h2>
              <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>
                Affiliate participating clubs or academies competing in this league season.
              </p>

              {/* Add Club Input */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <input
                  type="text"
                  placeholder="Club / Academy Name"
                  value={newClubName}
                  onChange={(e) => setNewClubName(e.target.value)}
                  style={{ flex: 2, padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
                />
                <input
                  type="text"
                  placeholder="City (e.g. Austin, TX)"
                  value={newClubLocation}
                  onChange={(e) => setNewClubLocation(e.target.value)}
                  style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
                />
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleAddClub}
                  style={{ padding: '10px 16px' }}
                >
                  <Plus size={16} />
                  <span>Add</span>
                </button>
              </div>

              {/* Clubs List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {clubs.map((c) => (
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
                      <div style={{ fontSize: '12px', color: '#64748B' }}>{c.location} • {c.teamsCount} teams registered</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveClub(c.id)}
                      style={{ color: '#EF4444', padding: '6px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Confirmation */}
          {step === 4 && (
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
                League Sanctioned & Active!
              </h2>

              <p style={{ fontSize: '15px', color: '#64748B', maxWidth: '480px', margin: '0 auto 28px auto' }}>
                <strong>{league.name}</strong> is established with <strong>{clubs.length} affiliated clubs</strong>.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <button
                  className="btn-primary"
                  onClick={() => navigate('/portal-dashboard?role=league-admin&league=' + encodeURIComponent(league.name))}
                >
                  <Trophy size={16} />
                  <span>Open League Console</span>
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
          {step < 4 && (
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
                <span>{step === 3 ? 'Publish League' : 'Continue'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
