import React, { useState } from 'react';
import { Search, Filter, UserCheck, Shield, Mail, Phone, Eye } from 'lucide-react';
import { mockUsers } from '../mock/adminData';
import Modal from '../components/Modal';

export default function Users() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm);
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return { bg: '#FEF08A', color: '#854D0E', border: '#FDE047' };
      case 'LEAGUE_ADMIN':
        return { bg: '#E0E7FF', color: '#3730A3', border: '#C7D2FE' };
      case 'CLUB_OWNER':
        return { bg: '#EDE9FE', color: '#5B21B6', border: '#DDD6FE' };
      case 'COACH':
        return { bg: '#DBEAFE', color: '#1E40AF', border: '#BFDBFE' };
      case 'PARENT':
        return { bg: '#DCFCE7', color: '#166534', border: '#BBF7D0' };
      case 'PLAYER':
        return { bg: '#FEF3C7', color: '#92400E', border: '#FDE68A' };
      case 'SPECTATOR':
        return { bg: '#F1F5F9', color: '#475569', border: '#E2E8F0' };
      default:
        return { bg: '#F1F5F9', color: '#475569', border: '#E2E8F0' };
    }
  };

  return (
    <div style={{ padding: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0D1B3E' }}>
            Users & Roles Directory
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
            Role-Based Access Control (RBAC) directory across all 7 platform member tiers
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748B' }}>
          <span>Total Registered: <strong>{users.length}</strong> active profiles</span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
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
            placeholder="Search users by name, email, phone..."
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

        {/* Role Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>Filter Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
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
            <option value="All">All Roles (7 Tiers)</option>
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="LEAGUE_ADMIN">League Admin</option>
            <option value="CLUB_OWNER">Club Owner</option>
            <option value="COACH">Coach</option>
            <option value="PARENT">Parent</option>
            <option value="PLAYER">Player</option>
            <option value="SPECTATOR">Fan / Spectator</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
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
              <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Member</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Assigned Role</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Contact Info</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Linked Entity</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              const roleStyle = getRoleBadgeStyle(user.role);
              return (
                <tr
                  key={user.id}
                  style={{ borderBottom: '1px solid #F1F5F9', transition: 'background-color 0.15s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#1A56DB',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '13px',
                      }}>
                        {user.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '14px', color: '#0D1B3E' }}>{user.name}</div>
                        <div style={{ fontSize: '11px', color: '#94A3B8' }}>Joined: {user.joinedDate}</div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 700,
                      backgroundColor: roleStyle.bg,
                      color: roleStyle.color,
                      border: `1px solid ${roleStyle.border}`,
                    }}>
                      {user.role}
                    </span>
                  </td>

                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Mail size={13} color="#94A3B8" />
                      <span>{user.email}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                      <Phone size={13} color="#94A3B8" />
                      <span>{user.phone}</span>
                    </div>
                  </td>

                  <td style={{ padding: '16px 20px', fontSize: '13px', color: '#334155' }}>
                    {user.linkedEntities}
                  </td>

                  <td style={{ padding: '16px 20px' }}>
                    <span className="badge badge-active">{user.status}</span>
                  </td>

                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <button
                      onClick={() => setSelectedUser(user)}
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
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* User Details Modal */}
      <Modal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title={selectedUser?.name || 'User Profile'}
        maxWidth="500px"
      >
        {selectedUser && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#1A56DB',
                color: '#FFFFFF',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '20px',
                marginBottom: '12px',
              }}>
                {selectedUser.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#0D1B3E' }}>{selectedUser.name}</h4>
              <div style={{ marginTop: '4px' }}>
                <span className="badge badge-role">{selectedUser.role}</span>
              </div>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Email Address</span>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0D1B3E' }}>{selectedUser.email}</div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Phone Number</span>
                <div style={{ fontSize: '13px', color: '#334155' }}>{selectedUser.phone}</div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Assigned Teams / Leagues</span>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#1A56DB' }}>{selectedUser.linkedEntities}</div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Account Creation Date</span>
                <div style={{ fontSize: '13px', color: '#334155' }}>{selectedUser.joinedDate}</div>
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                className="btn-secondary"
                onClick={() => setSelectedUser(null)}
              >
                Close
              </button>
              <button
                style={{
                  backgroundColor: '#FEE2E2',
                  color: '#B91C1C',
                  padding: '9px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
                onClick={() => {
                  alert(`User ${selectedUser.name} flagged for review.`);
                  setSelectedUser(null);
                }}
              >
                Flag Profile
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
