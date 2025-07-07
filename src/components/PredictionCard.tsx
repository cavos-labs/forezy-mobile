import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Market } from '@/src/hooks/useMarkets';
import { Colors } from '@/src/constants/Colors';
import { Fonts } from '@/src/constants/Fonts';

interface Props {
  market: Market;
}

export const PredictionCard: React.FC<Props> = ({ market }) => {
  const router = useRouter();

  // ⚡️ Mientras la API no tenga opciones, pon mock:
  const optionYes = { label: 'YES', percentage: 50 };
  const optionNo = { label: 'NO', percentage: 50 };
  const isYesGreater = optionYes.percentage > optionNo.percentage;

  return (
    <TouchableOpacity onPress={() => router.push(`/prediction/${market.id}`)}>
      <View style={styles.card}>
        <Text style={styles.question}>{market.question}</Text>

        <View style={styles.optionsRow}>
          <View style={styles.optionContainer}>
            <Text style={styles.optionLabel}>
              {optionYes.label}{' '}
              <Text style={{ color: isYesGreater ? Colors.green : Colors.red }}>
                {optionYes.percentage}%
              </Text>
            </Text>
          </View>

          <View style={styles.optionContainer}>
            <Text style={styles.optionLabel}>
              {optionNo.label}{' '}
              <Text style={{ color: !isYesGreater ? Colors.green : Colors.red }}>
                {optionNo.percentage}%
              </Text>
            </Text>
          </View>
        </View>

        <Text style={styles.expires}>
          Expires: {new Date(market.resolutionTime).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(0, 255, 0, 0.07)',
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginVertical: 8,
    width: '85%',
    alignSelf: 'center',
  },
  question: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  optionContainer: {
    flex: 0.45,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 0, 0.05)',
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 10,
    width: '100%',
  },
  optionLabel: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
  expires: {
    color: Colors.grey,
    marginTop: 15,
    fontFamily: Fonts.regular,
    fontSize: 14,
    textAlign: 'center',
  },
});
