import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/src/constants/Colors';
import { Fonts } from '@/src/constants/Fonts';

interface HeaderProps {
  title: string;
  icon: any;
}

export const Header: React.FC<HeaderProps> = ({ title, icon }) => {
  return (
    <View>
      {/* Top Row: Logo y campana */}
      <View style={styles.topRow}>
        <Image
          source={require('@/src/assets/images/logo.png')}
          style={styles.logo}
        />
        <TouchableOpacity>
          <Image
            source={require('@/src/assets/images/bell.png')}
            style={styles.bell}
          />
        </TouchableOpacity>
      </View>

      {/* Título dinámico */}
      <View style={styles.titleRow}>
        <Text style={styles.titleText}>{title}</Text>
        <Image source={icon} style={styles.chart} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    tintColor: Colors.primary,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 35,
  },
  titleText: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: 24,
  },
  chart: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginLeft: 8,
  },
});
