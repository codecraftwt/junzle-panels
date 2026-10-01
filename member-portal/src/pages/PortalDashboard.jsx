import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Users,
  MessageSquare,
  Trophy,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  HelpCircle,
  ArrowLeft,
  Share2,
  DollarSign
} from 'lucide-react';

export default function PortalDashboard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const role = searchParams.get('role') || 'parent';
  const teamParam = searchParams.get('team') || 'Thunderbolts SC 2014 Boys';

  const [activeTab, setActiveTab] = useState('schedule');
  const [rsvpStatus, setRsvpStatus] = useState('going'); // 'going', 'not-going', 'maybe'

  const scheduleEvents = [
    {
      id: 1,
      title: 'Match vs Austin FC Academy',
      type: 'League Game',
      date: 'Saturday, Oct 3, 2026',
      time: '10:00 AM',
      location: 'Field 4, Round Rock Multipurpose Complex',
      arrival: 'Arrive 45 mins prior in Blue kit',
      score: 'Upcoming',
    },
    {
      id: 2,
      title: 'Tactical Practice & Set Pieces',
      type: 'Practice',
      date: 'Tuesday, Oct 6, 2026',
      time: '5:30 PM - 7:00 PM',
      location: 'Zilker Park Field #2',
      arrival: 'Bring cleats, shinguards & water',
      score: 'Practice',
    },
    {
      id: 3,
      title: 'Fall Showcase Tournament Match',
      type: 'Tournament',
      date: 'Saturday, Oct 10, 2026',
      time: '1:15 PM',
      location: 'Central Texas Soccer Fields',
      arrival: 'Full day tournament',
      score: 'Upcoming',
    },
  ];

  const rosterList = [
    { number: 7, name: 'Liam Miller', position: 'Midfielder', parent: 'Jennifer Miller', status: 'Active' },
    { number: 10, name: 'Mateo Vance', position: 'Forward / Striker', parent: 'Marcus Vance', status: 'Active' },
    { number: 4, name: 'Noah Davis', position: 'Center Back', parent: 'Sarah Davis', status: 'Active' },
    { number: 1, name: 'Ethan Cole', position: 'Goalkeeper', parent: 'Brian Cole', status: 'Active' },
    { number: 8, name: 'Lucas Hernandez', position: 'Midfielder', parent: 'Maria Hernandez', status: 'Active' },
    { number: 14, name: 'Jack Wilson', position: 'Defense', parent: 'Tom Wilson', status: 'Active' },
  ];

  return (
    <div style={{ padding: '36px 24px', backgroundColor: '#F8FAFC', minHeight: 'calc(100vh - 72px)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Back navigation */}
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#64748B',
            marginBottom: '20px',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Entry Screen</span>
        </button>

        {/* Team Banner Header */}
        <div style={{
          backgroundColor: '#0D1B3E',
          borderRadius: '20px',
          padding: '32px',
          color: '#FFFFFF',
          marginBottom: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(26, 86, 219, 0.5) 0%, transparent 60%)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '16px',
              backgroundColor: '#1A56DB',
              border: '3px solid #FFEF00',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 900,
              color: '#FFFFFF',
            }}>
              {teamParam.charAt(0)}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 900 }}>{teamParam}</h1>
                <span style={{
                  backgroundColor: '#FFEF00',
                  color: '#0D1B3E',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: '6px',
                }}>
                  {role.toUpperCase()} VIEW
                </span>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '13px', marginTop: '4px' }}>
                Soccer • Division U11 • Metro Elite Soccer Academy • Austin, TX
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => alert('Invite code TBOLT11 copied to clipboard!')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 16px',
                backgroundColor: 'rgba(255,255,255,0.12)',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              <Share2 size={15} />
              <span>Share Invite Code (TBOLT11)</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div style={{
          display: 'flex',
          gap: '12px',
          borderBottom: '1px solid #E2E8F0',
          marginBottom: '24px',
        }}>
          {[
            { id: 'schedule', label: 'Schedule & Games', icon: Calendar },
            { id: 'roster', label: 'Team Roster', icon: Users },
            { id: 'messages', label: 'Coach Announcements', icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 18px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: isActive ? '#1A56DB' : '#64748B',
                  borderBottom: isActive ? '3px solid #1A56DB' : '3px solid transparent',
                  marginBottom: '-1px',
                  transition: 'all 0.15s',
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: SCHEDULE */}
        {activeTab === 'schedule' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {scheduleEvents.map((evt, idx) => (
              <div
                key={evt.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: evt.type === 'League Game' ? '#EFF6FF' : '#FEF3C7',
                      color: evt.type === 'League Game' ? '#1A56DB' : '#92400E',
                    }}>
                      {evt.type}
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>
                      {evt.date} • {evt.time}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0D1B3E' }}>
                    {evt.title}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569', marginTop: '6px' }}>
                    <MapPin size={14} color="#1A56DB" />
                    <span>{evt.location}</span>
                  </div>
                </div>

                {/* RSVP Controls for Parent / Player */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>RSVP:</span>
                  <button
                    onClick={() => setRsvpStatus('going')}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      backgroundColor: rsvpStatus === 'going' ? '#DCFCE7' : '#F1F5F9',
                      color: rsvpStatus === 'going' ? '#15803D' : '#64748B',
                      border: rsvpStatus === 'going' ? '1px solid #86EFAC' : '1px solid transparent',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <CheckCircle size={14} />
                    <span>Attending</span>
                  </button>
                  <button
                    onClick={() => setRsvpStatus('not-going')}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      backgroundColor: rsvpStatus === 'not-going' ? '#FEE2E2' : '#F1F5F9',
                      color: rsvpStatus === 'not-going' ? '#B91C1C' : '#64748B',
                      border: rsvpStatus === 'not-going' ? '1px solid #FCA5A5' : '1px solid transparent',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <XCircle size={14} />
                    <span>Can't Make It</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: ROSTER */}
        {activeTab === 'roster' && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            overflow: 'hidden',
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569' }}>JERSEY #</th>
                  <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569' }}>PLAYER NAME</th>
                  <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569' }}>POSITION</th>
                  <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569' }}>PRIMARY CONTACT</th>
                  <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {rosterList.map((player) => (
                  <tr key={player.number} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '14px 20px', fontWeight: 900, color: '#1A56DB', fontSize: '16px' }}>
                      #{player.number}
                    </td>
                    <td style={{ padding: '14px 20px', fontWeight: 700, color: '#0D1B3E' }}>
                      {player.name}
                    </td>
                    <td style={{ padding: '14px 20px', color: '#64748B', fontSize: '13px' }}>
                      {player.position}
                    </td>
                    <td style={{ padding: '14px 20px', color: '#334155', fontSize: '13px' }}>
                      {player.parent}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#16A34A', backgroundColor: '#DCFCE7', padding: '3px 8px', borderRadius: '999px' }}>
                        {player.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: MESSAGES */}
        {activeTab === 'messages' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ fontWeight: 800, fontSize: '15px', color: '#0D1B3E' }}>Coach Marcus Vance</div>
                <div style={{ fontSize: '12px', color: '#94A3B8' }}>Yesterday at 4:15 PM</div>
              </div>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
                Great session yesterday boys! For this Saturday's match against Austin FC Academy, please ensure you wear the Royal Blue kit with Canary Yellow socks. Please arrive by 9:15 AM for dynamic stretching.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
