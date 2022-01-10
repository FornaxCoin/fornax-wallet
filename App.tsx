import React, {useEffect, useRef, useState} from 'react';
import {AppState, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {
    configureFonts,
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider,
} from 'react-native-paper';
import store from './src/redux/index';
import {Provider} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {fontConfig} from './src/utils/config';
import MainStackNavigator from './src/router/MainStackNavigator';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from "react-native-flash-message";
import _ from 'lodash';
import TouchID from 'react-native-touch-id';

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
    const [biometryType, setBiometryType] = useState('');
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

    useEffect(() => {
        TouchID.isSupported(optionalConfigObject)
            .then(biometryType => {
                setBiometryType(biometryType)
                console.log("biometryType:", biometryType);
            })
            .catch(error => {
                // Failure code
                console.log(error);
            });
    }, [])

    const handleRoute = async () => {
        const registerUser = await AsyncStorage.getItem('registerUser');
        const loginUser = await AsyncStorage.getItem('loginUser');
        const faceId = await AsyncStorage.getItem('isfaceId');
        const fingerId = await AsyncStorage.getItem('isfingerId');
        const faceIdset = await AsyncStorage.getItem('isfaceIdset');
        const fingerIdset = await AsyncStorage.getItem('isfingerIdset');
        const loginPin = await AsyncStorage.getItem('loginPin');
        const isloginPin = await AsyncStorage.getItem('isLoginPinSet');
        const accountList = await AsyncStorage.getItem('accountList');
        console.log("registerUser:", registerUser);
        console.log("loginUser:", loginUser);
        console.log("faceIdset:", faceIdset);
        console.log("fingerIdset:", fingerIdset);
        console.log("loginPin:", loginPin);
        console.log("isloginPin:", isloginPin);
        console.log("biometryType:", biometryType);
        console.log("accountList:", accountList);

        if (registerUser === null) {
            setInitRoute('Intro');
            return;
        }
        if (loginUser === null) {
            setInitRoute('Login');
            return;
        }
        // let nextScreen = ''
        // if (loginPin !== null && biometryType && (faceId || fingerId)) {
        //     TouchID.authenticate('Open your FornaxWallet', optionalConfigObject)
        //         .then((success: any) => {
        //             if (accountList === null) {
        //                 setInitRoute('WalletSetup');
        //                 return;
        //             }
        //             if (registerUser && loginUser && accountList && (loginPin && isloginPin)) {
        //                 setInitRoute('Dashboard');
        //                 return;
        //             }
        //             console.log(success, "success");
        //         })
        //         .catch((error: any) => {
        //             console.log(error, "error");
        //             if (loginPin) {
        //                 setInitRoute('LoginPin');
        //                 return;
        //             }else{
        //                 setInitRoute('Login');
        //                 return;
        //             }
        //         });
        // }
        if (loginPin === null) {
            setInitRoute('Login');
            return;
        }
        if (loginPin) {
            setInitRoute('Tokens');
            return;
        }
        if (accountList === null) {
            setInitRoute('WalletSetup');
            return;
        }
        // if (registerUser && loginUser && accountList && (loginPin && isloginPin)) {
        //     setInitRoute('Dashboard');
        //     return;
        // }
    };

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    const removePin = async () => {
        await AsyncStorage.removeItem('isLoginPinSet');
    }
    const removeAuthSet = async () => {
        await AsyncStorage.removeItem('isfingerIdset');
        await AsyncStorage.removeItem('isfaceIdset');
    }

    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
            console.log("Current state:", appState);
            if (appState.current.match(/unknown/)) {
                console.log("App restarted")
                removeAuthSet().then()
            }
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

        return () => {
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
                        <FlashMessage position="bottom"/>
                        <View style={styles.container}>
                            {initRoute ? (
                                <MainStackNavigator initRoute={initRoute}/>
                            ) : (
                                <Text>Loading...</Text>
                            )}
                        </View>
                        <FlashMessage ref={flashRef}/>
                    </PaperProvider>
                </ImageBackground>
            </Provider>
        </ApolloProvider>
    );
};

export default App;
