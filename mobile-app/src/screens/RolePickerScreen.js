import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../theme/theme';
import Header from '../components/Header';
import RolePickerCard from '../components/RolePickerCard';

export default function RolePickerScreen({ routeParams, onNavigate, onBack }) {
  const path = routeParams?.path || 'create';
  const isCreate = path === 'create';

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={isCreate ? 'Create Team / League' : 'Find My Team'}
        onBack={onBack}
        showBack={true}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headingBox}>
          <Text style={styles.subBadge}>
            {isCreate ? 'Path A: Leadership Roles' : 'Path B: Participation Roles'}
          </Text>
          <Text style={styles.heading}>
            {isCreate ? 'Select Your Leadership Role' : 'How Are You Joining?'}
          </Text>
          <Text style={styles.lead}>
            {isCreate
              ? 'Choose your administrative level to begin team or league creation.'
              : 'Choose your role to search rosters and connect with your team.'}
          </Text>
        </View>

        {isCreate ? (
          /* Path A: Coach, Club Owner, League Admin */
          <View>
            <RolePickerCard
              title="Coach"
              subtitle="Build a single team roster, customize jersey colors, invite parents via QR code, and organize game days."
              emoji="📋"
              badge="Most Popular"
              accent="yellow"
              onPress={() => onNavigate('CoachFlow')}
            />

            <RolePickerCard
              title="Club Owner"
              subtitle="Establish a multi-team organization or academy, assign age division coaches, and manage central rosters."
              emoji="🏢"
              badge="Multi-Team"
              accent="blue"
              onPress={() => onNavigate('ClubOwnerFlow')}
            />

            <RolePickerCard
              title="League Admin"
              subtitle="Govern regional youth leagues, schedule tournament brackets, register clubs, and enforce official rules."
              emoji="🏆"
              badge="Governance"
              accent="blue"
              onPress={() => onNavigate('LeagueAdminFlow')}
            />
          </View>
        ) : (
          /* Path B: Parent, Player, Fan / Spectator */
          <View>
            <RolePickerCard
              title="Parent"
              subtitle="Connect to your athlete's team via 6-digit code or QR scan, RSVP to games, and pay registration fees."
              emoji="👨‍👩‍👧"
              badge="Primary Contact"
              accent="yellow"
              onPress={() => onNavigate('ParentFlow')}
            />

            <RolePickerCard
              title="Player"
              subtitle="Search your squad by name, select your preferred jersey number, and access upcoming schedules."
              emoji="⚡"
              badge="Athlete"
              accent="blue"
              onPress={() => onNavigate('PlayerFlow')}
            />

            <RolePickerCard
              title="Fan / Spectator"
              subtitle="Follow local teams, receive live game score updates, and view tournament brackets with no account required."
              emoji="📣"
              badge="Lightweight"
              accent="blue"
              onPress={() => onNavigate('FanFlow')}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.slate50,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  headingBox: {
    marginBottom: 20,
  },
  subBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.royalBlue,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  heading: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.darkNavy,
    marginBottom: 6,
  },
  lead: {
    fontSize: 13,
    color: COLORS.slate600,
    lineHeight: 18,
  },
});
