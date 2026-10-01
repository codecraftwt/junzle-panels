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

export default function ClubOwnerFlowScreens({ onNavigate, onBack }) {
  const [step, setStep] = useState(1);

  // Form State
  const [profile, setProfile] = useState({
    name: 'Elena Rostova',
    phone: '(555) 302-3344',
    title: 'Club Director & Founder',
  });

  const [org, setOrg] = useState({
    name: 'Metro Elite Soccer Academy',
    sport: 'Soccer',
    cityState: 'Austin, TX',
  });

  const [teams, setTeams] = useState([
    { id: '1', name: 'Metro Elite U11 Boys', division: 'U11' },
    { id: '2', name: 'Metro Elite U13 Girls', division: 'U13' },
  ]);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDivision, setNewTeamDivision] = useState('');

  const [coaches, setCoaches] = useState([
    { id: '1', name: 'Marcus Vance', email: 'marcus.vance@metroelite.org' },
  ]);
  const [newCoachName, setNewCoachName] = useState('');
  const [newCoachEmail, setNewCoachEmail] = useState('');

  const handleAddTeam = () => {
    if (newTeamName.trim()) {
      setTeams([...teams, { id: Date.now().toString(), name: newTeamName, division: newTeamDivision || 'General' }]);
      setNewTeamName('');
      setNewTeamDivision('');
    }
  };

  const handleAddCoach = () => {
    if (newCoachName.trim() && newCoachEmail.trim()) {
      setCoaches([...coaches, { id: Date.now().toString(), name: newCoachName, email: newCoachEmail }]);
      setNewCoachName('');
      setNewCoachEmail('');
    }
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
    else onBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={step === 5 ? 'Club Established' : `Club Owner (${step}/5)`}
        onBack={handlePrev}
        showBack={true}
        stepNumber={step}
        totalSteps={5}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* STEP 1: Profile Setup */}
        {step === 1 && (
          <View>
            <Text style={styles.stepTitle}>Owner Profile Setup</Text>
            <Text style={styles.stepSub}>
              Administrative contact information for your organization.
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
              <Text style={styles.label}>Official Title / Role</Text>
              <TextInput
                style={styles.input}
                value={profile.title}
                onChangeText={(t) => setProfile({ ...profile, title: t })}
              />
            </View>
          </View>
        )}

        {/* STEP 2: Create Organization */}
        {step === 2 && (
          <View>
            <Text style={styles.stepTitle}>Create Organization</Text>
            <Text style={styles.stepSub}>
              Set up your parent club or academy entity.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Organization Name</Text>
              <TextInput
                style={styles.input}
                value={org.name}
                onChangeText={(t) => setOrg({ ...org, name: t })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Primary Sport</Text>
              <TextInput
                style={styles.input}
                value={org.sport}
                onChangeText={(t) => setOrg({ ...org, sport: t })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>City & State</Text>
              <TextInput
                style={styles.input}
                value={org.cityState}
                onChangeText={(t) => setOrg({ ...org, cityState: t })}
              />
            </View>
          </View>
        )}

        {/* STEP 3: Add Teams Under Org */}
        {step === 3 && (
          <View>
            <Text style={styles.stepTitle}>Add Teams Under Club</Text>
            <Text style={styles.stepSub}>
              Add the individual age divisions for {org.name}.
            </Text>

            {/* Quick Add Inputs */}
            <View style={styles.addCard}>
              <TextInput
                style={[styles.input, { marginBottom: 8 }]}
                placeholder="Team Name (e.g. Metro Elite U15)"
                value={newTeamName}
                onChangeText={setNewTeamName}
              />
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Division (e.g. U15)"
                  value={newTeamDivision}
                  onChangeText={setNewTeamDivision}
                />
                <TouchableOpacity style={styles.addSmallBtn} onPress={handleAddTeam}>
                  <Text style={styles.addSmallBtnText}>+ Add</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Teams List */}
            <View style={{ gap: 8, marginTop: 12 }}>
              {teams.map((t) => (
                <View key={t.id} style={styles.itemRow}>
                  <View>
                    <Text style={styles.itemTitle}>{t.name}</Text>
                    <Text style={styles.itemSub}>Division: {t.division}</Text>
                  </View>
                  <Text style={styles.itemBadge}>Active Team</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* STEP 4: Invite Coaches */}
        {step === 4 && (
          <View>
            <Text style={styles.stepTitle}>Invite Coaches</Text>
            <Text style={styles.stepSub}>
              Invite head coaches to manage game rosters and communications.
            </Text>

            <View style={styles.addCard}>
              <TextInput
                style={[styles.input, { marginBottom: 8 }]}
                placeholder="Coach Full Name"
                value={newCoachName}
                onChangeText={setNewCoachName}
              />
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Coach Email"
                  value={newCoachEmail}
                  onChangeText={setNewCoachEmail}
                  keyboardType="email-address"
                />
                <TouchableOpacity style={styles.addSmallBtn} onPress={handleAddCoach}>
                  <Text style={styles.addSmallBtnText}>+ Invite</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ gap: 8, marginTop: 12 }}>
              {coaches.map((c) => (
                <View key={c.id} style={styles.itemRow}>
                  <View>
                    <Text style={styles.itemTitle}>{c.name}</Text>
                    <Text style={styles.itemSub}>{c.email}</Text>
                  </View>
                  <Text style={styles.itemBadgeGreen}>Invite Queued</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* STEP 5: Confirmation */}
        {step === 5 && (
          <View style={styles.confirmContainer}>
            <View style={styles.checkCircle}>
              <Text style={styles.checkEmoji}>✓</Text>
            </View>

            <Text style={styles.confirmTitle}>Club Registered!</Text>
            <Text style={styles.confirmSub}>
              <Text style={{ fontWeight: '800' }}>{org.name}</Text> is live with {teams.length} teams and {coaches.length} invited coach(es).
            </Text>

            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => onNavigate('MobileHub', { role: 'club-owner', teamName: org.name })}
            >
              <Text style={styles.doneBtnText}>Launch Club Headquarters</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.homeBtn}
              onPress={() => onNavigate('Entry')}
            >
              <Text style={styles.homeBtnText}>Return to Entry Screen</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Action Button for Steps 1 - 4 */}
        {step < 5 && (
          <View style={{ marginTop: 24 }}>
            <TouchableOpacity style={styles.doneBtn} onPress={handleNext}>
              <Text style={styles.doneBtnText}>
                {step === 4 ? 'Finish Club Setup' : 'Continue'}
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
  itemBadgeGreen: { fontSize: 11, fontWeight: '700', color: COLORS.success, backgroundColor: COLORS.successBg, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
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
