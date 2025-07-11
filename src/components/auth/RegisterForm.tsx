import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, Info } from 'lucide-react-native';
import Colors from '@/src/constants/Colors';
import { Fonts } from '@/src/constants/Fonts';
import { useAuth } from '@/src/contexts/AuthContext';
import AnimatedButton from '../ui/AnimatedButton';
import AnimatedInput from '../ui/AnimatedInput';
import Animated, { FadeIn } from 'react-native-reanimated';

interface RegisterFormProps {
  onTogglePasswordInfo: () => void;
  onRegistrationSuccess?: (email: string, needsVerification: boolean) => void;
}

export default function RegisterForm({ 
  onTogglePasswordInfo,
  onRegistrationSuccess 
}: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const router = useRouter();
  const { register, isLoading } = useAuth();

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
    
    // Password requirements
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const isValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    
    if (!isValid) {
      setPasswordError('Password does not meet requirements');
    } else {
      setPasswordError(null);
    }
    
    return isValid;
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    const isValid = confirmPassword === password;
    
    if (!isValid) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError(null);
    }
    
    return isValid;
  };

  const handleRegister = async () => {
    // Clear previous errors
    setError(null);
    
    // Validate inputs
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    
    if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }
    
    try {
      // Attempt registration
      const result = await register(email, password);
      
      if (result && result.success) {
        if (onRegistrationSuccess) {
          onRegistrationSuccess(email, result.needsVerification || false);
        } else {
          router.replace('/auth/login');
        }
      }
    } catch (err) {
      console.error('Register screen error:', err);
      
      if (err instanceof Error) {
        if (err.message.includes('email already exists')) {
          setError('This email is already registered. Please use a different email or try logging in.');
        } else if (err.message.includes('500')) {
          setError('The server encountered an error. Please try again later or contact support.');
        } else {
          setError(err.message || 'An unexpected error occurred. Please try again later.');
        }
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setConfirmPasswordError(null);
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
      
      <View style={styles.passwordInputContainer}>
        <AnimatedInput
          label={
            <View style={styles.passwordLabelContainer}>
              <Text style={styles.label}>Password</Text>
              <TouchableOpacity 
                style={styles.infoButton} 
                onPress={onTogglePasswordInfo}
              >
                <Info size={18} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          }
          placeholder="Create a password"
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
      </View>
      
      <AnimatedInput
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
        secureTextEntry={!showConfirmPassword}
        error={confirmPasswordError}
        rightIcon={showConfirmPassword ? 
          <Eye size={20} color={Colors.textSecondary} /> : 
          <EyeOff size={20} color={Colors.textSecondary} />
        }
        onRightIconPress={toggleConfirmPasswordVisibility}
      />
      
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
          title="Create Account"
          onPress={handleRegister}
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
  passwordInputContainer: {
    marginBottom: 0,
  },
  passwordLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
  infoButton: {
    padding: 5,
    marginLeft: 5,
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
    marginTop: 15,
    marginBottom: 20,
  },
}); 