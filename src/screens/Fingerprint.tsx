import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
    width:  hp(9),
    height: hp(9),
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

const Fingerprint = () => {
  // const navigate = props.navigation.navigate;

  return (
    <>
      <View>
        <Image style={styles.backIcon} source={require(BackIcon)} />
      </View>
      <View style={styles.fornaxInnerBox}>
        <Image
          style={styles.fornaxIcon}
          source={require(CocoFingerprintImage)}
        />
        <Text style={styles.textStyle}>Fingerprint</Text>
      </View>
      <View style={styles.fornaxBox}>
        <Image
          style={styles.fornaxCenterIcon}
          source={require(FingerprintScanIcon)}
        />
        <Text style={styles.txnText}>Put your finger</Text>
        <Text style={styles.txnText}>on the fingerprint scanner</Text>
      </View>
    </>
  );
};

export default Fingerprint;
