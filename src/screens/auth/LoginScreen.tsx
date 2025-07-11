import React from 'react';
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
import { Link as ExpoLink } from 'expo-router';
import Colors from '@/src/constants/Colors';
import { Fonts } from '@/src/constants/Fonts';
import LoginForm from '@/src/components/auth/LoginForm';
import Animated, { 
  FadeInDown, 
  FadeIn
} from 'react-native-reanimated';

export default function LoginScreen() {
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
                Sign In
              </Animated.Text>
              
              <LoginForm />
              
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>
                  Don't have an account?{' '}
                </Text>
                <ExpoLink href="/auth/register" asChild>
                  <TouchableOpacity>
                    <Text style={styles.registerLink}>Register</Text>
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
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  registerText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
  registerLink: {
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
  },
}); 