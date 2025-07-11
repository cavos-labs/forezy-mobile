import { Redirect } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();
  
  // If still loading, don't redirect yet
  if (isLoading) {
    return null;
  }
  
  // If authenticated, go to tabs, otherwise go to onboarding
  return isAuthenticated ? <Redirect href="/(tabs)" /> : <Redirect href="/onboarding" />;
} 