import { useState } from 'react';
import { useRouter } from 'expo-router';

// Types for registration
interface RegisterRequest {
  email: string;
  password: string;
}

interface RegisterResponse {
  userId: string;
  email: string;
  address: string;
}

interface RegisterError {
  error: string;
  message: string;
}

// Types for login
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  userId: string;
  email: string;
  accessToken: string;
  address: string;
}

interface LoginError {
  error: string;
  message?: string;
}

// Base API URL
const API_BASE_URL = 'https://forezy-backend.vercel.app/v1/api';

/**
 * Hook for user registration
 */
export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<RegisterError | null>(null);
  const [data, setData] = useState<RegisterResponse | null>(null);
  const router = useRouter();

  const register = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        let errorData: RegisterError;
        try {
          const errorText = await response.text();
          console.log('Error response text:', errorText);
          
          try {
            errorData = JSON.parse(errorText);
          } catch (parseError) {
            errorData = {
              error: `HTTP Error ${response.status}`,
              message: errorText || 'Registration failed',
            };
          }
        } catch (textError) {
          errorData = {
            error: `HTTP Error ${response.status}`,
            message: 'Registration failed',
          };
        }
        
        setError(errorData);
        return null;
      }

      // Try to parse JSON response safely
      let responseData;
      try {
        const responseText = await response.text();
        console.log('Raw registration response:', responseText);
        
        if (responseText && responseText.trim()) {
          responseData = JSON.parse(responseText);
        } else {
          throw new Error('Empty response from server');
        }
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        setError({
          error: 'Parse Error',
          message: 'Could not process server response',
        });
        return null;
      }

      setData(responseData as RegisterResponse);
      
      // Navigate to the main app
      router.replace('/(tabs)');
      
      return responseData as RegisterResponse;
    } catch (err) {
      console.error('Registration error:', err);
      setError({
        error: 'Network error',
        message: 'Failed to connect to the server. Please try again.',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, data };
};

/**
 * Hook for user login
 */
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<LoginError | null>(null);
  const [data, setData] = useState<LoginResponse | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        let errorData: LoginError;
        try {
          const errorText = await response.text();
          console.log('Error response text:', errorText);
          
          try {
            errorData = JSON.parse(errorText);
          } catch (parseError) {
            errorData = {
              error: `HTTP Error ${response.status}`,
              message: errorText || 'Login failed',
            };
          }
        } catch (textError) {
          errorData = {
            error: `HTTP Error ${response.status}`,
            message: 'Login failed',
          };
        }
        
        setError(errorData);
        return null;
      }

      // Try to parse JSON response safely
      let responseData;
      try {
        const responseText = await response.text();
        console.log('Raw login response:', responseText);
        
        if (responseText && responseText.trim()) {
          responseData = JSON.parse(responseText);
        } else {
          throw new Error('Empty response from server');
        }
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        setError({
          error: 'Parse Error',
          message: 'Could not process server response',
        });
        return null;
      }

      setData(responseData as LoginResponse);
      
      // Navigate to the main app
      router.replace('/(tabs)');
      
      return responseData as LoginResponse;
    } catch (err) {
      console.error('Login error:', err);
      setError({
        error: 'Network error',
        message: 'Failed to connect to the server. Please try again.',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, data };
}; 