import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';

export default function PhoneConfirmedScreen() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/what-would-you-like-to-do');
  };

  return (
    <div className="authWebPage">
      <AuthHeader onBack={() => navigate(-1)} />

      <main className="authWebContainer">
        <div className="authWebCard">
          <div className="authSuccessBlock">
            <img
              src="/assets/verified.png"
              alt="Verified"
              className="authVerifiedBadge"
            />

            <h1 className="screenHeadingTitle" style={{ fontSize: 30, marginBottom: 8 }}>
              Phone Number Confirmed
            </h1>
            <p className="screenHeadingSubtitle" style={{ maxWidth: 360, margin: '0 auto 28px' }}>
              Your phone number has been verified. Your account is ready to use.
            </p>

            <button
              type="button"
              className="authPrimaryBtn"
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
