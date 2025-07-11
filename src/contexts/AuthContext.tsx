import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// User type definition
interface User {
  userId: string;
  email: string;
  address: string;
  accessToken?: string;
  emailVerified?: boolean;
}

// Auth context type definition
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<{success: boolean, needsVerification: boolean}>;
  logout: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const USER_STORAGE_KEY = '@forezy_user';

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for stored user on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user from storage', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      console.log('Attempting login for:', email);
      
      const response = await fetch('https://forezy-backend.vercel.app/v1/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Login response status:', response.status);
      
      // Get response text first for debugging
      const responseText = await response.text();
      console.log('Login response body:', responseText);
      
      // Check if response is ok
      if (!response.ok) {
        // Check if this is an email verification error
        if (responseText.includes('email_not_verified') || responseText.includes('Please verify your email')) {
          Alert.alert(
            'Email Not Verified',
            'Please verify your email before logging in. Check your inbox for a verification link from Auth0.'
          );
          return false;
        }
        
        // For 500 errors, provide more specific feedback
        if (response.status === 500) {
          console.error('Server error during login. Status:', response.status, 'Response:', responseText);
          Alert.alert(
            'Server Error',
            'The server encountered an error while processing your login. Please try again later or contact support if the issue persists.'
          );
          return false;
        }
        
        throw new Error(`Login failed: ${response.status} - ${responseText}`);
      }

      // Try to parse JSON response
      let data;
      try {
        // Only try to parse if there's content
        if (responseText && responseText.trim()) {
          data = JSON.parse(responseText);
        } else {
          throw new Error('Empty response from server');
        }
      } catch (error) {
        console.error('Failed to parse login response as JSON:', error);
        throw new Error('Invalid response from server');
      }

      console.log('Login successful, user data received');
      
      const userData: User = {
        userId: data.userId,
        email: data.email,
        address: data.address,
        accessToken: data.accessToken,
        emailVerified: true // If login successful, email is verified
      };

      // Save user to state and storage
      setUser(userData);
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Login Failed',
        'Unable to log in. Please check your credentials and try again.'
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string): Promise<{success: boolean, needsVerification: boolean}> => {
    setIsLoading(true);
    try {
      const response = await fetch('https://forezy-backend.vercel.app/v1/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // First check if the response is ok
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Registration failed with status:', response.status, errorText);
        throw new Error(`Registration failed: ${response.status} ${errorText}`);
      }

      // Try to parse JSON response safely
      let data;
      try {
        const responseText = await response.text();
        // Log the raw response for debugging
        console.log('Raw registration response:', responseText);
        
        // Only try to parse if there's content
        if (responseText && responseText.trim()) {
          data = JSON.parse(responseText);
        } else {
          throw new Error('Empty response from server');
        }
      } catch (error) {
        console.error('Failed to parse registration response as JSON:', error);
        throw new Error('Invalid response from server');
      }

      // Check if this is an Auth0 registration that requires email verification
      const isAuth0Registration = data.user_id && data.user_id.startsWith('auth0|');
      
      if (isAuth0Registration) {
        // Auth0 registration requires email verification
        return { success: true, needsVerification: true };
      } else if (data.userId && data.email) {
        // Standard registration with complete user data
        const userData: User = {
          userId: data.userId,
          email: data.email,
          address: data.address || '',
          emailVerified: true
        };

        // Save user to state and storage
        setUser(userData);
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        
        return { success: true, needsVerification: false };
      } else {
        throw new Error('Incomplete user data received');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert(
        'Registration Failed',
        'Unable to create your account. Please try again later.'
      );
      return { success: false, needsVerification: false };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    setUser(null);
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
    router.replace('/auth/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 