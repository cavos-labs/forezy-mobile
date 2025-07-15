import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { ArrowLeftFromLine } from 'lucide-react-native';
import Colors from '@/src/constants/Colors';
import { Fonts } from '@/src/constants/Fonts';
import AnimatedButton from '@/src/components/ui/AnimatedButton';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function IntroScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <Animated.View 
          style={styles.header}
          entering={FadeIn.delay(200).duration(500)}
        >
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <ArrowLeftFromLine color={Colors.primary} size={24} />
          </TouchableOpacity>
        </Animated.View>
        
        <View style={styles.content}>
          <Animated.Text 
            style={styles.title}
            entering={FadeIn.delay(300).duration(800)}
          >
            What is Forezy?
          </Animated.Text>
          
          <Animated.View 
            style={styles.descriptionContainer}
            entering={FadeIn.delay(400).duration(800)}
          >
            <Text style={styles.description}>
              The easiest way to predict real-world events, earn rewards and build your prediction reputation.
            </Text>
          </Animated.View>
          
          <Animated.View 
            style={styles.featuresContainer}
            entering={FadeIn.delay(500).duration(800)}
          >
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
          </Animated.View>
          
          <Animated.View 
            style={styles.buttonContainer}
            entering={FadeIn.delay(600).duration(800)}
          >
            <Link href="/onboarding/how-to-play" asChild>
              <AnimatedButton
                title="Continue"
                onPress={() => {}}
              />
            </Link>
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
    color: Colors.textPrimary,
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
}); 