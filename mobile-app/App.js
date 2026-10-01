import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import { COLORS } from './src/theme/theme';

// ── New Auth Screens ──────────────────────────────────────────────
import SplashScreen from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import VerifyEmailScreen from './src/screens/VerifyEmailScreen';
import EmailVerifiedScreen from './src/screens/EmailVerifiedScreen';
import VerifyPhoneScreen from './src/screens/VerifyPhoneScreen';
import PhoneConfirmedScreen from './src/screens/PhoneConfirmedScreen';
import WhatWouldYouLikeToDoScreen from './src/screens/WhatWouldYouLikeToDoScreen';
import TeamCreatedScreen from './src/screens/TeamCreatedScreen';
import FindTeamFlowScreens from './src/screens/FindTeamFlowScreens';

// ── Existing Onboarding Screens ───────────────────────────────────
import EntryScreen from './src/screens/EntryScreen';
import RolePickerScreen from './src/screens/RolePickerScreen';

// ── Existing Flow Screens (kept intact, accessible via RolePicker) ─
import CoachFlowScreens from './src/screens/coach/CoachFlowScreens';
import ClubOwnerFlowScreens from './src/screens/clubOwner/ClubOwnerFlowScreens';
import LeagueAdminFlowScreens from './src/screens/leagueAdmin/LeagueAdminFlowScreens';
import ParentFlowScreens from './src/screens/parent/ParentFlowScreens';
import PlayerFlowScreens from './src/screens/player/PlayerFlowScreens';
import FanFlowScreens from './src/screens/fan/FanFlowScreens';
import MobileHubScreen from './src/screens/MobileHubScreen';

if (Platform.OS === 'web' && typeof document !== 'undefined') {
  if (!document.getElementById('satoshi-font')) {
    const link = document.createElement('link');
    link.id = 'satoshi-font';
    link.rel = 'stylesheet';
    link.href = 'https://api.fontshare.com/v2/css?f[]=satoshi@700,900,500,400&display=swap';
    document.head.appendChild(link);
  }
  if (!document.getElementById('inter-font')) {
    const link2 = document.createElement('link');
    link2.id = 'inter-font';
    link2.rel = 'stylesheet';
    link2.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(link2);
  }
  // Figma fonts — Welcome screen
  if (!document.getElementById('rethink-font')) {
    const link3 = document.createElement('link');
    link3.id = 'rethink-font';
    link3.rel = 'stylesheet';
    link3.href = 'https://fonts.googleapis.com/css2?family=Rethink+Sans:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(link3);
  }
  if (!document.getElementById('jakarta-font')) {
    const link4 = document.createElement('link');
    link4.id = 'jakarta-font';
    link4.rel = 'stylesheet';
    link4.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(link4);
  }
}

export default function App() {
  // Start at Splash — this is the true entry point now
  const [currentScreen, setCurrentScreen] = useState('Splash');
  const [routeParams, setRouteParams] = useState({});
  const [history, setHistory] = useState(['Splash']);
  const [navDirection, setNavDirection] = useState('forward'); // 'forward' | 'back' | 'fade'

  // Smooth screen transition animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateXAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Determine offset based on navigation type
    let initialX = 0;
    if (currentScreen === 'Splash' || currentScreen === 'Welcome') {
      initialX = 0; // Seamless centered transition
    } else if (navDirection === 'forward') {
      initialX = 28; // Slide in from right
    } else if (navDirection === 'back') {
      initialX = -28; // Slide in from left
    }

    fadeAnim.setValue(0);
    translateXAnim.setValue(initialX);
    scaleAnim.setValue(0.985);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 240,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(translateXAnim, {
        toValue: 0,
        duration: 240,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 240,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();
  }, [currentScreen]);

  const navigate = (screenName, params = {}) => {
    setNavDirection('forward');
    setRouteParams(params);
    setHistory((prev) => [...prev, screenName]);
    setCurrentScreen(screenName);
  };

  const goBack = () => {
    setNavDirection('back');
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const previousScreen = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentScreen(previousScreen);
    } else {
      setCurrentScreen('Welcome');
    }
  };

  const isBlueScreen = currentScreen === 'Splash' || currentScreen === 'Welcome';
  const currentBgColor = isBlueScreen ? COLORS.royalBlue : '#FFFFFF';

  const renderScreen = () => {
    switch (currentScreen) {

      // ── Auth / Welcome Flow ──────────────────────────────────────
      case 'Splash':
        return <SplashScreen onNavigate={navigate} />;

      case 'Welcome':
        return <WelcomeScreen onNavigate={navigate} />;

      case 'Login':
        return <LoginScreen onNavigate={navigate} onBack={goBack} />;

      case 'SignUp':
        return <SignUpScreen onNavigate={navigate} onBack={goBack} />;

      case 'ForgotPassword':
        return <ForgotPasswordScreen onNavigate={navigate} onBack={goBack} />;

      case 'ResetPassword':
        return <ResetPasswordScreen onNavigate={navigate} onBack={goBack} />;

      case 'VerifyEmail':
        return (
          <VerifyEmailScreen
            routeParams={routeParams}
            email={routeParams?.email}
            onNavigate={navigate}
            onBack={goBack}
          />
        );

      case 'EmailVerified':
        return (
          <EmailVerifiedScreen
            routeParams={routeParams}
            onNavigate={navigate}
            onBack={goBack}
          />
        );

      case 'VerifyPhone':
        return (
          <VerifyPhoneScreen
            routeParams={routeParams}
            phone={routeParams?.phone}
            onNavigate={navigate}
            onBack={goBack}
          />
        );

      case 'PhoneConfirmed':
        return (
          <PhoneConfirmedScreen
            routeParams={routeParams}
            onNavigate={navigate}
            onBack={goBack}
          />
        );

      case 'WhatWouldYouLikeToDo':
        return (
          <WhatWouldYouLikeToDoScreen
            routeParams={routeParams}
            onNavigate={navigate}
            onBack={goBack}
          />
        );

      case 'TeamCreated':
        return (
          <TeamCreatedScreen
            routeParams={routeParams}
            onNavigate={navigate}
            onBack={goBack}
          />
        );

      case 'FindTeamFlow':
        return (
          <FindTeamFlowScreens
            routeParams={routeParams}
            onNavigate={navigate}
            onBack={goBack}
          />
        );

      // ── Legacy Entry (Role Selector on Welcome) ──────────────────
      case 'Entry':
        return <EntryScreen onNavigate={navigate} />;

      case 'RolePicker':
        return (
          <RolePickerScreen
            routeParams={routeParams}
            onNavigate={navigate}
            onBack={goBack}
          />
        );

      // ── Role-Specific Flows (all kept intact) ────────────────────
      case 'CoachFlow':
        return <CoachFlowScreens onNavigate={navigate} onBack={goBack} />;

      case 'ClubOwnerFlow':
        return <ClubOwnerFlowScreens onNavigate={navigate} onBack={goBack} />;

      case 'LeagueAdminFlow':
        return <LeagueAdminFlowScreens onNavigate={navigate} onBack={goBack} />;

      case 'ParentFlow':
        return <ParentFlowScreens onNavigate={navigate} onBack={goBack} />;

      case 'PlayerFlow':
        return <PlayerFlowScreens onNavigate={navigate} onBack={goBack} />;

      case 'FanFlow':
        return <FanFlowScreens onNavigate={navigate} onBack={goBack} />;

      case 'MobileHub':
        return (
          <MobileHubScreen
            routeParams={routeParams}
            onNavigate={navigate}
            onBack={goBack}
          />
        );

      default:
        return <SplashScreen onNavigate={navigate} />;
    }
  };

  return (
    <SafeAreaProvider style={[styles.container, { backgroundColor: Platform.OS === 'web' ? '#F1F5F9' : currentBgColor }]}>
      <StatusBar
        barStyle={isBlueScreen ? 'light-content' : 'dark-content'}
        backgroundColor={currentBgColor}
        animated={true}
      />
      <View style={[styles.screenWrapper, { backgroundColor: currentBgColor }]}>
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateX: translateXAnim },
                { scale: scaleAnim },
              ],
              backgroundColor: currentBgColor,
            },
          ]}
        >
          {renderScreen()}
        </Animated.View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? '#F1F5F9' : '#FFFFFF',
  },
  screenWrapper: {
    flex: 1,
    maxWidth: Platform.OS === 'web' ? 430 : undefined,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    ...Platform.select({
      web: {
        minHeight: '100vh',
        boxShadow: '0 10px 40px -10px rgba(13, 27, 62, 0.12)',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#E2E8F0',
      },
      default: {},
    }),
  },
  animatedContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

