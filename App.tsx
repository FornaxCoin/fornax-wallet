import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
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

const theme = {
  ...PaperDefaultTheme,
  fonts: configureFonts(fontConfig),
};

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://45.79.253.185:4001/graphql',
  cache: new InMemoryCache(),
});

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
    // SplashScreen.hide();
    handleRoute();
  }, []);

  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
};

export default App;
