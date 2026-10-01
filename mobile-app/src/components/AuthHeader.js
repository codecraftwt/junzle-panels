import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';

export default function AuthHeader({ onBack, showBack = true, style }) {
  return (
    <View style={[styles.header, style]}>
      {/* Left Back Button */}
      {showBack ? (
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <Image
            source={require('../../assets/backarrow.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.headerSpacer} />
      )}

      {/* Centered Junzle Logo */}
      <View style={styles.headerCenterLogo}>
        <Image
          source={require('../../assets/dark-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Right Spacer for Symmetry */}
      <View style={styles.headerSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 69,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  backIcon: {
    width: 16,
    height: 16,
    tintColor: '#2B7FFF',
  },
  headerCenterLogo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 38,
  },
  headerSpacer: {
    width: 38,
  },
});
