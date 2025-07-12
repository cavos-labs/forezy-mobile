import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { Pressable, useColorScheme, StatusBar, Image, View, StyleSheet } from 'react-native';
import { Fonts } from '@/src/constants/Fonts';
import Colors from '@/src/constants/Colors';
import { ProtectedRoute } from '@/src/components/auth/ProtectedRoute';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#0D0D0D',
            borderTopWidth: 0,
            height: 60,
            paddingBottom: 10,
            paddingTop: 10,
            borderRadius: 15,
            marginHorizontal: 10,
            marginBottom: 10,
            position: 'absolute',
            shadowColor: Colors.primary,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 10,
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: '#888',
          tabBarLabelStyle: {
            fontFamily: Fonts.regular,
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                icon={require('@/src/assets/icons/home.png')}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="portfolio"
          options={{
            title: 'Portfolio',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                icon={require('@/src/assets/icons/dollar.png')}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="predictions"
          options={{
            title: 'Predictions',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                icon={require('@/src/assets/icons/cloud.png')}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                icon={require('@/src/assets/icons/user.png')}
              />
            ),
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
}

function TabBarIcon(props: {
  focused: boolean;
  icon: any;
}) {
  return (
    <View style={[styles.iconContainer, props.focused && styles.focusedIconContainer]}>
      <Image
        source={props.focused ? require('@/src/assets/icons/bubble.png') : props.icon}
        style={[
          styles.icon,
          props.focused && styles.focusedIcon
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusedIconContainer: {
    width: 40,
    height: 40,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  focusedIcon: {
    width: 40,
    height: 40,
  }
}); 