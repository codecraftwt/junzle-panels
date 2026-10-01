import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const RETHINK = Platform.OS === 'web' ? 'Rethink Sans, sans-serif' : undefined;
const JAKARTA = Platform.OS === 'web' ? 'Plus Jakarta Sans, sans-serif' : undefined;

export default function ScreenHeading({ title, subtitle, containerStyle, titleStyle, subtitleStyle }) {
  return (
    <View style={[styles.container, containerStyle]}>
      {Boolean(title) && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      {Boolean(subtitle) && <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    gap: 8,
  },
  title: {
    fontFamily: RETHINK,
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: 0,
    color: '#0D1B3E',
  },
  subtitle: {
    fontFamily: JAKARTA,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.24, // -1.5% of 16px
    color: '#64748B',
  },
});
