import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';
import ScreenHeading from '../components/ScreenHeading';
import EyeToggle from '../components/EyeToggle';

export default function ResetPasswordScreen() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="authWebPage">
      <AuthHeader onBack={() => navigate('/forgot-password')} />

      <main className="authWebContainer">
        <div className="authWebCard">
          <ScreenHeading
            title="Reset Your Password"
            subtitle="Enter your new password below."
          />

          <form onSubmit={handleReset}>
            {/* New Password */}
            <div className="authFormGroup">
              <label className="authFormLabel" htmlFor="new-password">New Password</label>
              <div className="authInputWrapper">
                <input
                  id="new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  className="authInput"
                  placeholder="Create a new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                {newPassword.length > 0 && (
                  <EyeToggle
                    visible={showNewPassword}
                    onPress={() => setShowNewPassword(!showNewPassword)}
                  />
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="authFormGroup">
              <label className="authFormLabel" htmlFor="confirm-password">Confirm Password</label>
              <div className="authInputWrapper">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="authInput"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {confirmPassword.length > 0 && (
                  <EyeToggle
                    visible={showConfirmPassword}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                )}
              </div>
            </div>

            <button type="submit" className="authPrimaryBtn">
              Reset Password
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
