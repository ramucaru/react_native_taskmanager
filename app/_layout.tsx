import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useNavigation } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/components/useColorScheme';
import StateContext from '@/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { Text } from '@/components/Themed';
import { logout } from '@/api/authAPI';
import AntDesign from '@expo/vector-icons/AntDesign';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const [token, setToken] = useState<string | null>("");
  const getToken = async function () {
    const tokenread = await AsyncStorage.getItem("token")
    setToken(tokenread);
  }
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    getToken();
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
  const navigation = useNavigation();
  const handleLogout = () => {
    logout().then(() => {
      navigation.reset({
        index: 0,
        routeNames: "login",
        routes: [{ name: 'login' }]
      })
    }).catch((error) => {
      console.log(error);
    })
  }
  return (
    <RootProvider colorScheme={colorScheme}>
      <Stack initialRouteName="index">
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            headerBackButtonMenuEnabled: true,
            title: ""
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            headerBackButtonMenuEnabled: true,
            title: ""
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            headerShown: false,
            headerBackButtonMenuEnabled: true,
            title: "SignUp"
          }}
        />
        <Stack.Screen
          name="forget-password"
          options={{
            headerShown: false,
            headerBackButtonMenuEnabled: true,
            title: "Forget Password"
          }} />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: true,
            title: "Task Management",
            headerBackButtonMenuEnabled: false,
            headerRight: () => (
              <TouchableOpacity onPress={handleLogout}>
                <AntDesign name="logout" size={24} color="black" />
              </TouchableOpacity>
            ),
            headerLeft: () => <Text></Text>
          }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </RootProvider>
  );
}

const RootProvider = ({ colorScheme, children }: { colorScheme: string | null | undefined, children: React.ReactNode }) => {
  return (
    <StateContext>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {children}
      </ThemeProvider>
    </StateContext>
  );
};