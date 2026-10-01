import React, { useState } from 'react';
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft, DollarSign, CreditCard } from 'lucide-react';
import { mockTransactions } from '../mock/adminData';

export default function Transactions() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredTxns = transactions.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.payer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalGross = transactions.reduce((acc, curr) => acc + curr.gross, 0);
  const totalFees = transactions.reduce((acc, curr) => acc + curr.junzleFee, 0);

  return (
    <div style={{ padding: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0D1B3E' }}>
            Financial Ledger & Transactions
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
            Stripe Connect payment orchestration, automatic split fees, and team payout tracking
          </p>
        </div>

        <button
          className="btn-secondary"
          onClick={() => alert('Exporting full transaction ledger CSV...')}
        >
          <Download size={16} />
          <span>Export Ledger</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Filtered Gross Volume</span>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0D1B3E', marginTop: '4px' }}>
            ${totalGross.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Junzle Platform Revenue (10%)</span>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#1A56DB', marginTop: '4px' }}>
            ${totalFees.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Settlement Platform</span>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#10B981', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
            Stripe Connect Express
          </div>
        </div>
      </div>

      {/* Filter and Search */}
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
        <div style={{ position: 'relative', width: '340px' }}>
          <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search txn ID, payer, or team..."
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
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Refunded">Refunded</option>
        </select>
      </div>

      {/* Transactions Table */}
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
              <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Transaction</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Payer & Team</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Gross Charge</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Junzle Fee</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Team Payout</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Method</th>
              <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTxns.map((txn) => (
              <tr
                key={txn.id}
                style={{ borderBottom: '1px solid #F1F5F9', transition: 'background-color 0.15s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 600, color: '#0D1B3E' }}>{txn.id}</div>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>{txn.date}</div>
                </td>

                <td style={{ padding: '16px 20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0D1B3E' }}>{txn.payer}</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>{txn.team}</div>
                </td>

                <td style={{ padding: '16px 20px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: txn.gross < 0 ? '#DC2626' : '#0D1B3E' }}>
                    ${Math.abs(txn.gross).toFixed(2)}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>{txn.description}</div>
                </td>

                <td style={{ padding: '16px 20px' }}>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#1A56DB',
                    backgroundColor: '#EFF6FF',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}>
                    ${Math.abs(txn.junzleFee).toFixed(2)}
                  </span>
                </td>

                <td style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                  ${Math.abs(txn.netPayout).toFixed(2)}
                </td>

                <td style={{ padding: '16px 20px', fontSize: '12px', color: '#64748B' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CreditCard size={14} color="#94A3B8" />
                    <span>{txn.method}</span>
                  </div>
                </td>

                <td style={{ padding: '16px 20px' }}>
                  <span className={`badge ${
                    txn.status === 'Completed'
                      ? 'badge-active'
                      : txn.status === 'Pending'
                      ? 'badge-pending'
                      : 'badge-suspended'
                  }`}>
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
