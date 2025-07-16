import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Colors from '@/src/constants/Colors';
import { Fonts } from '@/src/constants/Fonts';
import { useMarkets } from '@/src/hooks/useMarkets';
import BubbleLoader from '@/src/components/BubbleLoader';

export default function MarketDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { markets, loading, error } = useMarkets();

  if (loading) {
    return <BubbleLoader />;
  }
  
  if (error) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  const market = markets.find((m) => m.id === id);

  if (!market) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Market not found</Text>
      </View>
    );
  }

  // ⚡ Opciones mock mientras tu API no las tenga
  const optionYes = { label: 'YES', percentage: 50 };
  const optionNo = { label: 'NO', percentage: 50 };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.options}>
        {/* Título */}
        <Text style={styles.title}>{market.question}</Text>

        {/* Descripción real */}
        <Text style={styles.description}>{market.description}</Text>

        {/* Opción YES */}
        <View style={styles.optionBox}>
          <Text style={styles.optionLabel}>{optionYes.label}</Text>
          <Text style={[styles.optionPercentage, { color: Colors.green }]}>
            {optionYes.percentage}%
          </Text>
        </View>

        {/* Opción NO */}
        <View style={styles.optionBox}>
          <Text style={styles.optionLabel}>{optionNo.label}</Text>
          <Text style={[styles.optionPercentage, { color: Colors.red }]}>
            {optionNo.percentage}%
          </Text>
        </View>

        {/* Fecha de expiración */}
        <Text style={styles.expires}>
          Expires: {new Date(market.resolutionTime).toLocaleString()}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  options: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  back: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
    marginBottom: 20,
    fontSize: 16,
  },
  title: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  description: {
    color: Colors.grey,
    fontFamily: Fonts.regular,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
  },
  optionBox: {
    width: '80%',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 255, 0, 0.05)',
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  optionLabel: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: 16,
    marginBottom: 6,
  },
  optionPercentage: {
    fontFamily: Fonts.bold,
    fontSize: 22,
  },
  expires: {
    color: Colors.grey,
    fontFamily: Fonts.regular,
    fontSize: 14,
    marginTop: 30,
    textAlign: 'center',
  },
});
