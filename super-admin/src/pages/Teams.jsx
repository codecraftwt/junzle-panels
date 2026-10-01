import React, { useState } from 'react';
import { Search, Filter, Shield, Eye, CheckCircle2, XCircle, Plus, Copy, Check } from 'lucide-react';
import { mockTeams } from '../mock/adminData';
import Modal from '../components/Modal';

export default function Teams() {
  const [teams, setTeams] = useState(mockTeams);
  const [searchTerm, setSearchTerm] = useState('');
  const [sportFilter, setSportFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.coach.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = sportFilter === 'All' || team.sport === sportFilter;
    const matchesStatus = statusFilter === 'All' || team.status === statusFilter;
    return matchesSearch && matchesSport && matchesStatus;
  });

  const handleToggleStatus = (id, newStatus) => {
    setTeams(teams.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
    if (selectedTeam && selectedTeam.id === id) {
      setSelectedTeam({ ...selectedTeam, status: newStatus });
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div style={{ padding: '32px' }}>
      {/* Header and Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0D1B3E' }}>
            Teams & Rosters
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
            Manage registered teams, verify organization affiliations, and review join codes
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => alert('New team registration link: Use the Member Portal (:5174) or Mobile App flow.')}
        >
          <Plus size={16} />
          <span>Register Team</span>
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        padding: '16px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        {/* Search */}
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by team, club or coach..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 14px 9px 38px',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              outline: 'none',
              fontSize: '13px',
            }}
          />
        </div>

        {/* Dropdown Filters */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Sport Filter */}
          <select
            value={sportFilter}
            onChange={(e) => setSportFilter(e.target.value)}
            style={{
              padding: '9px 14px',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              fontSize: '13px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="All">All Sports</option>
            <option value="Soccer">Soccer</option>
            <option value="Basketball">Basketball</option>
            <option value="Baseball">Baseball</option>
            <option value="Volleyball">Volleyball</option>
            <option value="Flag Football">Flag Football</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '9px 14px',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              fontSize: '13px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Teams Table */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Team</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Sport & Age</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Organization</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Head Coach</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Roster</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeams.map((team) => (
              <tr
                key={team.id}
                style={{ borderBottom: '1px solid #F1F5F9', transition: 'background-color 0.15s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: team.primaryColor,
                      border: `2px solid ${team.secondaryColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '12px',
                    }}>
                      {team.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#0D1B3E' }}>{team.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>Code: <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{team.joinCode}</span></div>
                    </div>
                  </div>
                </td>

                <td style={{ padding: '16px 20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B' }}>{team.sport}</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>{team.ageGroup} • {team.cityState}</div>
                </td>

                <td style={{ padding: '16px 20px', fontSize: '13px', color: '#334155' }}>
                  {team.organization}
                </td>

                <td style={{ padding: '16px 20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0D1B3E' }}>{team.coach}</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>{team.coachEmail}</div>
                </td>

                <td style={{ padding: '16px 20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B' }}>
                    {team.playersCount} / {team.maxRoster}
                  </div>
                  <div style={{ width: '80px', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', marginTop: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${(team.playersCount / team.maxRoster) * 100}%`,
                      height: '100%',
                      backgroundColor: '#1A56DB',
                    }} />
                  </div>
                </td>

                <td style={{ padding: '16px 20px' }}>
                  <span className={`badge ${
                    team.status === 'Active'
                      ? 'badge-active'
                      : team.status === 'Pending Review'
                      ? 'badge-pending'
                      : 'badge-suspended'
                  }`}>
                    {team.status}
                  </span>
                </td>

                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                  <button
                    onClick={() => setSelectedTeam(team)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      backgroundColor: '#F1F5F9',
                      color: '#1A56DB',
                      fontWeight: 600,
                      fontSize: '12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E2E8F0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
                  >
                    <Eye size={14} />
                    <span>View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Team Details Modal */}
      <Modal
        isOpen={!!selectedTeam}
        onClose={() => setSelectedTeam(null)}
        title={selectedTeam?.name || 'Team Details'}
        maxWidth="600px"
      >
        {selectedTeam && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                backgroundColor: selectedTeam.primaryColor,
                border: `3px solid ${selectedTeam.secondaryColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 900,
                fontSize: '22px',
              }}>
                {selectedTeam.name.charAt(0)}
              </div>
              <div>
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#0D1B3E' }}>
                  {selectedTeam.name}
                </h4>
                <div style={{ fontSize: '13px', color: '#64748B' }}>
                  {selectedTeam.sport} • {selectedTeam.ageGroup} • {selectedTeam.cityState}
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              backgroundColor: '#F8FAFC',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '20px',
            }}>
              <div>
                <span style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Organization</span>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0D1B3E', marginTop: '2px' }}>{selectedTeam.organization}</div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Head Coach</span>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0D1B3E', marginTop: '2px' }}>{selectedTeam.coach}</div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Coach Contact</span>
                <div style={{ fontSize: '13px', color: '#334155', marginTop: '2px' }}>{selectedTeam.coachPhone}</div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Roster Filled</span>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1A56DB', marginTop: '2px' }}>
                  {selectedTeam.playersCount} / {selectedTeam.maxRoster} Players
                </div>
              </div>
            </div>

            {/* Colors Swatch */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '8px' }}>
                Team Colors
              </span>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: selectedTeam.primaryColor, border: '1px solid #CBD5E1' }}></span>
                  <span style={{ fontSize: '12px', color: '#334155' }}>Primary: <code>{selectedTeam.primaryColor}</code></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: selectedTeam.secondaryColor, border: '1px solid #CBD5E1' }}></span>
                  <span style={{ fontSize: '12px', color: '#334155' }}>Secondary: <code>{selectedTeam.secondaryColor}</code></span>
                </div>
              </div>
            </div>

            {/* Join Code Box */}
            <div style={{
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: '10px',
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
            }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#1E40AF', textTransform: 'uppercase' }}>Parent & Player Invite Code</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#1A56DB', letterSpacing: '2px' }}>{selectedTeam.joinCode}</div>
              </div>
              <button
                onClick={() => handleCopyCode(selectedTeam.joinCode)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #BFDBFE',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#1A56DB',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {copiedCode ? <Check size={14} color="#16A34A" /> : <Copy size={14} />}
                <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Status Modification Controls */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
              {selectedTeam.status !== 'Active' && (
                <button
                  className="btn-primary"
                  onClick={() => handleToggleStatus(selectedTeam.id, 'Active')}
                >
                  <CheckCircle2 size={16} />
                  <span>Approve & Activate</span>
                </button>
              )}
              {selectedTeam.status !== 'Suspended' && (
                <button
                  style={{
                    backgroundColor: '#FEE2E2',
                    color: '#B91C1C',
                    padding: '9px 14px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                  onClick={() => handleToggleStatus(selectedTeam.id, 'Suspended')}
                >
                  <XCircle size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} />
                  Suspend Team
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
