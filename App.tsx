import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import Intro from './src/screens/Intro';
import Signup from './src/screens/Signup';
import SocialMedia from './src/screens/SocialMedia';
import CriticsSuggestion from './src/screens/CriticsSuggestion';
import Fingerprint from './src/screens/Fingerprint';
import ServiceCenter from './src/screens/ServiceCenter';
import { ImageBackground, StyleSheet, View } from 'react-native';
import {
  configureFonts,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import Dashboard from './src/screens/Dashboard';
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
const MainStackNavigator = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Fingerprint" component={Fingerprint} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="SocialMedia" component={SocialMedia} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <ImageBackground
      source={require(BgImage)}
      resizeMode="cover"
      style={styles.image}>
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <MainStackNavigator />
        </View>
      </PaperProvider>
    </ImageBackground>
  );
};

export default App;
