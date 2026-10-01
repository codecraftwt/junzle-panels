import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';
import ScreenHeading from '../components/ScreenHeading';

export default function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSendResetLink = (e) => {
    e.preventDefault();
    navigate('/reset-password');
  };

  return (
    <div className="authWebPage">
      <AuthHeader onBack={() => navigate('/login')} />

      <main className="authWebContainer">
        <div className="authWebCard">
          <ScreenHeading
            title="Forgot Password?"
            subtitle="Enter your email and we'll send you a reset link."
          />

          <form onSubmit={handleSendResetLink}>
            <div className="authFormGroup">
              <label className="authFormLabel" htmlFor="forgot-email">Email</label>
              <input
                id="forgot-email"
                type="email"
                className="authInput"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <button type="submit" className="authPrimaryBtn">
              Send Reset Link
            </button>
          </form>

          <div className="authFooterRow">
            <span>Remember your password?</span>
            <button
              type="button"
              className="authFooterLink"
              onClick={() => navigate('/login')}
            >
              Back to Log In
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
