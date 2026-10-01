import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useRef, useEffect, useMemo } from 'react';
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
  Modal,
  PanResponder,
  KeyboardAvoidingView,
} from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Rect, Line } from 'react-native-svg';
import { COLORS } from '../../theme/theme';
import Header from '../../components/Header';
import AuthHeader from '../../components/AuthHeader';
import ScreenHeading from '../../components/ScreenHeading';

// ── Figma Preset Swatches ──────────────────────────────────────────
const PRESET_COLORS = [
  '#0F1334', // Dark Navy
  '#015CFE', // Royal Blue
  '#DD1C35', // Red
  '#1DA35E', // Green
  '#A14EEB', // Purple
  '#F16410', // Orange
  '#FDBF13', // Golden Yellow
  '#2FB8C2', // Teal
  '#FF5EF2', // Pink
];

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

function normalizeHex(input) {
  return String(input || '')
    .replace('#', '')
    .trim()
    .toUpperCase();
}

function isValidHex(hex) {
  return /^[0-9A-F]{6}$/.test(normalizeHex(hex));
}

function hexToHsv(hex) {
  const clean = normalizeHex(hex);
  if (!isValidHex(clean)) return { h: 0, s: 0, v: 0 };
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: max === 0 ? 0 : d / max, v: max };
}

function hsvToHex(h, s, v) {
  const hue = ((h % 360) + 360) % 360;
  const sat = clamp(s, 0, 1);
  const val = clamp(v, 0, 1);
  const c = val * sat;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = val - c;
  let rp = 0;
  let gp = 0;
  let bp = 0;
  if (hue < 60) [rp, gp, bp] = [c, x, 0];
  else if (hue < 120) [rp, gp, bp] = [x, c, 0];
  else if (hue < 180) [rp, gp, bp] = [0, c, x];
  else if (hue < 240) [rp, gp, bp] = [0, x, c];
  else if (hue < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];
  const toHex = (n) =>
    Math.round((n + m) * 255)
      .toString(16)
      .padStart(2, '0')
      .toUpperCase();
  return `${toHex(rp)}${toHex(gp)}${toHex(bp)}`;
}

function readableTextOn(hex) {
  const clean = normalizeHex(hex);
  if (!isValidHex(clean)) return '#FFFFFF';
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 140 ? '#0D1B3E' : '#FFFFFF';
}

const SPORTS_LIST = [
  'Basketball',
  'Soccer',
  'Football',
  'Baseball',
  'Volleyball',
  'Lacrosse',
  'Hockey',
  'Track & Field',
];

// Exact Figma Chevron Down: width: 11.667, height: 5.833, borderWidth: 2px
function ChevronDown({ color = '#0D1B3E' }) {
  return (
    <Svg width={12} height={7} viewBox="0 0 12 7">
      <Path
        d="M 1 1.5 L 6 5.5 L 11 1.5"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

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

export default function CoachFlowScreens({ onNavigate, onBack }) {
  const [step, setStep] = useState(1); // 1: Info, 2: Logo/Colors, 3: Website/Privacy, 4: All Set

  // Step 1: Team Info
  const [teamName, setTeamName] = useState('Riverside Hoops');
  const [sport, setSport] = useState('Choose Sport');
  const [showSportDropdown, setShowSportDropdown] = useState(false);
  const [ageGroup, setAgeGroup] = useState('7');
  const [location, setLocation] = useState('Minnesota');

  // Step 2: Team Logo & Colors
  const [logoUploaded, setLogoUploaded] = useState(true);
  const [primaryColor, setPrimaryColor] = useState('#0F1334');
  const [secondaryColor, setSecondaryColor] = useState('#015CFE');
  const [showCustomColor, setShowCustomColor] = useState(false);
  const [customTarget, setCustomTarget] = useState('primary'); // 'primary' | 'secondary'
  const [customColorHex, setCustomColorHex] = useState('0A48FF');
  const [saturation, setSaturation] = useState(1);
  const [brightness, setBrightness] = useState(1);
  const [hue, setHue] = useState(0);
  const [showSetAsDropdown, setShowSetAsDropdown] = useState(false);

  const svBoxLayout = useRef({ width: 0, height: 0 });
  const hueBarLayout = useRef({ width: 0 });
  const draggingRef = useRef(false);

  // Step 3: Website and Privacy
  const [website, setWebsite] = useState('https://yourteam.com');
  const [privacy, setPrivacy] = useState('Public');
  const [showPrivacyDropdown, setShowPrivacyDropdown] = useState(false);

  // Step 4: Success / Invite
  const [linkCopied, setLinkCopied] = useState(false);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Completed Step 4 -> navigate to WhatWouldYouLikeToDo
      onNavigate('WhatWouldYouLikeToDo');
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const syncFromHex = (hex) => {
    const { h, s, v } = hexToHsv(hex);
    setHue(h);
    setSaturation(s);
    setBrightness(v);
    setCustomColorHex(normalizeHex(hex));
  };

  const syncFromHsv = (nextHue, nextSat, nextVal) => {
    const h = ((nextHue % 360) + 360) % 360;
    const s = clamp(nextSat, 0, 1);
    const v = clamp(nextVal, 0, 1);
    setHue(h);
    setSaturation(s);
    setBrightness(v);
    setCustomColorHex(hsvToHex(h, s, v));
  };

  const openCustomColorModal = (target) => {
    setCustomTarget(target);
    setShowSetAsDropdown(false);
    const currentColor = target === 'primary' ? primaryColor : secondaryColor;
    syncFromHex(currentColor);
    setShowCustomColor(true);
  };

  const applyCustomColor = () => {
    const clean = normalizeHex(customColorHex);
    if (!isValidHex(clean)) return;
    const formatted = `#${clean}`;
    if (customTarget === 'primary') {
      setPrimaryColor(formatted);
    } else {
      setSecondaryColor(formatted);
    }
    setShowCustomColor(false);
  };

  const hsvRef = useRef({ h: hue, s: saturation, v: brightness });
  hsvRef.current = { h: hue, s: saturation, v: brightness };

  const applySvPosition = (locationX, locationY) => {
    const { width, height } = svBoxLayout.current;
    if (!width || !height) return;
    const nextSat = clamp(locationX / width, 0, 1);
    const nextVal = clamp(1 - locationY / height, 0, 1);
    draggingRef.current = true;
    syncFromHsv(hsvRef.current.h, nextSat, nextVal);
  };

  const applyHuePosition = (locationX) => {
    const { width } = hueBarLayout.current;
    if (!width) return;
    const nextHue = clamp(locationX / width, 0, 1) * 360;
    draggingRef.current = true;
    syncFromHsv(nextHue, hsvRef.current.s, hsvRef.current.v);
  };

  const svPanResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (e) => applySvPosition(e.nativeEvent.locationX, e.nativeEvent.locationY),
        onPanResponderMove: (e) => applySvPosition(e.nativeEvent.locationX, e.nativeEvent.locationY),
        onPanResponderRelease: () => {
          draggingRef.current = false;
        },
        onPanResponderTerminate: () => {
          draggingRef.current = false;
        },
      }),
    []
  );

  const huePanResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (e) => applyHuePosition(e.nativeEvent.locationX),
        onPanResponderMove: (e) => applyHuePosition(e.nativeEvent.locationX),
        onPanResponderRelease: () => {
          draggingRef.current = false;
        },
        onPanResponderTerminate: () => {
          draggingRef.current = false;
        },
      }),
    []
  );

  // ── CUSTOM COLOR SUB-SCREEN (media_1790834990630.png) ──────────
  if (showCustomColor) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <Header
          onBack={() => setShowCustomColor(false)}
          showBack={true}
          currentStep={2}
          totalSteps={3}
        />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ScreenHeading
            title="Add Custom Color"
            subtitle="These color will represent your team across Junzle."
          />

          {/* ── Set As Selector ─────────────────────────── */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Set As</Text>
            <TouchableOpacity
              style={styles.dropdownTrigger}
              onPress={() => setShowSetAsDropdown((prev) => !prev)}
              activeOpacity={0.7}
            >
              <Text style={styles.dropdownText}>
                {customTarget === 'primary' ? 'Primary Color' : 'Secondary Color'}
              </Text>
              <ChevronDown />
            </TouchableOpacity>

            {showSetAsDropdown && (
              <View style={styles.dropdownMenu}>
                {[
                  { key: 'primary', label: 'Primary Color' },
                  { key: 'secondary', label: 'Secondary Color' },
                ].map((opt) => (
                  <TouchableOpacity
                    key={opt.key}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setCustomTarget(opt.key);
                      setShowSetAsDropdown(false);
                    }}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        customTarget === opt.key && styles.dropdownItemTextActive,
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Saturation / Brightness Picker — drag to pick */}
          <View style={styles.fieldGroup}>
            <View style={styles.pickerLabelRow}>
              <Text style={styles.label}>Color Picker</Text>
              <Text style={styles.pickerValueText}>#{normalizeHex(customColorHex)}</Text>
            </View>

            <View
              style={styles.svBoxContainer}
              onLayout={(e) => {
                svBoxLayout.current = {
                  width: e.nativeEvent.layout.width,
                  height: e.nativeEvent.layout.height,
                };
              }}
              {...svPanResponder.panHandlers}
            >
              <Svg width="100%" height="100%" viewBox="0 0 354 200" preserveAspectRatio="none">
                <Defs>
                  <LinearGradient id="svHue" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor="#FFFFFF" />
                    <Stop offset="100%" stopColor={hsvToHex(hue, 1, 1)} />
                  </LinearGradient>
                  <LinearGradient id="svVal" x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0%" stopColor="#000000" stopOpacity="0" />
                    <Stop offset="100%" stopColor="#000000" stopOpacity="1" />
                  </LinearGradient>
                </Defs>
                <Rect x="0" y="0" width="354" height="200" fill="url(#svHue)" />
                <Rect x="0" y="0" width="354" height="200" fill="url(#svVal)" />
              </Svg>

              {svBoxLayout.current.width > 0 && (
                <View
                  pointerEvents="none"
                  style={[
                    styles.svThumb,
                    {
                      left: saturation * svBoxLayout.current.width - 12,
                      top: (1 - brightness) * svBoxLayout.current.height - 12,
                      backgroundColor: hsvToHex(hue, saturation, brightness),
                    },
                  ]}
                />
              )}
            </View>
          </View>

          {/* Hue Slider — drag to pick */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Hue</Text>
            <View
              style={styles.hueSliderContainer}
              onLayout={(e) => {
                hueBarLayout.current = { width: e.nativeEvent.layout.width };
              }}
              {...huePanResponder.panHandlers}
            >
              <Svg width="100%" height="100%" viewBox="0 0 354 14" preserveAspectRatio="none">
                <Defs>
                  <LinearGradient id="hueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor="#FF0000" />
                    <Stop offset="16.66%" stopColor="#FFFF00" />
                    <Stop offset="33.33%" stopColor="#00FF00" />
                    <Stop offset="50%" stopColor="#00FFFF" />
                    <Stop offset="66.66%" stopColor="#0000FF" />
                    <Stop offset="83.33%" stopColor="#FF00FF" />
                    <Stop offset="100%" stopColor="#FF0000" />
                  </LinearGradient>
                </Defs>
                <Rect x="0" y="0" width="354" height="14" fill="url(#hueGrad)" />
              </Svg>

              {hueBarLayout.current.width > 0 && (
                <View
                  pointerEvents="none"
                  style={[
                    styles.hueThumbKnob,
                    {
                      left: (hue / 360) * hueBarLayout.current.width - 11,
                      backgroundColor: hsvToHex(hue, 1, 1),
                    },
                  ]}
                />
              )}
            </View>
          </View>

          {/* Hex Input */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Hex Color</Text>
            <View style={styles.hexInputRow}>
              <View style={[styles.hexSwatch, { backgroundColor: `#${normalizeHex(customColorHex)}` }]} />
              <TextInput
                style={[
                  styles.input,
                  styles.hexInput,
                  !isValidHex(customColorHex) && styles.hexInputError,
                ]}
                value={`#${normalizeHex(customColorHex)}`}
                onChangeText={(val) => {
                  const cleaned = normalizeHex(val).slice(0, 6);
                  setCustomColorHex(cleaned);
                  if (isValidHex(cleaned)) {
                    const { h, s, v } = hexToHsv(cleaned);
                    setHue(h);
                    setSaturation(s);
                    setBrightness(v);
                  }
                }}
                autoCapitalize="characters"
                autoCorrect={false}
                maxLength={7}
                placeholder="#000000"
                placeholderTextColor="#94A3B8"
              />
            </View>
            {!isValidHex(customColorHex) && (
              <Text style={styles.hexErrorText}>Enter a valid 6-digit hex value</Text>
            )}
          </View>

          {/* Color Preview */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Color Preview</Text>
            <View
              style={[
                styles.colorPreviewCard,
                { backgroundColor: `#${normalizeHex(customColorHex)}` },
              ]}
            >
              <Text style={[styles.colorPreviewText, { color: readableTextOn(customColorHex) }]}>
                #{normalizeHex(customColorHex)}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Sticky Bottom: Add Color button */}
        <View style={styles.bottomArea}>
          <TouchableOpacity
            style={[styles.continueBtn, !isValidHex(customColorHex) && styles.continueBtnDisabled]}
            onPress={applyCustomColor}
            disabled={!isValidHex(customColorHex)}
            activeOpacity={0.88}
          >
            <Text style={styles.continueBtnText}>Add Color</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── MAIN 3-STEP FLOW ───────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header: Stepper Header on Steps 1-3, Header without Stepper on Step 4 */}
        <Header
          onBack={handlePrev}
          showBack={true}
          currentStep={step}
          totalSteps={step === 4 ? 0 : 3}
          showStepper={step !== 4}
        />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ════════════ STEP 1: TEAM INFO ════════════ */}
          {step === 1 && (
            <View style={styles.stepContainer}>
              <ScreenHeading
                title="Create a Team"
                subtitle="Let’s set up your team info. You can always change it later"
              />

              <View style={styles.form}>
                {/* Team Name */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Team Name</Text>
                  <TextInput
                    style={[styles.input, styles.inputActive]}
                    placeholder="Create Team Name"
                    placeholderTextColor="#94A3B8"
                    value={teamName}
                    onChangeText={setTeamName}
                  />
                </View>

                {/* Choose Sport */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Choose Sport</Text>
                  <TouchableOpacity
                    style={styles.dropdownTrigger}
                    onPress={() => setShowSportDropdown(!showSportDropdown)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.dropdownText}>{sport}</Text>
                    <ChevronDown />
                  </TouchableOpacity>

                  {showSportDropdown && (
                    <View style={styles.dropdownMenu}>
                      {SPORTS_LIST.map((item, idx) => (
                        <TouchableOpacity
                          key={idx}
                          style={styles.dropdownItem}
                          onPress={() => {
                            setSport(item);
                            setShowSportDropdown(false);
                          }}
                        >
                          <Text
                            style={[
                              styles.dropdownItemText,
                              sport === item && styles.dropdownItemTextActive,
                            ]}
                          >
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                {/* Age Group */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Age Group</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Choose Age Group"
                    placeholderTextColor="#94A3B8"
                    value={ageGroup}
                    onChangeText={setAgeGroup}
                  />
                </View>

                {/* Location */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Location</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Choose Location"
                    placeholderTextColor="#94A3B8"
                    value={location}
                    onChangeText={setLocation}
                  />
                </View>
              </View>
            </View>
          )}

          {/* ════════════ STEP 2: LOGO & COLORS ════════════ */}
          {step === 2 && (
            <View style={styles.stepContainer}>
              <ScreenHeading
                title="Create a Team"
                subtitle="Let’s set up your team info. You can always change it later"
              />

              {/* Team Logo Section */}
              <View style={styles.sectionBlock}>
                <Text style={styles.label}>Team Logo</Text>
                <View style={styles.logoUploadRow}>
                  {/* Logo Preview Square */}
                  <View style={styles.logoSquarePreview}>
                    {logoUploaded ? (
                      <Image
                        source={require('../../../assets/tiger-logo.png')}
                        style={styles.logoPreviewImage}
                        resizeMode="contain"
                      />
                    ) : (
                      <View style={styles.logoSquareEmpty} />
                    )}
                  </View>

                  {/* Upload Button Card */}
                  <TouchableOpacity
                    style={styles.uploadCardBtn}
                    onPress={() => setLogoUploaded(!logoUploaded)}
                    activeOpacity={0.82}
                  >
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#2B7FFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <Path d="m17 8-5-5-5 5" />
                      <Line x1="12" y1="3" x2="12" y2="15" />
                    </Svg>
                    <Text style={styles.uploadCardTitle}>Upload Logo</Text>
                    <Text style={styles.uploadCardSub}>PNG or JPG, Max 5MB</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Team Colors Section */}
              <View style={styles.sectionBlock}>
                <Text style={styles.sectionHeaderTitle}>Team Colors</Text>

                {/* Primary Color Swatches */}
                <View style={styles.swatchSection}>
                  <Text style={styles.swatchSubLabel}>Primary Color</Text>
                  <View style={styles.swatchGrid}>
                    {PRESET_COLORS.map((c, idx) => (
                      <TouchableOpacity
                        key={`prim-${idx}`}
                        style={[
                          styles.swatchCell,
                          { backgroundColor: c },
                          primaryColor === c && styles.swatchCellActive,
                        ]}
                        onPress={() => setPrimaryColor(c)}
                        activeOpacity={0.8}
                      />
                    ))}
                    {/* Add Custom Color '+' Cell */}
                    <TouchableOpacity
                      style={styles.swatchAddCell}
                      onPress={() => openCustomColorModal('primary')}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.swatchAddPlus}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Secondary Color Swatches */}
                <View style={styles.swatchSection}>
                  <Text style={styles.swatchSubLabel}>Secondary Color</Text>
                  <View style={styles.swatchGrid}>
                    {PRESET_COLORS.map((c, idx) => (
                      <TouchableOpacity
                        key={`sec-${idx}`}
                        style={[
                          styles.swatchCell,
                          { backgroundColor: c },
                          secondaryColor === c && styles.swatchCellActive,
                        ]}
                        onPress={() => setSecondaryColor(c)}
                        activeOpacity={0.8}
                      />
                    ))}
                    {/* Add Custom Color '+' Cell */}
                    <TouchableOpacity
                      style={styles.swatchAddCell}
                      onPress={() => openCustomColorModal('secondary')}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.swatchAddPlus}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* ════════════ STEP 3: WEBSITE & PRIVACY ════════════ */}
          {step === 3 && (
            <View style={styles.stepContainer}>
              <ScreenHeading
                title="Website and Privacy"
                subtitle="Add a website link and choose your team’s privacy setting."
              />

              <View style={styles.form}>
                {/* Website Link */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Website Link (Optional)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="https://yourteam.com"
                    placeholderTextColor="#94A3B8"
                    value={website}
                    onChangeText={setWebsite}
                    autoCapitalize="none"
                  />
                </View>

                {/* Privacy Setting */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Privacy Setting</Text>
                  <TouchableOpacity
                    style={styles.dropdownTrigger}
                    onPress={() => setShowPrivacyDropdown(!showPrivacyDropdown)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.dropdownText}>{privacy}</Text>
                    <ChevronDown />
                  </TouchableOpacity>

                  {showPrivacyDropdown && (
                    <View style={styles.dropdownMenu}>
                      {['Public', 'Private'].map((item, idx) => (
                        <TouchableOpacity
                          key={idx}
                          style={styles.dropdownItem}
                          onPress={() => {
                            setPrivacy(item);
                            setShowPrivacyDropdown(false);
                          }}
                        >
                          <Text
                            style={[
                              styles.dropdownItemText,
                              privacy === item && styles.dropdownItemTextActive,
                            ]}
                          >
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}

          {/* ════════════ STEP 4: TEAM CREATED ! ════════════ */}
          {step === 4 && (
            <View style={styles.step4Container}>
              {/* Success Badge & Headings Block */}
              <View style={styles.centerHeaderBlock}>
                <Image
                  source={require('../../../assets/verified.png')}
                  style={styles.verifiedBadge}
                  resizeMode="contain"
                />

                <View style={styles.combinedHeadingView}>
                  <Text style={styles.step4Title}>Team Created !</Text>
                  <Text style={styles.step4Subtitle}>
                    Your team is ready. Share the link or QR code to invite members.
                  </Text>
                </View>
              </View>

              {/* QR Code Graphic */}
              <View style={styles.qrContainer}>
                <Image
                  source={require('../../../assets/qr-code.png')}
                  style={styles.qrImage}
                  resizeMode="contain"
                />
              </View>

              {/* Download QR Code Button */}
              <TouchableOpacity
                style={styles.downloadBtn}
                onPress={() => {}}
                activeOpacity={0.82}
              >
                <Image
                  source={require('../../../assets/download.png')}
                  style={styles.downloadIcon}
                  resizeMode="contain"
                />
                <Text style={styles.downloadBtnText}>Download QR Code</Text>
              </TouchableOpacity>

              {/* Invite Link Section */}
              <View style={styles.sectionBlock}>
                <Text style={styles.sectionLabel}>Invite Link</Text>
                <TouchableOpacity
                  style={styles.inviteLinkBox}
                  onPress={() => {
                    setLinkCopied(true);
                    setTimeout(() => setLinkCopied(false), 2000);
                  }}
                  activeOpacity={0.75}
                >
                  <Text style={styles.inviteLinkText}>junzle.com/t/riverside.b</Text>
                  <View style={styles.copyIconWrap}>
                    <Image
                      source={require('../../../assets/copy.png')}
                      style={styles.copyIcon}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
                {linkCopied && (
                  <Text style={styles.copiedFeedback}>Link copied to clipboard!</Text>
                )}
              </View>

              {/* Other Ways to Invite */}
              <View style={styles.sectionBlock}>
                <Text style={styles.sectionLabel}>Other Ways to Invite</Text>

                <TouchableOpacity style={styles.actionCard} onPress={() => {}} activeOpacity={0.82}>
                  <View style={styles.cardTextBlock}>
                    <Text style={styles.cardTitle}>Send Via Text</Text>
                    <Text style={styles.cardSub}>
                      Enter phone numbers to send an invitation via SMS.
                    </Text>
                  </View>
                  <ArrowRight />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionCard} onPress={() => {}} activeOpacity={0.82}>
                  <View style={styles.cardTextBlock}>
                    <Text style={styles.cardTitle}>Send via Email</Text>
                    <Text style={styles.cardSub}>
                      Enter email addresses to send an invitation via Email.
                    </Text>
                  </View>
                  <ArrowRight />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>

        {/* ── Sticky Bottom Action Sheet ───────────────────────── */}
        <View style={styles.bottomArea}>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={handleNext}
            activeOpacity={0.88}
          >
            <Text style={styles.continueBtnText}>Continue</Text>
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
  stepContainer: {
    gap: 8,
  },

  /* ── Form Controls ── */
  form: {
    gap: 20,
    marginTop: 8,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    fontFamily: RETHINK,
    fontSize: 16,
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
  inputActive: {
    borderColor: '#2B7FFF',
  },

  /* Dropdown Trigger */
  dropdownTrigger: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontFamily: JAKARTA,
    fontSize: 14,
    color: '#0D1B3E',
  },
  chevronIcon: {
    fontSize: 18,
    color: '#0D1B3E',
    marginTop: -4,
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginTop: 4,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dropdownItemText: {
    fontFamily: JAKARTA,
    fontSize: 14,
    color: '#0D1B3E',
  },
  dropdownItemTextActive: {
    fontWeight: '700',
    color: '#2B7FFF',
  },

  /* ── Step 2: Team Logo & Swatches ─────────────────────────── */
  sectionBlock: {
    gap: 12,
    marginTop: 8,
  },
  sectionHeaderTitle: {
    fontFamily: RETHINK,
    fontSize: 16,
    fontWeight: '700',
    color: '#0D1B3E',
    marginTop: 8,
  },
  logoUploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoSquarePreview: {
    width: 68,
    height: 68,
    borderRadius: 12,
    backgroundColor: '#0F1334',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logoSquareEmpty: {
    width: '100%',
    height: '100%',
    backgroundColor: '#EFF6FF',
  },
  logoPreviewImage: {
    width: 48,
    height: 48,
  },
  uploadCardBtn: {
    flex: 1,
    height: 68,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    gap: 2,
  },
  uploadCardTitle: {
    fontFamily: RETHINK,
    fontSize: 13,
    fontWeight: '700',
    color: '#2B7FFF',
  },
  uploadCardSub: {
    fontFamily: JAKARTA,
    fontSize: 11,
    color: '#64748B',
  },

  /* Swatch Grids (5 across) */
  swatchSection: {
    gap: 8,
    marginTop: 4,
  },
  swatchSubLabel: {
    fontFamily: RETHINK,
    fontSize: 14,
    fontWeight: '700',
    color: '#0D1B3E',
  },
  swatchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  swatchCell: {
    width: 58,
    height: 52,
    borderRadius: 10,
  },
  swatchCellActive: {
    borderWidth: 3,
    borderColor: '#000000',
  },
  swatchAddCell: {
    width: 58,
    height: 52,
    borderRadius: 10,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  swatchAddPlus: {
    fontSize: 22,
    color: '#0D1B3E',
    fontWeight: '300',
  },

  /* ── Custom Color Picker ───────────────────── */
  pickerLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerValueText: {
    fontFamily: JAKARTA,
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  svBoxContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  svThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 3,
    elevation: 4,
  },
  hueSliderContainer: {
    width: '100%',
    height: 14,
    borderRadius: 7,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  hueThumbKnob: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    top: -5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  hexInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  hexSwatch: {
    width: 48,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  hexInput: {
    flex: 1,
  },
  hexInputError: {
    borderColor: '#EF4444',
  },
  hexErrorText: {
    fontFamily: JAKARTA,
    fontSize: 12,
    color: '#EF4444',
  },
  colorPreviewCard: {
    height: 64,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorPreviewText: {
    fontFamily: RETHINK,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
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
  continueBtnDisabled: {
    backgroundColor: '#93B4F5',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueBtnText: {
    fontFamily: RETHINK,
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* ── Step 4: Team Created Styles ───────────────────────────── */
  step4Container: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
    paddingTop: 8,
  },
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
  step4Title: {
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
  step4Subtitle: {
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
});
