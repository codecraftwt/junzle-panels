import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';
import ScreenHeading from '../components/ScreenHeading';

export default function VerifyPhoneScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const phone = searchParams.get('phone') || '+1 (212) 555-1234';

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleDigitChange = (val, idx) => {
    const cleaned = val.replace(/[^0-9]/g, '');
    const newCode = [...code];

    if (cleaned.length > 1) {
      const pasted = cleaned.slice(0, 6).split('');
      pasted.forEach((d, i) => {
        if (i < 6) newCode[i] = d;
      });
      setCode(newCode);
      const nextIdx = Math.min(pasted.length, 5);
      inputRefs.current[nextIdx]?.focus();
      return;
    }

    newCode[idx] = cleaned;
    setCode(newCode);

    if (cleaned && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleResend = () => {
    setSecondsLeft(60);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    navigate('/phone-confirmed');
  };

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div className="authWebPage">
      <AuthHeader onBack={() => navigate(-1)} />

      <main className="authWebContainer">
        <div className="authWebCard">
          <ScreenHeading
            title="Enter Verification Code"
            subtitle={`We’ve sent a 6-digit code to ${phone}`}
          />

          <form onSubmit={handleVerify}>
            {/* 6 Digit OTP Container */}
            <div className="otpCodeContainer">
              {code.map((digit, idx) => (
                <div
                  key={idx}
                  className={`otpCodeBox ${digit ? 'otpCodeBox--filled' : ''}`}
                >
                  <input
                    ref={(el) => (inputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(e.target.value, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="otpCodeInput"
                    autoFocus={idx === 0}
                  />
                </div>
              ))}
            </div>

            {/* Resend Row */}
            <div className="otpResendRow">
              <span>Didn’t receive code? Resend in </span>
              {secondsLeft > 0 ? (
                <span className="otpTimerText">{formatTimer(secondsLeft)}</span>
              ) : (
                <button
                  type="button"
                  className="otpResendLink"
                  onClick={handleResend}
                >
                  Resend Code
                </button>
              )}
            </div>

            {/* Verify Button */}
            <button type="submit" className="authPrimaryBtn">
              Verify
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
