import React, {useEffect, useState} from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import TouchID from "react-native-touch-id";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {showMessage} from "react-native-flash-message";

const CocoFaceImage = '../../assets/images/COCO_Line_Scan-maga.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
const styles = StyleSheet.create({
    fornaxBox: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    txnText: {
        marginLeft: 17,
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium',
        marginTop: -5,
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
        height:hp(3),
        width:hp(3),
    },
    fornaxIcon: {
        resizeMode: 'contain',
        width:  hp(6.5),
        height: hp(6.5),
        marginBottom: hp(5.5),
    },
    fornaxInnerBox: {
        flex: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: hp('12'),
        marginBottom: hp('4'),
    },
    fornaxMiniText: {
        fontSize: 16,
        color: '#bdbdbd',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium',
    },
    camera: {
        height: hp(32),
        width: hp(32),
        borderRadius: hp(12),
        backgroundColor: '#afa2ff',
        marginBottom: 48,
    },
});

const FaceId = (props: any) => {
    const navigate = props.navigation.navigate;

    const [biometryType, setBiometryType] = useState('');
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

            });
    }, [])
    const handleNextScreen = async () => {
        const faceId = await AsyncStorage.getItem('isfaceId');
        const fingerId = await AsyncStorage.getItem('isfingerId');
        const faceIdset = await AsyncStorage.getItem('isfaceIdset');
        const fingerIdset = await AsyncStorage.getItem('isfingerIdset');
        const loginPin = await AsyncStorage.getItem('loginPin');

        console.log("faceId:", faceId);
        console.log("fingerIdset:", fingerIdset);
        if(biometryType && biometryType !== 'FaceID'){
            showMessage({
                message: "FaceID Error",
                description: "FaceID is not supported in your device",
                type: "danger",
            });
        }
        if (loginPin && biometryType && biometryType === 'FaceID') {
            let response
            try{
                response = await TouchID.authenticate('Open your FornaxWallet', optionalConfigObject)
            }catch (e) {
                showMessage({
                    message: "FaceID Warning!",
                    description: "FaceID is not configured!",
                    type: "warning",
                });
            }
            if(response){
                console.log("LoginSetting")
                await AsyncStorage.setItem('isfaceIdset','true')
                if(faceId&&faceId==='true'){
                    await AsyncStorage.setItem('isfaceId','false')
                }else{
                    await AsyncStorage.setItem('isfaceId','true')
                }
                navigate('LoginSetting');
                return;
            }else{

            }
        } else {

        }
    }
    useEffect(() => {
        console.log("biometryType:",biometryType)
        handleNextScreen();
    }, [biometryType]);

    return (
        <>
            <View>
                <Pressable onPress={() => navigate('LoginSetting')}>
                    <Image style={styles.backIcon} source={require(BackIcon)}/>
                </Pressable>
            </View>
            <View style={styles.fornaxInnerBox}>
                <Image style={styles.fornaxIcon} source={require(CocoFaceImage)}/>
                <Text style={styles.textStyle}>Face ID</Text>
                <Text style={styles.fornaxMiniText}>Verify it's you</Text>
            </View>
            <View style={styles.fornaxBox}>
                <View style={styles.camera}/>
                <Text style={styles.txnText}>Turn your face to the camera</Text>
            </View>
        </>
    );
};

export default FaceId;
