import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="welcomeWebPage">
      {/* Top Navbar */}
      <header className="welcomeWebNav">
        <div className="webFlowNavBrand">
          <img src="/assets/junzle-logo.png" alt="Junzle" style={{ height: 32, objectFit: 'contain' }} />
        </div>
      </header>

      {/* Main Grid: Left Hero & Right Action Card */}
      <div className="welcomeWebGrid">
        {/* Left: Hero Information */}
        <div className="welcomeHeroCol">
          <img
            src="/assets/junzle-logo.png"
            alt="Junzle"
            className="welcomeLogoLarge"
          />
          <h1 className="welcomeHeroHeading">
            Welcome to<br />Junzle
          </h1>
          <p className="welcomeHeroSub">
            Manage your team, stay connected, and keep everything in one place.
          </p>

          <div className="welcomeFeatureList">
            {[
              'Create and manage youth sports teams with custom branding',
              'Real-time communication between coaches, parents, and players',
              'Interactive team finder with QR code scanning & instant invite links',
              'Schedules, rosters, attendance, and member verification',
            ].map((text, idx) => (
              <div key={idx} className="welcomeFeatureItem">
                <div className="welcomeFeatureDot" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Onboarding Action Card */}
        <div className="welcomeActionCard">
          {/* Create a Team */}
          <button
            type="button"
            className="welcomeCardOption"
            onClick={() => navigate('/flow/coach')}
          >
            <div>
              <div className="welcomeCardOptionTitle">Create a Team</div>
              <div className="welcomeCardOptionSub">Set up a new team, invite members.</div>
            </div>
            <ArrowRight size={18} color="#2B7FFF" />
          </button>

          {/* Find My Team */}
          <button
            type="button"
            className="welcomeCardOption"
            onClick={() => navigate('/find-team')}
          >
            <div>
              <div className="welcomeCardOptionTitle">Find My Team</div>
              <div className="welcomeCardOptionSub">Search for an existing team to join</div>
            </div>
            <ArrowRight size={18} color="#2B7FFF" />
          </button>

          {/* OR Divider */}
          <div className="welcomeOrRow">
            <div className="welcomeOrLine" />
            <span className="welcomeOrText">OR</span>
            <div className="welcomeOrLine" />
          </div>

          {/* Sign Up Button */}
          <button
            type="button"
            className="welcomeSignUpBtn"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>

          {/* Already have an account? Log In */}
          <div className="welcomeLoginRow">
            <span>Already have an account?</span>
            <button
              type="button"
              className="welcomeLoginLink"
              onClick={() => navigate('/login')}
            >
              Log In
            </button>
          </div>

          {/* Browse Roles Link */}
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                fontSize: 12,
                cursor: 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
              onClick={() => navigate('/role-picker')}
            >
              Browse All Roles &amp; Paths →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
