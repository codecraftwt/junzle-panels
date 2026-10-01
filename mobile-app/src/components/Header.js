import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar, Image } from 'react-native';

export default function Header({
  onBack,
  showBack = true,
  currentStep = 1,
  totalSteps = 4,
  showStepper = true,
  rightComponent = null,
}) {
  return (
    <View style={styles.safeAreaWrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
      <View style={styles.headerContainer}>
        <View style={styles.topRow}>
          {/* Left Back Arrow Button (Figma rounded square card) */}
          <View style={styles.leftCol}>
            {showBack && (
              <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
                <Text style={styles.backChevron}>‹</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Center: Junzle Dark Logo + Stepper with solid dot indicators */}
          <View style={[styles.centerCol, showStepper && totalSteps > 1 && styles.centerColWithStepper]}>
            {/* Junzle Dark Logo — clipped to the Figma frame (asset has 13% transparent bottom pad) */}
            <View style={styles.logoFrame}>
              <Image
                source={require('../../assets/dark-logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            {/* Stepper — connecting track with solid rounded dots */}
            {showStepper && totalSteps > 1 && (
              <View style={styles.stepperContainer}>
                <View style={styles.stepperTrackLine} />
                <View style={styles.stepperTrackFill}>
                  <View
                    style={[
                      styles.stepperTrackFillBar,
                      { width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` },
                    ]}
                  />
                </View>
                <View style={styles.dotsRow}>
                  {Array.from({ length: totalSteps }).map((_, index) => {
                    const stepIndex = index + 1;
                    const isActive = stepIndex <= currentStep;

                    return (
                      <View
                        key={index}
                        style={[
                          styles.stepDot,
                          isActive ? styles.stepDotActive : styles.stepDotFuture,
                        ]}
                      />
                    );
                  })}
                </View>
              </View>
            )}
          </View>

          {/* Right balance spacer or right component */}
          <View style={styles.rightCol}>
            {rightComponent}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeAreaWrapper: {
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftCol: {
    width: 44,
    alignItems: 'flex-start',
  },
  centerCol: {
    width: 125.06553649902344,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  centerColWithStepper: {
    height: 56.394832611083984,
  },
  rightCol: {
    width: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  backChevron: {
    fontSize: 26,
    color: '#0D1B3E',
    fontWeight: '300',
    marginTop: -3,
    marginLeft: -1,
  },
  logoFrame: {
    width: 125.06553649902344,
    height: 34.394832611083984,
    overflow: 'hidden',
  },
  logoImage: {
    width: 125.06553649902344,
    height: 39.63,
  },
  stepperContainer: {
    width: 125.06553649902344,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  stepperTrackLine: {
    position: 'absolute',
    left: 8,
    right: 8,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#E2E8F0',
    top: 4,
  },
  stepperTrackFill: {
    position: 'absolute',
    left: 8,
    right: 8,
    top: 4,
    height: 2,
    zIndex: 0,
  },
  stepperTrackFillBar: {
    height: 2,
    borderRadius: 1,
    backgroundColor: '#2B7FFF',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
    zIndex: 1,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stepDotActive: {
    backgroundColor: '#2B7FFF',
  },
  stepDotFuture: {
    backgroundColor: '#CBD5E1',
  },
});
