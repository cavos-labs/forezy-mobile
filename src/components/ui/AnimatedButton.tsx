import React, { useEffect } from 'react';
import { 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  ViewStyle, 
  TextStyle,
  Pressable,
  View
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  Easing,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import Colors from '@/src/constants/Colors';
import { Fonts } from '@/src/constants/Fonts';

interface AnimatedButtonProps {
  onPress: () => void;
  title: string;
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function AnimatedButton({ 
  onPress, 
  title, 
  isLoading = false, 
  disabled = false,
  style,
  textStyle
}: AnimatedButtonProps) {
  // Animation values
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const glowOpacity = useSharedValue(1);
  
  // Update animations when disabled state changes
  useEffect(() => {
    opacity.value = withTiming(disabled ? 0.6 : 1, { duration: 150 });
  }, [disabled]);

  // Button press animation
  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 10, stiffness: 300 });
    glowOpacity.value = withTiming(0.5, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    glowOpacity.value = withTiming(1, { duration: 200 });
  };

  // Animated styles for the entire button
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const animatedGlowStyle = useAnimatedStyle(() => {
    return {
      shadowOpacity: interpolate(
        glowOpacity.value,
        [0.5, 1],
        [0.3, 0.8],
        Extrapolate.CLAMP
      ),
    };
  });

  return (
    <Pressable
      onPress={!disabled && !isLoading ? onPress : undefined}
      onPressIn={!disabled && !isLoading ? handlePressIn : undefined}
      onPressOut={!disabled && !isLoading ? handlePressOut : undefined}
      style={styles.container}
      disabled={disabled || isLoading}
    >
      <Animated.View 
        style={[
          styles.buttonOuter,
          disabled && styles.buttonDisabled,
          animatedGlowStyle,
          animatedContainerStyle,
          style
        ]}
      >
        <View style={styles.buttonInner}>
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  buttonOuter: {
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#39FF14', // Neon green color
    shadowColor: '#39FF14',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'visible',
  },
  buttonDisabled: {
    borderColor: '#555',
    shadowColor: '#555',
  },
  buttonInner: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 40,
    backgroundColor: '#0D0D0D',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.pirulen,
    textAlign: 'center',
    fontWeight: '400',
  },
}); 