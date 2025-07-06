import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useMarkets } from '@/hooks/useMarkets';
import { PredictionCard } from '@/components/PredictionCard';
import Colors from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import BubbleLoader from '@/components/BubbleLoader';

export default function TrendingScreen() {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { markets, loading, error } = useMarkets(sortOrder);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  if (loading) {
    return <BubbleLoader />;
  }

  if (error) {
    return (
      <View style={styles.loader}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Logo y bell */}
      <View style={styles.topRow}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        <Image source={require('@/assets/images/bell.png')} style={styles.bell} />
      </View>

      {/* Título */}
      <View style={styles.titleRow}>
        <Text style={styles.titleText}>Trending</Text>
        <Image source={require('@/assets/images/chart.png')} style={styles.chart} />
      </View>

      {/* Filtro sort */}
      <TouchableOpacity onPress={toggleSortOrder} style={styles.sortButton}>
        <Text style={styles.sortText}>
          Sort by Date: {sortOrder === 'asc' ? 'Earliest' : 'Latest'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={markets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PredictionCard market={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
  },
  loader: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    width: '90%',
    alignSelf: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  bell: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  chart: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 35,
  },
  titleText: {
    color: Colors.text,
    fontFamily: Fonts.bold,
    fontSize: 24,
  },
  sortButton: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  sortText: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
  list: {
    paddingBottom: 16,
  },
});
