import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail } from 'lucide-react-native';
import Colors from '@/src/constants/Colors';
import { Fonts } from '@/src/constants/Fonts';
import Animated, { 
  FadeIn, 
  FadeInDown, 
  ZoomIn,
  SlideInUp
} from 'react-native-reanimated';
import AnimatedButton from '../ui/AnimatedButton';

interface EmailVerificationScreenProps {
  email: string;
}

export default function EmailVerificationScreen({ email }: EmailVerificationScreenProps) {
  const router = useRouter();
  
  const goToLogin = () => {
    router.replace('/auth/login');
  };
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Animated.View 
            style={styles.verificationContainer}
            entering={FadeIn.duration(500)}
          >
            <Animated.View
              entering={ZoomIn.delay(300).duration(800)}
              style={styles.iconContainer}
            >
              <Mail size={80} color={Colors.primary} style={styles.verificationIcon} />
            </Animated.View>
            
            <Animated.Text 
              style={styles.verificationTitle}
              entering={FadeInDown.delay(400).duration(800)}
            >
              Verify Your Email
            </Animated.Text>
            
            <Animated.Text 
              style={styles.verificationText}
              entering={FadeInDown.delay(500).duration(800)}
            >
              We've sent a verification email to:
            </Animated.Text>
            
            <Animated.Text 
              style={styles.verificationEmail}
              entering={FadeInDown.delay(600).duration(800)}
            >
              {email}
            </Animated.Text>
            
            <Animated.Text 
              style={styles.verificationInstructions}
              entering={FadeInDown.delay(700).duration(800)}
            >
              Please check your inbox and click the verification link to complete your registration.
              After verifying your email, you can proceed to login.
            </Animated.Text>
            
            <Animated.View 
              style={styles.buttonContainer}
              entering={SlideInUp.delay(800).springify()}
            >
              <AnimatedButton
                title="Go to Login"
                onPress={goToLogin}
              />
            </Animated.View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verificationContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  iconContainer: {
    marginBottom: 20,
  },
  verificationIcon: {
    marginBottom: 20,
  },
  verificationTitle: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  verificationText: {
    color: Colors.textSecondary,
    fontSize: 16,
    fontFamily: Fonts.regular,
    marginBottom: 10,
    textAlign: 'center',
  },
  verificationEmail: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontFamily: Fonts.bold,
    marginBottom: 25,
    textAlign: 'center',
  },
  verificationInstructions: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontFamily: Fonts.regular,
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
}); 