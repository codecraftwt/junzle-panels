import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import { COLORS } from '../theme/theme';
import AuthHeader from '../components/AuthHeader';

export default function EmailVerifiedScreen({ onNavigate, onBack }) {
  const handleContinue = () => {
    // Navigate to phone number verification step
    onNavigate('VerifyPhone');
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
          {/* ── Center Content: Verified badge + Title & Subtitle ── */}
          <View style={styles.centerSection}>
            {/* Verified Icon: width 98, height 98 */}
            <Image
              source={require('../../assets/verified.png')}
              style={styles.verifiedIcon}
              resizeMode="contain"
            />

            {/* Combined View: width 354, height 92, gap 6 */}
            <View style={styles.combinedTextView}>
              <Text style={styles.title}>Email Verified</Text>
              <Text style={styles.subtitle}>
                Your email has been successfully verified. Now, let’s confirm your phone number.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* ── Bottom actions — sticky ─────────────────────────────
            width: 402, height: 132, top: 742, gap: 8,
            box-shadow: 0px 0px 10.3px 0px #2B7FFF33
            padding: top 20, horiz 20, bottom 24
        ──────────────────────────────────────────────────────── */}
        <View style={styles.bottomArea}>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={handleContinue}
            activeOpacity={0.88}
          >
            <Text style={styles.continueBtnText}>Continue</Text>
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
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    alignItems: 'center',
  },

  /* Center Section */
  centerSection: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 354,
  },

  /* Verified badge — Figma: width 98, height 98 */
  verifiedIcon: {
    width: 98,
    height: 98,
    marginBottom: 32,
  },

  /* Combined View — Figma: width 354, height 92, gap 6 */
  combinedTextView: {
    width: 354,
    height: 92,
    gap: 6,
    alignItems: 'center',
  },

  /* Title: Rethink Sans 700 32px 38lh 0ls center */
  title: {
    fontFamily: RETHINK,
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: 0,
    color: '#0D1B3E',
    textAlign: 'center',
  },

  /* Subtitle: Plus Jakarta Sans 400 16px 24lh -1.5%ls center */
  subtitle: {
    fontFamily: JAKARTA,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.24, // -1.5% of 16px
    color: '#64748B',
    textAlign: 'center',
  },

  /* ── Bottom area — sticky ──────────────────────────────────── */
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
  continueBtn: {
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
  continueBtnText: {
    fontFamily: RETHINK,
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
