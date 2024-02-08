import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '@/components/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';
import { e_voting_green } from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import { View, Text } from '@/components/Themed';
import use_ubuntu_font from '@/hooks/fonts/ubuntu_medium_font';
import { Entypo } from '@expo/vector-icons';
import { useAppDispatch } from '@/hooks/state/use_base_hooks';
import { toggle_right_menu_shown } from '@/state/slices/layout_slice';
import { Provider } from 'react-redux';
import { store } from '@/state/store';
import use_layout_selector from '@/hooks/state/use_layout_selector';
import { transform } from '@babel/core';

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

const DashboardRightHeader = () => {

  const dispatch = useAppDispatch();
  const { right_menu_shown } = use_layout_selector();

  const set_right_menu_shown = () => {
    dispatch(toggle_right_menu_shown())
  }

  return <View
    style={{ backgroundColor: 'transparent', width: 'auto', height: 'auto' }}
  >
    <TouchableOpacity onPress={() => set_right_menu_shown()} style={{ display: 'flex', flexDirection: 'row', gap: 3, alignItems: 'center', padding: 3, borderRadius: 4, backgroundColor: 'white' }}>
      <Text style={{ color: 'black', fontSize: 12, fontWeight: '500' }}>Connected</Text>

      <Entypo style={{ transform: right_menu_shown ? 'rotate(180deg)' : 'rotate(0deg)' }} name="chevron-down" size={12} color="black" />
    </TouchableOpacity>
  </View>
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { } = use_ubuntu_font();

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName="dashboard"
          screenOptions={{
            headerStyle: {
              backgroundColor: e_voting_green,
            },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="signin" />
          <Stack.Screen name="capture_screen" options={{
            headerLeft: () =>
              <TouchableOpacity style={{ backgroundColor: 'transarent' }}>
                <MaterialIcons style={{ backgroundColor: 'transparent' }} name="keyboard-backspace" size={24} color="black" />
              </TouchableOpacity>,
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'white',
            }
          }} />
          <Stack.Screen name="dashboard" options={{
            headerLeft: () =>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'transport' }}>
                <TouchableOpacity style={{ backgroundColor: 'transarent' }}>
                  <MaterialIcons name="menu" size={24} color="white" />
                </TouchableOpacity>

                <Text style={{ color: 'white', fontWeight: '600', fontSize: 25, fontFamily: 'Ubuntu-Medium' }}>Dashboard</Text>
              </View>,
            headerRight: () => <DashboardRightHeader />
            ,
            headerTitle: '',
            headerStyle: {
              backgroundColor: e_voting_green,
            }
          }} />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
