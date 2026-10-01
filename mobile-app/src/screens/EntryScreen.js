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
import { COLORS } from '../theme/theme';

export default function EntryScreen({ onNavigate }) {
  const [selectedRole, setSelectedRole] = useState('coach'); // 'coach', 'parent', 'admin'

  const handleGetStarted = () => {
    if (selectedRole === 'coach') {
      onNavigate('CoachFlow');
    } else if (selectedRole === 'parent') {
      onNavigate('ParentFlow');
    } else if (selectedRole === 'admin') {
      onNavigate('RolePicker', { path: 'create' });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topSection}>
          {/* Top Wordmark Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/dark-logo.png')}
              style={styles.wordmarkLogo}
              resizeMode="contain"
            />
          </View>

          {/* Headings */}
          <View style={styles.headingBlock}>
            <Text style={styles.headingTitle}>Welcome to</Text>
            <Text style={styles.headingBrand}>Junzle</Text>
            <Text style={styles.headingSub}>
              The all-in-one platform to manage your sports teams.
            </Text>
          </View>

          {/* Main Selection Container Card */}
          {/* Dimensions: width 370, height 356, border-radius 8, padding 16, gap 16, color #0D1B3E */}
          <View style={styles.mainSelectionCard}>
            <View style={styles.selectionCardHeader}>
              <Text style={styles.selectionTitle}>What describes you best?</Text>
              <Text style={styles.selectionSub}>Choose the option that fits your role.</Text>
            </View>

            {/* Card 1: I'm a Coach */}
            <TouchableOpacity
              style={[
                styles.roleCard,
                selectedRole === 'coach' ? styles.roleCardActive : styles.roleCardInactive,
              ]}
              onPress={() => setSelectedRole('coach')}
              activeOpacity={0.85}
            >
              <View style={styles.cardLeftContent}>
                <View
                  style={[
                    styles.iconContainer,
                    selectedRole === 'coach' ? styles.iconContainerActive : styles.iconContainerInactive,
                  ]}
                >
                  <Image
                    source={require('../../assets/coach.png')}
                    style={styles.cardIcon}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.cardTextContent}>
                  <Text style={styles.roleCardTitle}>I'm a Coach</Text>
                  <Text style={styles.roleCardDesc} numberOfLines={2}>
                    Manage teams, players, events and communicate with parents.
                  </Text>
                </View>
              </View>

              {/* Selection Tick / Radio */}
              {selectedRole === 'coach' ? (
                <Image
                  source={require('../../assets/tick.png')}
                  style={styles.tickIcon}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.radioEmpty} />
              )}
            </TouchableOpacity>

            {/* Card 2: I'm a Parent or Guardian */}
            <TouchableOpacity
              style={[
                styles.roleCard,
                selectedRole === 'parent' ? styles.roleCardActive : styles.roleCardInactive,
              ]}
              onPress={() => setSelectedRole('parent')}
              activeOpacity={0.85}
            >
              <View style={styles.cardLeftContent}>
                <View
                  style={[
                    styles.iconContainer,
                    selectedRole === 'parent' ? styles.iconContainerActive : styles.iconContainerInactive,
                  ]}
                >
                  <Image
                    source={require('../../assets/parent.png')}
                    style={styles.cardIcon}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.cardTextContent}>
                  <Text style={styles.roleCardTitle}>I'm a Parent or Guardian</Text>
                  <Text style={styles.roleCardDesc} numberOfLines={2}>
                    Stay updated on your child's team, events and communications.
                  </Text>
                </View>
              </View>

              {/* Selection Tick / Radio */}
              {selectedRole === 'parent' ? (
                <Image
                  source={require('../../assets/tick.png')}
                  style={styles.tickIcon}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.radioEmpty} />
              )}
            </TouchableOpacity>

            {/* Card 3: I'm an Administrator */}
            <TouchableOpacity
              style={[
                styles.roleCard,
                selectedRole === 'admin' ? styles.roleCardActive : styles.roleCardInactive,
              ]}
              onPress={() => setSelectedRole('admin')}
              activeOpacity={0.85}
            >
              <View style={styles.cardLeftContent}>
                <View
                  style={[
                    styles.iconContainer,
                    selectedRole === 'admin' ? styles.iconContainerActive : styles.iconContainerInactive,
                  ]}
                >
                  <Image
                    source={require('../../assets/admin.png')}
                    style={styles.cardIcon}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.cardTextContent}>
                  <Text style={styles.roleCardTitle}>I'm an Administrator</Text>
                  <Text style={styles.roleCardDesc} numberOfLines={2}>
                    Oversee organization, team and system settings.
                  </Text>
                </View>
              </View>

              {/* Selection Tick / Radio */}
              {selectedRole === 'admin' ? (
                <Image
                  source={require('../../assets/tick.png')}
                  style={styles.tickIcon}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.radioEmpty} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom CTA Button - Anchored to the bottom */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.getStartedBtn}
            onPress={handleGetStarted}
            activeOpacity={0.85}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
            <Text style={styles.getStartedArrow}>→</Text>
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.loginQuestion}>Already have an account? </Text>
            <TouchableOpacity onPress={() => alert('Log In screen — enter email & password.')}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>

          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 24 : 16,
    paddingBottom: Platform.OS === 'web' ? 28 : 20,
    alignItems: 'center',
  },
  topSection: {
    width: '100%',
    alignItems: 'center',
  },

  /* Top Wordmark Logo */
  logoContainer: {
    width: '100%',
    maxWidth: 370,
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  wordmarkLogo: {
    width: 114,
    height: 40,
  },

  /* Headings */
  headingBlock: {
    width: '100%',
    maxWidth: 370,
    marginBottom: 20,
  },
  headingTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0D1B3E',
    lineHeight: 34,
  },
  headingBrand: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1A56DB',
    marginBottom: 8,
  },
  headingSub: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },

  /* Main Selection Container Card:
     width: 370; height: 356; angle: 0 deg; opacity: 1; gap: 16px; border-radius: 8px; padding: 16px; use this color #0D1B3E
  */
  mainSelectionCard: {
    width: 370,
    height: 356,
    opacity: 1,
    borderRadius: 8,
    padding: 16,
    gap: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignSelf: 'center',
    shadowColor: '#0D1B3E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectionCardHeader: {
    marginBottom: 0,
  },
  selectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0D1B3E',
    marginBottom: 2,
  },
  selectionSub: {
    fontSize: 12,
    color: '#64748B',
  },

  /* Cards inside container:
     width: 338; height: 78; justify-content: space-between; angle: 0 deg; opacity: 1; border-radius: 8px; padding: 12px; border-width: 1px;
  */
  roleCard: {
    width: 338,
    height: 78,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    opacity: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  roleCardActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#1A56DB',
  },
  roleCardInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
  },
  cardLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },

  /* Icon box inside card */
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconContainerActive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  iconContainerInactive: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  /* Card logo image: width: 20; height: 20; angle: 0 deg; opacity: 1; */
  cardIcon: {
    width: 20,
    height: 20,
    opacity: 1,
  },

  /* Text inside card */
  cardTextContent: {
    flex: 1,
  },
  roleCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0D1B3E',
    marginBottom: 2,
  },
  roleCardDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },

  /* Exact same tick image: width: 20; height: 20; */
  tickIcon: {
    width: 20,
    height: 20,
    opacity: 1,
  },

  /* Unselected radio empty circle: width: 20, height: 20 */
  radioEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },

  /* Bottom Actions */
  bottomSection: {
    width: 370,
    marginTop: 20,
    alignSelf: 'center',
  },
  getStartedBtn: {
    backgroundColor: '#1A56DB',
    borderRadius: 12,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#1A56DB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  getStartedText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  getStartedArrow: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginQuestion: {
    fontSize: 13,
    color: '#64748B',
  },
  loginLink: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1A56DB',
  },
  browseAllRolesBtn: {
    marginTop: 14,
    alignItems: 'center',
    paddingVertical: 8,
  },
  browseAllRolesText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    textDecorationLine: 'underline',
  },
});
