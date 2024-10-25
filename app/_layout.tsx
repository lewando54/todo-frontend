/* eslint-disable @typescript-eslint/no-require-imports */
import { useEffect } from 'react';

import NetInfo from '@react-native-community/netinfo';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { onlineManager, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import ToastManager from 'toastify-react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { queryClient } from '@/utils/queryClient';

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const ToastStyle = {
    backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  };

  const ToastTextStyle = {
    color: colorScheme === 'dark' ? '#fff' : '#333',
    fontSize: 14,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ToastManager
          position="bottom"
          animationStyle="rightInOut"
          style={ToastStyle}
          textStyle={ToastTextStyle}
        />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
