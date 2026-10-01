import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Platform,
  Image,
  Animated,
} from 'react-native';
import { COLORS } from '../../theme/theme';
import Header from '../../components/Header';
import RealQRCode from '../../components/RealQRCode';
import Svg, { Path } from 'react-native-svg';

const RECENT_TEAMS = [
  { id: '1', name: 'Baltimore Tigers', division: 'U12 Football', sport: 'Football', icon: '🐅', coach: 'Coach Marcus Vance' },
  { id: '2', name: 'Wildcats FC', division: 'U11 Soccer', sport: 'Soccer', icon: '🐱', coach: 'Coach Sarah Jenkins' },
  { id: '3', name: 'Eagles Basketball', division: 'Youth League', sport: 'Basketball', icon: '🦅', coach: 'Coach Darnell Washington' },
];

export default function ParentFlowScreens({ onNavigate, onBack }) {
  const [step, setStep] = useState(1); // 1: Profile, 2: Join Team, 3: Request to Join, 4: All Set

  // Step 1: Parent & Child Info
  const [parentFirstName, setParentFirstName] = useState('Sarah');
  const [parentLastName, setParentLastName] = useState('Johnson');
  const [parentEmail, setParentEmail] = useState('sarah.johnson@example.com');
  const [parentPhone, setParentPhone] = useState('(555) 432-1098');

  const [childFirstName, setChildFirstName] = useState('Alex');
  const [childLastName, setChildLastName] = useState('Turner');
  const [childDob, setChildDob] = useState('04 / 12 / 2014');
  const [childGender, setChildGender] = useState('U12 Boys');

  // Step 2: Join Method
  const [activeTab, setActiveTab] = useState('link'); // 'link' or 'search'
  const [inviteUrl, setInviteUrl] = useState('https://junzle.app/join/TB2023');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(RECENT_TEAMS[0]);
  const [showScannerModal, setShowScannerModal] = useState(false);
  const laserAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showScannerModal) {
      Animated.loop(
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
      ).start();
    }
  }, [showScannerModal]);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onBack={handlePrev}
        showBack={true}
        currentStep={step}
        totalSteps={4}
      />

      <View style={styles.flowWrapper}>
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          keyboardShouldPersistTaps="handled"
        >
          {/* ========================================================================= */}
          {/* SCREEN 1 (Figma iPhone 17 - 11): Let's Set Up Your Profile */}
          {/* ========================================================================= */}
          {step === 1 && (
            <View style={{ width: '100%', alignItems: 'center' }}>
              <View style={styles.headingWrapper}>
                <View style={styles.headingContainer}>
                  <Text style={styles.screenHeading}>
                    Let's Set Up{'\n'}Your Profile
                  </Text>
                  <Text style={styles.screenSub}>
                    This helps us personalize your experience as a parent.
                  </Text>
                </View>
              </View>

              {/* Container Card 1: Personal Information */}
              <View style={styles.personalInfoCard}>
                <View style={styles.personalInfoHeader}>
                  <Text style={styles.personalInfoTitle}>Personal Information</Text>
                </View>

                {/* First Name & Last Name */}
                <View style={styles.fieldSection}>
                  <View style={styles.nameLabelsRow}>
                    <Text style={styles.nameLabel}>First Name</Text>
                    <Text style={styles.nameLabel}>Last Name</Text>
                  </View>
                  <View style={styles.nameInputsRow}>
                    <View style={styles.leadingIconBox}>
                      <Image
                        source={require('../../../assets/person.png')}
                        style={styles.fieldIconImg}
                        resizeMode="contain"
                      />
                    </View>
                    <TextInput
                      style={styles.nameTextInput}
                      placeholder="First Name"
                      placeholderTextColor="#94A3B8"
                      value={parentFirstName}
                      onChangeText={setParentFirstName}
                    />
                    <TextInput
                      style={styles.nameTextInput}
                      placeholder="Last Name"
                      placeholderTextColor="#94A3B8"
                      value={parentLastName}
                      onChangeText={setParentLastName}
                    />
                  </View>
                </View>

                {/* Email Address */}
                <View style={styles.fieldSection}>
                  <View style={styles.singleLabelRow}>
                    <Text style={styles.fieldLabel}>Email Address</Text>
                  </View>
                  <View style={styles.singleInputRow}>
                    <View style={styles.leadingIconBox}>
                      <Image
                        source={require('../../../assets/email.png')}
                        style={styles.fieldIconImg}
                        resizeMode="contain"
                      />
                    </View>
                    <TextInput
                      style={styles.fullTextInput}
                      placeholder="Enter Email Address"
                      placeholderTextColor="#94A3B8"
                      value={parentEmail}
                      onChangeText={setParentEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                {/* Phone Number */}
                <View style={styles.fieldSection}>
                  <View style={styles.singleLabelRow}>
                    <Text style={styles.fieldLabel}>Phone Number</Text>
                  </View>
                  <View style={styles.singleInputRow}>
                    <View style={styles.leadingIconBox}>
                      <Image
                        source={require('../../../assets/phone.png')}
                        style={styles.fieldIconImg}
                        resizeMode="contain"
                      />
                    </View>
                    <TextInput
                      style={styles.fullTextInput}
                      placeholder="Enter Phone Number"
                      placeholderTextColor="#94A3B8"
                      value={parentPhone}
                      onChangeText={setParentPhone}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>
              </View>

              {/* Container Card 2: Child Information */}
              <View style={styles.personalInfoCard}>
                <View style={styles.personalInfoHeader}>
                  <Text style={styles.personalInfoTitle}>Child Information</Text>
                </View>

                {/* Child First Name & Last Name */}
                <View style={styles.fieldSection}>
                  <View style={styles.nameLabelsRow}>
                    <Text style={styles.nameLabel}>First Name</Text>
                    <Text style={styles.nameLabel}>Last Name</Text>
                  </View>
                  <View style={styles.nameInputsRow}>
                    <View style={styles.leadingIconBox}>
                      <Image
                        source={require('../../../assets/person.png')}
                        style={styles.fieldIconImg}
                        resizeMode="contain"
                      />
                    </View>
                    <TextInput
                      style={styles.nameTextInput}
                      placeholder="First Name"
                      placeholderTextColor="#94A3B8"
                      value={childFirstName}
                      onChangeText={setChildFirstName}
                    />
                    <TextInput
                      style={styles.nameTextInput}
                      placeholder="Last Name"
                      placeholderTextColor="#94A3B8"
                      value={childLastName}
                      onChangeText={setChildLastName}
                    />
                  </View>
                </View>

                {/* Date of Birth */}
                <View style={styles.fieldSection}>
                  <View style={styles.singleLabelRow}>
                    <Text style={styles.fieldLabel}>Date of Birth</Text>
                  </View>
                  <View style={styles.singleInputRow}>
                    <View style={styles.leadingIconBox}>
                      <Image
                        source={require('../../../assets/email.png')}
                        style={styles.fieldIconImg}
                        resizeMode="contain"
                      />
                    </View>
                    <TextInput
                      style={styles.fullTextInput}
                      placeholder="04 / 12 / 2014"
                      placeholderTextColor="#94A3B8"
                      value={childDob}
                      onChangeText={setChildDob}
                    />
                  </View>
                </View>

                {/* Gender */}
                <View style={styles.fieldSection}>
                  <View style={styles.singleLabelRow}>
                    <Text style={styles.fieldLabel}>Gender</Text>
                  </View>
                  <View style={styles.singleInputRow}>
                    <View style={styles.leadingIconBox}>
                      <Image
                        source={require('../../../assets/person.png')}
                        style={styles.fieldIconImg}
                        resizeMode="contain"
                      />
                    </View>
                    <TextInput
                      style={styles.fullTextInput}
                      placeholder="U12 Boys"
                      placeholderTextColor="#94A3B8"
                      value={childGender}
                      onChangeText={setChildGender}
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.primaryBtn} onPress={handleNext} activeOpacity={0.85}>
                <Text style={styles.primaryBtnText}>Continue</Text>
                <View style={styles.primaryBtnArrowContainer}>
                  <Image
                    source={require('../../../assets/forwardarrow.png')}
                    style={styles.forwardArrowImg}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* ========================================================================= */}
          {/* SCREEN 2 (Figma iPhone 17 - 15 & 17 - 16): Join your team */}
          {/* ========================================================================= */}
          {step === 2 && (
            <View style={styles.step2Container}>
              <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={styles.headingWrapperStep2}>
                  <Text style={styles.screenHeading}>Join your team</Text>
                  <Text style={styles.screenSub}>
                    Enter the team invite link or search for your team to get started.
                  </Text>
                </View>

                {/* Container Card with Tabs */}
                <View style={[styles.teamTabCard, activeTab === 'link' ? styles.teamTabCardLink : styles.teamTabCardSearch]}>
                  {/* Segmented Tabs */}
                  <View style={styles.tabHeaderRow}>
                    <TouchableOpacity
                      style={[styles.tabHeaderBtn, activeTab === 'link' && styles.tabHeaderBtnActive]}
                      onPress={() => setActiveTab('link')}
                      activeOpacity={0.8}
                    >
                      <Image
                        source={require('../../../assets/link.png')}
                        style={[styles.tabHeaderIcon, { tintColor: activeTab === 'link' ? '#015CFE' : '#0D1B3E' }]}
                        resizeMode="contain"
                      />
                      <Text style={[styles.tabHeaderText, activeTab === 'link' && styles.tabHeaderTextActive]}>
                        Use Invite Link
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.tabHeaderBtn, activeTab === 'search' && styles.tabHeaderBtnActive]}
                      onPress={() => setActiveTab('search')}
                      activeOpacity={0.8}
                    >
                      <Image
                        source={require('../../../assets/search.png')}
                        style={[styles.tabHeaderIcon, { tintColor: activeTab === 'search' ? '#015CFE' : '#0D1B3E' }]}
                        resizeMode="contain"
                      />
                      <Text style={[styles.tabHeaderText, activeTab === 'search' && styles.tabHeaderTextActive]}>
                        Search for Team
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Tab 1: Use Invite Link */}
                  {activeTab === 'link' && (
                    <View style={styles.tabContentLink}>
                      <View style={styles.tabLinkTopSection}>
                        <Text style={styles.fieldLabelStep2}>Paste invite link</Text>
                        <View style={styles.inviteInputRow}>
                          <Image
                            source={require('../../../assets/link.png')}
                            style={styles.inviteInputIcon}
                            resizeMode="contain"
                          />
                          <TextInput
                            style={styles.inviteTextInput}
                            placeholder="https://junzle.app/join/..."
                            placeholderTextColor="#94A3B8"
                            value={inviteUrl}
                            onChangeText={setInviteUrl}
                            autoCapitalize="none"
                          />
                        </View>

                        <TouchableOpacity
                          style={styles.sendJoinReqBtn}
                          onPress={() => {
                            setSelectedTeam(RECENT_TEAMS[0]);
                            setStep(3); // Go to Request to Join
                          }}
                          activeOpacity={0.85}
                        >
                          <Text style={styles.sendJoinReqBtnText}>Send Join Request</Text>
                          <View style={styles.primaryBtnArrowContainer}>
                            <Image
                              source={require('../../../assets/forwardarrow.png')}
                              style={styles.forwardArrowImg}
                              resizeMode="contain"
                            />
                          </View>
                        </TouchableOpacity>
                      </View>

                      {/* OR Divider */}
                      <View style={styles.orDividerRowStep2}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.orText}>OR</Text>
                        <View style={styles.dividerLine} />
                      </View>

                      {/* Scan QR Code Card */}
                      <TouchableOpacity
                        style={styles.scanQrCard}
                        onPress={() => setShowScannerModal(true)}
                        activeOpacity={0.7}
                      >
                        <View style={styles.qrIconSquare}>
                          <Image
                            source={require('../../../assets/qr.png')}
                            style={styles.qrIconImg}
                            resizeMode="contain"
                          />
                        </View>
                        <View style={styles.qrTextContainer}>
                          <Text style={styles.scanQrTitle}>Scan QR Code</Text>
                          <Text style={styles.scanQrSub}>Scan the team QR Code to join</Text>
                        </View>
                        <Svg width={8} height={14} viewBox="0 0 8 14" fill="none">
                          <Path d="M1 1L7 7L1 13" stroke="#0D1B3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </Svg>
                      </TouchableOpacity>
                    </View>
                  )}

                  {/* Tab 2: Search for Team (Exact UI from media_1790763913817.png) */}
                  {activeTab === 'search' && (
                    <View style={styles.tabContentSearch}>
                      {/* Search Input Box */}
                      <TextInput
                        style={styles.searchInputField}
                        placeholder="Search Team"
                        placeholderTextColor="#94A3B8"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                      />

                      <Text style={styles.recentSearchesTitle}>Recent Searches</Text>

                      {/* 3 Recent Search Cards */}
                      <View style={styles.recentSearchesList}>
                        {RECENT_TEAMS.map((team) => {
                          const isSelected = selectedTeam?.id === team.id;
                          return (
                            <TouchableOpacity
                              key={team.id}
                              style={[
                                styles.recentSearchCard,
                                isSelected && styles.recentSearchCardSelected,
                              ]}
                              onPress={() => setSelectedTeam(team)}
                              activeOpacity={0.8}
                            >
                              <View style={styles.teamSearchIconBox}>
                                {team.name === 'Baltimore Tigers' ? (
                                  <Image
                                    source={require('../../../assets/tiger-logo.png')}
                                    style={styles.teamSearchLogoImg}
                                    resizeMode="contain"
                                  />
                                ) : team.name === 'Wildcats FC' ? (
                                  <Text style={styles.teamSearchEmoji}>🐱</Text>
                                ) : (
                                  <Text style={styles.teamSearchEmoji}>🦅</Text>
                                )}
                              </View>
                              <Text style={styles.teamSearchName}>{team.name}</Text>
                              <View
                                style={[
                                  styles.searchRadioCircle,
                                  isSelected && styles.searchRadioCircleActive,
                                ]}
                              >
                                {isSelected && <View style={styles.searchRadioDot} />}
                              </View>
                            </TouchableOpacity>
                          );
                        })}
                      </View>

                      {/* Send Join Request Button */}
                      <TouchableOpacity
                        style={[styles.sendJoinReqBtn, { marginTop: 14 }]}
                        onPress={() => {
                          if (!selectedTeam) {
                            setSelectedTeam(RECENT_TEAMS[0]);
                          }
                          setStep(3);
                        }}
                        activeOpacity={0.85}
                      >
                        <Text style={styles.sendJoinReqBtnText}>Send Join Request</Text>
                        <View style={styles.primaryBtnArrowContainer}>
                          <Image
                            source={require('../../../assets/forwardarrow.png')}
                            style={styles.forwardArrowImg}
                            resizeMode="contain"
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>

              <Text style={styles.footerHelpNote}>
                Contact your coach or team admin to get an invite link, QR Code, or team code.
              </Text>
            </View>
          )}

          {/* ========================================================================= */}
          {/* SCREEN 3 (Figma iPhone 17 - 2): Request to Join */}
          {/* ========================================================================= */}
          {step === 3 && (
            <View style={{ width: '100%', alignItems: 'center' }}>
              <View style={styles.headingWrapperStep2}>
                <Text style={styles.screenHeading}>Request to Join</Text>
                <Text style={styles.screenSub}>
                  You're requesting to join this team for your child
                </Text>
              </View>

              {/* Container Card: Team Details */}
              <View style={styles.formCard}>
                <View style={styles.teamVerifiedCardInner}>
                  <View style={styles.tigersEmblemBox}>
                    {selectedTeam?.name === 'Baltimore Tigers' || !selectedTeam ? (
                      <Image
                        source={require('../../../assets/tiger-logo.png')}
                        style={styles.tigerLogoImg}
                        resizeMode="cover"
                      />
                    ) : (
                      <Text style={{ fontSize: 26 }}>{selectedTeam?.icon || '🐅'}</Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.verifiedTeamName}>{selectedTeam?.name || 'Baltimore Tigers'}</Text>
                    <Text style={styles.verifiedTeamSub}>{selectedTeam?.division || 'U12 Football'}</Text>
                  </View>
                  <View style={styles.coachBadge}>
                    <Image
                      source={require('../../../assets/coach.png')}
                      style={styles.coachBadgeIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.coachBadgeText}>Coach</Text>
                  </View>
                </View>

                <View style={[styles.itemSeparator, { marginVertical: 14 }]} />

                {/* Coach Row */}
                <View style={styles.coachContactRow}>
                  <View style={styles.coachAvatarBox}>
                    <Image
                      source={require('../../../assets/coach.png')}
                      style={styles.coachAvatarImg}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.coachNameText}>{selectedTeam?.coach || 'Coach Marcus Vance'}</Text>
                    <Text style={styles.coachRoleText}>Head Coach • {selectedTeam?.name || 'Baltimore Tigers'}</Text>
                  </View>
                  <View style={styles.coachActionGroup}>
                    <TouchableOpacity
                      style={styles.coachActionBtn}
                      onPress={() => alert('Emailing ' + (selectedTeam?.coach || 'Coach Marcus Vance'))}
                      activeOpacity={0.7}
                    >
                      <Image
                        source={require('../../../assets/email.png')}
                        style={styles.coachActionImg}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.coachActionBtn}
                      onPress={() => alert('Calling ' + (selectedTeam?.coach || 'Coach Marcus Vance'))}
                      activeOpacity={0.7}
                    >
                      <Image
                        source={require('../../../assets/phone.png')}
                        style={styles.coachActionImg}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={[styles.itemSeparator, { marginVertical: 14 }]} />

                <Text style={styles.cardHeaderTitle}>About Team</Text>
                <Text style={styles.aboutTeamText}>
                  Competitive youth football team focused on development, teamwork and sportsmanship.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={handleNext}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryBtnText}>Send Request</Text>
                <View style={styles.primaryBtnArrowContainer}>
                  <Image
                    source={require('../../../assets/forwardarrow.png')}
                    style={styles.forwardArrowImg}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* ========================================================================= */}
          {/* SCREEN 4 (Figma iPhone 17 - 12): You're all set! */}
          {/* ========================================================================= */}
          {step === 4 && (
            <View style={{ width: '100%', alignItems: 'center' }}>
              <View style={styles.headingWrapperStep2}>
                <Text style={styles.screenHeading}>You're all set!</Text>
                <Text style={styles.screenSub}>
                  Your request has been sent to the team administrator. You'll get a notification once you're approved.
                </Text>
              </View>

              {/* Team Card */}
              <View style={styles.formCard}>
                <View style={styles.teamVerifiedCardInner}>
                  <View style={styles.tigersEmblemBox}>
                    {selectedTeam?.name === 'Baltimore Tigers' || !selectedTeam ? (
                      <Image
                        source={require('../../../assets/tiger-logo.png')}
                        style={styles.tigerLogoImg}
                        resizeMode="cover"
                      />
                    ) : (
                      <Text style={{ fontSize: 26 }}>{selectedTeam?.icon || '🐅'}</Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.verifiedTeamName}>{selectedTeam?.name || 'Baltimore Tigers'}</Text>
                    <Text style={styles.verifiedTeamSub}>{selectedTeam?.division || 'U12 Football'}</Text>
                  </View>
                  <View style={styles.coachBadge}>
                    <Image
                      source={require('../../../assets/coach.png')}
                      style={styles.coachBadgeIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.coachBadgeText}>Coach</Text>
                  </View>
                </View>
              </View>

              {/* Child Information Card */}
              <View style={styles.formCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <View style={styles.miniIconBox}>
                    <Image
                      source={require('../../../assets/person.png')}
                      style={{ width: 16, height: 16 }}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.cardHeaderTitle}>Child Information</Text>
                </View>
                <Text style={styles.childNameText}>{childFirstName} {childLastName}</Text>
                <Text style={styles.childDivisionText}>{childGender}</Text>
              </View>

              <TouchableOpacity
                style={[styles.primaryBtn, { marginTop: 24 }]}
                onPress={() => onNavigate('MobileHub', { role: 'parent', teamName: selectedTeam?.name })}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryBtnText}>Continue to Team Dashboard</Text>
                <View style={styles.primaryBtnArrowContainer}>
                  <Image
                    source={require('../../../assets/forwardarrow.png')}
                    style={styles.forwardArrowImg}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>

      {/* ========================================================================= */}
      {/* MODAL: Scan QR Code Viewfinder (Exact UI from Figma iPhone 17 - 17) */}
      {/* ========================================================================= */}
      <Modal
        visible={showScannerModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowScannerModal(false)}
      >
        <SafeAreaView style={styles.scannerModalSafeArea}>
          <Header
            onBack={() => setShowScannerModal(false)}
            showBack={true}
            currentStep={2}
            totalSteps={4}
          />

          <ScrollView
            style={styles.scannerScrollArea}
            contentContainerStyle={styles.scannerScrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* Heading Container: width: 370; height: 76; top: 135px; left: 16px; gap: 32px */}
            <View style={styles.scannerHeadingWrapper}>
              <Text style={styles.scannerScreenHeading}>Scan QR Code</Text>
              <Text style={styles.scannerScreenSub}>
                Scan the team QR code provided by{'\n'}your coach or team administrator.
              </Text>
            </View>

            {/* QR Viewfinder Card: width: 370; height: 556; border-radius: 16px; top: 235px; left: 16px */}
            <TouchableOpacity
              style={styles.qrCardContainer}
              activeOpacity={0.95}
              onPress={() => {
                setShowScannerModal(false);
                setSelectedTeam(RECENT_TEAMS[0]);
                setStep(3);
              }}
            >
              {/* Top: Flashlight icon button */}
              <TouchableOpacity
                style={styles.flashlightBtnCircle}
                onPress={() => alert('Flashlight toggled')}
                activeOpacity={0.7}
              >
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M18 10h-2V3a1 1 0 00-1-1H9a1 1 0 00-1 1v7H6a1 1 0 00-.78 1.63l6 8A1 1 0 0012 19v3h2v-3a1 1 0 00.78-.37l6-8A1 1 0 0018 10z"
                    fill="#FFFFFF"
                  />
                </Svg>
              </TouchableOpacity>

              {/* Center: Camera Viewfinder with 4 corner brackets + Real QR Code + Laser */}
              <View style={styles.viewfinderFrame}>
                {/* 4 White Corner Brackets */}
                <View style={[styles.targetCorner, styles.cornerTL]} />
                <View style={[styles.targetCorner, styles.cornerTR]} />
                <View style={[styles.targetCorner, styles.cornerBL]} />
                <View style={[styles.targetCorner, styles.cornerBR]} />

                {/* The ACTUAL Real Scannable QR Code */}
                <RealQRCode
                  value={inviteUrl || 'https://junzle.app/join/TB2023'}
                  size={214}
                  showLogo={true}
                  logoSize={44}
                />

                {/* Animated Laser Scanning Line */}
                <Animated.View
                  style={[
                    styles.laserScanLine,
                    {
                      transform: [
                        {
                          translateY: laserAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-92, 92],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              </View>

              <Text style={styles.alignQrPromptText}>Align QR code within frame to scan</Text>

              {/* Upload from Gallery touch area at bottom */}
              <TouchableOpacity
                style={styles.uploadGalleryBtnBottom}
                onPress={() => {
                  setShowScannerModal(false);
                  setSelectedTeam(RECENT_TEAMS[0]);
                  setStep(3);
                }}
                activeOpacity={0.7}
              >
                <View style={styles.galleryIconCircle}>
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <Text style={styles.uploadGalleryText}>Upload from Gallery</Text>
              </TouchableOpacity>
            </TouchableOpacity>

            {/* Bottom text:
                Contact your coach or team admin to get an in one row 
                invite link, QR Code, or team code.  in other row 
                center aligned 
                at bottom
            */}
            <View style={styles.scannerFooterWrap}>
              <Text style={styles.scannerFooterText}>
                Contact your coach or team admin to get an{'\n'}invite link, QR Code, or team code.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flowWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  scrollArea: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 24,
    alignItems: 'center',
    flexGrow: 1,
  },
  headingWrapper: {
    width: 370,
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  headingContainer: {
    width: 260,
    gap: 8,
  },
  headingWrapperStep2: {
    width: 370,
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 2,
  },
  screenHeading: {
    fontFamily: 'Satoshi',
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: -0.28,
    color: '#0D1B3E',
  },
  screenSub: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
    color: '#64748B',
  },

  /* Figma Form Container Cards */
  personalInfoCard: {
    width: 370,
    gap: 16,
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignSelf: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  personalInfoHeader: {
    justifyContent: 'center',
  },
  personalInfoTitle: {
    fontFamily: 'Satoshi',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.16,
    color: '#0D1B3E',
  },
  fieldSection: {
    gap: 4,
  },
  nameLabelsRow: {
    flexDirection: 'row',
    paddingLeft: 48,
    gap: 8,
  },
  nameLabel: {
    flex: 1,
    fontFamily: 'Satoshi',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.12,
    color: '#475569',
  },
  nameInputsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  leadingIconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldIconImg: {
    width: 20,
    height: 20,
  },
  nameTextInput: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Inter',
    fontSize: 13,
    color: '#0D1B3E',
  },
  singleLabelRow: {
    paddingLeft: 48,
  },
  fieldLabel: {
    fontFamily: 'Satoshi',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.12,
    color: '#0D1B3E',
  },
  singleInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fullTextInput: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Inter',
    fontSize: 13,
    color: '#0D1B3E',
  },
  leadingIconEmoji: {
    fontSize: 18,
  },

  /* Role Card */
  roleCardContainer: {
    width: 370,
    gap: 16,
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignSelf: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  roleHeaderCombined: {
    gap: 4,
  },
  roleHeaderTitle: {
    fontFamily: 'Satoshi',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.16,
    color: '#0D1B3E',
  },
  roleHeaderSub: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
    color: '#64748B',
  },
  roleCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  roleCardIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  roleCardIconImg: {
    width: 20,
    height: 20,
  },
  roleTextContainer: {
    flex: 1,
    paddingRight: 8,
    justifyContent: 'center',
  },
  roleName: {
    fontFamily: 'Satoshi',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.10,
    color: '#0D1B3E',
  },
  roleDesc: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 13,
    color: '#64748B',
  },
  changeRoleBtn: {
    backgroundColor: '#EAF2FF',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeLink: {
    fontFamily: 'Satoshi',
    fontWeight: '700',
    fontSize: 12,
    color: '#015CFE',
  },

  /* Step 2: Join Your Team (Exact Figma specs from media_1790763020976.png) */
  step2Container: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    minHeight: 560,
  },
  headingWrapperStep2: {
    width: 370,
    maxWidth: '100%',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 4,
  },
  teamTabCard: {
    width: 370,
    maxWidth: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
    overflow: 'hidden',
    opacity: 1,
  },
  teamTabCardLink: {
    height: 372,
    justifyContent: 'space-between',
  },
  teamTabCardSearch: {
    minHeight: 372,
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
    fontFamily: 'Satoshi',
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
    width: 338,
    maxWidth: '100%',
  },
  fieldLabelStep2: {
    fontFamily: 'Satoshi',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    color: '#0D1B3E',
    marginBottom: 8,
  },
  inviteInputRow: {
    width: 338,
    maxWidth: '100%',
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inviteInputIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
    tintColor: '#475569',
  },
  inviteTextInput: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 13,
    color: '#0D1B3E',
    paddingVertical: 0,
  },
  sendJoinReqBtn: {
    width: 338,
    maxWidth: '100%',
    height: 48,
    backgroundColor: '#2B7FFF',
    borderRadius: 6,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    opacity: 1,
    marginTop: 12,
  },
  sendJoinReqBtnText: {
    fontFamily: 'Satoshi',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 19.6,
    letterSpacing: -0.14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  orDividerRowStep2: {
    width: 338,
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  scanQrCard: {
    width: 338,
    maxWidth: '100%',
    height: 64,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    opacity: 1,
  },
  qrIconSquare: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EDF2F7',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrIconImg: {
    width: 22,
    height: 22,
  },
  qrTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  scanQrTitle: {
    fontFamily: 'Satoshi',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#0D1B3E',
  },
  scanQrSub: {
    fontFamily: 'Satoshi',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: '#64748B',
    marginTop: 2,
  },
  tabContentSearch: {
    paddingHorizontal: 16,
    paddingTop: 16,
    width: '100%',
  },
  searchInputField: {
    width: 338,
    maxWidth: '100%',
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    fontFamily: 'Inter',
    fontSize: 13,
    color: '#0D1B3E',
    marginBottom: 14,
  },
  recentSearchesTitle: {
    fontFamily: 'Satoshi',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    color: '#0D1B3E',
    marginBottom: 10,
  },
  recentSearchesList: {
    width: 338,
    maxWidth: '100%',
    gap: 10,
  },

  /* Step 3 & 4 General Form Card */
  formCard: {
    width: 370,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeaderTitle: {
    fontFamily: 'Satoshi',
    fontSize: 15,
    fontWeight: '800',
    color: '#0D1B3E',
  },
  miniIconBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 14,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  orText: {
    fontFamily: 'Satoshi',
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
  },
  chevronArrow: {
    fontSize: 20,
    color: '#CBD5E1',
    fontWeight: '300',
  },

  teamTabCardLink: {
    minHeight: 280,
  },
  teamTabCardSearch: {
    minHeight: 340,
  },
  searchInputField: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#0D1B3E',
    marginBottom: 16,
  },
  recentSearchesTitle: {
    fontFamily: 'Satoshi',
    fontWeight: '700',
    fontSize: 14,
    color: '#0D1B3E',
    marginBottom: 10,
  },
  recentSearchesList: {
    gap: 10,
    marginBottom: 12,
  },
  teamSearchLogoImg: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  teamSearchEmoji: {
    fontSize: 20,
  },
  searchRadioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchRadioCircleActive: {
    borderColor: '#2B7FFF',
  },
  searchRadioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2B7FFF',
  },

  /* Team Search Cards (Exact UI from media_1790763913817.png) */
  recentSearchCard: {
    width: 338,
    maxWidth: '100%',
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    opacity: 1,
  },
  recentSearchCardSelected: {
    borderColor: '#2B7FFF',
    backgroundColor: '#F8FAFC',
  },
  teamSearchIconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#EDF4FC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  teamSearchLogoImg: {
    width: 26,
    height: 26,
    borderRadius: 4,
  },
  teamSearchEmoji: {
    fontSize: 22,
  },
  teamSearchName: {
    flex: 1,
    fontFamily: 'Satoshi',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    color: '#0D1B3E',
  },
  searchRadioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#2B7FFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  searchRadioCircleActive: {
    borderColor: '#015CFE',
    backgroundColor: '#015CFE',
  },
  searchRadioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  teamSearchSub: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: '#64748B',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: '#015CFE',
    backgroundColor: '#015CFE',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },

  /* Team Details Card */
  teamVerifiedCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tigersEmblemBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0D1B3E',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  tigerLogoImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  verifiedTeamName: {
    fontFamily: 'Satoshi',
    fontSize: 16,
    fontWeight: '800',
    color: '#0D1B3E',
  },
  verifiedTeamSub: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#64748B',
  },
  coachBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  coachBadgeIcon: {
    width: 14,
    height: 14,
  },
  coachBadgeText: {
    fontFamily: 'Satoshi',
    fontSize: 11,
    fontWeight: '800',
    color: '#015CFE',
  },

  /* Coach Row Details */
  coachContactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 4,
  },
  coachAvatarBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coachAvatarImg: {
    width: 20,
    height: 20,
  },
  coachNameText: {
    fontFamily: 'Satoshi',
    fontSize: 14,
    fontWeight: '700',
    color: '#0D1B3E',
  },
  coachRoleText: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: '#64748B',
  },
  coachActionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  coachActionBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coachActionImg: {
    width: 16,
    height: 16,
  },

  itemSeparator: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  aboutTeamText: {
    fontFamily: 'Inter',
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
    marginTop: 6,
  },
  childNameText: {
    fontFamily: 'Satoshi',
    fontSize: 15,
    fontWeight: '800',
    color: '#0D1B3E',
    marginBottom: 2,
  },
  childDivisionText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#64748B',
  },

  /* Primary Button */
  primaryBtn: {
    width: 370,
    backgroundColor: '#015CFE',
    borderRadius: 8,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#015CFE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 10,
    alignSelf: 'center',
  },
  primaryBtnText: {
    fontFamily: 'Satoshi',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: -0.16,
    color: '#FFFFFF',
  },
  primaryBtnArrowContainer: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  forwardArrowImg: {
    width: 16,
    height: 16,
  },
  footerHelpNote: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.12,
    textAlign: 'center',
    width: 268,
    maxWidth: '100%',
    height: 32,
    color: '#64748B',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 8,
    opacity: 1,
  },

  /* Scanner Modal (Figma iPhone 17 - 17: media_1790763269411.png) */
  scannerModalSafeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scannerScrollArea: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  scannerScrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
    alignItems: 'center',
  },
  scannerHeadingWrapper: {
    width: 370,
    maxWidth: '100%',
    height: 76,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 24,
  },
  scannerScreenHeading: {
    fontFamily: 'Satoshi',
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: -0.28,
    color: '#0D1B3E',
  },
  scannerScreenSub: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#64748B',
    marginTop: 8,
  },
  qrCardContainer: {
    width: 370,
    maxWidth: '100%',
    height: 556,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#071228',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  flashlightBtnCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewfinderFrame: {
    width: 254,
    height: 254,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  targetCorner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: '#FFFFFF',
  },
  cornerTL: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 16,
  },
  cornerTR: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 16,
  },
  cornerBL: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 16,
  },
  cornerBR: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 16,
  },
  laserScanLine: {
    position: 'absolute',
    left: 8,
    right: 8,
    height: 3,
    backgroundColor: '#2B7FFF',
    shadowColor: '#2B7FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 2,
    zIndex: 10,
  },
  alignQrPromptText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.65)',
    marginTop: -8,
  },
  uploadGalleryBtnBottom: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  galleryIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadGalleryText: {
    fontFamily: 'Satoshi',
    fontWeight: '700',
    fontSize: 13,
    color: '#FFFFFF',
  },
  scannerFooterWrap: {
    width: 370,
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  scannerFooterText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#64748B',
    textAlign: 'center',
  },
});
