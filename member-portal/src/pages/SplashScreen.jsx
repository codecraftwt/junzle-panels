import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 2400);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splashPage">
      <div className="splashRippleRing splashRippleRing--1" />
      <div className="splashRippleRing splashRippleRing--2" />

      <div className="splashContent">
        <img
          src="/assets/junzle-logo.png"
          alt="Junzle"
          className="splashLogo"
        />
        <p className="splashTagline">Manage. Connect. Win.</p>
        
        <div className="splashProgressBar">
          <div className="splashProgressFill" />
        </div>

        <button
          type="button"
          className="splashSkipBtn"
          onClick={() => navigate('/welcome')}
        >
          Skip Intro →
        </button>
      </div>
    </div>
  );
}
