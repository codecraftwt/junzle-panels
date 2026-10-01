import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';

export default function EmailVerifiedScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'andy@email.com';
  const phone = searchParams.get('phone') || '+1 (212) 555-1234';

  const handleContinue = () => {
    navigate(`/verify-phone?email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`);
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

            <h1 className="screenHeadingTitle" style={{ fontSize: 32, marginBottom: 8 }}>
              Email Verified
            </h1>
            <p className="screenHeadingSubtitle" style={{ maxWidth: 360, margin: '0 auto 28px' }}>
              Your email has been successfully verified. Now, let’s confirm your phone number.
            </p>

            <button
              type="button"
              className="authPrimaryBtn"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
