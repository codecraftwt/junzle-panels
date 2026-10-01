import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Platform,
} from 'react-native';
import { COLORS } from '../theme/theme';

export default function MobileHubScreen({ routeParams, onNavigate }) {
  const role = routeParams?.role || 'parent';
  const teamName = routeParams?.teamName || 'Baltimore Tigers';
  const division = routeParams?.division || 'U12 Football';

  const isCoach = role === 'coach' || role === 'club_owner' || role === 'league_admin';

  // Navigation tab state: 'home' | 'schedule' | 'messages' | 'roster' | 'profile'
  const [activeNav, setActiveNav] = useState(routeParams?.tab || 'home');
  // Sub-view toggle for Figma parity: 'dashboard' (iPhone 17 - 2) vs 'lookaround' (iPhone 17 - 1)
  const [viewVariant, setViewVariant] = useState('dashboard');

  // Match RSVP State
  const [rsvpState, setRsvpState] = useState('going'); // 'going' | 'out' | 'undecided'

  // Selected date in calendar strip
  const [selectedDayIndex, setSelectedDayIndex] = useState(5); // Saturday game day

  // Days strip data
  const calendarDays = [
    { day: 'MON', date: '14', hasEvent: false, isGame: false },
    { day: 'TUE', date: '15', hasEvent: true, isGame: false, label: 'Practice' },
    { day: 'WED', date: '16', hasEvent: false, isGame: false },
    { day: 'THU', date: '17', hasEvent: true, isGame: false, label: 'Tactics' },
    { day: 'FRI', date: '18', hasEvent: false, isGame: false },
    { day: 'SAT', date: '19', hasEvent: true, isGame: true, label: 'Game Day' },
    { day: 'SUN', date: '20', hasEvent: false, isGame: false },
  ];

  // Roster data
  const rosterPlayers = [
    { num: '10', name: 'Alex Turner', pos: 'Forward', parent: 'Sarah Johnson', status: 'Confirmed' },
    { num: '7', name: 'Liam Miller', pos: 'Midfield', parent: 'David Miller', status: 'Confirmed' },
    { num: '4', name: 'Noah Davis', pos: 'Defense', parent: 'Jessica Davis', status: 'Pending' },
    { num: '1', name: 'Ethan Cole', pos: 'Goalkeeper', parent: 'Brian Cole', status: 'Confirmed' },
    { num: '8', name: 'Lucas Hernandez', pos: 'Midfield', parent: 'Maria Hernandez', status: 'Confirmed' },
    { num: '11', name: 'Jordan Smith', pos: 'Striker', parent: 'Rachel Smith', status: 'Confirmed' },
  ];

  // Messages data
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'm1',
      sender: 'Coach Marcus Vance',
      role: 'Head Coach',
      time: '2h ago',
      text: 'Uniform alert: Wear royal blue kits with canary yellow socks for Saturday\'s tournament. Please arrive 45 minutes prior for team warm-ups!',
      unread: true,
      pinned: true,
    },
    {
      id: 'm2',
      sender: 'Jessica Davis (Parent)',
      role: 'Team Parent',
      time: 'Yesterday',
      text: 'I will be bringing post-game orange slices and sports drinks for the team this Saturday.',
      unread: false,
      pinned: false,
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      {/* ========================================================================= */}
      {/* TOP APP BAR (Figma iOS status + title header) */}
      {/* ========================================================================= */}
      <View style={styles.appHeader}>
        <View style={styles.appHeaderLeft}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => onNavigate('Entry')}
            activeOpacity={0.7}
          >
            <Text style={styles.backChevron}>‹</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.welcomeGreeting}>
              {viewVariant === 'lookaround'
                ? 'Welcome,'
                : isCoach
                ? 'Welcome back,'
                : 'Welcome back,'}
            </Text>
            <Text style={styles.userNameHeading}>
              {viewVariant === 'lookaround'
                ? 'Look Around'
                : isCoach
                ? 'Coach Marcus 👋'
                : 'Sarah Johnson 👋'}
            </Text>
          </View>
        </View>

        <View style={styles.appHeaderRight}>
          {/* Variant Toggle to switch between the 2 Figma screens */}
          <TouchableOpacity
            style={styles.variantToggleBtn}
            onPress={() => setViewVariant(viewVariant === 'dashboard' ? 'lookaround' : 'dashboard')}
            activeOpacity={0.8}
          >
            <Text style={styles.variantToggleText}>
              {viewVariant === 'dashboard' ? 'View 1: Look Around' : 'View 2: Rich Hub'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.avatarBtn}
            onPress={() => setActiveNav('profile')}
            activeOpacity={0.8}
          >
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitial}>{isCoach ? 'M' : 'S'}</Text>
            </View>
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ========================================================================= */}
      {/* MAIN SCROLLABLE CONTENT */}
      {/* ========================================================================= */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ===================================================================== */}
        {/* TAB: HOME */}
        {/* ===================================================================== */}
        {activeNav === 'home' && (
          <>
            {/* VARIANT A: FIGMA SCREEN 2 (Rich Team Dashboard) */}
            {viewVariant === 'dashboard' && (
              <>
                {/* Active Team Pill Banner */}
                <View style={styles.teamPillCard}>
                  <View style={styles.teamBadgeCircle}>
                    <Text style={{ fontSize: 20 }}>🐅</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.teamPillTitle}>{teamName}</Text>
                    <Text style={styles.teamPillSub}>{division}</Text>
                  </View>
                  <View style={styles.roleChip}>
                    <Text style={styles.roleChipText}>
                      {isCoach ? 'Coach' : 'Parent'}
                    </Text>
                  </View>
                </View>

                {/* Season Progress Bar */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressRow}>
                    <Text style={styles.progressLabel}>Season Progress</Text>
                    <Text style={styles.progressValue}>Game 8 of 12</Text>
                  </View>
                  <View style={styles.progressBarTrack}>
                    <View style={[styles.progressBarFill, { width: '66%' }]} />
                  </View>
                </View>

                {/* HERO MATCH BANNER: Next Game */}
                <View style={styles.heroMatchBanner}>
                  {/* Background overlay style */}
                  <View style={styles.heroBannerBackground}>
                    <View style={styles.heroTopRow}>
                      <View style={styles.nextGameBadge}>
                        <Text style={styles.nextGameBadgeText}>⚡ NEXT GAME</Text>
                      </View>
                      <Text style={styles.heroDateText}>Sat, Oct 19 • 10:00 AM</Text>
                    </View>

                    <Text style={styles.heroMatchupText}>Baltimore Tigers vs Wildcats FC</Text>
                    <Text style={styles.heroLocationText}>📍 Field 4, Round Rock Sports Complex</Text>

                    {/* Attending Players Preview */}
                    <View style={styles.attendeesRow}>
                      <View style={styles.avatarStack}>
                        <View style={[styles.stackAvatar, { backgroundColor: '#1A56DB', left: 0 }]}>
                          <Text style={styles.stackInitial}>AT</Text>
                        </View>
                        <View style={[styles.stackAvatar, { backgroundColor: '#10B981', left: 18 }]}>
                          <Text style={styles.stackInitial}>LM</Text>
                        </View>
                        <View style={[styles.stackAvatar, { backgroundColor: '#F97316', left: 36 }]}>
                          <Text style={styles.stackInitial}>ND</Text>
                        </View>
                        <View style={[styles.stackAvatar, { backgroundColor: '#8B5CF6', left: 54 }]}>
                          <Text style={styles.stackInitial}>EC</Text>
                        </View>
                      </View>
                      <Text style={styles.attendeesCountText}>+8 teammates going</Text>
                    </View>

                    {/* RSVP Action Toggle */}
                    <View style={styles.rsvpActionCard}>
                      <Text style={styles.rsvpCardQuestion}>
                        {isCoach ? 'Team Attendance:' : 'RSVP for Alex:'}
                      </Text>
                      <View style={styles.rsvpPillGroup}>
                        <TouchableOpacity
                          style={[
                            styles.rsvpBtn,
                            rsvpState === 'going' && styles.rsvpBtnActiveGreen,
                          ]}
                          onPress={() => setRsvpState('going')}
                          activeOpacity={0.8}
                        >
                          <Text
                            style={[
                              styles.rsvpBtnText,
                              rsvpState === 'going' && styles.rsvpBtnTextActiveGreen,
                            ]}
                          >
                            Attending ✓
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.rsvpBtn,
                            rsvpState === 'out' && styles.rsvpBtnActiveRed,
                          ]}
                          onPress={() => setRsvpState('out')}
                          activeOpacity={0.8}
                        >
                          <Text
                            style={[
                              styles.rsvpBtnText,
                              rsvpState === 'out' && styles.rsvpBtnTextActiveRed,
                            ]}
                          >
                            Out ✗
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>

                {/* CALENDAR WEEK STRIP */}
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>Game Schedule</Text>
                  <TouchableOpacity onPress={() => setActiveNav('schedule')}>
                    <Text style={styles.seeAllLink}>View All ›</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.calendarStrip}>
                  {calendarDays.map((item, idx) => {
                    const isSelected = selectedDayIndex === idx;
                    return (
                      <TouchableOpacity
                        key={idx}
                        style={[
                          styles.dayBox,
                          isSelected && styles.dayBoxSelected,
                          item.isGame && !isSelected && styles.dayBoxGameDay,
                        ]}
                        onPress={() => setSelectedDayIndex(idx)}
                        activeOpacity={0.8}
                      >
                        <Text
                          style={[
                            styles.dayBoxWeekday,
                            isSelected && styles.dayBoxWeekdaySelected,
                          ]}
                        >
                          {item.day}
                        </Text>
                        <Text
                          style={[
                            styles.dayBoxDate,
                            isSelected && styles.dayBoxDateSelected,
                          ]}
                        >
                          {item.date}
                        </Text>
                        {item.hasEvent && (
                          <View
                            style={[
                              styles.dayEventDot,
                              isSelected
                                ? { backgroundColor: '#FFEF00' }
                                : item.isGame
                                ? { backgroundColor: '#1A56DB' }
                                : { backgroundColor: '#10B981' },
                            ]}
                          />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* TEAM UPDATES / ANNOUNCEMENTS */}
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>Team Updates</Text>
                  <TouchableOpacity onPress={() => setActiveNav('messages')}>
                    <Text style={styles.seeAllLink}>See all ›</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.updateCard}>
                  <View style={styles.updateHeader}>
                    <View style={styles.coachAvatarCircle}>
                      <Text style={{ fontSize: 16 }}>👔</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.updateAuthor}>Coach Marcus Vance</Text>
                      <Text style={styles.updateRole}>Head Coach • 2h ago</Text>
                    </View>
                    <View style={styles.pinnedPill}>
                      <Text style={styles.pinnedText}>📌 Pinned</Text>
                    </View>
                  </View>
                  <Text style={styles.updateBody}>
                    Uniform alert: Wear royal blue kits with canary yellow socks for Saturday's tournament. Arrive 45 mins prior to kickoff!
                  </Text>
                  <View style={styles.updateFooterRow}>
                    <Text style={styles.updateKitsTag}>👕 Royal Blue + Canary Yellow</Text>
                    <TouchableOpacity
                      style={styles.replyBtn}
                      onPress={() => setActiveNav('messages')}
                    >
                      <Text style={styles.replyBtnText}>Reply in Chat ›</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* TEAM STORE / MERCHANDISE PROMO BANNER */}
                <View style={styles.merchBanner}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.merchTag}>OFFICIAL TEAM STORE</Text>
                    <Text style={styles.merchTitle}>Support the Tigers</Text>
                    <Text style={styles.merchSub}>
                      2026 Fall Season hoodies, jerseys, and fan gear now available.
                    </Text>
                    <TouchableOpacity
                      style={styles.merchBtn}
                      onPress={() => alert('Opening Tigers Official Fan Store...')}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.merchBtnText}>Shop Gear →</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.merchGraphicBox}>
                    <Text style={{ fontSize: 44 }}>🐅</Text>
                  </View>
                </View>
              </>
            )}

            {/* VARIANT B: FIGMA SCREEN 1 (Look Around / Quick View) */}
            {viewVariant === 'lookaround' && (
              <>
                {/* Look Around Team Card */}
                <View style={styles.lookAroundCard}>
                  <View style={styles.lookAroundLogoBox}>
                    <Text style={{ fontSize: 24 }}>🐅</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.lookAroundTeamName}>{teamName}</Text>
                    <Text style={styles.lookAroundSub}>
                      {division} • Coach: Marcus Vance
                    </Text>
                  </View>
                  <Text style={styles.lookAroundChevron}>›</Text>
                </View>

                {/* Two Action Segment Buttons */}
                <View style={styles.lookAroundTabsRow}>
                  <TouchableOpacity
                    style={[styles.segmentBtn, styles.segmentBtnActive]}
                    onPress={() => setActiveNav('schedule')}
                  >
                    <Text style={[styles.segmentBtnText, styles.segmentBtnTextActive]}>
                      📅 Team Schedule
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.segmentBtn}
                    onPress={() => setActiveNav('roster')}
                  >
                    <Text style={styles.segmentBtnText}>👥 Team Roster</Text>
                  </TouchableOpacity>
                </View>

                {/* Upcoming Events Date Pills */}
                <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
                  Upcoming Events
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalDatePills}
                >
                  {[
                    { date: 'OCT 15', title: 'Tactics Drills', type: 'Practice' },
                    { date: 'OCT 19', title: 'vs Wildcats FC', type: 'Game' },
                    { date: 'OCT 22', title: 'Scrimmage', type: 'Practice' },
                    { date: 'OCT 26', title: 'vs Austin SC', type: 'Game' },
                  ].map((evt, i) => (
                    <View key={i} style={styles.dateEventPill}>
                      <Text style={styles.datePillHeader}>{evt.date}</Text>
                      <Text style={styles.datePillTitle}>{evt.title}</Text>
                      <Text
                        style={[
                          styles.datePillType,
                          evt.type === 'Game'
                            ? { color: '#1A56DB' }
                            : { color: '#10B981' },
                        ]}
                      >
                        {evt.type}
                      </Text>
                    </View>
                  ))}
                </ScrollView>

                {/* Match Highlight Card */}
                <View style={[styles.updateCard, { marginTop: 16 }]}>
                  <View style={styles.updateHeader}>
                    <View style={styles.teamBadgeCircle}>
                      <Text style={{ fontSize: 18 }}>🐅</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.updateAuthor}>Baltimore Tigers vs Wildcats FC</Text>
                      <Text style={styles.updateRole}>Round Rock Complex • Field 4</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.lookAroundRsvpBtn}
                      onPress={() => alert('RSVP Confirmed for match!')}
                    >
                      <Text style={styles.lookAroundRsvpText}>RSVP</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </>
        )}

        {/* ===================================================================== */}
        {/* TAB: SCHEDULE */}
        {/* ===================================================================== */}
        {activeNav === 'schedule' && (
          <View style={{ gap: 14 }}>
            <View style={styles.tabHeaderBox}>
              <Text style={styles.sectionTitle}>Full Team Schedule</Text>
              <Text style={styles.sectionSub}>Fall 2026 Competitive Season</Text>
            </View>

            {/* Event 1: Next Match */}
            <View style={styles.fullScheduleCard}>
              <View style={styles.scheduleBadgeRow}>
                <View style={styles.gameBadgePill}>
                  <Text style={styles.gameBadgeText}>🏆 LEAGUE MATCH #8</Text>
                </View>
                <Text style={styles.scheduleDateText}>Sat, Oct 19 • 10:00 AM</Text>
              </View>

              <Text style={styles.scheduleMatchTitle}>Baltimore Tigers vs Wildcats FC</Text>
              <Text style={styles.scheduleVenue}>📍 Field 4, Round Rock Sports Complex</Text>
              <Text style={styles.scheduleKit}>👕 Royal Blue Home Kit with Canary Yellow Socks</Text>

              <View style={styles.scheduleRsvpBox}>
                <Text style={styles.scheduleRsvpLabel}>
                  {isCoach ? 'Attendance Summary: 11 / 14 Confirmed' : 'Your Attendance:'}
                </Text>
                <View style={styles.rsvpPillGroup}>
                  <TouchableOpacity
                    style={[styles.rsvpBtn, rsvpState === 'going' && styles.rsvpBtnActiveGreen]}
                    onPress={() => setRsvpState('going')}
                  >
                    <Text style={[styles.rsvpBtnText, rsvpState === 'going' && styles.rsvpBtnTextActiveGreen]}>
                      Attending ✓
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.rsvpBtn, rsvpState === 'out' && styles.rsvpBtnActiveRed]}
                    onPress={() => setRsvpState('out')}
                  >
                    <Text style={[styles.rsvpBtnText, rsvpState === 'out' && styles.rsvpBtnTextActiveRed]}>
                      Out ✗
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Event 2: Practice */}
            <View style={styles.fullScheduleCard}>
              <View style={styles.scheduleBadgeRow}>
                <View style={styles.practiceBadgePill}>
                  <Text style={styles.practiceBadgeText}>⚡ TEAM PRACTICE</Text>
                </View>
                <Text style={styles.scheduleDateText}>Tue, Oct 22 • 5:30 PM</Text>
              </View>

              <Text style={styles.scheduleMatchTitle}>Set Pieces & Tactical Conditioning</Text>
              <Text style={styles.scheduleVenue}>📍 North County Turf Field #2</Text>
              <Text style={styles.scheduleKit}>👕 Grey training pinnies, bring shin guards</Text>
            </View>

            {/* Event 3: Match #9 */}
            <View style={styles.fullScheduleCard}>
              <View style={styles.scheduleBadgeRow}>
                <View style={styles.gameBadgePill}>
                  <Text style={styles.gameBadgeText}>🏆 LEAGUE MATCH #9</Text>
                </View>
                <Text style={styles.scheduleDateText}>Sat, Oct 26 • 1:30 PM</Text>
              </View>

              <Text style={styles.scheduleMatchTitle}>Austin SC vs Baltimore Tigers (Away)</Text>
              <Text style={styles.scheduleVenue}>📍 Austin Metro Park Stadium</Text>
              <Text style={styles.scheduleKit}>👕 White Away Kit</Text>
            </View>
          </View>
        )}

        {/* ===================================================================== */}
        {/* TAB: MESSAGES */}
        {/* ===================================================================== */}
        {activeNav === 'messages' && (
          <View style={{ gap: 14 }}>
            <View style={styles.tabHeaderBox}>
              <Text style={styles.sectionTitle}>Team Messages & Alerts</Text>
              <Text style={styles.sectionSub}>Announcements and group discussion</Text>
            </View>

            {chatMessages.map((msg) => (
              <View key={msg.id} style={styles.chatMessageCard}>
                <View style={styles.chatHeaderRow}>
                  <View style={styles.chatAvatar}>
                    <Text style={{ fontSize: 16 }}>👤</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.chatSender}>{msg.sender}</Text>
                    <Text style={styles.chatMeta}>{msg.role} • {msg.time}</Text>
                  </View>
                  {msg.pinned && (
                    <View style={styles.pinnedPill}>
                      <Text style={styles.pinnedText}>📌 Pinned</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.chatTextContent}>{msg.text}</Text>
              </View>
            ))}

            <TouchableOpacity
              style={styles.sendMessageTrigger}
              onPress={() => alert('New announcement dialog (Interactive Phase 1 preview)')}
            >
              <Text style={styles.sendMessageText}>💬 Post a message or reply...</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ===================================================================== */}
        {/* TAB: ROSTER */}
        {/* ===================================================================== */}
        {activeNav === 'roster' && (
          <View style={{ gap: 10 }}>
            <View style={styles.tabHeaderBox}>
              <Text style={styles.sectionTitle}>Baltimore Tigers Roster</Text>
              <Text style={styles.sectionSub}>U12 Football • 14 Active Players</Text>
            </View>

            {rosterPlayers.map((player) => (
              <View key={player.num} style={styles.rosterCard}>
                <View style={styles.rosterJerseyBox}>
                  <Text style={styles.rosterJerseyNumber}>#{player.num}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rosterPlayerName}>{player.name}</Text>
                  <Text style={styles.rosterPlayerRole}>
                    {player.pos} • Parent: {player.parent}
                  </Text>
                </View>
                <View style={styles.rosterStatusBadge}>
                  <Text style={styles.rosterStatusText}>Active</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ===================================================================== */}
        {/* TAB: PROFILE / SETTINGS */}
        {/* ===================================================================== */}
        {activeNav === 'profile' && (
          <View style={{ gap: 16 }}>
            <View style={styles.tabHeaderBox}>
              <Text style={styles.sectionTitle}>My Junzle Profile</Text>
              <Text style={styles.sectionSub}>Manage account and preferences</Text>
            </View>

            <View style={styles.profileCard}>
              <View style={styles.profileAvatarLarge}>
                <Text style={styles.profileAvatarInitial}>
                  {isCoach ? 'M' : 'S'}
                </Text>
              </View>
              <Text style={styles.profileName}>
                {isCoach ? 'Coach Marcus Vance' : 'Sarah Johnson'}
              </Text>
              <Text style={styles.profileRoleTitle}>
                {isCoach ? 'Head Coach • Baltimore Tigers' : 'Parent of Alex Turner (#10)'}
              </Text>
              <Text style={styles.profileEmail}>
                {isCoach ? 'marcus.vance@baltimore.org' : 'sarah.j@example.com'}
              </Text>
            </View>

            <View style={styles.settingsSection}>
              <Text style={styles.settingsSectionTitle}>Linked Teams</Text>
              <View style={styles.settingsItem}>
                <Text style={{ fontSize: 20 }}>🐅</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingsItemTitle}>{teamName}</Text>
                  <Text style={styles.settingsItemSub}>{division}</Text>
                </View>
                <Text style={styles.activeCheck}>✓ Active</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.switchFlowButton}
              onPress={() => onNavigate('Entry')}
              activeOpacity={0.8}
            >
              <Text style={styles.switchFlowButtonText}>
                ← Switch User Role / Test Another Flow
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* ========================================================================= */}
      {/* BOTTOM TAB NAVIGATION (Figma 5-Tab Bar) */}
      {/* ========================================================================= */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveNav('home')}
          activeOpacity={0.7}
        >
          <Text style={[styles.navIcon, activeNav === 'home' && styles.navIconActive]}>
            🏠
          </Text>
          <Text style={[styles.navLabel, activeNav === 'home' && styles.navLabelActive]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveNav('schedule')}
          activeOpacity={0.7}
        >
          <Text style={[styles.navIcon, activeNav === 'schedule' && styles.navIconActive]}>
            📅
          </Text>
          <Text style={[styles.navLabel, activeNav === 'schedule' && styles.navLabelActive]}>
            Schedule
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveNav('messages')}
          activeOpacity={0.7}
        >
          <Text style={[styles.navIcon, activeNav === 'messages' && styles.navIconActive]}>
            💬
          </Text>
          <Text style={[styles.navLabel, activeNav === 'messages' && styles.navLabelActive]}>
            Messages
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveNav('roster')}
          activeOpacity={0.7}
        >
          <Text style={[styles.navIcon, activeNav === 'roster' && styles.navIconActive]}>
            👥
          </Text>
          <Text style={[styles.navLabel, activeNav === 'roster' && styles.navLabelActive]}>
            Roster
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveNav('profile')}
          activeOpacity={0.7}
        >
          <Text style={[styles.navIcon, activeNav === 'profile' && styles.navIconActive]}>
            👤
          </Text>
          <Text style={[styles.navLabel, activeNav === 'profile' && styles.navLabelActive]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  /* App Header */
  appHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'web' ? 14 : 10,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  backChevron: {
    fontSize: 28,
    color: '#0D1B3E',
    fontWeight: '300',
    marginTop: -4,
  },
  welcomeGreeting: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  userNameHeading: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0D1B3E',
  },
  appHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  variantToggleBtn: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  variantToggleText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1A56DB',
  },
  avatarBtn: {
    position: 'relative',
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1A56DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: '#FFEF00',
    fontWeight: '900',
    fontSize: 16,
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  /* Scroll Content */
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 90, // Leave room for bottom tab bar
  },

  /* Team Pill Card */
  teamPillCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  teamBadgeCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#0D1B3E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamPillTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0D1B3E',
  },
  teamPillSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  roleChip: {
    backgroundColor: '#FEF9C3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FDE047',
  },
  roleChipText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#854D0E',
  },

  /* Progress Bar */
  progressContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  progressValue: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1A56DB',
  },
  progressBarTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1A56DB',
    borderRadius: 4,
  },

  /* Hero Match Banner */
  heroMatchBanner: {
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#0D1B3E',
  },
  heroBannerBackground: {
    padding: 18,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nextGameBadge: {
    backgroundColor: '#FFEF00',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  nextGameBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#0D1B3E',
    letterSpacing: 0.5,
  },
  heroDateText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  heroMatchupText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  heroLocationText: {
    fontSize: 13,
    color: '#CBD5E1',
    marginBottom: 14,
  },
  attendeesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  avatarStack: {
    flexDirection: 'row',
    width: 90,
    height: 28,
    position: 'relative',
  },
  stackAvatar: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#0D1B3E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stackInitial: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  attendeesCountText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },

  /* RSVP Toggle inside Hero */
  rsvpActionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rsvpCardQuestion: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  rsvpPillGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  rsvpBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  rsvpBtnActiveGreen: {
    backgroundColor: '#10B981',
  },
  rsvpBtnActiveRed: {
    backgroundColor: '#EF4444',
  },
  rsvpBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#CBD5E1',
  },
  rsvpBtnTextActiveGreen: {
    color: '#FFFFFF',
  },
  rsvpBtnTextActiveRed: {
    color: '#FFFFFF',
  },

  /* Section Header */
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0D1B3E',
  },
  seeAllLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A56DB',
  },

  /* Calendar Week Strip */
  calendarStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 6,
  },
  dayBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  dayBoxSelected: {
    backgroundColor: '#1A56DB',
    borderColor: '#1A56DB',
  },
  dayBoxGameDay: {
    borderColor: '#93C5FD',
    backgroundColor: '#EFF6FF',
  },
  dayBoxWeekday: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 4,
  },
  dayBoxWeekdaySelected: {
    color: '#DBEAFE',
  },
  dayBoxDate: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0D1B3E',
  },
  dayBoxDateSelected: {
    color: '#FFFFFF',
  },
  dayEventDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 4,
  },

  /* Team Updates Card */
  updateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 18,
  },
  updateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  coachAvatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateAuthor: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0D1B3E',
  },
  updateRole: {
    fontSize: 11,
    color: '#64748B',
  },
  pinnedPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  pinnedText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
  },
  updateBody: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 19,
    marginBottom: 10,
  },
  updateFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  updateKitsTag: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1A56DB',
  },
  replyBtn: {
    paddingVertical: 2,
  },
  replyBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1A56DB',
  },

  /* Merchandise Banner */
  merchBanner: {
    backgroundColor: '#1A56DB',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  merchTag: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFEF00',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  merchTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  merchSub: {
    fontSize: 12,
    color: '#DBEAFE',
    lineHeight: 16,
    marginBottom: 12,
  },
  merchBtn: {
    backgroundColor: '#FFEF00',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  merchBtnText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0D1B3E',
  },
  merchGraphicBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Variant 1: Look Around Styles */
  lookAroundCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  lookAroundLogoBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#0D1B3E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lookAroundTeamName: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0D1B3E',
  },
  lookAroundSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  lookAroundChevron: {
    fontSize: 22,
    color: '#94A3B8',
    fontWeight: '400',
  },
  lookAroundTabsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  segmentBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  segmentBtnActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#1A56DB',
  },
  segmentBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  segmentBtnTextActive: {
    color: '#1A56DB',
    fontWeight: '800',
  },
  horizontalDatePills: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    paddingBottom: 4,
  },
  dateEventPill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    minWidth: 120,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  datePillHeader: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0D1B3E',
  },
  datePillTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginTop: 4,
  },
  datePillType: {
    fontSize: 11,
    fontWeight: '800',
    marginTop: 4,
  },
  lookAroundRsvpBtn: {
    backgroundColor: '#1A56DB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  lookAroundRsvpText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* TAB: Schedule Styles */
  tabHeaderBox: {
    marginBottom: 8,
  },
  sectionSub: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  fullScheduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  scheduleBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  gameBadgePill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  gameBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#1A56DB',
  },
  practiceBadgePill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  practiceBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#059669',
  },
  scheduleDateText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  scheduleMatchTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0D1B3E',
    marginBottom: 4,
  },
  scheduleVenue: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 4,
  },
  scheduleKit: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A56DB',
  },
  scheduleRsvpBox: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scheduleRsvpLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },

  /* TAB: Messages Styles */
  chatMessageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chatHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  chatAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatSender: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0D1B3E',
  },
  chatMeta: {
    fontSize: 11,
    color: '#64748B',
  },
  chatTextContent: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 19,
  },
  sendMessageTrigger: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    marginTop: 8,
  },
  sendMessageText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },

  /* TAB: Roster Styles */
  rosterCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  rosterJerseyBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#1A56DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rosterJerseyNumber: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFEF00',
  },
  rosterPlayerName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0D1B3E',
  },
  rosterPlayerRole: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  rosterStatusBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  rosterStatusText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#059669',
  },

  /* TAB: Profile Styles */
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  profileAvatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1A56DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  profileAvatarInitial: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFEF00',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0D1B3E',
  },
  profileRoleTitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  profileEmail: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
  },
  settingsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  settingsSectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0D1B3E',
    marginBottom: 10,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
  },
  settingsItemTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0D1B3E',
  },
  settingsItemSub: {
    fontSize: 12,
    color: '#64748B',
  },
  activeCheck: {
    fontSize: 12,
    fontWeight: '800',
    color: '#059669',
  },
  switchFlowButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginTop: 8,
  },
  switchFlowButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1A56DB',
  },

  /* Bottom Tab Navigation Bar */
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingBottom: Platform.OS === 'web' ? 12 : 20,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 2,
    opacity: 0.6,
  },
  navIconActive: {
    opacity: 1,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  navLabelActive: {
    color: '#1A56DB',
    fontWeight: '900',
  },
});
