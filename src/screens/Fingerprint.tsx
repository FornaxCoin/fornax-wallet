import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TouchID from 'react-native-touch-id';

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
  
  const authenticate = () => {
    TouchID.authenticate('Open your FornaxWallet', optionalConfigObject)
      .then((success: any) => {
        console.log(success, "success");
        // Success code
      })
      .catch((error: any) => {
        console.log(error, "error");
        // Failure code
      });
  }

  useEffect(() => {
    authenticate();
  }, [])


  return (
    <>
      <View>
        <Pressable onPress={() => navigate('Dashboard')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
      </View>
      <View style={styles.fornaxInnerBox}>
        <Image
          style={styles.fornaxIcon}
          source={require('../../assets/images/Fingerprint-scan.png')}
        />
        <Text style={styles.textStyle}>Fingerprint</Text>
      </View>
      <View style={styles.fornaxBox}>
        <Pressable onPress={authenticate}>
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
