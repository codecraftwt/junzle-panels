import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Platform,
  Linking,
} from 'react-native';
import { COLORS } from '../theme/theme';
import AuthHeader from '../components/AuthHeader';
import ScreenHeading from '../components/ScreenHeading';

export default function VerifyEmailScreen({ onNavigate, onBack, email = 'andy@email.com' }) {
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleResend = () => {
    setSecondsLeft(60);
  };

  const handleOpenEmailApp = () => {
    // Navigate to EmailVerified screen to simulate verification link click
    onNavigate('EmailVerified');
  };

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        {/* Top Header */}
        <AuthHeader onBack={onBack} />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Heading */}
          <ScreenHeading
            title="Verify Your Email"
            subtitle={
              <Text>
                We’ve sent a verification link to <Text style={styles.boldEmail}>{email}</Text>. Please check your inbox and click the link to continue.
              </Text>
            }
          />
        </ScrollView>

        {/* ── Resend Text Row & Sticky Bottom Button ────────── */}
        <View style={styles.bottomArea}>
          <View style={styles.resendRow}>
            <Text style={styles.resendText}>Didn’t receive Email? Resend in </Text>
            {secondsLeft > 0 ? (
              <Text style={styles.timerText}>{formatTimer(secondsLeft)}</Text>
            ) : (
              <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                <Text style={styles.resendLink}>Resend Email</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={styles.openEmailBtn}
            onPress={handleOpenEmailApp}
            activeOpacity={0.88}
          >
            <Text style={styles.openEmailBtnText}>Open Email App</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const RETHINK = Platform.OS === 'web' ? 'Rethink Sans, sans-serif' : undefined;
const JAKARTA = Platform.OS === 'web' ? 'Plus Jakarta Sans, sans-serif' : undefined;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0,
  },
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  boldEmail: {
    fontFamily: JAKARTA,
    fontWeight: '700',
    color: '#0D1B3E',
  },
  bottomArea: {
    width: '100%',
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'web' ? 28 : 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    ...Platform.select({
      ios: {
        shadowColor: '#2B7FFF',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0px 0px 10.3px 0px rgba(43, 127, 255, 0.15)',
      },
    }),
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  resendText: {
    fontFamily: JAKARTA,
    fontSize: 12,
    color: '#64748B',
  },
  timerText: {
    fontFamily: RETHINK,
    fontSize: 12,
    fontWeight: '700',
    color: '#2B7FFF',
  },
  resendLink: {
    fontFamily: RETHINK,
    fontSize: 12,
    fontWeight: '700',
    color: '#2B7FFF',
    textDecorationLine: 'underline',
  },
  openEmailBtn: {
    backgroundColor: '#2B7FFF',
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2B7FFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  openEmailBtnText: {
    fontFamily: RETHINK,
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
