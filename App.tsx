import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Intro from './src/screens/Intro';
import Signup from './src/screens/Signup';
import SocialMedia from './src/screens/SocialMedia';
import Fingerprint from './src/screens/Fingerprint';
import FaceId from './src/screens/FaceId';
import ServiceCenter from './src/screens/ServiceCenter';
import CriticsSuggestion from './src/screens/CriticsSuggestion';
import LoginSetting from './src/screens/LoginSetting';
import SetPin from './src/screens/SetPin';
import Settings from './src/screens/Settings';
import Wallet from './src/screens/Wallet';
import Notifications from './src/screens/Notifications';
import WalletSetup from './src/screens/WalletSetup';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import {
  configureFonts,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import Dashboard from './src/screens/Dashboard';
import ImportWallet from './src/screens/ImportWallet';
import store from './src/redux/index';
import { Provider } from 'react-redux';
import Login from './src/screens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    const accountList = await AsyncStorage.getItem('accountList');
    if (accountList === null) {
      setInitRoute('WalletSetup');
      return;
    }
    if (registerUser && loginUser && accountList) {
      setInitRoute('Dashboard');
      return;
    }
  };

  useEffect(() => {
    handleRoute();
  }, []);

  return (
    <Provider store={store}>
      <ImageBackground
        source={require(BgImage)}
        resizeMode="cover"
        style={styles.image}>
        <PaperProvider theme={theme}>
          <View style={styles.container}>
            {initRoute ? (
              <MainStackNavigator initRoute={initRoute} />
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
        </PaperProvider>
      </ImageBackground>
    </Provider>
  );
};

export default App;
