import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
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
import Svg, { Line, Path } from 'react-native-svg';
import { COLORS } from '../theme/theme';
import Header from '../components/Header';

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

export default function TeamCreatedScreen({ onNavigate, onBack }) {
  const [copied, setCopied] = useState(false);
  const inviteLink = 'junzle.com/t/riverside.b';

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContinue = () => {
    onNavigate('WhatWouldYouLikeToDo');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Top Header — identical to CoachFlowScreens without stepper dots */}
        <Header onBack={onBack} showBack={true} showStepper={false} totalSteps={0} />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Success Badge & Headings Block ─────────────────── */}
          <View style={styles.centerHeaderBlock}>
            <Image
              source={require('../../assets/verified.png')}
              style={styles.verifiedBadge}
              resizeMode="contain"
            />

            <View style={styles.combinedHeadingView}>
              <Text style={styles.title}>Team Created !</Text>
              <Text style={styles.subtitle}>
                Your team is ready. Share the link or QR code to invite members.
              </Text>
            </View>
          </View>

          {/* ── QR Code Graphic ────────────────────────────────── */}
          <View style={styles.qrContainer}>
            <Image
              source={require('../../assets/qr-code.png')}
              style={styles.qrImage}
              resizeMode="contain"
            />
          </View>

          {/* ── Download QR Code Button ────────────────────────── */}
          <TouchableOpacity
            style={styles.downloadBtn}
            onPress={() => {}}
            activeOpacity={0.82}
          >
            <Image
              source={require('../../assets/download.png')}
              style={styles.downloadIcon}
              resizeMode="contain"
            />
            <Text style={styles.downloadBtnText}>Download QR Code</Text>
          </TouchableOpacity>

          {/* ── Invite Link Section ────────────────────────────── */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionLabel}>Invite Link</Text>
            <TouchableOpacity
              style={styles.inviteLinkBox}
              onPress={handleCopy}
              activeOpacity={0.75}
            >
              <Text style={styles.inviteLinkText}>{inviteLink}</Text>
              <View style={styles.copyIconWrap}>
                <Image
                  source={require('../../assets/copy.png')}
                  style={styles.copyIcon}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            {copied && (
              <Text style={styles.copiedFeedback}>Link copied to clipboard!</Text>
            )}
          </View>

          {/* ── Other Ways to Invite Section ── */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionLabel}>Other Ways to Invite</Text>

            {/* Send Via Text Card */}
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => {}}
              activeOpacity={0.82}
            >
              <View style={styles.cardTextBlock}>
                <Text style={styles.cardTitle}>Send Via Text</Text>
                <Text style={styles.cardSub}>
                  Enter phone numbers to send an invitation via SMS.
                </Text>
              </View>
              <ArrowRight />
            </TouchableOpacity>

            {/* Send via Email Card */}
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => {}}
              activeOpacity={0.82}
            >
              <View style={styles.cardTextBlock}>
                <Text style={styles.cardTitle}>Send via Email</Text>
                <Text style={styles.cardSub}>
                  Enter email addresses to send an invitation via Email.
                </Text>
              </View>
              <ArrowRight />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* ── Sticky Bottom Action Sheet ───────────────────────── */}
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
    paddingTop: 20,
    paddingBottom: 32,
    alignItems: 'center',
    gap: 20,
  },

  /* ── Success Badge & Headings Block ────────────────────────── */
  centerHeaderBlock: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 354,
    gap: 16,
  },
  verifiedBadge: {
    width: 98,
    height: 98,
  },
  combinedHeadingView: {
    width: 354,
    minHeight: 92,
    gap: 6,
    alignItems: 'center',
  },
  title: {
    fontFamily: RETHINK,
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: 0,
    color: '#0D1B3E',
    textAlign: 'center',
    width: 220,
    minHeight: 38,
  },
  subtitle: {
    fontFamily: JAKARTA,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.24, // -1.5% of 16px
    color: '#52627A',
    textAlign: 'center',
    width: 354,
    minHeight: 48,
  },

  /* ── QR Code ───────────────────────────────────────────────── */
  qrContainer: {
    width: 170,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  qrImage: {
    width: 170,
    height: 170,
  },

  /* ── Download Button ───────────────────────────────────────── */
  downloadBtn: {
    width: 354,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2B7FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
  },
  downloadIcon: {
    width: 16,
    height: 16,
    tintColor: '#2B7FFF',
  },
  downloadBtnText: {
    fontFamily: RETHINK,
    fontSize: 15,
    fontWeight: '700',
    color: '#2B7FFF',
  },

  /* ── Invite Sections ───────────────────────────────────────── */
  sectionBlock: {
    width: '100%',
    maxWidth: 354,
    gap: 10,
  },
  sectionLabel: {
    fontFamily: RETHINK,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    letterSpacing: 0,
    color: '#0D1B3E',
    width: 182,
    height: 28,
  },
  inviteLinkBox: {
    width: '100%',
    maxWidth: 354,
    height: 45,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9EDF3',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F9FC',
  },
  inviteLinkText: {
    fontFamily: JAKARTA,
    fontSize: 14,
    color: '#0D1B3E',
  },
  copyIconWrap: {
    padding: 4,
  },
  copyIcon: {
    width: 18,
    height: 18,
    tintColor: '#64748B',
  },
  copiedFeedback: {
    fontFamily: JAKARTA,
    fontSize: 12,
    color: '#1DA35E',
    fontWeight: '600',
    marginTop: -4,
    marginLeft: 2,
  },

  /* ── Action Cards ──────────────────────────────────────────── */
  actionCard: {
    width: '100%',
    maxWidth: 354,
    height: 100,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E9EDF3',
    padding: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  cardTextBlock: {
    flex: 1,
    paddingRight: 12,
    gap: 2,
  },
  cardTitle: {
    fontFamily: RETHINK,
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.18, // -1%
    width: 302,
    maxWidth: '100%',
    height: 24,
    color: '#0D1B3E',
  },
  cardSub: {
    fontFamily: JAKARTA,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.224, // -1.6%
    color: '#52627A',
    width: 257,
    maxWidth: '100%',
    height: 42,
  },

  /* ── Bottom Area — Sticky ──────────────────────────────────── */
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
