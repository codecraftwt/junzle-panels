import React, { useState } from 'react';
import { Copy, Check, Share2, Download } from 'lucide-react';

export default function QRCodeDisplay({ joinCode, teamName, primaryColor = '#1A56DB' }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const inviteLink = `https://junzle.com/join/${joinCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(joinCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      border: '1px solid #E2E8F0',
      padding: '28px',
      textAlign: 'center',
    }}>
      {/* QR Code Container */}
      <div style={{
        display: 'inline-flex',
        padding: '20px',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 8px 30px rgba(13, 27, 62, 0.08)',
        border: '1px solid #E2E8F0',
        marginBottom: '20px',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Render crisp SVG QR Code with Junzle center mark */}
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background */}
          <rect width="180" height="180" fill="white" />

          {/* Top-Left Corner Marker */}
          <rect x="15" y="15" width="45" height="45" rx="8" fill="#0D1B3E" />
          <rect x="23" y="23" width="29" height="29" rx="4" fill="white" />
          <rect x="29" y="29" width="17" height="17" rx="3" fill="#1A56DB" />

          {/* Top-Right Corner Marker */}
          <rect x="120" y="15" width="45" height="45" rx="8" fill="#0D1B3E" />
          <rect x="128" y="23" width="29" height="29" rx="4" fill="white" />
          <rect x="134" y="29" width="17" height="17" rx="3" fill="#1A56DB" />

          {/* Bottom-Left Corner Marker */}
          <rect x="15" y="120" width="45" height="45" rx="8" fill="#0D1B3E" />
          <rect x="23" y="128" width="29" height="29" rx="4" fill="white" />
          <rect x="29" y="134" width="17" height="17" rx="3" fill="#1A56DB" />

          {/* Dynamic Grid Pattern */}
          <g fill="#0D1B3E">
            <rect x="68" y="18" width="8" height="16" rx="2" />
            <rect x="82" y="26" width="16" height="8" rx="2" />
            <rect x="104" y="18" width="8" height="8" rx="2" />

            <rect x="68" y="42" width="12" height="12" rx="2" fill="#1A56DB" />
            <rect x="88" y="46" width="18" height="8" rx="2" />

            <rect x="18" y="68" width="8" height="18" rx="2" />
            <rect x="34" y="74" width="18" height="8" rx="2" />
            <rect x="42" y="90" width="12" height="12" rx="2" />

            <rect x="120" y="68" width="18" height="8" rx="2" />
            <rect x="146" y="76" width="16" height="16" rx="2" fill="#1A56DB" />
            <rect x="124" y="92" width="12" height="8" rx="2" />

            <rect x="68" y="120" width="12" height="18" rx="2" />
            <rect x="88" y="132" width="18" height="8" rx="2" />
            <rect x="108" y="124" width="8" height="26" rx="2" />
            <rect x="124" y="140" width="18" height="18" rx="2" fill="#1A56DB" />
            <rect x="150" y="128" width="12" height="12" rx="2" />
          </g>

          {/* Center Logo Cutout */}
          <rect x="65" y="65" width="50" height="50" rx="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          <g transform="translate(73, 73) scale(0.34)">
            <rect width="100" height="100" rx="20" fill="#1A56DB" />
            <g transform="translate(18, 16) scale(0.68)">
              <polygon points="47,38 62,38 52,48 60,48 44,66 49,50 42,50" fill="#FFEF00" />
              <g transform="skewX(-13) translate(14, 0)">
                <path d="M 32 10 L 68 10 L 65 22 L 53 22 L 48 42 L 40 42 L 43 30 L 43 22 L 32 22 Z" fill="#FFFFFF" />
                <path d="M 46 48 L 57 48 L 53 60 C 51 68, 44 74, 34 74 C 23 74, 16 67, 18 57 L 29 57 C 28 61, 31 64, 35 64 C 39 64, 42 61, 43 57 Z" fill="#FFFFFF" />
              </g>
            </g>
          </g>
        </svg>

        <div style={{ marginTop: '8px', fontSize: '12px', fontWeight: 700, color: '#64748B' }}>
          Scan to join {teamName || 'Team'}
        </div>
      </div>

      {/* Code Display */}
      <div style={{
        backgroundColor: '#EFF6FF',
        border: '1px solid #BFDBFE',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        maxWidth: '460px',
        margin: '0 auto 16px auto',
      }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#1E40AF', textTransform: 'uppercase' }}>
            Team Roster Code
          </div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: '#1A56DB', letterSpacing: '3px' }}>
            {joinCode}
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopyCode}
          style={{
            padding: '8px 14px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #BFDBFE',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 700,
            color: '#1A56DB',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {copiedCode ? <Check size={16} color="#16A34A" /> : <Copy size={16} />}
          <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
        </button>
      </div>

      {/* Shareable URL Box */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        border: '1px solid #CBD5E1',
        borderRadius: '10px',
        padding: '6px 6px 6px 16px',
        maxWidth: '460px',
        margin: '0 auto',
      }}>
        <input
          type="text"
          readOnly
          value={inviteLink}
          style={{
            flex: 1,
            border: 'none',
            backgroundColor: 'transparent',
            outline: 'none',
            fontSize: '13px',
            color: '#334155',
          }}
        />
        <button
          type="button"
          onClick={handleCopyLink}
          className="btn-primary"
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          {copiedLink ? <Check size={14} /> : <Share2 size={14} />}
          <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
        </button>
      </div>
    </div>
  );
}
