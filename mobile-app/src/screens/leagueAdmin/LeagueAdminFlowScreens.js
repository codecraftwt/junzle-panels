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

export default function LeagueAdminFlowScreens({ onNavigate, onBack }) {
  const [step, setStep] = useState(1);

  // Profile setup
  const [profile, setProfile] = useState({
    name: 'David Reynolds',
    phone: '(555) 201-1122',
    title: 'Commissioner',
  });

  // League details
  const [league, setLeague] = useState({
    name: 'Texas Premier Youth League',
    sport: 'Soccer',
    region: 'Central Texas',
  });

  // Clubs under league
  const [clubs, setClubs] = useState([
    { id: '1', name: 'Metro Elite Soccer Academy', location: 'Austin, TX' },
    { id: '2', name: 'Lone Star Strikers', location: 'Round Rock, TX' },
  ]);
  const [newClubName, setNewClubName] = useState('');
  const [newClubLocation, setNewClubLocation] = useState('');

  const handleAddClub = () => {
    if (newClubName.trim()) {
      setClubs([...clubs, { id: Date.now().toString(), name: newClubName, location: newClubLocation || 'Texas' }]);
      setNewClubName('');
      setNewClubLocation('');
    }
  };

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
        title={step === 4 ? 'League Active' : `League Admin (${step}/4)`}
        onBack={handlePrev}
        showBack={true}
        stepNumber={step}
        totalSteps={4}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* STEP 1: Profile Setup */}
        {step === 1 && (
          <View>
            <Text style={styles.stepTitle}>Commissioner Profile</Text>
            <Text style={styles.stepSub}>
              Official administrative details for your regional sports governing body.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={profile.name}
                onChangeText={(t) => setProfile({ ...profile, name: t })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={profile.phone}
                onChangeText={(t) => setProfile({ ...profile, phone: t })}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                value={profile.title}
                onChangeText={(t) => setProfile({ ...profile, title: t })}
              />
            </View>
          </View>
        )}

        {/* STEP 2: Create League */}
        {step === 2 && (
          <View>
            <Text style={styles.stepTitle}>Create League</Text>
            <Text style={styles.stepSub}>
              Set up your youth competition league entity.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>League Name</Text>
              <TextInput
                style={styles.input}
                value={league.name}
                onChangeText={(t) => setLeague({ ...league, name: t })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Sport</Text>
              <TextInput
                style={styles.input}
                value={league.sport}
                onChangeText={(t) => setLeague({ ...league, sport: t })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Region / Jurisdiction</Text>
              <TextInput
                style={styles.input}
                value={league.region}
                onChangeText={(t) => setLeague({ ...league, region: t })}
              />
            </View>
          </View>
        )}

        {/* STEP 3: Add Clubs under League */}
        {step === 3 && (
          <View>
            <Text style={styles.stepTitle}>Add Participating Clubs</Text>
            <Text style={styles.stepSub}>
              Add clubs or academies affiliated with {league.name}.
            </Text>

            <View style={styles.addCard}>
              <TextInput
                style={[styles.input, { marginBottom: 8 }]}
                placeholder="Club / Academy Name"
                value={newClubName}
                onChangeText={setNewClubName}
              />
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="City / Region"
                  value={newClubLocation}
                  onChangeText={setNewClubLocation}
                />
                <TouchableOpacity style={styles.addSmallBtn} onPress={handleAddClub}>
                  <Text style={styles.addSmallBtnText}>+ Add Club</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ gap: 8, marginTop: 12 }}>
              {clubs.map((c) => (
                <View key={c.id} style={styles.itemRow}>
                  <View>
                    <Text style={styles.itemTitle}>{c.name}</Text>
                    <Text style={styles.itemSub}>{c.location}</Text>
                  </View>
                  <Text style={styles.itemBadge}>Affiliated</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* STEP 4: Confirmation */}
        {step === 4 && (
          <View style={styles.confirmContainer}>
            <View style={styles.checkCircle}>
              <Text style={styles.checkEmoji}>✓</Text>
            </View>

            <Text style={styles.confirmTitle}>League Published!</Text>
            <Text style={styles.confirmSub}>
              <Text style={{ fontWeight: '800' }}>{league.name}</Text> has been created with {clubs.length} registered clubs.
            </Text>

            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => onNavigate('MobileHub', { role: 'league-admin', teamName: league.name })}
            >
              <Text style={styles.doneBtnText}>Launch League Hub</Text>
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
                {step === 3 ? 'Publish League' : 'Continue'}
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
  addCard: {
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.slate200,
    marginBottom: 8,
  },
  addSmallBtn: {
    backgroundColor: COLORS.royalBlue,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addSmallBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 13 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.slate200,
  },
  itemTitle: { fontSize: 14, fontWeight: '700', color: COLORS.darkNavy },
  itemSub: { fontSize: 12, color: COLORS.slate600, marginTop: 2 },
  itemBadge: { fontSize: 11, fontWeight: '700', color: COLORS.royalBlue, backgroundColor: COLORS.slate100, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
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
