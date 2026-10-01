import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import JunzleLogo from '../components/JunzleLogo';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e?.preventDefault();
    setError('');

    // Verification check (hardcoded credentials in code: Admin@123)
    const cleanEmail = (email || '').trim().toLowerCase();
    if (
      (cleanEmail === 'codecraftwt@gmail.com' || cleanEmail === 'codecraft' || cleanEmail === 'admin@junzle.com' || cleanEmail === 'admin') &&
      (password === 'Admin@123' || password === 'admin@123' || password === 'junzle2026' || password === 'admin')
    ) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess();
        navigate('/dashboard');
      }, 400);
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: '#0D1B3E',
      backgroundImage: 'radial-gradient(ellipse at 80% 20%, rgba(26, 86, 219, 0.35) 0%, transparent 60%)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }}>
        {/* Logo and Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            backgroundColor: '#0D1B3E',
            padding: '10px 20px',
            borderRadius: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 4px 12px rgba(13, 27, 62, 0.25)',
          }}>
            <img src="/assets/junzle-logo.png" alt="Junzle" style={{ height: '32px', objectFit: 'contain' }} />
            <span style={{
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.8px',
              backgroundColor: '#FFEF00',
              color: '#0D1B3E',
              padding: '2px 7px',
              borderRadius: '4px',
            }}>
              SUPER ADMIN
            </span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0D1B3E', marginTop: '18px' }}>
            Internal Admin Console
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '6px' }}>
            Platform operations, fee auditing & team management
          </p>
        </div>

        {error && (
          <div style={{
            padding: '12px',
            backgroundColor: '#FEE2E2',
            border: '1px solid #FCA5A5',
            borderRadius: '8px',
            color: '#B91C1C',
            fontSize: '13px',
            marginBottom: '20px',
            fontWeight: 500,
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Admin Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@junzle.com"
                required
                style={{
                  width: '100%',
                  padding: '11px 16px 11px 40px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  outline: 'none',
                  fontSize: '14px',
                  color: '#0F172A',
                }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                style={{
                  width: '100%',
                  padding: '11px 16px 11px 40px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  outline: 'none',
                  fontSize: '14px',
                  color: '#0F172A',
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '13px',
              backgroundColor: '#1A56DB',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '15px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background 0.2s',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        <div style={{
          marginTop: '28px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#94A3B8',
          borderTop: '1px solid #F1F5F9',
          paddingTop: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
        }}>
          <ShieldCheck size={14} color="#10B981" />
          <span>Junzle Super Admin • Secure RBAC Console</span>
        </div>
      </div>
    </div>
  );
}
