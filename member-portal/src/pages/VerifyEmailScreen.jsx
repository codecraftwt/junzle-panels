import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';
import ScreenHeading from '../components/ScreenHeading';

export default function VerifyEmailScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'andy@email.com';
  const phone = searchParams.get('phone') || '+1 (212) 555-1234';

  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleResend = () => {
    setSecondsLeft(60);
  };

  const handleOpenEmail = () => {
    navigate(`/email-verified?email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`);
  };

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div className="authWebPage">
      <AuthHeader onBack={() => navigate('/signup')} />

      <main className="authWebContainer">
        <div className="authWebCard">
          <ScreenHeading
            title="Verify Your Email"
            subtitle={
              <span>
                We’ve sent a verification link to <strong style={{ color: '#0D1B3E' }}>{email}</strong>. Please check your inbox and click the link to continue.
              </span>
            }
          />

          <div className="otpResendRow" style={{ marginTop: 24, marginBottom: 24 }}>
            <span>Didn’t receive Email? Resend in </span>
            {secondsLeft > 0 ? (
              <span className="otpTimerText">{formatTimer(secondsLeft)}</span>
            ) : (
              <button
                type="button"
                className="otpResendLink"
                onClick={handleResend}
              >
                Resend Email
              </button>
            )}
          </div>

          <button
            type="button"
            className="authPrimaryBtn"
            onClick={handleOpenEmail}
          >
            Open Email App / Continue
          </button>
        </div>
      </main>
    </div>
  );
}
