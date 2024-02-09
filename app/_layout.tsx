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
import { View, Text } from '@/components/Themed';
import use_ubuntu_font from '@/hooks/fonts/ubuntu_medium_font';
import { Entypo } from '@expo/vector-icons';
import { useAppDispatch } from '@/hooks/state/use_base_hooks';
import { Provider } from 'react-redux';
import { store } from '@/state/store';
import use_layout_selector from '@/hooks/state/use_layout_selector';
import { images } from '@/constants/images';
import { utils_styles } from '@/constants/utils_styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { toggle_right_menu_shown, toggle_side_bar_shown } from '@/state/slices/layout_slice';


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

const RightHeaderDropDown = () => {

  const { right_menu_shown } = use_layout_selector();


  return <View style={{
    position: 'absolute',
    top: 0, right: 0, zIndex: 10,
    width: right_menu_shown ? 'auto' : 0, height: right_menu_shown ? 'auto' : 0,
    backgroundColor: 'white',
    padding: right_menu_shown ? 10 : 0,
    borderColor: 'lightgray',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  }}>
    <View style={{ width: 20, height: 20 }}>
      <Image style={{ width: '100%', height: '100%', objectFit: 'cover' }} source={images.metat_mask} />
    </View>

    <Text>connect to meta mask</Text>
  </View>
}

const TetfundFrame = () => {
  const { tetfund_frame_style } = utils_styles;

  return <Image style={tetfund_frame_style} source={images.tetfund_frame} />
}

const RightHeaderComponent = () => {

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

const LeftHeaderComponent = ({ btn, title }: { btn: 'back_btn' | 'hamburger_btn', title: string }) => {
  const dispatch = useAppDispatch();

  const toggle_sidebar = () => {
    dispatch(toggle_side_bar_shown())
  }


  return <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'transport' }}>
    {btn === 'hamburger_btn' ?
      (<TouchableOpacity onPress={() => toggle_sidebar()} style={{ backgroundColor: 'transarent' }}>
        <MaterialIcons name="menu" size={24} color="white" />
      </TouchableOpacity>)
      :
      (<TouchableOpacity onPress={() => router.back()} style={{ backgroundColor: 'transarent' }}>
        <MaterialIcons style={{ backgroundColor: 'transparent' }} name="keyboard-backspace" size={24} color="white" />
      </TouchableOpacity>)}

    <Text style={{ color: 'white', fontWeight: '600', fontSize: 25, fontFamily: 'Ubuntu-Medium' }}>{title}</Text>
  </View>
}

const SideBar = () => {
  const { side_bar_shown } = use_layout_selector();
  const { } = use_ubuntu_font();
  const dispatch = useAppDispatch();

  const toggle_side_bar = () => {
    dispatch(toggle_side_bar_shown());
  }

  return <TouchableOpacity onPress={() => toggle_side_bar()} style={{
    position: 'absolute', top: 0, bottom: 0, left: 0, width: side_bar_shown ? '100%' : 0, zIndex: 1000, backgroundColor: 'transparent', borderRightColor: 'lightgray', borderRightWidth: 1,
  }}>
    <View style={{ position: 'absolute', top: 0, bottom: 0, left: side_bar_shown ? 0 : '-100%', zIndex: 10000, }}>
      {side_bar_shown && <View style={{
        width: '100%', height: '100%',
        display: 'flex',
        gap: 5,
        paddingVertical: 10
      }}>
        {/* Header */}
        <View style={{
          width: '100%',
          height: 'auto',
          borderBottomColor: e_voting_green,
          borderBottomWidth: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          alignItems: 'flex-start',
          padding: 20,
        }}>
          <View style={{ width: 50, height: 50, borderRadius: 50, borderColor: e_voting_green, borderWidth: 1, overflow: 'hidden' }}>
            <Image source={images.metat_mask} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </View>

          <View style={{ width: '100%', height: 'auto' }}>
            <Text style={{ fontSize: 20, fontWeight: '800', color: 'black', fontFamily: 'Ubuntu-Medium', }}>Admnistarator</Text>
            <Text style={{ textTransform: 'uppercase', color: e_voting_green, fontSize: 18, fontWeight: '700', fontFamily: 'Ubuntu-Medium', }}>565sr</Text>
          </View>
        </View>
        {/* Header */}

        {/* Body */}
        <View style={{ width: '100%', height: 'auto', padding: 20, display: 'flex', gap: 30, flexDirection: 'column', }}>
          <View style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center', padding: 10, backgroundColor: e_voting_green, borderBottomRightRadius: 40 }}>
            <MaterialCommunityIcons name="view-grid-outline" size={24} color="white" />
            <Text style={{ fontSize: 20, fontWeight: '800', color: 'white' }}>Dashboard</Text>
          </View>

          <View style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center', padding: 10, backgroundColor: 'white', borderBottomRightRadius: 40 }}>
            <MaterialCommunityIcons name="account-plus-outline" size={24} color="black" />
            <Text style={{ fontSize: 20, fontWeight: '800', color: 'black' }}>Register voter</Text>
          </View>

          <View style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center', padding: 10, backgroundColor: 'white', borderBottomRightRadius: 40 }}>
            <Entypo name="fingerprint" size={24} color="black" />
            <Text style={{ fontSize: 20, fontWeight: '800', color: 'black' }}>Authenticate voter</Text>
          </View>

          <View style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center', padding: 10, backgroundColor: 'white', borderBottomRightRadius: 40 }}>
            <Ionicons name="wallet-outline" size={24} color="black" />
            <Text style={{ fontSize: 20, fontWeight: '800', color: 'black' }}>recover wallet</Text>
          </View>

          <View style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center', padding: 10, backgroundColor: 'white', borderBottomRightRadius: 40 }}>
            <MaterialIcons name="logout" size={24} color="black" />
            <Text style={{ fontSize: 20, fontWeight: '800', color: 'black' }}>Logout</Text>
          </View>
        </View>
        {/* Body */}
      </View>}
    </View>
  </TouchableOpacity>
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
            headerLeft: () => <LeftHeaderComponent title='dashboard' btn='hamburger_btn' />,
            headerRight: () => <RightHeaderComponent />,
            headerTitle: '',
            headerStyle: {
              backgroundColor: e_voting_green,
            }
          }} />

          <Stack.Screen name="register_voters" options={{
            headerLeft: () => <LeftHeaderComponent title='Register voters' btn='hamburger_btn' />,
            headerRight: () => <RightHeaderComponent />,
            headerTitle: '',
            headerStyle: {
              backgroundColor: e_voting_green,
            }
          }} />

          <Stack.Screen name="search_registered_voters" options={{
            headerLeft: () => <LeftHeaderComponent title='Register voters' btn='back_btn' />,
            headerRight: () => <RightHeaderComponent />,
            headerTitle: '',
            headerStyle: {
              backgroundColor: e_voting_green,
            }
          }} />

          <Stack.Screen name='[user_id]' options={{
            headerLeft: () => <LeftHeaderComponent title='Register voters' btn='back_btn' />,
            headerRight: () => <RightHeaderComponent />,
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


export { RightHeaderDropDown, TetfundFrame, SideBar }