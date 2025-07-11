import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Link as ExpoLink, useRouter } from 'expo-router';
import Colors from '@/src/constants/Colors';
import { Fonts } from '@/src/constants/Fonts';
import RegisterForm from '@/src/components/auth/RegisterForm';
import PasswordInfoModal from '@/src/components/auth/PasswordInfoModal';
import EmailVerificationScreen from '@/src/components/auth/EmailVerificationScreen';
import Animated, { 
  FadeInDown, 
  FadeIn
} from 'react-native-reanimated';

export default function RegisterScreen() {
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const router = useRouter();

  const togglePasswordInfo = () => {
    setShowPasswordInfo(!showPasswordInfo);
  };

  const handleRegistrationSuccess = (email: string, needsVerification: boolean) => {
    if (needsVerification) {
      setRegisteredEmail(email);
      setVerificationSent(true);
    } else {
      router.replace('/auth/login');
    }
  };

  // If verification has been sent, show verification screen
  if (verificationSent) {
    return <EmailVerificationScreen email={registeredEmail} />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoid}
          >
            <View style={styles.content}>
              <Animated.Text 
                style={styles.title}
                entering={FadeIn.delay(300).duration(800)}
              >
                Create Account
              </Animated.Text>
              
              <RegisterForm 
                onTogglePasswordInfo={togglePasswordInfo}
                onRegistrationSuccess={handleRegistrationSuccess}
              />
              
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>
                  Already have an account?{' '}
                </Text>
                <ExpoLink href="/auth/login" asChild>
                  <TouchableOpacity>
                    <Text style={styles.loginLink}>Sign In</Text>
                  </TouchableOpacity>
                </ExpoLink>
              </View>
              
              <Animated.View 
                style={styles.logoContainer}
                entering={FadeInDown.duration(800).springify()}
              >
                <Image 
                  source={require('@/src/assets/images/forezy-logo.png')} 
                  style={styles.logo}
                  resizeMode="contain"
                />
              </Animated.View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>

        {/* Password Requirements Modal */}
        <PasswordInfoModal 
          visible={showPasswordInfo} 
          onClose={togglePasswordInfo} 
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  loginText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
  loginLink: {
    color: Colors.primary,
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  }
}); 
