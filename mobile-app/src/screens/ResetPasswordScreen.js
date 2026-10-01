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
} from 'react-native';
import { COLORS } from '../theme/theme';
import AuthHeader from '../components/AuthHeader';
import ScreenHeading from '../components/ScreenHeading';
import EyeToggle from '../components/EyeToggle';

export default function ResetPasswordScreen({ onNavigate, onBack }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = () => {
    // Navigate back to Login after password reset
    onNavigate('Login');
  };

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
            title="Reset Your Password"
            subtitle="Enter your new password below."
          />

          {/* Form */}
          <View style={styles.form}>
            {/* New Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>New Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inputWithToggle}
                  placeholder="Create a new password"
                  placeholderTextColor={COLORS.slate400}
                  secureTextEntry={!showNewPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                {newPassword.length > 0 && (
                  <EyeToggle
                    visible={showNewPassword}
                    onPress={() => setShowNewPassword(!showNewPassword)}
                  />
                )}
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inputWithToggle}
                  placeholder="Confirm Password"
                  placeholderTextColor={COLORS.slate400}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                {confirmPassword.length > 0 && (
                  <EyeToggle
                    visible={showConfirmPassword}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                )}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom actions — sticky */}
        <View style={styles.bottomArea}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handleResetPassword}
            activeOpacity={0.88}
          >
            <Text style={styles.actionBtnText}>Reset Password</Text>
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
  actionBtn: {
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
  actionBtnText: {
    fontFamily: RETHINK,
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
