import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
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
  Image,
} from 'react-native';
import { COLORS } from '../theme/theme';
import AuthHeader from '../components/AuthHeader';
import ScreenHeading from '../components/ScreenHeading';
import EyeToggle from '../components/EyeToggle';

export default function LoginScreen({ onNavigate, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    const cleanEmail = (email || '').trim().toLowerCase();
    if (
      (cleanEmail === 'codecraftwt@gmail.com' || cleanEmail === 'codecraft' || cleanEmail === 'admin@junzle.com' || cleanEmail === 'admin') &&
      (password === 'Admin@123' || password === 'admin@123' || password === 'junzle2026' || password === 'admin')
    ) {
      onNavigate('WhatWouldYouLikeToDo');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Reusable Header */}
        <AuthHeader onBack={onBack} />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Reusable Screen Heading */}
          <ScreenHeading
            title="Log In"
            subtitle="Welcome back! Enter your details to access your Junzle account."
          />

          {error ? (
            <View style={{
              width: '100%',
              maxWidth: 354,
              padding: 12,
              backgroundColor: '#FEE2E2',
              borderWidth: 1,
              borderColor: '#FCA5A5',
              borderRadius: 8,
              marginBottom: 16,
            }}>
              <Text style={{ color: '#B91C1C', fontSize: 13, fontWeight: '500' }}>
                {error}
              </Text>
            </View>
          ) : null}

          {/* Form */}
          <View style={styles.form}>
            {/* Email */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="you@domain.com"
                placeholderTextColor={COLORS.slate400}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inputWithToggle}
                  placeholder="(212) 555-1234"
                  placeholderTextColor={COLORS.slate400}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={password}
                  onChangeText={setPassword}
                />
                {password.length > 0 && (
                  <EyeToggle
                    visible={showPassword}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                )}
              </View>

              {/* Forgot Password */}
              <TouchableOpacity
                style={styles.forgotRow}
                onPress={() => onNavigate('ForgotPassword')}
                activeOpacity={0.7}
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* ── Bottom actions — sticky ─────────────────────────────
            width: 402, height: 132, top: 742, gap: 8,
            box-shadow: 0px 0px 10.3px 0px #2B7FFF33
            padding: top 20 (Spacing/5), horiz 20, bottom 24 (Spacing/6)
        ──────────────────────────────────────────────────────── */}
        <View style={styles.bottomArea}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleLogin}
            activeOpacity={0.88}
          >
            <Text style={styles.loginBtnText}>Log In</Text>
            <Image
              source={require('../../assets/forwardarrow.png')}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={styles.signUpRow}>
            <Text style={styles.signUpText}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => onNavigate('SignUp')}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
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

  /* Form */
  form: {
    gap: 20,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    fontFamily: RETHINK,
    fontSize: 14,
    fontWeight: '700',
    color: '#0D1B3E',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#0D1B3E',
    backgroundColor: '#FFFFFF',
    fontFamily: JAKARTA,
  },
  inputWrapper: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputWithToggle: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#0D1B3E',
    fontFamily: JAKARTA,
  },
  forgotRow: {
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  forgotText: {
    fontFamily: RETHINK,
    fontSize: 13,
    fontWeight: '700',
    color: '#2B7FFF',
  },

  /* ── Bottom area — sticky ── */
  bottomArea: {
    width: '100%',
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    gap: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#2B7FFF',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0px -2px 10.3px 0px rgba(43, 127, 255, 0.2)',
      },
    }),
  },
  loginBtn: {
    backgroundColor: '#2B7FFF',
    borderRadius: 12,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#2B7FFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  loginBtnText: {
    fontFamily: RETHINK,
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  arrowIcon: {
    position: 'absolute',
    right: 18,
    width: 16,
    height: 16,
    tintColor: '#FFFFFF',
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  signUpText: {
    fontFamily: JAKARTA,
    fontSize: 12,
    color: '#64748B',
  },
  signUpLink: {
    fontFamily: RETHINK,
    fontSize: 12,
    fontWeight: '700',
    color: '#2B7FFF',
  },
});
