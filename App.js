import { useContext, useCallback, useEffect, useMemo, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import { Animated, StyleSheet, Text, View} from "react-native";
import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light,
  Montserrat_300Light_Italic,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black,
  Montserrat_900Black_Italic,
} from '@expo-google-fonts/montserrat';


import { Colors } from './src/constants/styles';
import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthContextProvider, { AuthContext } from './src/store/auth-context';
import IconButton from './src/components/ui/IconButton';
import AulaScreen from './src/screens/AulaScreen';

// Inicializar App y Auth
import './src/util/auth'
import ModalScreen from "./src/screens/ModalScreen";


// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});
const Stack = createNativeStackNavigator();


function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Inicia sesión',
          headerTitleStyle: {
            fontFamily: 'Montserrat_500Medium'
          }
        }}
      />
      <Stack.Group screenOptions={{
          presentation: 'modal',
          headerStyle: { backgroundColor: Colors.error500 },
          headerTintColor: 'white',
          contentStyle: { backgroundColor: Colors.error100 },
        }}
      >
        <Stack.Screen name="Modal" component={ModalScreen} options={{ title: 'Error' }}/>
      </Stack.Group>
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  const logoutIcon = (
    <IconButton
      icon="power"
      color='white'
      size={24}
      onPress={authCtx.logout}
    />
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Pasillo"
        component={WelcomeScreen}
        options={{
          headerTitleStyle: {
            fontFamily: 'Montserrat_500Medium'
          },
          headerRight: () => logoutIcon
        }}
      />
      <Stack.Screen
        name="Aula"
        component={AulaScreen}
        options={{
          headerTitleStyle: {
            fontFamily: 'Montserrat_500Medium'
          },
          headerRight: () => logoutIcon
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.email && <AuthStack />}
      {!!authCtx.email && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  const imagen = require('./assets/splash.png');
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    console.log('Arranca aplicación');
  }, []);

  function onFinishHandler() {
    console.log('Oculto animación');
    setAppLoading(false);
  }

  return (
    <>
      {/* <StatusBar style="light" /> */}
      {
        appLoading ?
        <AnimatedSplashScreen
          image={imagen}
          onFinish={onFinishHandler}
        />
        :
        <MainScreen />
      }
    </>
  );
}

function AnimatedSplashScreen({ image, onFinish }) {
	let [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light,
    Montserrat_300Light_Italic,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black,
    Montserrat_900Black_Italic,
	});

  const animation = useMemo(() => new Animated.Value(1), []);
  
  const efecto = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => onFinish());
  };

  const onImageLoaded = useCallback(async () => {
    try {
      console.log('Oculto splash');
      await SplashScreen.hideAsync();
      // SplashScreen.hideAsync();
    } catch (e) {
      console.log(e); // Útil
    } finally {
      console.log('Empiezo animación');
      efecto();
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {
        fontsLoaded &&
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: '#c30b64', // Manual
              // opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain", // Manual
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      }
    </View>
  );
}

function MainScreen() {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
}
