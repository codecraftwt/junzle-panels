import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { COLORS } from '../theme/theme';
import AuthHeader from '../components/AuthHeader';
import ScreenHeading from '../components/ScreenHeading';

export default function VerifyPhoneScreen({ onNavigate, onBack, phone = '+1 (212) 555–123' }) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleDigitChange = (val, idx) => {
    // Handle single or pasted digits
    const cleaned = val.replace(/[^0-9]/g, '');
    const newCode = [...code];

    if (cleaned.length > 1) {
      // Pasted code
      const pasted = cleaned.slice(0, 6).split('');
      pasted.forEach((d, i) => {
        if (i < 6) newCode[i] = d;
      });
      setCode(newCode);
      const nextIdx = Math.min(pasted.length, 5);
      inputRefs.current[nextIdx]?.focus();
      return;
    }

    newCode[idx] = cleaned;
    setCode(newCode);

    if (cleaned && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyPress = (e, idx) => {
    if (e.nativeEvent.key === 'Backspace' && !code[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleResend = () => {
    setSecondsLeft(60);
  };

  const handleVerify = () => {
    // Navigate to PhoneConfirmed screen
    onNavigate('PhoneConfirmed');
  };

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const isComplete = code.join('').length === 6 || code[0] !== '';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Top Header */}
        <AuthHeader onBack={onBack} />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Reusable Heading */}
          <ScreenHeading
            title="Enter Verification Code"
            subtitle={`We’ve sent a 6-digit code to ${phone}`}
          />

          {/* 6-Digit Code Input Boxes */}
          <View style={styles.codeContainer}>
            {code.map((digit, idx) => {
              const isFilled = digit !== '';
              return (
                <View
                  key={idx}
                  style={[
                    styles.codeBox,
                    isFilled ? styles.codeBoxFilled : styles.codeBoxEmpty,
                  ]}
                >
                  <TextInput
                    ref={(ref) => (inputRefs.current[idx] = ref)}
                    style={styles.codeInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(val) => handleDigitChange(val, idx)}
                    onKeyPress={(e) => handleKeyPress(e, idx)}
                    autoFocus={idx === 0}
                    selectTextOnFocus
                  />
                </View>
              );
            })}
          </View>

          {/* Resend row */}
          <View style={styles.resendRow}>
            <Text style={styles.resendText}>Didn’t receive code? Resend in </Text>
            {secondsLeft > 0 ? (
              <Text style={styles.timerText}>{formatTimer(secondsLeft)}</Text>
            ) : (
              <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                <Text style={styles.resendLink}>Resend Code</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>

        {/* Bottom actions — sticky */}
        <View style={styles.bottomArea}>
          <TouchableOpacity
            style={styles.verifyBtn}
            onPress={handleVerify}
            activeOpacity={0.88}
          >
            <Text style={styles.verifyBtnText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  flex: {
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

  /* 6-digit Code Grid */
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 24,
    gap: 8,
  },
  codeBox: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    borderWidth: 1.5,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeBoxEmpty: {
    borderColor: '#E2E8F0',
  },
  codeBoxFilled: {
    borderColor: '#2B7FFF',
    backgroundColor: '#FFFFFF',
  },
  codeInput: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: 22,
    fontFamily: RETHINK,
    fontWeight: '700',
    color: '#0D1B3E',
  },

  /* Resend Row */
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
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

  /* ── Bottom actions — sticky ──────────────────────────────────── */
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
  verifyBtn: {
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
  verifyBtnText: {
    fontFamily: RETHINK,
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
