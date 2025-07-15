import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar } from 'react-native';
import { Link } from 'expo-router';
import Colors from '@/src/constants/Colors';
import { Fonts } from '@/src/constants/Fonts';
import AnimatedButton from '@/src/components/ui/AnimatedButton';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>        
        <View style={styles.content}>
          <Animated.View 
            style={styles.logoContainer}
            entering={FadeIn.delay(300).duration(800)}
          >
            <Image 
              source={require('../../../src/assets/images/forezy-logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>
          
          <View style={styles.bottomSection}>
            <Animated.View 
              style={styles.termsContainer}
              entering={FadeIn.delay(400).duration(800)}
            >
              <Text style={styles.termsText}>
                By continuing you confirm that you agree to{' '}
              </Text>
              <Text style={styles.greenText}>Terms & Conditions</Text>
              <Text style={styles.termsText}> and </Text>
              <Text style={styles.greenText}>Privacy Policy</Text>
            </Animated.View>
            
            <Animated.View 
              style={styles.buttonContainer}
              entering={FadeIn.delay(500).duration(800)}
            >
              <Link href="/onboarding/intro" asChild>
                <AnimatedButton
                  title="Get Started"
                  onPress={() => {}}
                />
              </Link>
            </Animated.View>
          </View>
        </View>
        
        {/* Home indicator */}
        <View style={styles.homeIndicator}>
          <View style={styles.homeIndicatorBar} />
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
  logoContainer: {
    width: '100%',
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
  logo: {
    width: 300,
    height: 300,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  termsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    color: 'white',
    fontSize: 12,
    fontFamily: Fonts.regular,
    lineHeight: 20,
  },
  greenText: {
    color: Colors.primary,
    fontSize: 12,
    fontFamily: Fonts.regular,
    lineHeight: 20,
  },
  buttonContainer: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
  },
  homeIndicator: {
    height: 34,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIndicatorBar: {
    width: 134,
    height: 5,
    backgroundColor: 'white',
    borderRadius: 100,
  },
}); 