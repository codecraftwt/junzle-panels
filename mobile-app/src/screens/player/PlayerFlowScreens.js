import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../../theme/theme';
import Header from '../../components/Header';

const MOCK_TEAMS = [
  { id: '1', name: 'Thunderbolts SC 2014 Boys', sport: 'Soccer', coach: 'Coach Vance' },
  { id: '2', name: 'Lone Star Strikers U13', sport: 'Soccer', coach: 'Coach Jenkins' },
  { id: '3', name: 'Southwest Heat Elite', sport: 'Basketball', coach: 'Coach Washington' },
];

export default function PlayerFlowScreens({ onNavigate, onBack }) {
  const [step, setStep] = useState(1);

  // Player Profile
  const [profile, setProfile] = useState({
    name: 'Liam Miller',
    phone: '(555) 404-5567',
    jerseyNumber: '7',
    position: 'Midfielder',
  });

  // Search & Team
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(MOCK_TEAMS[0]);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
    else onBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={step === 4 ? 'Roster Request Sent' : `Player Setup (${step}/4)`}
        onBack={handlePrev}
        showBack={true}
        stepNumber={step}
        totalSteps={4}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* STEP 1: Profile Setup */}
        {step === 1 && (
          <View>
            <Text style={styles.stepTitle}>Athlete Profile</Text>
            <Text style={styles.stepSub}>
              Set up your player card, jersey number preference, and position.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Player Full Name</Text>
              <TextInput
                style={styles.input}
                value={profile.name}
                onChangeText={(t) => setProfile({ ...profile, name: t })}
              />
            </View>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Jersey #</Text>
                <TextInput
                  style={[styles.input, { fontWeight: '900', color: COLORS.royalBlue, fontSize: 18 }]}
                  value={profile.jerseyNumber}
                  onChangeText={(t) => setProfile({ ...profile, jerseyNumber: t })}
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.inputGroup, { flex: 2 }]}>
                <Text style={styles.label}>Position</Text>
                <TextInput
                  style={styles.input}
                  value={profile.position}
                  onChangeText={(t) => setProfile({ ...profile, position: t })}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contact Phone (Optional)</Text>
              <TextInput
                style={styles.input}
                value={profile.phone}
                onChangeText={(t) => setProfile({ ...profile, phone: t })}
                keyboardType="phone-pad"
              />
            </View>
          </View>
        )}

        {/* STEP 2: Search for Team by Name */}
        {step === 2 && (
          <View>
            <Text style={styles.stepTitle}>Search for Team</Text>
            <Text style={styles.stepSub}>
              Find your squad by name to request roster assignment.
            </Text>

            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Search team name (e.g. Thunderbolts)..."
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
            </View>

            <View style={{ gap: 10 }}>
              {MOCK_TEAMS.map((t) => (
                <TouchableOpacity
                  key={t.id}
                  style={[styles.teamCard, selectedTeam?.id === t.id && styles.teamCardActive]}
                  onPress={() => setSelectedTeam(t)}
                >
                  <View>
                    <Text style={styles.teamTitle}>{t.name}</Text>
                    <Text style={styles.teamSub}>{t.sport} • {t.coach}</Text>
                  </View>
                  {selectedTeam?.id === t.id && <Text style={{ color: COLORS.royalBlue, fontWeight: '900' }}>✓</Text>}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* STEP 3: Request to Join */}
        {step === 3 && (
          <View>
            <Text style={styles.stepTitle}>Confirm Roster Request</Text>
            <Text style={styles.stepSub}>
              Review your jersey request before submitting to the coach.
            </Text>

            <View style={styles.jerseyCard}>
              <View style={styles.jerseyCircle}>
                <Text style={styles.jerseyNum}>#{profile.jerseyNumber}</Text>
              </View>
              <View>
                <Text style={styles.jerseyName}>{profile.name}</Text>
                <Text style={styles.jerseyPos}>{profile.position}</Text>
                <Text style={styles.jerseyTarget}>Target: {selectedTeam?.name}</Text>
              </View>
            </View>

            <Text style={styles.noticeText}>
              Your request will be placed on Coach {selectedTeam?.coach}'s roster queue for the active season.
            </Text>
          </View>
        )}

        {/* STEP 4: Confirmation Screen */}
        {step === 4 && (
          <View style={styles.confirmContainer}>
            <View style={styles.checkCircle}>
              <Text style={styles.checkEmoji}>✓</Text>
            </View>

            <Text style={styles.confirmTitle}>Request Sent!</Text>
            <Text style={styles.confirmSub}>
              Your roster submission for <Text style={{ fontWeight: '800' }}>{selectedTeam?.name}</Text> wearing <Text style={{ fontWeight: '800' }}>#{profile.jerseyNumber}</Text> has been queued.
            </Text>

            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => onNavigate('MobileHub', { role: 'player', teamName: selectedTeam?.name || 'Thunderbolts SC' })}
            >
              <Text style={styles.doneBtnText}>View Athlete Locker</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.homeBtn}
              onPress={() => onNavigate('Entry')}
            >
              <Text style={styles.homeBtnText}>Return to Entry Screen</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Action Button for Steps 1 - 3 */}
        {step < 4 && (
          <View style={{ marginTop: 24 }}>
            <TouchableOpacity style={styles.doneBtn} onPress={handleNext}>
              <Text style={styles.doneBtnText}>
                {step === 3 ? 'Send Request to Join' : 'Continue'}
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
  jerseyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.slate200,
    marginBottom: 16,
  },
  jerseyCircle: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: COLORS.royalBlue,
    borderWidth: 3,
    borderColor: COLORS.canaryYellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jerseyNum: { fontSize: 22, fontWeight: '900', color: COLORS.canaryYellow },
  jerseyName: { fontSize: 16, fontWeight: '800', color: COLORS.darkNavy },
  jerseyPos: { fontSize: 13, color: COLORS.slate600 },
  jerseyTarget: { fontSize: 12, color: COLORS.royalBlue, fontWeight: '700', marginTop: 2 },
  noticeText: { fontSize: 12, color: COLORS.slate600, lineHeight: 18 },
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
