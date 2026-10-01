import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../theme/theme';

export default function RolePickerCard({
  title,
  subtitle,
  badge,
  onPress,
  accent = 'blue',
  emoji = '🏆',
}) {
  const isYellow = accent === 'yellow';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.topRow}>
        <View style={styles.iconCircle}>
          <Text style={styles.emojiText}>{emoji}</Text>
        </View>

        {badge && (
          <View style={[styles.badge, isYellow ? styles.badgeYellow : styles.badgeBlue]}>
            <Text style={[styles.badgeText, isYellow ? styles.badgeTextDark : styles.badgeTextBlue]}>
              {badge}
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.footerRow}>
        <Text style={styles.actionText}>Select Role ›</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.slate200,
    padding: 20,
    marginBottom: 16,
    shadowColor: COLORS.darkNavy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.slate50,
    borderWidth: 1,
    borderColor: COLORS.slate200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiText: {
    fontSize: 22,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeYellow: {
    backgroundColor: COLORS.canaryYellow,
  },
  badgeBlue: {
    backgroundColor: COLORS.slate100,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  badgeTextDark: {
    color: COLORS.darkNavy,
  },
  badgeTextBlue: {
    color: COLORS.royalBlue,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.darkNavy,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.slate600,
    lineHeight: 18,
    marginBottom: 14,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.royalBlue,
  },
});
