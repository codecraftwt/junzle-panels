import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import { COLORS } from '../theme/theme';

export default function SplashScreen({ onNavigate }) {
  // ── Logo ──────────────────────────────────────────────────
  const logoScale   = useRef(new Animated.Value(0.55)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoY       = useRef(new Animated.Value(28)).current;

  // ── Ripple ring (behind logo) ─────────────────────────────
  const ring1Scale  = useRef(new Animated.Value(0.7)).current;
  const ring1Opacity= useRef(new Animated.Value(0.5)).current;
  const ring2Scale  = useRef(new Animated.Value(0.7)).current;
  const ring2Opacity= useRef(new Animated.Value(0.3)).current;

  // ── Tagline ───────────────────────────────────────────────
  const tagOpacity  = useRef(new Animated.Value(0)).current;
  const tagY        = useRef(new Animated.Value(14)).current;

  // ── Bottom progress bar ───────────────────────────────────
  const progress    = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1 ─ Logo: spring scale + fade + slide-up
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 48,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(logoY, {
        toValue: 0,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // 2 ─ Ripple ring 1: expands and fades out
    Animated.sequence([
      Animated.delay(250),
      Animated.parallel([
        Animated.timing(ring1Scale, {
          toValue: 2.2,
          duration: 900,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(ring1Opacity, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // 3 ─ Ripple ring 2: delayed for double-ripple feel
    Animated.sequence([
      Animated.delay(480),
      Animated.parallel([
        Animated.timing(ring2Scale, {
          toValue: 2.6,
          duration: 900,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(ring2Opacity, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // 4 ─ Tagline: delayed fade + slide up
    Animated.sequence([
      Animated.delay(560),
      Animated.parallel([
        Animated.timing(tagOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(tagY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // 5 ─ Progress bar fills over 2s (cannot use native driver — width animation)
    Animated.sequence([
      Animated.delay(350),
      Animated.timing(progress, {
        toValue: 1,
        duration: 2100,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start();

    // 6 ─ Navigate after animation completes
    const timer = setTimeout(() => onNavigate('Welcome'), 2800);
    return () => clearTimeout(timer);
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.royalBlue} />

      <View style={styles.container}>

        {/* ── Center: ripples + logo + tagline ───────────────── */}
        <View style={styles.centerArea}>

          {/* Ripple ring 2 (outer, more transparent) */}
          <Animated.View
            style={[
              styles.rippleRing,
              {
                width: 260,
                height: 260,
                borderRadius: 130,
                borderColor: 'rgba(255,255,255,0.18)',
                opacity: ring2Opacity,
                transform: [{ scale: ring2Scale }],
              },
            ]}
          />

          {/* Ripple ring 1 (inner) */}
          <Animated.View
            style={[
              styles.rippleRing,
              {
                width: 210,
                height: 210,
                borderRadius: 105,
                borderColor: 'rgba(255,255,255,0.28)',
                opacity: ring1Opacity,
                transform: [{ scale: ring1Scale }],
              },
            ]}
          />

          {/* Logo — 342.97 × 93.999 → rounded to 343 × 94 */}
          <Animated.Image
            source={require('../../assets/junzle-logo.png')}
            style={[
              styles.logo,
              {
                opacity: logoOpacity,
                transform: [
                  { scale: logoScale },
                  { translateY: logoY },
                ],
              },
            ]}
            resizeMode="contain"
          />

          {/* Tagline */}
          <Animated.Text
            style={[
              styles.tagline,
              {
                opacity: tagOpacity,
                transform: [{ translateY: tagY }],
              },
            ]}
          >
            Manage. Connect. Win.
          </Animated.Text>
        </View>

        {/* ── Bottom: thin white progress bar ────────────────── */}
        <View style={styles.bottomArea}>
          <View style={styles.progressTrack}>
            <Animated.View
              style={[styles.progressFill, { width: progressWidth }]}
            />
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.royalBlue,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.royalBlue,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 52,
  },

  /* Center zone */
  centerArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Ripple rings — absolutely positioned relative to centerArea */
  rippleRing: {
    position: 'absolute',
    borderWidth: 1.5,
  },

  /* Logo — Figma: 342.97 × 93.999 */
  logo: {
    width: 343,
    height: 94,
  },

  /* Tagline */
  tagline: {
    marginTop: 18,
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.78)',
    letterSpacing: 0.6,
    textAlign: 'center',
    ...Platform.select({
      web: { fontFamily: 'Plus Jakarta Sans, sans-serif' },
    }),
  },

  /* Progress bar */
  bottomArea: {
    width: '100%',
    alignItems: 'center',
  },
  progressTrack: {
    width: 100,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.22)',
    overflow: 'hidden',
  },
  progressFill: {
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.90)',
  },
});