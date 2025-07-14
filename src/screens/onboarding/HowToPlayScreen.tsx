import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { ArrowLeftFromLine } from 'lucide-react-native';
import Colors from '@/src/constants/Colors';
import { Fonts } from '@/src/constants/Fonts';
import AnimatedButton from '@/src/components/ui/AnimatedButton';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function HowToPlayScreen() {
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
        
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <Animated.Text 
            style={styles.title}
            entering={FadeIn.delay(300).duration(800)}
          >
            How to Play
          </Animated.Text>
          
          <Animated.View 
            style={styles.stepContainer}
            entering={FadeIn.delay(400).duration(500)}
          >
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Browse Markets</Text>
              <Text style={styles.stepDescription}>
                Explore various prediction markets across different categories like sports, crypto, politics, and more.
              </Text>
            </View>
          </Animated.View>
          
          <Animated.View 
            style={styles.stepContainer}
            entering={FadeIn.delay(450).duration(500)}
          >
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Choose Your Position</Text>
              <Text style={styles.stepDescription}>
                Select your prediction: YES or NO. Each position has odds that determine your potential payout.
              </Text>
            </View>
          </Animated.View>
          
          <Animated.View 
            style={styles.stepContainer}
            entering={FadeIn.delay(500).duration(500)}
          >
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Place Your Prediction</Text>
              <Text style={styles.stepDescription}>
                Decide how much to stake on your prediction. Higher stakes mean higher potential rewards.
              </Text>
            </View>
          </Animated.View>
          
          <Animated.View 
            style={styles.stepContainer}
            entering={FadeIn.delay(550).duration(500)}
          >
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>4</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Track Your Predictions</Text>
              <Text style={styles.stepDescription}>
                Monitor your active predictions in your portfolio. Watch as markets evolve in real-time.
              </Text>
            </View>
          </Animated.View>
          
          <Animated.View 
            style={styles.stepContainer}
            entering={FadeIn.delay(600).duration(500)}
          >
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>5</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Collect Rewards</Text>
              <Text style={styles.stepDescription}>
                When the market resolves, if your prediction was correct, you'll earn rewards based on your stake and the odds.
              </Text>
            </View>
          </Animated.View>
          
          <Animated.View 
            style={styles.buttonContainer}
            entering={FadeIn.delay(700).duration(800)}
          >
            <Link href="/auth/login" asChild>
              <AnimatedButton
                title="Start Predicting"
                onPress={() => {}}
              />
            </Link>
          </Animated.View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginVertical: 30,
    textAlign: 'center',
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    alignItems: 'flex-start',
  },
  stepNumberContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 5,
  },
  stepNumber: {
    color: '#0D0D0D',
    fontSize: 20,
    fontFamily: Fonts.bold,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
}); 