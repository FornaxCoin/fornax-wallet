import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TouchID from 'react-native-touch-id';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {showMessage} from "react-native-flash-message";

const CocoFingerprintImage = '../../assets/images/coco-fingerprint.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
const FingerprintScanIcon = '../../assets/images/Fingerprint-scan.png';
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
  textStyle: {
    fontSize: 20,
    color: '#ffffff',
    lineHeight: 23,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
  },
  backIcon: {
    marginLeft: 26,
    marginTop: 32,
  },
  fornaxCenterIcon: {
    marginBottom: 142,
  },
  fornaxIcon: {
    marginBottom: 30,
  },
  fornaxInnerBox: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: hp('5'),
    marginBottom: hp('4'),
  },
});

const Fingerprint = (props: any) => {
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
          showMessage({
            message: "Fingerprint Warning!",
            description: "Fingerprint is not configured!",
            type: "warning",
          });
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
    if(biometryType && biometryType !== 'TouchID'){
      showMessage({
        message: "Fingerprint Error",
        description: "Fingerprint is not supported in your device",
        type: "danger",
      });
    }
    if (loginPin && biometryType && biometryType === 'TouchID') {
      let response
      try{
        response = await TouchID.authenticate('Open your FornaxWallet', optionalConfigObject)
      }catch (e) {
        showMessage({
          message: "Fingerprint Warning!",
          description: "Fingerprint is not configured!",
          type: "warning",
        });
      }
      if(response){
        console.log("LoginSetting")
        await AsyncStorage.setItem('isfingerIdset','true')
        if(fingerId&&fingerId==='true'){
          await AsyncStorage.setItem('isfingerId','false')
        }else{
          await AsyncStorage.setItem('isfingerId','true')
        }
        navigate('LoginSetting');
        return;
      }else{

      }
    }else{
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
            <Image style={styles.backIcon} source={require(BackIcon)} />
          </Pressable>
        </View>
        <View style={styles.fornaxInnerBox}>
          <Image
              style={styles.fornaxIcon}
              source={require(CocoFingerprintImage)}
          />
          <Text style={styles.textStyle}>Fingerprint</Text>
        </View>
        <View style={styles.fornaxBox}>
          <Pressable >
            <Image
                style={styles.fornaxCenterIcon}
                source={require(FingerprintScanIcon)}
            />
          </Pressable>
          <Text style={styles.txnText}>Put your finger</Text>
          <Text style={styles.txnText}>on the fingerprint scanner</Text>
        </View>
      </>
  );
};

export default Fingerprint;
