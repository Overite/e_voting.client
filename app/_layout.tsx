import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '@/components/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';
import { e_voting_green } from '@/constants/Colors';
import { TouchableOpacity, Image } from 'react-native';
import use_ubuntu_font from '@/hooks/fonts/ubuntu_medium_font';
import { Provider } from 'react-redux';
import { store } from '@/state/store';
import { LeftHeaderComponent, RightHeaderComponent } from './screens/_layout';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { } = use_ubuntu_font();


  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName="index"
          screenOptions={{
            headerStyle: {
              backgroundColor: e_voting_green,
            },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="signin" options={{ headerShown: false }} />
          <Stack.Screen name="capture_screen" options={{
            headerLeft: () =>
              <TouchableOpacity onPress={() => router.back()} style={{ backgroundColor: 'transarent' }}>
                <MaterialIcons style={{ backgroundColor: 'transparent' }} name="keyboard-backspace" size={24} color="black" />
              </TouchableOpacity>,
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'white',
            }
          }} />
          {/* Screens */}
          <Stack.Screen name="screens" options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: e_voting_green,
            },
            headerLeft: () => <LeftHeaderComponent title='dashboard' btn='hamburger_btn' />,
            headerRight: () => <RightHeaderComponent />,
          }} />
          {/* Screens */}
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
