import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function AuthHeader({ onBack, showBack = true, rightComponent = null }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="authWebNavbar">
      <div className="authWebNavLeft">
        {showBack && (
          <button
            type="button"
            className="authWebBackBtn"
            onClick={handleBack}
            title="Go Back"
            aria-label="Go Back"
          >
            <ChevronLeft size={18} color="#0D1B3E" />
          </button>
        )}
      </div>

      <div className="authWebNavCenter" onClick={() => navigate('/welcome')} style={{ cursor: 'pointer' }}>
        <img
          src="/assets/dark-logo.png"
          alt="Junzle"
          className="authWebNavLogo"
        />
      </div>

      <div className="authWebNavRight">
        {rightComponent}
      </div>
    </header>
  );
}
