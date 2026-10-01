import React from 'react';
import {
  Users,
  Shield,
  CreditCard,
  TrendingUp,
  Download,
  AlertCircle,
  PlusCircle,
  Filter,
  CheckCircle,
  Clock
} from 'lucide-react';
import StatCard from '../components/StatCard';
import {
  mockKpiStats,
  mockSportsBreakdown,
  mockMonthlyRevenue,
  mockAuditFeed
} from '../mock/adminData';

export default function Dashboard() {
  const maxRevenue = Math.max(...mockMonthlyRevenue.map(m => m.volume));

  return (
    <div style={{ padding: '32px' }}>
      {/* Top Banner with Quick Actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '28px',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0D1B3E' }}>
            Platform Overview
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
            Real-time aggregate telemetry across leagues, clubs, coaches, and registrations
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            className="btn-secondary"
            onClick={() => alert('Phase 1 Mock: CSV report generated for all teams & transactions.')}
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <button
            className="btn-yellow"
            onClick={() => alert('Platform Fee configuration modal available under Settings.')}
          >
            <span>Platform Take: 10%</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '32px',
      }}>
        <StatCard
          title={mockKpiStats[0].label}
          value={mockKpiStats[0].value}
          change={mockKpiStats[0].change}
          isPositive={mockKpiStats[0].isPositive}
          subtext={mockKpiStats[0].subtext}
          icon={Shield}
          accentColor="#1A56DB"
        />
        <StatCard
          title={mockKpiStats[1].label}
          value={mockKpiStats[1].value}
          change={mockKpiStats[1].change}
          isPositive={mockKpiStats[1].isPositive}
          subtext={mockKpiStats[1].subtext}
          icon={Users}
          accentColor="#0D1B3E"
        />
        <StatCard
          title={mockKpiStats[2].label}
          value={mockKpiStats[2].value}
          change={mockKpiStats[2].change}
          isPositive={mockKpiStats[2].isPositive}
          subtext={mockKpiStats[2].subtext}
          icon={TrendingUp}
          accentColor="#10B981"
        />
        <StatCard
          title={mockKpiStats[3].label}
          value={mockKpiStats[3].value}
          change={mockKpiStats[3].change}
          isPositive={mockKpiStats[3].isPositive}
          subtext={mockKpiStats[3].subtext}
          icon={CreditCard}
          accentColor="#FFEF00"
        />
      </div>

      {/* Main Grid: Revenue Bar Visualizer & Sports Distribution */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '24px',
        marginBottom: '32px',
      }}>
        {/* Monthly Financial Volume Chart */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0D1B3E' }}>
                Platform Gross Volume & Take-Rate (Last 6 Months)
              </h3>
              <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                Monthly registration dues collected via Stripe Connect
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', backgroundColor: '#1A56DB', borderRadius: '2px' }}></span>
                <span style={{ color: '#475569', fontWeight: 600 }}>Gross GMV</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', backgroundColor: '#FFEF00', borderRadius: '2px' }}></span>
                <span style={{ color: '#475569', fontWeight: 600 }}>Junzle Cut (10%)</span>
              </div>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '20px', paddingBottom: '20px' }}>
            {mockMonthlyRevenue.map((item) => {
              const heightPercent = Math.round((item.volume / maxRevenue) * 100);
              const feeHeightPercent = Math.round((item.fee / maxRevenue) * 100);

              return (
                <div key={item.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#1E293B' }}>
                    ${(item.volume / 1000).toFixed(0)}k
                  </div>

                  <div style={{ width: '100%', maxWidth: '48px', height: `${heightPercent}%`, backgroundColor: '#EFF6FF', borderRadius: '8px 8px 0 0', position: 'relative', overflow: 'hidden' }}>
                    {/* GMV Bar */}
                    <div style={{ width: '100%', height: '100%', backgroundColor: '#1A56DB', borderRadius: '8px 8px 0 0' }}></div>
                    {/* Fee Indicator Line */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${feeHeightPercent * 3}%`, backgroundColor: '#FFEF00' }}></div>
                  </div>

                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>
                    {item.month}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sports Breakdown */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0D1B3E', marginBottom: '6px' }}>
            Teams by Sport
          </h3>
          <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '20px' }}>
            Distribution across 24 total registered rosters
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {mockSportsBreakdown.map((sport) => (
              <div key={sport.sport}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  <span style={{ color: '#1E293B' }}>{sport.sport}</span>
                  <span style={{ color: '#64748B' }}>{sport.count} teams ({sport.percentage}%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${sport.percentage}%`,
                    height: '100%',
                    backgroundColor: sport.color,
                    borderRadius: '999px',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Audit Feed & Quick Platform Health */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '24px',
      }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0D1B3E', marginBottom: '16px' }}>
            Recent Platform Activity & Audit Log
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mockAuditFeed.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '10px',
                  border: '1px solid #F1F5F9',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle size={16} color="#1A56DB" />
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '13px', color: '#0D1B3E' }}>
                      {item.action}:
                    </span>
                    <span style={{ fontSize: '13px', color: '#475569', marginLeft: '6px' }}>
                      {item.target}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>{item.actor}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#94A3B8' }}>
                    <Clock size={12} />
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
