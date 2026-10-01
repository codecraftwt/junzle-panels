import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import Svg, { Line, Path } from 'react-native-svg';
import { COLORS } from '../theme/theme';

// ── Exact Figma Arrow ──────────────────────────────────────────────
// shaft: width 11.67, height 0, borderWidth 2px
// arrowhead drawn as two angled lines from the tip
function ArrowRight({ color = COLORS.royalBlue }) {
  return (
    <Svg width={18} height={20} viewBox="0 0 18 20">
      {/* Shaft: horizontal line, 2px stroke */}
      <Line
        x1={1}
        y1={10}
        x2={13}
        y2={10}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      {/* Arrowhead */}
      <Path
        d="M 8 5 L 14 10 L 8 15"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function WelcomeScreen({ onNavigate }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.royalBlue} />

      <View style={styles.outerContainer}>

        {/* ── Blue Top Section ──────────────────────────────────── */}
        <View style={styles.topSection}>

          {/* Logo — white tinted PNG, centered */}
          <View style={styles.logoWrap}>
            <Image
              source={require('../../assets/junzle-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Heading — Rethink Sans 700 56px / 64 lh */}
          <Text style={styles.heading}>Welcome to{'\n'}Junzle</Text>

          {/* Subheading — Plus Jakarta Sans 400 18px / 25 lh / -1% ls */}
          <Text style={styles.subheading}>
            Manage your team, stay connected, and keep everything in one place
          </Text>
        </View>

        {/* ── White Bottom Sheet ────────────────────────────────────
            width: 402 (full), height: 356, top: 518
            borderTopLeft/Right: Radius/2 = 24px
            padding: top 24 | h 16 | bottom 32
            gap: 8px between children                             */}
        <View style={styles.bottomSheet}>

          {/* Create a Team card
              w: 354, h: 79, border-radius: 16, border: 1, padding: Spacing/xs (8)
              justify-content: space-between                       */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => onNavigate('CoachFlow')}
            activeOpacity={0.8}
          >
            <View style={styles.cardTextBlock}>
              <Text style={styles.cardTitle}>Create a Team</Text>
              <Text style={styles.cardSub}>Set up a new team, invite members.</Text>
            </View>
            <ArrowRight />
          </TouchableOpacity>

          {/* Find My Team card — same spec */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => onNavigate('FindTeamFlow')}
            activeOpacity={0.8}
          >
            <View style={styles.cardTextBlock}>
              <Text style={styles.cardTitle}>Find My Team</Text>
              <Text style={styles.cardSub}>Search for an existing team to join</Text>
            </View>
            <ArrowRight />
          </TouchableOpacity>

          {/* OR — w: 354, h: 18, gap: 12 */}
          <View style={styles.orRow}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
          </View>

          {/* Sign Up button
              w: 354, h: 56, border-radius: 16, border: 1
              border-color: #E9EDF3, padding: Spacing/xs (8)
              justify-content: space-between                       */}
          <TouchableOpacity
            style={styles.signUpBtn}
            onPress={() => onNavigate('SignUp')}
            activeOpacity={0.8}
          >
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Already have an account?
              Plus Jakarta Sans 400 12px / 18 lh / -1% ls / center */}
          <View style={styles.loginRow}>
            <Text style={styles.alreadyText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => onNavigate('Login')}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}

const RETHINK  = Platform.OS === 'web' ? 'Rethink Sans, sans-serif'   : undefined;
const JAKARTA  = Platform.OS === 'web' ? 'Plus Jakarta Sans, sans-serif' : undefined;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.royalBlue,
  },
  outerContainer: {
    flex: 1,
    backgroundColor: COLORS.royalBlue,
  },

  /* ── Blue Top ─────────────────────────────────────────────── */
  topSection: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 140,
    height: 48,
  },

  // Rethink Sans 700 | 56px | 64 lh | 0 ls | #FFFFFF | w:354 h:128
  heading: {
    fontFamily: RETHINK,
    fontWeight: '700',
    fontSize: 56,
    lineHeight: 64,
    letterSpacing: 0,
    color: '#FFFFFF',
    width: 354,
    marginBottom: 16,
  },

  // Plus Jakarta Sans 400 | 18px | 25 lh | -1% ls | #FFFFFF | w:354 h:50
  subheading: {
    fontFamily: JAKARTA,
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: -0.18,   // -1% of 18px
    color: '#FFFFFF',
    width: 354,
  },

  /* ── White Bottom Sheet ───────────────────────────────────────
     borderTopRadius: 24 | pt:20 ph:16 pb:24 gap:8 */
  bottomSheet: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 28 : 20,
    gap: 8,
    // subtle lift shadow
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
      },
      android: { elevation: 8 },
      web: { boxShadow: '0 -4px 20px rgba(0,0,0,0.07)' },
    }),
  },

  /* ── Cards: w:354 h:79 br:16 bw:1 p:8 space-between ───────── */
  card: {
    width: '100%',          // fills the 16px padded container → ~354
    height: 79,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E9EDF3',
    padding: 8,             // Spacing/xs = 8
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  cardTextBlock: {
    flex: 1,
    paddingRight: 12,
    paddingLeft: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.darkNavy,
    marginBottom: 4,
    fontFamily: RETHINK,
  },
  cardSub: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6B7280',
    fontFamily: JAKARTA,
  },

  /* ── OR row: w:354 h:18 gap:12 ─────────────────────────────── */
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 18,
    gap: 12,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E9EDF3',
  },
  orText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: 0.5,
  },

  /* ── Sign Up btn: w:354 h:56 br:16 bw:1 #E9EDF3 p:8 ────────── */
  signUpBtn: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E9EDF3',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  signUpText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.darkNavy,
    fontFamily: RETHINK,
  },

  /*  Already have an account row  */
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  alreadyText: {
    fontFamily: JAKARTA,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.12,
    color: '#6B7280',
    textAlign: 'center',
  },
  loginLink: {
    fontFamily: RETHINK,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.14,
    color: '#2B7FFF',
  },
});
