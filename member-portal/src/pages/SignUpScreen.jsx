import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';
import ScreenHeading from '../components/ScreenHeading';

export default function SignUpScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleContinue = (e) => {
    e.preventDefault();
    const userEmail = email.trim() || 'andy@email.com';
    const userPhone = phone.trim() || '+1 (212) 555-1234';
    navigate(`/verify-email?email=${encodeURIComponent(userEmail)}&phone=${encodeURIComponent(userPhone)}`);
  };

  return (
    <div className="authWebPage">
      <AuthHeader onBack={() => navigate('/welcome')} />

      <main className="authWebContainer">
        <div className="authWebCard">
          <ScreenHeading
            title="Create Account"
            subtitle="Enter your email and phone number to get started with Junzle."
          />

          <form onSubmit={handleContinue}>
            {/* Email Field */}
            <div className="authFormGroup">
              <label className="authFormLabel" htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                className="authInput"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            {/* Phone Number Field */}
            <div className="authFormGroup">
              <label className="authFormLabel" htmlFor="signup-phone">Phone Number</label>
              <div className="authPhoneRow">
                <div className="authCountryCode">
                  <span className="authFlagEmoji">🇺🇸</span>
                  <span className="authDialCode">+1</span>
                </div>
                <input
                  id="signup-phone"
                  type="tel"
                  className="authInput"
                  placeholder="(212) 555–1234"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  required
                />
              </div>
            </div>

            {/* Continue Button */}
            <button type="submit" className="authPrimaryBtn">
              Continue
            </button>
          </form>

          {/* Already have an account? Log In */}
          <div className="authFooterRow">
            <span>Already have an account?</span>
            <button
              type="button"
              className="authFooterLink"
              onClick={() => navigate('/login')}
            >
              Log In
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
