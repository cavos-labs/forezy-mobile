import { Tabs } from 'expo-router';
import { Image, View, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import Colors from '@/src/constants/Colors';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    'Orbitron-Regular': require('@/src/assets/fonts/Orbitron-Regular.ttf'),
    'Orbitron-Bold': require('@/src/assets/fonts/Orbitron-Bold.ttf'),
  });

  if (!fontsLoaded) { 
    <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
        <StatusBar style="light" backgroundColor="#000000" translucent={false} />
        <Tabs
              screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                  borderWidth: 2,            
                  borderColor: Colors.primary, 
                  borderRadius: 20,          
                  marginHorizontal: 16,      
                  height: 70,                
                  paddingBottom: 20,        
                  paddingTop: 10,
                  marginBottom: 15,
                  marginTop: 5,
                  overflow: 'visible',

                  // Neon glow (outer)
                  shadowColor: Colors.green,
                  shadowOpacity: 0.5,
                  shadowOffset: { width: 0, height: 0 },
                  shadowRadius: 12,
                },
              }}
              >
              <Tabs.Screen
                name="index"
                options={{
                  tabBarIcon: ({ focused }) => (
                    <View style={styles.iconWrapper}>
                      {focused && (
                        <Image
                          source={require('@/src/assets/icons/bubble.png')}
                          style={styles.bubble}
                        />
                      )}
                      <Image
                        source={require('@/src/assets/icons/home.png')}
                        style={[
                          styles.icon,
                          focused && {
                            tintColor: Colors.primary,
                            transform: [{ translateY: -10 }], 
                            width: 60, 
                            height: 60,
                          },
                        ]}
                      />
                    </View>
                  ),
                }}
              />

              <Tabs.Screen
                name="portfolio"
                options={{
                  tabBarIcon: ({ focused }) => (
                    <View style={styles.iconWrapper}>
                      {focused && (
                        <Image
                          source={require('@/src/assets/icons/bubble.png')}
                          style={styles.bubble}
                        />
                      )}
                      <Image
                        source={require('@/src/assets/icons/dollar.png')}
                        style={[
                          styles.icon,
                          focused && {
                            tintColor: Colors.primary,
                            transform: [{ translateY: -10 }],
                            width: 60,
                            height: 60,
                          },
                        ]}
                      />
                    </View>
                  ),
                }}
              />

              <Tabs.Screen
                name="predictions"
                options={{
                  tabBarIcon: ({ focused }) => (
                    <View style={styles.iconWrapper}>
                      {focused && (
                        <Image
                          source={require('@/src/assets/icons/bubble.png')}
                          style={styles.bubble}
                        />
                      )}
                      <Image
                        source={require('@/src/assets/icons/cloud.png')}
                        style={[
                          styles.icon,
                          focused && {
                            tintColor: Colors.primary,
                            transform: [{ translateY: -10 }],
                            width: 60,
                            height: 60,
                          },
                        ]}
                      />
                    </View>
                  ),
                }}
              />

              <Tabs.Screen
                name="profile"
                options={{
                  tabBarIcon: ({ focused }) => (
                    <View style={styles.iconWrapper}>
                      {focused && (
                        <Image
                          source={require('@/src/assets/icons/bubble.png')}
                          style={styles.bubble}
                        />
                      )}
                      <Image
                        source={require('@/src/assets/icons/user.png')}
                        style={[
                          styles.icon,
                          focused && {
                            tintColor: Colors.primary,
                            transform: [{ translateY: -10 }],
                            width: 60,
                            height: 60,
                          },
                        ]}
                      />
                    </View>
                  ),
                }}
              />
        </Tabs>
      </SafeAreaView>
    </View>
  );

}

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  bubble: {
    position: 'absolute',
    width: 80,
    height: 80,
    resizeMode: 'contain',
    transform: [{ translateY: -10 }]
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  tabBarWrapper: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 15,
    overflow: 'hidden',
  },
});
