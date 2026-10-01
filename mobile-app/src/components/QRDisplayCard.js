import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../theme/theme';
import RealQRCode from './RealQRCode';

export default function QRDisplayCard({ joinCode = 'TB2023', teamName = 'Baltimore Tigers', joinUrl, primaryColor = COLORS.royalBlue }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const qrValue = joinUrl || `https://junzle.app/join/${joinCode}`;

  return (
    <View style={styles.container}>
      {/* QR Code Graphic Box */}
      <View style={styles.qrBox}>
        <RealQRCode value={qrValue} size={160} />
        <Text style={styles.qrLabel}>Scan to Join {teamName}</Text>
      </View>

      {/* Code Display */}
      <View style={styles.codeRow}>
        <View>
          <Text style={styles.codeSub}>TEAM INVITE CODE</Text>
          <Text style={styles.codeText}>{joinCode}</Text>
        </View>

        <TouchableOpacity onPress={handleCopy} style={styles.copyBtn}>
          <Text style={styles.copyBtnText}>{copied ? 'Copied!' : 'Copy Code'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.shareSub}>
        Share this code or QR in team group chats, emails, or printed hand-outs.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.slate200,
  },
  qrBox: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.slate200,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: COLORS.darkNavy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  qrLabel: {
    marginTop: 8,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.slate600,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: COLORS.slate50,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.slate200,
    marginBottom: 12,
  },
  codeSub: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.royalBlue,
  },
  codeText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.darkNavy,
    letterSpacing: 2,
    marginTop: 2,
  },
  copyBtn: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.slate300,
  },
  copyBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.royalBlue,
  },
  shareSub: {
    fontSize: 12,
    color: COLORS.slate600,
    textAlign: 'center',
    lineHeight: 16,
  },
});
