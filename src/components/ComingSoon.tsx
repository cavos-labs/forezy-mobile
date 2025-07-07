import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/src/constants/Colors';
import { Fonts } from '@/src/constants/Fonts';

interface ComingSoonProps {
  title?: string;
}

export default function ComingSoon({ title = 'Coming Soon' }: ComingSoonProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.primary, 
    fontFamily: Fonts.bold, 
    fontSize: 24,
  },
});
