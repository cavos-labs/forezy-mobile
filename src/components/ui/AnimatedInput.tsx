import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TextInputProps,
  TouchableOpacity
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  interpolateColor,
  Extrapolation,
  interpolate
} from 'react-native-reanimated';
import Colors from '@/src/constants/Colors';
import { Fonts } from '@/src/constants/Fonts';

interface AnimatedInputProps extends TextInputProps {
  label: string | React.ReactNode;
  error?: string | null;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export default function AnimatedInput({ 
  label, 
  error, 
  rightIcon, 
  onRightIconPress,
  value,
  onChangeText,
  ...rest 
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  // Animation values
  const focusAnim = useSharedValue(0);
  const errorAnim = useSharedValue(0);

  // Update animations based on focus and error states
  React.useEffect(() => {
    focusAnim.value = withTiming(isFocused ? 1 : 0, { duration: 200 });
  }, [isFocused]);

  React.useEffect(() => {
    errorAnim.value = withTiming(error ? 1 : 0, { duration: 200 });
  }, [error]);

  // Animated styles
  const containerStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      errorAnim.value,
      [0, 1],
      [
        interpolateColor(
          focusAnim.value,
          [0, 1],
          ['#1A1A1A', Colors.primary]
        ),
        '#FF6B6B'
      ]
    );

    const shadowOpacityValue = interpolate(
      focusAnim.value,
      [0, 1],
      [0, 0.3],
      Extrapolation.CLAMP
    );

    return {
      borderColor,
      shadowOpacity: shadowOpacityValue,
      transform: [
        { scale: 1 + focusAnim.value * 0.01 }
      ]
    };
  });

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Render the label based on its type
  const renderLabel = () => {
    if (typeof label === 'string') {
      return <Text style={styles.label}>{label}</Text>;
    } else {
      return label;
    }
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Animated.View style={[styles.inputContainer, containerStyle]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {rightIcon && (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </Animated.View>
      {error && (
        <Animated.Text 
          style={[
            styles.errorText,
            { opacity: errorAnim }
          ]}
        >
          {error}
        </Animated.Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontFamily: Fonts.regular,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    flex: 1,
    color: Colors.textPrimary,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
  iconButton: {
    padding: 10,
    marginRight: 5,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    fontFamily: Fonts.regular,
    marginTop: 5,
    marginLeft: 5,
  }
}); 