import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';
import { ArrowRight, Copy, Check, Download, MessageSquare, Mail } from 'lucide-react';

export default function TeamCreatedScreen() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const inviteLink = 'junzle.com/t/riverside.b';

  const handleCopy = () => {
    navigator.clipboard?.writeText?.(`https://${inviteLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContinue = () => {
    navigate('/what-would-you-like-to-do');
  };

  return (
    <div className="authWebPage">
      <AuthHeader onBack={() => navigate('/what-would-you-like-to-do')} />

      <main className="authWebContainer">
        <div className="authWebCard authWebCard--wide">
          {/* Top Success Block */}
          <div className="authSuccessBlock">
            <img
              src="/assets/verified.png"
              alt="Team Created"
              className="authVerifiedBadge"
            />
            <h1 className="screenHeadingTitle" style={{ fontSize: 32, marginBottom: 6 }}>
              Team Created !
            </h1>
            <p className="screenHeadingSubtitle" style={{ maxWidth: 420, margin: '0 auto 16px' }}>
              Your team is ready. Share the link or QR code to invite members.
            </p>
          </div>

          {/* QR Code Block */}
          <div className="teamCreatedQrWrap">
            <img
              src="/assets/qr-code.png"
              alt="Team QR Code"
              className="teamCreatedQrImg"
            />
          </div>

          {/* Download Button */}
          <button
            type="button"
            className="downloadQrBtn"
            onClick={() => alert('Downloading QR Code image...')}
          >
            <Download size={16} color="#2B7FFF" />
            <span>Download QR Code</span>
          </button>

          {/* Invite Link Section */}
          <div className="inviteSection">
            <div className="inviteSectionLabel">Invite Link</div>
            <div
              className="inviteLinkBox"
              onClick={handleCopy}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleCopy()}
            >
              <span className="inviteLinkText">{inviteLink}</span>
              {copied ? (
                <Check size={18} color="#1DA35E" />
              ) : (
                <Copy size={18} color="#64748B" />
              )}
            </div>
            {copied && <div className="copiedBadge">Link copied to clipboard!</div>}
          </div>

          {/* Other Ways to Invite */}
          <div className="inviteSection">
            <div className="inviteSectionLabel">Other Ways to Invite</div>
            <div className="inviteOptionsGrid">
              <div
                className="inviteOptionCard"
                onClick={() => alert('SMS Invite Modal — Enter recipient phone numbers')}
                role="button"
                tabIndex={0}
              >
                <div>
                  <div className="welcomeCardOptionTitle">Send Via Text</div>
                  <div className="welcomeCardOptionSub">
                    Enter phone numbers to send an invitation via SMS.
                  </div>
                </div>
                <ArrowRight size={18} color="#2B7FFF" />
              </div>

              <div
                className="inviteOptionCard"
                onClick={() => alert('Email Invite Modal — Enter recipient email addresses')}
                role="button"
                tabIndex={0}
              >
                <div>
                  <div className="welcomeCardOptionTitle">Send via Email</div>
                  <div className="welcomeCardOptionSub">
                    Enter email addresses to send an invitation via Email.
                  </div>
                </div>
                <ArrowRight size={18} color="#2B7FFF" />
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="button"
            className="authPrimaryBtn"
            onClick={handleContinue}
            style={{ marginTop: 24 }}
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  );
}
