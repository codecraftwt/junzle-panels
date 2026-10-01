import React, { useMemo } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Svg, { Rect, Path, G } from 'react-native-svg';
import { toQR } from 'toqr';

export default function RealQRCode({
  value = 'https://junzle.app/join/TB2023',
  size = 220,
  color = '#0D1B3E',
  backgroundColor = '#FFFFFF',
  borderRadius = 16,
  showLogo = true,
  logoSize = 44,
}) {
  const { path, gridSize } = useMemo(() => {
    try {
      const matrix = toQR(value);
      const dimension = Math.round(Math.sqrt(matrix.length));
      let svgPath = '';
      for (let y = 0; y < dimension; y++) {
        for (let x = 0; x < dimension; x++) {
          if (matrix[y * dimension + x]) {
            svgPath += `M${x} ${y}h1v1h-1z `;
          }
        }
      }
      return { path: svgPath, gridSize: dimension };
    } catch (e) {
      console.error('Failed to generate QR code:', e);
      return { path: '', gridSize: 25 };
    }
  }, [value]);

  const padding = 2; // quiet zone
  const totalGrid = gridSize + padding * 2;

  return (
    <View style={[styles.wrapper, { width: size, height: size, borderRadius, backgroundColor }]}>
      <Svg
        width={size}
        height={size}
        viewBox={`-${padding} -${padding} ${totalGrid} ${totalGrid}`}
      >
        <Rect
          x={-padding}
          y={-padding}
          width={totalGrid}
          height={totalGrid}
          fill={backgroundColor}
          rx={3}
        />
        <Path d={path} fill={color} />
      </Svg>

      {/* Center Junzle Badge */}
      {showLogo && (
        <View
          style={[
            styles.logoContainer,
            {
              width: logoSize,
              height: logoSize,
              borderRadius: logoSize / 2,
            },
          ]}
        >
          <View style={styles.logoCircle}>
            <Image
              source={require('../../assets/tiger-logo.png')}
              style={{ width: logoSize - 8, height: logoSize - 8, borderRadius: (logoSize - 8) / 2 }}
              resizeMode="cover"
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  logoContainer: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  logoCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: '#0D1B3E',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
