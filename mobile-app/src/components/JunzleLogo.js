import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Polygon, Rect, G, Text as SvgText } from 'react-native-svg';
import { COLORS } from '../theme/theme';

export default function JunzleLogo({
  variant = 'light', // 'light' (on white), 'dark' (on navy), or 'icon'
  size = 36,
  showTagline = false,
}) {
  const isDark = variant === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#0D1B3E';

  if (variant === 'icon') {
    return (
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Rect width="100" height="100" rx="22" fill={COLORS.royalBlue} />
        <G transform="translate(18, 16) scale(0.68)">
          <Path d="M 0 68 L 22 68 L 18 73 L -4 73 Z" fill={COLORS.canaryYellow} />
          <Path d="M 8 58 L 28 58 L 24 63 L 4 63 Z" fill="#FFFFFF" />
          <G transform="skewX(-13) translate(14, 0)">
            <Path d="M 32 10 L 68 10 L 65 22 L 53 22 L 48 42 L 40 42 L 43 30 L 43 22 L 32 22 Z" fill="#FFFFFF" />
            <Path d="M 53 22 L 65 22 L 60 40 L 48 40 Z" fill="#FFFFFF" />
            <Path d="M 46 48 L 57 48 L 53 60 C 51 68, 44 74, 34 74 C 23 74, 16 67, 18 57 L 29 57 C 28 61, 31 64, 35 64 C 39 64, 42 61, 43 57 Z" fill="#FFFFFF" />
            <Polygon points="47,38 62,38 52,48 60,48 44,66 49,50 42,50" fill={COLORS.canaryYellow} />
          </G>
        </G>
      </Svg>
    );
  }

  const svgWidth = size * 4;
  return (
    <View style={styles.container}>
      <Svg width={svgWidth} height={size} viewBox="0 0 260 65">
        <G transform="translate(2, 4) scale(0.72)">
          <Path d="M 4 72 L 28 72 L 24 78 L 0 78 Z" fill={COLORS.canaryYellow} />
          <Path d="M 12 62 L 34 62 L 30 67 L 8 67 Z" fill={COLORS.royalBlue} />
          <Path d="M 22 52 L 38 52 L 35 56 L 19 56 Z" fill={COLORS.canaryYellow} />

          <G transform="skewX(-13) translate(16, 0)">
            <Path
              d="M 42 12 L 86 12 L 83 26 L 68 26 L 62 50 L 52 50 L 56 36 L 56 26 L 42 26 Z"
              fill={COLORS.royalBlue}
            />
            <Path d="M 68 26 L 83 26 L 77 48 L 63 48 Z" fill={COLORS.royalBlue} />
            <Path
              d="M 60 58 L 74 58 L 70 70 C 68 79, 60 86, 48 86 C 35 86, 26 78, 28 66 L 41 66 C 40 71, 44 74, 49 74 C 54 74, 58 71, 59 66 Z"
              fill={COLORS.royalBlue}
            />
            <Polygon points="61,46 79,46 67,58 77,58 57,80 63,60 55,60" fill={COLORS.canaryYellow} />
          </G>
        </G>

        <SvgText
          x="95"
          y="46"
          fontFamily="System"
          fontSize="40"
          fontWeight="900"
          fontStyle="italic"
          fill={textColor}
        >
          Junzle
        </SvgText>

        <Rect
          x="236"
          y="48"
          width="18"
          height="3.5"
          rx="1.5"
          fill={COLORS.canaryYellow}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
