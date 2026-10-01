import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';
import ScreenHeading from '../components/ScreenHeading';
import { ArrowRight } from 'lucide-react';

export default function WhatWouldYouLikeToDoScreen() {
  const navigate = useNavigate();

  return (
    <div className="authWebPage">
      <AuthHeader onBack={() => navigate('/welcome')} />

      <main className="authWebContainer">
        <div className="authWebCard">
          <ScreenHeading
            title={
              <>
                What Would You Like To<br />Do?
              </>
            }
            subtitle="You can create a new team or find and join an existing team."
          />

          <div className="actionChoiceGrid">
            {/* Create a Team Card */}
            <div
              className="actionChoiceCard"
              onClick={() => navigate('/flow/coach')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/flow/coach')}
            >
              <div>
                <div className="actionChoiceTitle">Create a Team</div>
                <div className="actionChoiceSub">
                  Set up a new team and invite members.
                </div>
              </div>
              <ArrowRight size={20} color="#2B7FFF" />
            </div>

            {/* Find My Team Card */}
            <div
              className="actionChoiceCard"
              onClick={() => navigate('/find-team')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/find-team')}
            >
              <div>
                <div className="actionChoiceTitle">Find My Team</div>
                <div className="actionChoiceSub">
                  Search for an existing team to join
                </div>
              </div>
              <ArrowRight size={20} color="#2B7FFF" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
