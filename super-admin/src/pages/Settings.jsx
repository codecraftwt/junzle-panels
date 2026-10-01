import React, { useState } from 'react';
import { Save, Check, ShieldAlert, Sliders, Bell, DollarSign, Palette, Lock } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    platformName: 'Junzle Sports Operating System',
    supportEmail: 'support@junzle.com',
    supportPhone: '+1 (800) 555-JUNZLE',
    currency: 'USD ($)',
    platformFeePercent: '10.0',
    fixedFeeCents: '30',
    stripeConnectStatus: 'Connected (acct_1NZjunzleConnect)',
    payoutCycle: 'Weekly (Every Monday)',
    primaryColor: '#1A56DB',
    accentColor: '#FFEF00',
    darkNavyColor: '#0D1B3E',
    enableTwilioSms: true,
    enableFcmPush: true,
    enableSesEmail: true,
    requireParent2fa: false,
    maintenanceMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1000px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0D1B3E' }}>
            Platform Settings & System Parameters
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
            Configure global fee defaults, Stripe Connect payout rules, brand tokens, and messaging switches
          </p>
        </div>

        {savedSuccess && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#DCFCE7',
            color: '#15803D',
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '13px',
          }}>
            <Check size={16} />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid #E2E8F0',
        marginBottom: '24px',
      }}>
        {[
          { id: 'general', label: 'General & Support', icon: Sliders },
          { id: 'financial', label: 'Financial & Stripe Fees', icon: DollarSign },
          { id: 'branding', label: 'Brand & Color Tokens', icon: Palette },
          { id: 'messaging', label: 'SMS & Push Notifications', icon: Bell },
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
                fontSize: '13px',
                fontWeight: 600,
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

      {/* Form Content */}
      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: '32px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        {/* Tab 1: General */}
        {activeTab === 'general' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0D1B3E' }}>General Platform Details</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Platform Display Name</label>
                <input
                  type="text"
                  name="platformName"
                  value={formData.platformName}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '8px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Operating Base Currency</label>
                <input
                  type="text"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '8px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Support Email Address</label>
                <input
                  type="email"
                  name="supportEmail"
                  value={formData.supportEmail}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '8px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Support Hotline</label>
                <input
                  type="text"
                  name="supportPhone"
                  value={formData.supportPhone}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '8px', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#FFFBEB', borderRadius: '10px', border: '1px solid #FDE68A' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={formData.maintenanceMode}
                  onChange={handleChange}
                  style={{ width: '18px', height: '18px', accentColor: '#1A56DB' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#92400E' }}>Platform Maintenance Mode</div>
                  <div style={{ fontSize: '12px', color: '#B45309' }}>Locks member registration and displays temporary maintenance notification on mobile and web</div>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Tab 2: Financial & Stripe */}
        {activeTab === 'financial' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0D1B3E' }}>Stripe Connect Platform Take-Rate & Payouts</h3>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              All registration fees collected through Junzle are automatically split via Stripe Connect. Junzle deducts its platform fee before routing net payouts to team accounts.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Junzle Platform Fee (%)</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    step="0.1"
                    name="platformFeePercent"
                    value={formData.platformFeePercent}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 14px 10px 32px', border: '1px solid #CBD5E1', borderRadius: '8px', outline: 'none' }}
                  />
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: '#64748B' }}>%</span>
                </div>
                <span style={{ fontSize: '11px', color: '#64748B', marginTop: '4px', display: 'block' }}>Default: 10.0% of gross transaction</span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Fixed Processing Fee (cents)</label>
                <input
                  type="number"
                  name="fixedFeeCents"
                  value={formData.fixedFeeCents}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '8px', outline: 'none' }}
                />
                <span style={{ fontSize: '11px', color: '#64748B', marginTop: '4px', display: 'block' }}>Standard Stripe fixed cut: 30¢</span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Stripe Master Account</label>
                <input
                  type="text"
                  name="stripeConnectStatus"
                  value={formData.stripeConnectStatus}
                  disabled
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: '8px', backgroundColor: '#F8FAFC', color: '#64748B' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Team Automatic Payout Frequency</label>
                <select
                  name="payoutCycle"
                  value={formData.payoutCycle}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '8px', outline: 'none', backgroundColor: '#FFFFFF' }}
                >
                  <option value="Daily">Daily (Next-day transfer)</option>
                  <option value="Weekly (Every Monday)">Weekly (Every Monday)</option>
                  <option value="Monthly (1st of month)">Monthly (1st of month)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Branding */}
        {activeTab === 'branding' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0D1B3E' }}>Brand Colors & Identity Tokens</h3>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              Enforced across Mobile App, Member Portal, and Admin surfaces per brand specification.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                <div style={{ height: '60px', backgroundColor: formData.primaryColor, borderRadius: '8px', marginBottom: '12px' }}></div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Primary Blue</label>
                <input
                  type="text"
                  name="primaryColor"
                  value={formData.primaryColor}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '6px 10px', marginTop: '4px', border: '1px solid #CBD5E1', borderRadius: '6px', fontFamily: 'monospace' }}
                />
                <span style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', display: 'block' }}>Royal Blue (#1A56DB)</span>
              </div>

              <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                <div style={{ height: '60px', backgroundColor: formData.accentColor, borderRadius: '8px', marginBottom: '12px' }}></div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Accent Yellow</label>
                <input
                  type="text"
                  name="accentColor"
                  value={formData.accentColor}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '6px 10px', marginTop: '4px', border: '1px solid #CBD5E1', borderRadius: '6px', fontFamily: 'monospace' }}
                />
                <span style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', display: 'block' }}>Canary Yellow (#FFEF00)</span>
              </div>

              <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                <div style={{ height: '60px', backgroundColor: formData.darkNavyColor, borderRadius: '8px', marginBottom: '12px' }}></div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Dark Navy</label>
                <input
                  type="text"
                  name="darkNavyColor"
                  value={formData.darkNavyColor}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '6px 10px', marginTop: '4px', border: '1px solid #CBD5E1', borderRadius: '6px', fontFamily: 'monospace' }}
                />
                <span style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', display: 'block' }}>Dark Navy (#0D1B3E)</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Messaging */}
        {activeTab === 'messaging' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0D1B3E' }}>Communications & Notification Channels</h3>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              Control delivery pipelines for push notifications, SMS blasts, and transactional emails.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid #E2E8F0', borderRadius: '10px', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#0D1B3E' }}>Twilio Urgent SMS Blasts</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Used for immediate weather cancellations and game schedule alerts to parents</div>
                </div>
                <input
                  type="checkbox"
                  name="enableTwilioSms"
                  checked={formData.enableTwilioSms}
                  onChange={handleChange}
                  style={{ width: '20px', height: '20px', accentColor: '#1A56DB' }}
                />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid #E2E8F0', borderRadius: '10px', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#0D1B3E' }}>Firebase Cloud Messaging (FCM) Push Notifications</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Push alerts for iOS & Android app users (RSVPs, roster updates, chat)</div>
                </div>
                <input
                  type="checkbox"
                  name="enableFcmPush"
                  checked={formData.enableFcmPush}
                  onChange={handleChange}
                  style={{ width: '20px', height: '20px', accentColor: '#1A56DB' }}
                />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid #E2E8F0', borderRadius: '10px', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#0D1B3E' }}>AWS SES Transactional Receipts & Waivers</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Registration confirmation emails, PDF liability waivers, and fee payment receipts</div>
                </div>
                <input
                  type="checkbox"
                  name="enableSesEmail"
                  checked={formData.enableSesEmail}
                  onChange={handleChange}
                  style={{ width: '20px', height: '20px', accentColor: '#1A56DB' }}
                />
              </label>
            </div>
          </div>
        )}

        {/* Submit Actions */}
        <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => alert('Settings reset to defaults.')}
          >
            Reset Defaults
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            <Save size={16} />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
