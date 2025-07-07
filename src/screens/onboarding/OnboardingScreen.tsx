import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Link } from 'expo-router';
import Colors from '@/src/constants/Colors';
import { Fonts } from '@/src/constants/Fonts';

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>        
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../../src/assets/images/forezy-logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.bottomSection}>
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By continuing you confirm that you agree to{' '}
              </Text>
              <Text style={styles.greenText}>Terms & Conditions</Text>
              <Text style={styles.termsText}> and </Text>
              <Text style={styles.greenText}>Privacy Policy</Text>
            </View>
            
            <View style={styles.buttonContainer}>
              <Link href="/onboarding/intro" asChild>
                <TouchableOpacity style={styles.buttonOuter}>
                  <View style={styles.buttonInner}>
                    <Text style={styles.buttonText}>Get Started</Text>
                  </View>
                </TouchableOpacity>
              </Link>
            </View>
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
    padding: 15, // Add padding to allow the glow to be visible
    alignItems: 'center',
  },
  buttonOuter: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10,
    overflow: 'visible',
  },
  buttonInner: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: '#0D0D0D',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#C1D1CE',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 9,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontFamily: Fonts.pirulen,
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 20,
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