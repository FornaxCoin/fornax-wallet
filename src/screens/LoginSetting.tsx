import React, {useEffect, useState} from 'react';
import {Image, Pressable, Switch, StyleSheet, Text, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {display} from 'html2canvas/dist/types/css/property-descriptors/display';
import TouchID from 'react-native-touch-id';

const CocoLockImage = '../../assets/images/lockmaga.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
const ArrowRightIcon = '../../assets/images/arrow-right.png';

const styles = StyleSheet.create({
    fornaxBox: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txnText: {
        marginLeft: 17,
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium',
        marginTop: -5,
    },
    txnMiniText: {
        fontSize: 12,
        color: '#73767b',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium',
    },
    buttonClose: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: wp(65.5),
        alignSelf: 'center',
        marginBottom: hp(5.5),
        height: hp(2.6),
    },
    button: {
        borderRadius: 0,
        paddingVertical: 0,
    },
    textStyle: {
        fontSize: 20,
        color: '#ffffff',
        lineHeight: 23,
        fontFamily: 'Quicksand-Bold',
        textAlign: 'center',
    },
    backIcon: {
        marginLeft: wp(6.3),
        marginTop: hp(3.7),
        // resizeMode:'contain',
        height: hp(3),
        width: hp(3),
    },
    arrowRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        alignSelf: 'center',
    },
    arrowRightIcon: {
        marginLeft: 17,
        height: hp(1),
        resizeMode: 'contain',
    },
    fornaxIcon: {
        resizeMode: 'contain',
        width: hp(6.5),
        height: hp(6.5),
        marginBottom: hp(5.5),
    },
    fornaxInnerBox: {
        flex: 0,
        // backgroundColor: 'red',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: hp('12'),
        marginBottom: hp('4'),
    },
    switch: {
        // transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }],
    },
    pressed: {
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
    },
});

const LoginSetting = (props: any) => {
    const navigate = props.navigation.navigate;
    const [isFaceId, setIsFaceId] = useState(false);
    const [isFingerId, setIsFingerId] = useState(false);
    const [isFaceIdset, setIsFaceIdset] = useState(false);
    const [isFingerIdset, setIsFingerIdset] = useState(false);
    const [support, setSupport] = useState(null);

    const checkStorage = async () => {
        const faceId = await AsyncStorage.getItem('isfaceId');
        const fingerId = await AsyncStorage.getItem('isfingerId');
        const fingerIdset = await AsyncStorage.getItem('isfingerIdset');
        const faceIdset = await AsyncStorage.getItem('isfaceIdset');
        setIsFaceId(faceId === 'true')
        setIsFingerId(fingerId === 'true')
        setIsFaceIdset(faceIdset === 'true')
        setIsFingerIdset(fingerIdset === 'true')
    }

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
                setSupport(biometryType)
                console.log("biometryType:", biometryType);
            })
            .catch(error => {
                console.log(error);
            });

        checkStorage();
    }, [])

    const handleFaceId = async (value: any) => {
        const loginPin = await AsyncStorage.getItem('loginPin');
        const faceIdset = await AsyncStorage.getItem('isfaceIdset');
        setIsFaceIdset(faceIdset === 'true')
        if (loginPin) {
            setIsFaceId(!isFaceId);
            console.log('isFaceIdset:', isFaceIdset)
            if (isFaceIdset) {
                console.log('isFaceIdset INSIDE:')
                if (value) {
                    await AsyncStorage.setItem('isfaceId', 'true');
                } else {
                    await AsyncStorage.setItem('isfaceId', 'false');
                }
            } else {
                navigate('FaceId');
            }
        }
    }

    const handleFingerId = async (value: any) => {
        const loginPin = await AsyncStorage.getItem('loginPin');
        const fingerIdset = await AsyncStorage.getItem('isfingerIdset');
        setIsFingerIdset(fingerIdset === 'true')
        if (loginPin) {
            setIsFingerId(!isFingerId);
            console.log('isFingerIdset:', isFingerIdset)
            if (isFaceIdset) {
                console.log('isFingerIdset INSIDE:')
                if (value) {
                    await AsyncStorage.setItem('isfingerId', 'true');
                } else {
                    await AsyncStorage.setItem('isfingerId', 'false');
                }
            } else {
                navigate('Fingerprint');
            }
        }
    }

    return (
        <>
            <View>
                <View style={{overflow: 'hidden'}}>
                    <Pressable
                        android_ripple={{color: '#ffffff10', borderless: false}} onPress={() => navigate('Settings')}>
                        <Image style={styles.backIcon} source={require(BackIcon)}/>
                    </Pressable>
                </View>
            </View>
            <View style={styles.fornaxInnerBox}>
                <Image style={styles.fornaxIcon} source={require(CocoLockImage)}/>
                <Text style={styles.textStyle}>Login Settings</Text>
            </View>
            <View style={styles.fornaxBox}>
                <View style={{overflow: 'hidden'}}>
                    <Pressable
                        android_ripple={{color: '#ffffff10', borderless: false}}
                        onPress={() => navigate('SetPin')}
                        style={(state) => [state.pressed && styles.pressed, styles.button, styles.buttonClose]}>
                        <Text style={styles.txnText}>PIN</Text>
                        <View style={styles.arrowRight}>
                            <Text style={styles.txnMiniText}>Set</Text>
                            <Image
                                style={styles.arrowRightIcon}
                                source={require(ArrowRightIcon)}
                            />
                        </View>
                    </Pressable>
                </View>
                {
                    support && support === 'FaceID' && <View style={{overflow: 'hidden'}}>
                        <Pressable
                            android_ripple={{color: '#ffffff10', borderless: false}}
                        style={(state) => [state.pressed && styles.pressed, styles.button, styles.buttonClose]}>
                        <Text style={styles.txnText}>Face ID</Text>
                        <View style={styles.arrowRight}>
                            <Text style={styles.txnMiniText}>{isFaceId ? 'ON' : 'OFF'}</Text>
                            <Switch
                                style={styles.switch}
                                trackColor={{false: '#dfdfdf', true: '#363853'}}
                                thumbColor={'#fff'}
                                ios_backgroundColor="#dfdfdf"
                                onValueChange={e => handleFaceId(e)}
                                value={isFaceId}
                            />
                            <Image
                                style={styles.arrowRightIcon}
                                source={require(ArrowRightIcon)}
                            />
                        </View>
                    </Pressable>
                    </View>
                }
                {
                    support && (support === 'TouchID' || support === 'true') && <View style={{overflow: 'hidden'}}>
                        <Pressable
                            android_ripple={{color: '#ffffff10', borderless: false}}
                        style={(state) => [state.pressed && styles.pressed, styles.button, styles.buttonClose]}>
                        <Text style={styles.txnText}>Fingerprint</Text>
                        <View style={styles.arrowRight}>
                            <Text style={styles.txnMiniText}>{isFingerId ? 'ON' : 'OFF'}</Text>
                            <Switch
                                style={styles.switch}
                                trackColor={{false: '#dfdfdf', true: '#363853'}}
                                thumbColor={'#fff'}
                                ios_backgroundColor="#dfdfdf"
                                onValueChange={e => handleFingerId(e)}
                                value={isFingerId}
                            />
                            <Image
                                style={styles.arrowRightIcon}
                                source={require(ArrowRightIcon)}
                            />
                        </View>
                    </Pressable>
                    </View>
                }
            </View>
        </>
    );
};

export default LoginSetting;
