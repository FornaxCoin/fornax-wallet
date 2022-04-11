import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

const styles = StyleSheet.create({
    fornaxBox: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
        marginTop: hp(40),
    },
    fornaxText: {
        fontSize: 48,
        color: '#b27f29',
        textAlign: 'center',
        fontFamily: 'Quicksand-Bold',
    },
    txnText: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium',
        marginTop: 0,
    },
    buttonClose: {
        backgroundColor: '#b27f29',
        width: wp(58),
        alignSelf: 'center',
        marginTop: hp(28),
        height: hp(7.3),
        justifyContent: 'center',
    },
    button: {
        borderRadius: hp(2.4),
    },
    textStyle: {
        fontSize: 20,
        color: '#ffffff',
        lineHeight: 23,
        fontFamily: 'Quicksand-Bold',
        textAlign: 'center',
    },
    pressed: {
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10.00,
    },
});

const Intro = (props: any) => {
    const navigate = props.navigation.navigate;

    const handleStarted = async () => {
        const registerUser = await AsyncStorage.getItem('registerUser');
        if (registerUser === null) {
            navigate('Signup');
        } else {
            navigate('Login');
        }
    };

    return (
        <>
            <View style={styles.fornaxBox}>
                <Text style={styles.fornaxText}>Fornax Wallet</Text>
                <Text style={styles.txnText}>Easy way for all your transactions</Text>
                <View style={{overflow: 'hidden'}}>
                    <Pressable
                        android_ripple={{color: '#00000030', borderless: false}}
                        onPress={handleStarted}
                        style={(state) => [state.pressed && styles.pressed, styles.button, styles.buttonClose]}>
                        <Text style={styles.textStyle}>Get Started</Text>
                    </Pressable>
                </View>
            </View>
        </>
    );
};

export default Intro;
