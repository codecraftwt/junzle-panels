import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
  Image,
  Animated,
} from 'react-native';
import Svg, { Path, Line, Rect } from 'react-native-svg';
import { COLORS } from '../theme/theme';
import Header from '../components/Header';

// ── Icons ─────────────────────────────────────────────────────────────
function ArrowRight({ color = '#2B7FFF' }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18">
      <Line
        x1={2}
        y1={9}
        x2={13}
        y2={9}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M 8 4 L 14 9 L 8 14"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function SearchIcon({ color = '#94A3B8' }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function QrHeaderIcon({ color = '#2B7FFF' }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2" />
      <Rect x="14" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2" />
      <Rect x="3" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2" />
      <Rect x="14" y="14" width="3" height="3" fill={color} />
      <Rect x="18" y="18" width="3" height="3" fill={color} />
      <Rect x="14" y="18" width="3" height="3" fill={color} />
      <Rect x="18" y="14" width="3" height="3" fill={color} />
    </Svg>
  );
}

// ── Sample Teams ──────────────────────────────────────────────────────
const TEAMS_LIST = [
  {
    id: '1',
    name: 'Riverside Basketball',
    sport: 'Basketball',
    city: 'Austin',
    category: 'Basketball • Austin',
    image: require('../../assets/riverside.png'),
    bg: '#0D1B3E',
    about: 'Competitive youth basketball team focused on fundamentals, athletic growth, and team chemistry.',
  },
  {
    id: '2',
    name: 'Riverside Phoenix',
    sport: 'Soccer',
    city: 'Phoenix',
    category: 'Soccer • Phoenix',
    image: require('../../assets/riverside-phoenix.png'),
    bg: '#0EA5E9',
    about: 'Premier youth soccer club emphasizing skill development, tactical awareness, and fair play.',
  },
  {
    id: '3',
    name: 'Riverside Vipers',
    sport: 'Soccer',
    city: 'Phoenix',
    category: 'Soccer • Phoenix',
    image: require('../../assets/riveside-vipers.png'),
    bg: '#145ECC',
    about: 'Elite competitive soccer academy developing champions on and off the field.',
  },
  {
    id: '4',
    name: 'Miami Riverside',
    sport: 'Basketball',
    city: 'Miami',
    category: 'Basketball • Miami',
    image: require('../../assets/miami-riverside.png'),
    bg: '#22C55E',
    about: 'Competitive youth basketball team focused on development and teamwork.',
  },
];

const RECENT_SEARCHES = [
  { id: '1', name: 'Baltimore Tigers', division: 'U12 Football', sport: 'Football', icon: '🐅', coach: 'Coach Marcus Vance' },
  { id: '2', name: 'Wildcats FC', division: 'U11 Soccer', sport: 'Soccer', icon: '🐱', coach: 'Coach Sarah Jenkins' },
  { id: '3', name: 'Eagles Basketball', division: 'Youth League', sport: 'Basketball', icon: '🦅', coach: 'Coach Darnell Washington' },
];

// ── Roles ─────────────────────────────────────────────────────────────
const ROLES_LIST = [
  {
    id: 'parent',
    title: 'Parent',
    subtitle: "Manage your child's team activities",
  },
  {
    id: 'coach',
    title: 'Coach',
    subtitle: 'Organize practices and games.',
  },
  {
    id: 'assistant_coach',
    title: 'Assistant Coach',
    subtitle: 'Help with team management.',
  },
  {
    id: 'team_manager',
    title: 'Team Manager',
    subtitle: 'Handle communication and scheduling.',
  },
  {
    id: 'player',
    title: 'Player',
    subtitle: 'Join your team and stay updated.',
  },
];

export default function FindTeamFlowScreens({ onNavigate, onBack }) {
  // Steps:
  // 'find': Direct Find My Team search screen with header QR button
  // 'scan': Scan QR Code viewfinder
  // 'role': What is Your Role?
  // 'join': Join Team summary & Send Request
  // 'success': Request Sent !
  const [currentStep, setCurrentStep] = useState('find');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(TEAMS_LIST[3]); // Miami Riverside
  const [selectedRole, setSelectedRole] = useState(ROLES_LIST[1]); // Coach
  const [flashlightOn, setFlashlightOn] = useState(false);

  // Laser animation for QR Scanner
  const laserAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (currentStep === 'scan') {
      const anim = Animated.loop(
        Animated.sequence([
          Animated.timing(laserAnim, {
            toValue: 1,
            duration: 1800,
            useNativeDriver: true,
          }),
          Animated.timing(laserAnim, {
            toValue: 0,
            duration: 1800,
            useNativeDriver: true,
          }),
        ])
      );
      anim.start();
      return () => anim.stop();
    }
  }, [currentStep]);

  const filteredTeams = TEAMS_LIST.filter(
    (t) =>
      !searchTerm ||
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
    setCurrentStep('role');
  };

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setCurrentStep('join');
  };

  const handleSendRequest = () => {
    setCurrentStep('success');
  };

  const handleBack = () => {
    if (currentStep === 'scan') {
      setCurrentStep('find');
    } else if (currentStep === 'role') {
      setCurrentStep('find');
    } else if (currentStep === 'join') {
      setCurrentStep('role');
    } else if (currentStep === 'success') {
      onNavigate('WhatWouldYouLikeToDo');
    } else {
      onBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* ── Top Header — identical to CoachFlowScreens.js ───────────── */}
        <Header
          onBack={handleBack}
          showBack={true}
          showStepper={false}
          totalSteps={0}
          rightComponent={
            currentStep === 'find' ? (
              <TouchableOpacity
                style={styles.headerQrBtn}
                onPress={() => setCurrentStep('scan')}
                activeOpacity={0.75}
              >
                <QrHeaderIcon color="#2B7FFF" />
              </TouchableOpacity>
            ) : null
          }
        />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ═══════════════════════════════════════════════════════════ */}
          {/* 1. DIRECT INITIAL SCREEN: FIND MY TEAM WITH HEADER QR       */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentStep === 'find' && (
            <View style={styles.stepBlock}>
              {/* Heading */}
              <View style={styles.headingBox}>
                <Text style={styles.screenTitle}>Find My Team</Text>
                <Text style={styles.screenSubtitle}>
                  Search by team name, sport or city to join your team on Junzle.
                </Text>
              </View>

              {/* Search Bar Input (Figma: placeholder "Team name, sport, or city") */}
              <View style={styles.searchBarContainer}>
                <SearchIcon color="#94A3B8" />
                <TextInput
                  style={styles.searchTextInput}
                  placeholder="Team name, sport, or city"
                  placeholderTextColor="#94A3B8"
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                  autoCapitalize="none"
                />
              </View>

              {/* Result List Section */}
              <View style={styles.resultSection}>
                <Text style={styles.resultHeading}>Result</Text>

                <View style={styles.teamListContainer}>
                  {filteredTeams.length > 0 ? (
                    filteredTeams.map((team) => (
                      <TouchableOpacity
                        key={team.id}
                        style={styles.teamCard}
                        onPress={() => handleSelectTeam(team)}
                        activeOpacity={0.82}
                      >
                        <View style={styles.teamCardLeft}>
                          <View style={[styles.teamAvatar, { backgroundColor: team.bg }]}>
                            <Image
                              source={team.image}
                              style={styles.teamAvatarImg}
                              resizeMode="contain"
                            />
                          </View>
                          <View style={styles.teamInfoCol}>
                            <Text style={styles.teamCardTitle}>{team.name}</Text>
                            <Text style={styles.teamCardCategory}>{team.category}</Text>
                          </View>
                        </View>
                        <ArrowRight color="#2B7FFF" />
                      </TouchableOpacity>
                    ))
                  ) : (
                    <View style={styles.noResultsBox}>
                      <Text style={styles.noResultsText}>No teams found matching "{searchTerm}"</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* 2. SCAN QR CODE (VIEWFINDER SCREEN)                        */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentStep === 'scan' && (
            <View style={styles.stepBlock}>
              {/* Heading */}
              <View style={styles.headingBox}>
                <Text style={styles.screenTitle}>Scan QR Code</Text>
                <Text style={styles.screenSubtitle}>
                  Scan the team QR Code provided by your coach or team administrator
                </Text>
              </View>

              {/* Viewfinder Card */}
              <View style={styles.viewfinderCard}>
                {/* Simulated Camera Feed View */}
                <TouchableOpacity
                  style={styles.cameraPreview}
                  onPress={() => handleSelectTeam(TEAMS_LIST[3])} // Selects Miami Riverside on tap
                  activeOpacity={0.9}
                >
                  {/* Flashlight toggle */}
                  <TouchableOpacity
                    style={styles.flashlightBtn}
                    onPress={() => setFlashlightOn(!flashlightOn)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.flashlightIcon}>{flashlightOn ? '🔦' : '💡'}</Text>
                  </TouchableOpacity>

                  {/* Centered Phone / QR Graphic */}
                  <View style={styles.scanTargetWrap}>
                    {/* 4 Bracket Corners */}
                    <View style={[styles.cornerBracket, styles.cornerTopLeft]} />
                    <View style={[styles.cornerBracket, styles.cornerTopRight]} />
                    <View style={[styles.cornerBracket, styles.cornerBottomLeft]} />
                    <View style={[styles.cornerBracket, styles.cornerBottomRight]} />

                    {/* QR Code graphic */}
                    <Image
                      source={require('../../assets/qr-code.png')}
                      style={styles.scanQrImage}
                      resizeMode="contain"
                    />

                    {/* Animated Laser Line */}
                    <Animated.View
                      style={[
                        styles.laserLine,
                        {
                          transform: [
                            {
                              translateY: laserAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 160],
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                  </View>

                  {/* Upload from Gallery Button */}
                  <TouchableOpacity
                    style={styles.galleryBtn}
                    onPress={() => handleSelectTeam(TEAMS_LIST[3])}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.galleryIcon}>🖼️</Text>
                    <Text style={styles.galleryBtnText}>Upload from Gallery</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>

              {/* Footer Guidance Note */}
              <Text style={styles.footerNote}>
                Contact your coach or team administrator to get an invite link, QR Code, or team code.
              </Text>
            </View>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* 4. WHAT IS YOUR ROLE? (ROLE SELECTOR)                      */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentStep === 'role' && (
            <View style={styles.stepBlock}>
              {/* Selected Team Banner */}
              <View style={styles.selectedTeamBanner}>
                <View style={styles.teamCardLeft}>
                  <View style={[styles.teamAvatarSmall, { backgroundColor: selectedTeam.bg }]}>
                    <Image
                      source={selectedTeam.image || require('../../assets/miami-riverside.png')}
                      style={styles.teamAvatarSmallImg}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.teamInfoCol}>
                    <Text style={styles.bannerTeamName}>{selectedTeam.name}</Text>
                    <Text style={styles.bannerCategory}>{selectedTeam.category}</Text>
                  </View>
                </View>
                <View style={styles.selectedPill}>
                  <Text style={styles.selectedPillText}>Selected</Text>
                </View>
              </View>

              {/* Heading */}
              <View style={styles.headingBox}>
                <Text style={styles.screenTitle}>What is Your Role?</Text>
                <Text style={styles.screenSubtitle}>
                  This helps us customize your experience and will be visible to the team admin for approval.
                </Text>
              </View>

              {/* Role Cards List */}
              <View style={styles.roleCardsContainer}>
                {ROLES_LIST.map((role) => (
                  <TouchableOpacity
                    key={role.id}
                    style={styles.roleCard}
                    onPress={() => handleSelectRole(role)}
                    activeOpacity={0.82}
                  >
                    <View style={styles.roleCardTextCol}>
                      <Text style={styles.roleCardTitle}>{role.title}</Text>
                      <Text style={styles.roleCardSubtitle}>{role.subtitle}</Text>
                    </View>
                    <ArrowRight color="#2B7FFF" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* 5. JOIN TEAM (CONFIRM & SEND REQUEST)                      */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentStep === 'join' && (
            <View style={styles.stepBlock}>
              {/* Heading */}
              <View style={styles.headingBox}>
                <Text style={styles.screenTitle}>Join Team</Text>
                <Text style={styles.screenSubtitle}>
                  Search by team name, sport or city to join your team on Junzle.
                </Text>
              </View>

              {/* Team Profile Summary Card */}
              <View style={styles.joinSummaryCard}>
                {/* Top Info Row */}
                <View style={styles.summaryTopRow}>
                  <View style={styles.teamCardLeft}>
                    <View style={[styles.teamAvatar, { backgroundColor: selectedTeam.bg }]}>
                      <Image
                        source={selectedTeam.image || require('../../assets/miami-riverside.png')}
                        style={styles.teamAvatarImg}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.teamInfoCol}>
                      <Text style={styles.teamCardTitle}>{selectedTeam.name}</Text>
                      <Text style={styles.teamCardCategory}>{selectedTeam.category}</Text>
                    </View>
                  </View>
                  <View style={styles.roleBadge}>
                    <Text style={styles.roleBadgeText}>{selectedRole.title}</Text>
                  </View>
                </View>

                {/* Divider */}
                <View style={styles.cardDivider} />

                {/* About Team Section */}
                <View style={styles.aboutTeamBlock}>
                  <Text style={styles.aboutTeamTitle}>About Team</Text>
                  <Text style={styles.aboutTeamText}>{selectedTeam.about}</Text>
                </View>
              </View>
            </View>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* 6. REQUEST SENT (CONFIRMATION STATE)                       */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentStep === 'success' && (
            <View style={styles.successBlock}>
              <Image
                source={require('../../assets/verified.png')}
                style={styles.verifiedBadge}
                resizeMode="contain"
              />
              <View style={styles.headingBox}>
                <Text style={styles.successTitle}>Request Sent !</Text>
                <Text style={styles.successSubtitle}>
                  Your request to join {selectedTeam.name} as a {selectedRole.title} has been sent to the team admin for review.
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* ── Bottom Sticky Action Sheet ─────────────────────────────── */}
        {currentStep === 'join' && (
          <View style={styles.bottomArea}>
            <TouchableOpacity
              style={styles.sendRequestBtn}
              onPress={handleSendRequest}
              activeOpacity={0.88}
            >
              <Text style={styles.sendRequestBtnText}>Send Request</Text>
            </TouchableOpacity>
          </View>
        )}

        {currentStep === 'success' && (
          <View style={styles.bottomArea}>
            <TouchableOpacity
              style={styles.sendRequestBtn}
              onPress={() => onNavigate('WhatWouldYouLikeToDo')}
              activeOpacity={0.88}
            >
              <Text style={styles.sendRequestBtnText}>Done</Text>
            </TouchableOpacity>
          </View>
        )}
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

  /* ── Header QR Button ──────────────────────────────────────── */
  headerQrBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  /* ── Scroll ────────────────────────────────────────────────── */
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    alignItems: 'center',
  },
  stepBlock: {
    width: '100%',
    maxWidth: 354,
    gap: 16,
  },

  /* ── Headings ──────────────────────────────────────────────── */
  headingBox: {
    width: '100%',
    gap: 6,
  },
  screenTitle: {
    fontFamily: RETHINK,
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: 0,
    color: '#0D1B3E',
  },
  screenSubtitle: {
    fontFamily: JAKARTA,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.24, // -1.5%
    color: '#52627A',
  },

  /* ── Step 2 Container & Tabs (ParentFlow) ───────────────────── */
  step2Container: {
    width: '100%',
    maxWidth: 370,
    alignItems: 'center',
    gap: 16,
  },
  headingWrapperStep2: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 4,
  },
  screenHeading: {
    fontFamily: RETHINK,
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 38,
    color: '#0D1B3E',
  },
  screenSub: {
    fontFamily: JAKARTA,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.24,
    color: '#52627A',
  },
  teamTabCard: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
    overflow: 'hidden',
  },
  teamTabCardLink: {
    minHeight: 360,
    justifyContent: 'space-between',
  },
  teamTabCardSearch: {
    minHeight: 360,
  },
  tabHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    height: 48,
    width: '100%',
  },
  tabHeaderBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    height: 48,
  },
  tabHeaderBtnActive: {
    borderBottomColor: '#015CFE',
  },
  tabHeaderIcon: {
    width: 16,
    height: 16,
  },
  tabHeaderText: {
    fontFamily: RETHINK,
    fontSize: 14,
    fontWeight: '700',
    color: '#0D1B3E',
  },
  tabHeaderTextActive: {
    color: '#015CFE',
  },
  tabContentLink: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    justifyContent: 'space-between',
    width: '100%',
  },
  tabLinkTopSection: {
    width: '100%',
  },
  fieldLabelStep2: {
    fontFamily: RETHINK,
    fontSize: 14,
    fontWeight: '700',
    color: '#0D1B3E',
    marginBottom: 8,
  },
  inviteInputRow: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 10,
    marginBottom: 14,
  },
  inviteInputIcon: {
    width: 16,
    height: 16,
    tintColor: '#64748B',
  },
  inviteTextInput: {
    flex: 1,
    fontFamily: JAKARTA,
    fontSize: 14,
    color: '#0D1B3E',
    padding: 0,
  },
  sendJoinReqBtn: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#015CFE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  sendJoinReqBtnText: {
    fontFamily: RETHINK,
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  primaryBtnArrowContainer: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forwardArrowImg: {
    width: 14,
    height: 14,
    tintColor: '#FFFFFF',
  },
  orDividerRowStep2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  orText: {
    paddingHorizontal: 12,
    fontFamily: JAKARTA,
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  scanQrCard: {
    width: '100%',
    height: 72,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 12,
    justifyContent: 'space-between',
  },
  qrIconSquare: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrIconImg: {
    width: 22,
    height: 22,
    tintColor: '#015CFE',
  },
  qrTextContainer: {
    flex: 1,
    gap: 2,
  },
  scanQrTitle: {
    fontFamily: RETHINK,
    fontSize: 14,
    fontWeight: '700',
    color: '#0D1B3E',
  },
  scanQrSub: {
    fontFamily: JAKARTA,
    fontSize: 12,
    color: '#64748B',
  },
  footerHelpNote: {
    fontFamily: JAKARTA,
    fontSize: 13,
    lineHeight: 18,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
  },

  /* ── Tab 2: Search for Team ─────────────────────────────────── */
  tabContentSearch: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchRedirectInput: {
    width: '100%',
  },
  searchInputField: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    fontFamily: JAKARTA,
    fontSize: 14,
    color: '#0D1B3E',
    marginBottom: 16,
  },
  recentSearchesTitle: {
    fontFamily: RETHINK,
    fontSize: 14,
    fontWeight: '700',
    color: '#0D1B3E',
    marginBottom: 10,
  },
  recentSearchesList: {
    gap: 8,
  },
  recentSearchCard: {
    height: 52,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  recentSearchCardSelected: {
    borderColor: '#015CFE',
    backgroundColor: '#F0F6FF',
  },
  teamSearchIconBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  teamSearchLogoImg: {
    width: 24,
    height: 24,
  },
  teamSearchEmoji: {
    fontSize: 16,
  },
  teamSearchName: {
    flex: 1,
    fontFamily: RETHINK,
    fontSize: 14,
    fontWeight: '700',
    color: '#0D1B3E',
  },
  searchRadioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchRadioCircleActive: {
    borderColor: '#015CFE',
  },
  searchRadioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#015CFE',
  },

  /* ── Search Bar ────────────────────────────────────────────── */
  searchBarContainer: {
    width: '100%',
    maxWidth: 354,
    height: 45,
    gap: 12,
    paddingTop: 4, // Spacing/2xs
    paddingRight: 8, // Spacing/xs
    paddingBottom: 4, // Spacing/2xs
    paddingLeft: 8, // Spacing/xs
    borderRadius: 8, // Radius/1
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchTextInput: {
    flex: 1,
    fontFamily: JAKARTA,
    fontSize: 15,
    color: '#0D1B3E',
    padding: 0,
  },

  /* ── Result Section ────────────────────────────────────────── */
  resultSection: {
    width: '100%',
    maxWidth: 354,
    minHeight: 412,
    gap: 12,
    marginTop: 4,
  },
  resultHeading: {
    fontFamily: RETHINK,
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
    color: '#0D1B3E',
  },
  teamListContainer: {
    width: '100%',
    gap: 12,
  },
  teamCard: {
    width: '100%',
    maxWidth: 354,
    height: 84,
    borderRadius: 16, // Radius/2
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    padding: 8, // Spacing/xs
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#0D1B3E',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: '0 2px 8px rgba(13, 27, 62, 0.03)',
      },
    }),
  },
  teamCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  teamAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26, // Rounded circle (Radius/4)
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  teamAvatarImg: {
    width: 32,
    height: 32,
  },
  teamInfoCol: {
    width: 204,
    height: 49,
    gap: 4,
    justifyContent: 'center',
  },
  teamCardTitle: {
    fontFamily: RETHINK,
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.18, // -1%
    color: '#0D1B3E',
  },
  teamCardCategory: {
    fontFamily: JAKARTA,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.224, // -1.6%
    color: '#52627A',
  },
  noResultsBox: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  noResultsText: {
    fontFamily: JAKARTA,
    fontSize: 14,
    color: '#64748B',
  },

  /* ── Scan QR Code Screen ───────────────────────────────────── */
  viewfinderCard: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#0F172A',
    marginTop: 8,
  },
  cameraPreview: {
    width: '100%',
    height: 380,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    backgroundColor: '#1E293B',
  },
  flashlightBtn: {
    alignSelf: 'flex-end',
    marginRight: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashlightIcon: {
    fontSize: 18,
  },
  scanTargetWrap: {
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  scanQrImage: {
    width: 150,
    height: 150,
  },
  laserLine: {
    position: 'absolute',
    left: 10,
    right: 10,
    top: 10,
    height: 2,
    backgroundColor: '#2B7FFF',
    shadowColor: '#2B7FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 4,
  },
  cornerBracket: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: '#FFFFFF',
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 6,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 6,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 6,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 6,
  },
  galleryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  galleryIcon: {
    fontSize: 16,
  },
  galleryBtnText: {
    fontFamily: JAKARTA,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  footerNote: {
    fontFamily: JAKARTA,
    fontSize: 13,
    lineHeight: 18,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
  },

  /* ── Role Selector Screen ──────────────────────────────────── */
  selectedTeamBanner: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  teamAvatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  teamAvatarSmallImg: {
    width: 24,
    height: 24,
  },
  bannerTeamName: {
    fontFamily: RETHINK,
    fontWeight: '700',
    fontSize: 15,
    color: '#0D1B3E',
  },
  bannerCategory: {
    fontFamily: JAKARTA,
    fontSize: 12,
    color: '#64748B',
  },
  selectedPill: {
    backgroundColor: '#015CFE',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  selectedPillText: {
    fontFamily: JAKARTA,
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  roleCardsContainer: {
    width: '100%',
    gap: 10,
    marginTop: 4,
  },
  roleCard: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#0D1B3E',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: '0 2px 8px rgba(13, 27, 62, 0.03)',
      },
    }),
  },
  roleCardTextCol: {
    flex: 1,
    gap: 2,
    paddingRight: 10,
  },
  roleCardTitle: {
    fontFamily: RETHINK,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
    color: '#0D1B3E',
  },
  roleCardSubtitle: {
    fontFamily: JAKARTA,
    fontSize: 13,
    lineHeight: 18,
    color: '#64748B',
  },

  /* ── Join Team Summary Screen ──────────────────────────────── */
  joinSummaryCard: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    padding: 16,
    gap: 14,
    marginTop: 4,
  },
  summaryTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roleBadge: {
    backgroundColor: '#EBF2FF',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  roleBadgeText: {
    fontFamily: JAKARTA,
    fontSize: 12,
    fontWeight: '700',
    color: '#015CFE',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 2,
  },
  aboutTeamBlock: {
    gap: 6,
  },
  aboutTeamTitle: {
    fontFamily: RETHINK,
    fontWeight: '700',
    fontSize: 14,
    color: '#0D1B3E',
  },
  aboutTeamText: {
    fontFamily: JAKARTA,
    fontSize: 13,
    lineHeight: 20,
    color: '#52627A',
  },

  /* ── Success Block ─────────────────────────────────────────── */
  successBlock: {
    width: '100%',
    maxWidth: 354,
    alignItems: 'center',
    paddingTop: 40,
    gap: 24,
  },
  verifiedBadge: {
    width: 98,
    height: 98,
  },
  successTitle: {
    fontFamily: RETHINK,
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 38,
    color: '#0D1B3E',
    textAlign: 'center',
  },
  successSubtitle: {
    fontFamily: JAKARTA,
    fontSize: 16,
    lineHeight: 24,
    color: '#52627A',
    textAlign: 'center',
  },

  /* ── Bottom Sticky Area ────────────────────────────────────── */
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
  sendRequestBtn: {
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
  sendRequestBtnText: {
    fontFamily: RETHINK,
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
