import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ── Auth & Onboarding Flow Screens ─────────────────────────
import SplashScreen from './pages/SplashScreen';
import WelcomeScreen from './pages/WelcomeScreen';
import LoginScreen from './pages/LoginScreen';
import SignUpScreen from './pages/SignUpScreen';
import ForgotPasswordScreen from './pages/ForgotPasswordScreen';
import ResetPasswordScreen from './pages/ResetPasswordScreen';
import VerifyEmailScreen from './pages/VerifyEmailScreen';
import EmailVerifiedScreen from './pages/EmailVerifiedScreen';
import VerifyPhoneScreen from './pages/VerifyPhoneScreen';
import PhoneConfirmedScreen from './pages/PhoneConfirmedScreen';
import WhatWouldYouLikeToDoScreen from './pages/WhatWouldYouLikeToDoScreen';
import TeamCreatedScreen from './pages/TeamCreatedScreen';
import FindTeamFlow from './pages/FindTeamFlow';

// ── Role Selection & Specific Flows ────────────────────────
import EntryScreen from './pages/EntryScreen';
import RolePicker from './pages/RolePicker';
import CoachFlow from './pages/flows/CoachFlow';
import ClubOwnerFlow from './pages/flows/ClubOwnerFlow';
import LeagueAdminFlow from './pages/flows/LeagueAdminFlow';
import ParentFlow from './pages/flows/ParentFlow';
import PlayerFlow from './pages/flows/PlayerFlow';
import FanFlow from './pages/flows/FanFlow';
import PortalDashboard from './pages/PortalDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Splash & Welcome (True Entry Points) */}
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/welcome" element={<WelcomeScreen />} />

        {/* Authentication Flow */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        <Route path="/reset-password" element={<ResetPasswordScreen />} />
        <Route path="/verify-email" element={<VerifyEmailScreen />} />
        <Route path="/email-verified" element={<EmailVerifiedScreen />} />
        <Route path="/verify-phone" element={<VerifyPhoneScreen />} />
        <Route path="/phone-confirmed" element={<PhoneConfirmedScreen />} />

        {/* Post-Auth Action & Team Creation Flows */}
        <Route path="/what-would-you-like-to-do" element={<WhatWouldYouLikeToDoScreen />} />
        <Route path="/team-created" element={<TeamCreatedScreen />} />
        <Route path="/find-team" element={<FindTeamFlow />} />

        {/* Role Picker & Specific Flows */}
        <Route path="/entry" element={<EntryScreen />} />
        <Route path="/role-picker" element={<RolePicker />} />
        <Route path="/flow/coach" element={<CoachFlow />} />
        <Route path="/flow/club-owner" element={<ClubOwnerFlow />} />
        <Route path="/flow/league-admin" element={<LeagueAdminFlow />} />
        <Route path="/flow/parent" element={<ParentFlow />} />
        <Route path="/flow/player" element={<PlayerFlow />} />
        <Route path="/flow/fan" element={<FanFlow />} />

        {/* Post-Onboarding Dashboard View */}
        <Route path="/portal-dashboard" element={<PortalDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
