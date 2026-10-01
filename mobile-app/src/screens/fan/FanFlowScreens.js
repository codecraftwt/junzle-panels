import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
} from 'react-native';
import { COLORS } from '../../theme/theme';
import Header from '../../components/Header';

const MOCK_TEAMS = [
  { id: '1', name: 'Thunderbolts SC 2014 Boys', sport: 'Soccer', location: 'Austin, TX' },
  { id: '2', name: 'Lone Star Strikers U13', sport: 'Soccer', location: 'Round Rock, TX' },
  { id: '3', name: 'Southwest Heat Elite', sport: 'Basketball', location: 'Dallas, TX' },
];

export default function FanFlowScreens({ onNavigate, onBack }) {
  const [step, setStep] = useState(1);

  // Search & Selection
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeams, setSelectedTeams] = useState(['1']);

  // Lightweight alert settings
  const [contact, setContact] = useState('fan.spectator@example.com');
  const [scoreAlerts, setScoreAlerts] = useState(true);
  const [scheduleAlerts, setScheduleAlerts] = useState(true);

  const toggleTeam = (id) => {
    if (selectedTeams.includes(id)) {
      setSelectedTeams(selectedTeams.filter((t) => t !== id));
    } else {
      setSelectedTeams([...selectedTeams, id]);
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
    else onBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={step === 3 ? 'Now Following' : `Fan Setup (${step}/3)`}
        onBack={handlePrev}
        showBack={true}
        stepNumber={step}
        totalSteps={3}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* STEP 1: Search for Team by Name */}
        {step === 1 && (
          <View>
            <View style={styles.lightBadge}>
              <Text style={styles.lightBadgeText}>⚡ Lightweight Spectator Access</Text>
            </View>

            <Text style={styles.stepTitle}>Find Teams to Follow</Text>
            <Text style={styles.stepSub}>
              Search squads by name to track live scores and schedules without a full login.
            </Text>

            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Search team or sport..."
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
            </View>

            <View style={{ gap: 10 }}>
              {MOCK_TEAMS.map((t) => {
                const isFollowed = selectedTeams.includes(t.id);
                return (
                  <TouchableOpacity
                    key={t.id}
                    style={[styles.teamCard, isFollowed && styles.teamCardActive]}
                    onPress={() => toggleTeam(t.id)}
                  >
                    <View>
                      <Text style={styles.teamTitle}>{t.name}</Text>
                      <Text style={styles.teamSub}>{t.sport} • {t.location}</Text>
                    </View>
                    <View style={[styles.followPill, isFollowed && styles.followPillActive]}>
                      <Text style={[styles.followText, isFollowed && styles.followTextActive]}>
                        {isFollowed ? 'Following ✓' : '+ Follow'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* STEP 2: Follow Preferences (Lightweight) */}
        {step === 2 && (
          <View>
            <Text style={styles.stepTitle}>Notification Preferences</Text>
            <Text style={styles.stepSub}>
              Get immediate alerts whenever followed teams play or game times shift.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email or Phone for Alerts</Text>
              <TextInput
                style={styles.input}
                value={contact}
                onChangeText={setContact}
              />
            </View>

            <View style={styles.switchCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.switchTitle}>Final Score Alerts</Text>
                <Text style={styles.switchSub}>Instant final whistle notifications</Text>
              </View>
              <Switch
                value={scoreAlerts}
                onValueChange={setScoreAlerts}
                trackColor={{ false: COLORS.slate300, true: COLORS.royalBlue }}
              />
            </View>

            <View style={styles.switchCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.switchTitle}>Weather & Schedule Delays</Text>
                <Text style={styles.switchSub}>Field changes and cancellations</Text>
              </View>
              <Switch
                value={scheduleAlerts}
                onValueChange={setScheduleAlerts}
                trackColor={{ false: COLORS.slate300, true: COLORS.royalBlue }}
              />
            </View>
          </View>
        )}

        {/* STEP 3: Confirmation */}
        {step === 3 && (
          <View style={styles.confirmContainer}>
            <View style={styles.checkCircle}>
              <Text style={styles.checkEmoji}>✓</Text>
            </View>

            <Text style={styles.confirmTitle}>You're Following!</Text>
            <Text style={styles.confirmSub}>
              You are tracking <Text style={{ fontWeight: '800' }}>{selectedTeams.length} team(s)</Text>. Game notifications will dispatch to <Text style={{ fontWeight: '800' }}>{contact}</Text>.
            </Text>

            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => onNavigate('MobileHub', { role: 'fan', teamName: 'Thunderbolts SC' })}
            >
              <Text style={styles.doneBtnText}>View Public Game Board</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.homeBtn}
              onPress={() => onNavigate('Entry')}
            >
              <Text style={styles.homeBtnText}>Return to Entry Screen</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Action Button for Steps 1 - 2 */}
        {step < 3 && (
          <View style={{ marginTop: 24 }}>
            <TouchableOpacity style={styles.doneBtn} onPress={handleNext}>
              <Text style={styles.doneBtnText}>
                {step === 2 ? 'Save & Follow' : 'Continue'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.slate50 },
  content: { padding: 20, paddingBottom: 40 },
  lightBadge: {
    backgroundColor: COLORS.warningBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  lightBadgeText: { fontSize: 11, fontWeight: '800', color: COLORS.warning },
  stepTitle: { fontSize: 22, fontWeight: '900', color: COLORS.darkNavy, marginBottom: 6 },
  stepSub: { fontSize: 13, color: COLORS.slate600, lineHeight: 18, marginBottom: 20 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '700', color: COLORS.slate700, marginBottom: 6 },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.slate300,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.darkNavy,
  },
  teamCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.slate200,
  },
  teamCardActive: { borderColor: COLORS.royalBlue, backgroundColor: COLORS.slate50 },
  teamTitle: { fontSize: 15, fontWeight: '800', color: COLORS.darkNavy },
  teamSub: { fontSize: 12, color: COLORS.slate600, marginTop: 2 },
  followPill: {
    backgroundColor: COLORS.slate100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  followPillActive: { backgroundColor: COLORS.royalBlue },
  followText: { fontSize: 12, fontWeight: '700', color: COLORS.slate700 },
  followTextActive: { color: COLORS.white },
  switchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.slate200,
    marginBottom: 12,
  },
  switchTitle: { fontSize: 14, fontWeight: '800', color: COLORS.darkNavy },
  switchSub: { fontSize: 12, color: COLORS.slate600, marginTop: 2 },
  confirmContainer: { alignItems: 'center', paddingVertical: 20 },
  checkCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.successBg, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  checkEmoji: { fontSize: 40, fontWeight: '900', color: COLORS.success },
  confirmTitle: { fontSize: 26, fontWeight: '900', color: COLORS.darkNavy, marginBottom: 8 },
  confirmSub: { fontSize: 14, color: COLORS.slate600, textAlign: 'center', lineHeight: 20, marginBottom: 24, paddingHorizontal: 20 },
  doneBtn: { width: '100%', backgroundColor: COLORS.royalBlue, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginBottom: 12 },
  doneBtnText: { fontSize: 15, fontWeight: '800', color: COLORS.white },
  homeBtn: { paddingVertical: 10 },
  homeBtnText: { fontSize: 13, fontWeight: '700', color: COLORS.slate600 },
});
