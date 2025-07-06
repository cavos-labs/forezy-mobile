import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Image } from 'react-native';
import Colors from '@/constants/Colors';

export default function BubbleLoader() {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, [scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('@/assets/icons/bubble.png')}
        style={[
          styles.bubble,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});
