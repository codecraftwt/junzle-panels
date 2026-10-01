import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';
import ScreenHeading from '../components/ScreenHeading';
import EyeToggle from '../components/EyeToggle';
import { ArrowRight } from 'lucide-react';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = (email || '').trim().toLowerCase();
    if (
      (cleanEmail === 'codecraftwt@gmail.com' || cleanEmail === 'codecraft' || cleanEmail === 'admin@junzle.com' || cleanEmail === 'admin') &&
      (password === 'Admin@123' || password === 'admin@123' || password === 'junzle2026' || password === 'admin')
    ) {
      navigate('/what-would-you-like-to-do');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="authWebPage">
      <AuthHeader onBack={() => navigate('/welcome')} />

      <main className="authWebContainer">
        <div className="authWebCard">
          <ScreenHeading
            title="Log In"
            subtitle="Welcome back! Enter your details to access your Junzle account."
          />

          {error && (
            <div style={{
              padding: '12px 16px',
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
            {/* Email Field */}
            <div className="authFormGroup">
              <label className="authFormLabel" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="authInput"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="authFormGroup">
              <label className="authFormLabel" htmlFor="password">Password</label>
              <div className="authInputWrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="authInput"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                {password.length > 0 && (
                  <EyeToggle
                    visible={showPassword}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>

              <button
                type="button"
                className="authForgotLink"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button type="submit" className="authPrimaryBtn">
              <span>Log In</span>
              <ArrowRight size={16} color="#FFFFFF" />
            </button>
          </form>

          {/* Don't have an account */}
          <div className="authFooterRow">
            <span>Don't have an account?</span>
            <button
              type="button"
              className="authFooterLink"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
