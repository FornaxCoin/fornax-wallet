import React, { useEffect, useRef, useState } from 'react';
import { AppState, ImageBackground, StyleSheet, Text, View } from 'react-native';
import {
  configureFonts,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import store from './src/redux/index';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { fontConfig } from './src/utils/config';
import MainStackNavigator from './src/router/MainStackNavigator';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from "react-native-flash-message";
import _ from 'lodash';
import TouchID from 'react-native-touch-id';

import {fontConfig} from "./assets/styles/fontConfig";
import Login from './src/screens/Login/Login';
const BgImage = './assets/images/Layer.png';

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    maxWidth: 415,
  },
});

const Stack = createStackNavigator();

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'Quicksand',
    },
    medium: {
      fontFamily: 'Quicksand-Medium',
    },
    light: {
      fontFamily: 'Quicksand-Light',
    },
    thin: {
      fontFamily: 'Quicksand',
    },
    bold: {
      fontFamily: 'Quicksand-Bold',
    },
    semiBold: {
      fontFamily: 'Quicksand-SemiBold',
    },
  },
  ios: {
    regular: {
      fontFamily: 'Quicksand',
    },
    medium: {
      fontFamily: 'Quicksand-Medium',
    },
    light: {
      fontFamily: 'Quicksand-Light',
    },
    thin: {
      fontFamily: 'Quicksand',
    },
    bold: {
      fontFamily: 'Quicksand-Bold',
    },
    semiBold: {
      fontFamily: 'Quicksand-SemiBold',
    },
  },
  android: {
    regular: {
      fontFamily: 'Quicksand',
    },
    medium: {
      fontFamily: 'Quicksand-Medium',
    },
    light: {
      fontFamily: 'Quicksand-Light',
    },
    thin: {
      fontFamily: 'Quicksand',
    },
    bold: {
      fontFamily: 'Quicksand-Bold',
    },
    semiBold: {
      fontFamily: 'Quicksand-SemiBold',
    },
  },
};

const theme = {
  ...PaperDefaultTheme,
  fonts: configureFonts(fontConfig),
};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'transparent',
  },
};
const MainStackNavigator = ({ initRoute }: any) => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName={initRoute}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="WalletSetup" component={WalletSetup} />
        <Stack.Screen name="Import" component={ImportWallet} />
        <Stack.Screen name="SetPin" component={SetPin} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="LoginSetting" component={LoginSetting} />
        <Stack.Screen name="Fingerprint" component={Fingerprint} />
        <Stack.Screen name="CriticsSuggestion" component={CriticsSuggestion} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="SocialMedia" component={SocialMedia} />
        <Stack.Screen name="ServiceCenter" component={ServiceCenter} />
        <Stack.Screen name="FaceId" component={FaceId} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  const [initRoute, setInitRoute] = useState('');
  const flashRef = useRef(null);

  const optionalConfigObject = {
    title: 'Fingerprint', // Android
    imageColor: '#363853', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Put your finger on the fingerprint scanner', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false,
  }

  const handleRoute = async () => {
    const registerUser = await AsyncStorage.getItem('registerUser');
    if (registerUser === null) {
      setInitRoute('Intro');
      return;
    }
    const loginUser = await AsyncStorage.getItem('loginUser');
    if (loginUser === null) {
      setInitRoute('Login');
      return;
    }
    const faceId = await AsyncStorage.getItem('isfaceId');
    const fingerId = await AsyncStorage.getItem('isfingerId');
    const loginPin = await AsyncStorage.getItem('loginPin');
    const isloginPin = await AsyncStorage.getItem('isLoginPinSet');
    const accountList = await AsyncStorage.getItem('accountList');
    if (faceId || fingerId) {
      TouchID.authenticate('Open your FornaxWallet', optionalConfigObject)
        .then((success: any) => {
          if (accountList === null) {
            setInitRoute('WalletSetup');
            return;
          }
          if (registerUser && loginUser && accountList && (loginPin && isloginPin)) {
            setInitRoute('Dashboard');
            return;
          }
          console.log(success, "success");
        })
        .catch((error: any) => {
          console.log(error, "error");
          // Failure code
        });
    }
    if(loginPin === null) {
      setInitRoute('Login');
      return;
    }
    if (loginPin && isloginPin === null) {
      setInitRoute('LoginPin');
      return;
    }
    if (accountList === null) {
      setInitRoute('WalletSetup');
      return;
    }
    if (registerUser && loginUser && accountList && (loginPin && isloginPin)) {
      setInitRoute('Dashboard');
      return;
    }
  };

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const removePin = async () => {
    await AsyncStorage.removeItem('isLoginPinSet');
  }

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current, appStateVisible);
    });

    return  () => {
      removePin();
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    handleRoute();
  }, []);

  useEffect(() => {
    initRoute && SplashScreen.hide();
  }, [initRoute]);

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ImageBackground
          source={require(BgImage)}
          resizeMode="cover"
          style={styles.image}>
          <PaperProvider theme={theme}>
            <FlashMessage position="bottom" />
            <View style={styles.container}>
              {initRoute ? (
                <MainStackNavigator initRoute={initRoute} />
              ) : (
                <Text>Loading....</Text>
              )}
            </View>
            <FlashMessage ref={flashRef} />
          </PaperProvider>
        </ImageBackground>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
