import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { ArrowLeftFromLine } from 'lucide-react-native';
import Colors from '@/src/constants/Colors';
import { Fonts } from '@/src/constants/Fonts';

export default function IntroScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <ArrowLeftFromLine color={Colors.primary} size={24} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>What is Forezy?</Text>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              The easiest way to predict real-world events, earn rewards and build your prediction reputation.
            </Text>
          </View>
          
          <View style={styles.featuresContainer}>
            <Text style={styles.featureTitle}>Predict</Text>
            <Text style={styles.featureDescription}>
              Make predictions on real-world events across markets, sports, crypto, and more.
            </Text>
            
            <Text style={styles.featureTitle}>Earn</Text>
            <Text style={styles.featureDescription}>
              Win rewards based on your prediction accuracy and participation.
            </Text>
            
            <Text style={styles.featureTitle}>Build</Text>
            <Text style={styles.featureDescription}>
              Establish your reputation as a top predictor in the Starknet ecosystem.
            </Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <Link href="/onboarding/how-to-play" asChild>
              <TouchableOpacity style={styles.buttonOuter}>
                <View style={styles.buttonInner}>
                  <Text style={styles.buttonText}>Continue</Text>
                </View>
              </TouchableOpacity>
            </Link>
          </View>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    marginBottom: 30,
    textAlign: 'center',
  },
  descriptionContainer: {
    marginBottom: 40,
    width: '100%',
  },
  description: {
    fontSize: 18,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 26,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 40,
  },
  featureTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    marginBottom: 8,
    marginTop: 20,
  },
  featureDescription: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
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
}); 