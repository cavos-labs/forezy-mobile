import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet
} from 'react-native';
import { useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import Colors from '@/src/constants/Colors';
import { Fonts } from '@/src/constants/Fonts';
import { useAuth } from '@/src/contexts/AuthContext';
import AnimatedButton from '../ui/AnimatedButton';
import AnimatedInput from '../ui/AnimatedInput';
import Animated, { FadeIn } from 'react-native-reanimated';

interface LoginFormProps {}

export default function LoginForm({}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const validateEmail = (email: string) => {
    // Check for spaces
    if (email.includes(' ')) {
      setEmailError('Email cannot contain spaces');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    if (!isValid) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError(null);
    }
    
    return isValid;
  };

  const validatePassword = (password: string) => {
    // Check for spaces
    if (password.includes(' ')) {
      setPasswordError('Password cannot contain spaces');
      return false;
    }
    
    // For login, we just check if password is not empty
    const isValid = password.length > 0;
    
    if (!isValid) {
      setPasswordError('Please enter your password');
    } else {
      setPasswordError(null);
    }
    
    return isValid;
  };

  const handleLogin = async () => {
    // Clear previous errors
    setError(null);
    
    // Validate inputs
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    
    try {
      // Attempt login
      const success = await login(email, password);
      
      if (success) {
        router.replace('/(tabs)');
      } else {
        // Don't set error here, as the AuthContext will handle specific error messages
        // The login function will show appropriate alerts for different error types
      }
    } catch (err) {
      console.error('Login screen error:', err);
      
      // Check if this is a server error (500)
      if (err instanceof Error && err.message.includes('500')) {
        setError('The server encountered an error. This might be due to an issue with Auth0 email verification. Please try again later or contact support.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(null);
    setError(null);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(null);
    setError(null);
  };

  return (
    <Animated.View 
      style={styles.formContainer}
      entering={FadeIn.duration(500)}
    >
      <AnimatedInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        error={emailError}
      />
      
      <AnimatedInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry={!showPassword}
        error={passwordError}
        rightIcon={showPassword ? 
          <Eye size={20} color={Colors.textSecondary} /> : 
          <EyeOff size={20} color={Colors.textSecondary} />
        }
        onRightIconPress={togglePasswordVisibility}
      />
      
      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </View>
      
      {error && (
        <Animated.View 
          style={styles.errorContainer}
          entering={FadeIn.duration(300)}
        >
          <Text style={styles.errorText}>{error}</Text>
        </Animated.View>
      )}
      
      <View style={styles.buttonContainer}>
        <AnimatedButton
          title="Sign In"
          onPress={handleLogin}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 25,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
  errorContainer: {
    marginBottom: 25,
    padding: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 0, 0.3)',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontFamily: Fonts.regular,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
}); 