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
} from 'react-native';
import Svg, { Line, Path } from 'react-native-svg';
import { COLORS } from '../theme/theme';
import AuthHeader from '../components/AuthHeader';

// ── Figma Vector Arrow ──────────────────────────────────────────────
function ArrowRight({ color = '#2B7FFF' }) {
  return (
    <Svg width={18} height={20} viewBox="0 0 18 20">
      <Line
        x1={1}
        y1={10}
        x2={13}
        y2={10}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
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

export default function WhatWouldYouLikeToDoScreen({ onNavigate, onBack }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        {/* Top Header with Back button and centered logo */}
        <AuthHeader onBack={onBack} />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Heading Block ── */}
          <View style={styles.headingBlock}>
            {/* Title: 2 lines — Line 1: 'What Would You Like To', Line 2: 'Do?' */}
            <Text style={styles.headingTitle}>
              What Would You Like To{'\n'}Do?
            </Text>

            {/* Subtitle: Plus Jakarta Sans 400 16px/24px -1.5% #52627A, w:354 h:48 */}
            <Text style={styles.headingSubtitle}>
              You can create a new team or find and join an existing team.
            </Text>
          </View>

          {/* ── Action Cards Container ── */}
          <View style={styles.cardsContainer}>
            {/* Create a Team Card: w:354, h:106, br:16, border:#D9E0EA, p:8 */}
            <TouchableOpacity
              style={styles.card}
              onPress={() => onNavigate('CoachFlow')}
              activeOpacity={0.82}
            >
              <View style={styles.cardTextBlock}>
                <Text style={styles.cardTitle}>Create a Team</Text>
                <Text style={styles.cardSub}>
                  Set up a new team and invite members.
                </Text>
              </View>
              <View style={styles.arrowWrap}>
                <ArrowRight />
              </View>
            </TouchableOpacity>

            {/* Find My Team Card: w:354, h:106, br:16, border:#D9E0EA, p:8 */}
            <TouchableOpacity
              style={styles.card}
              onPress={() => onNavigate('FindTeamFlow')}
              activeOpacity={0.82}
            >
              <View style={styles.cardTextBlock}>
                <Text style={styles.cardTitle}>Find My Team</Text>
                <Text style={styles.cardSub}>
                  Search for an existing team to join
                </Text>
              </View>
              <View style={styles.arrowWrap}>
                <ArrowRight />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    alignItems: 'center',
  },

  /* ── Heading Block ─────────────────────────────────────────── */
  headingBlock: {
    width: '100%',
    maxWidth: 354,
    marginBottom: 24,
    gap: 8,
  },
  headingTitle: {
    fontFamily: RETHINK,
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: -0.3,
    color: '#0D1B3E',
    width: '100%',
    maxWidth: 341,
    minHeight: 76,
    opacity: 1,
  },
  headingSubtitle: {
    fontFamily: JAKARTA,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.24, // -1.5% of 16px
    color: '#52627A',
    width: '100%',
    maxWidth: 354,
    minHeight: 48,
    opacity: 1,
  },

  /* ── Action Cards Container: w:354, h:224, gap:12 ─────────── */
  cardsContainer: {
    width: '100%',
    maxWidth: 354,
    height: 224,
    gap: 12,
  },
  card: {
    width: '100%',
    height: 106,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D9E0EA',
    padding: 8, // Spacing/xs = 8
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },

  /* ── Card text block: width 204, height 74, gap 4 ─────────── */
  cardTextBlock: {
    width: 204,
    height: 74,
    gap: 4,
    opacity: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontFamily: RETHINK,
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
    color: '#0D1B3E',
  },

  /* ── Card subheading: width 204, height 42 ─────────────────── */
  cardSub: {
    fontFamily: JAKARTA,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.224, // -1.6% of 14px
    color: '#52627A',
    width: 204,
    height: 42,
    opacity: 1,
  },
  arrowWrap: {
    paddingRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
