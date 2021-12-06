import React from 'react';
import { Image, Pressable, Switch, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
  fornaxText: {
    fontSize: 48,
    color: '#b27f29',
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
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
    // marginTop: -5,
  },
  buttonClose: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: '#b27f29',
    width: 240,
    alignSelf: 'center',
    marginBottom: 43,
  },
  button: {
    borderRadius: 20,
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
    marginLeft: 26,
    marginTop: 32,
  },
  arrowRight: {
    flex: 1,
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  arrowRightIcon: {
    marginLeft: 17,
  },
  fornaxIcon: {
    marginBottom: 44,
  },
  fornaxInnerBox: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: 'green',
    // marginTop: 120,
    marginTop: hp('10'),
    marginBottom: hp('4'),
  },
  switch: {
    // transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }],
  },
});

const LoginSetting = (props: any) => {
  const navigate = props.navigation.navigate;

  return (
    <>
      <View>
        <Pressable onPress={() => navigate('WalletSetup')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
      </View>
      <View style={styles.fornaxInnerBox}>
        <Image style={styles.fornaxIcon} source={require(CocoLockImage)} />
        <Text style={styles.textStyle}>Login Settings</Text>
      </View>
      <View style={styles.fornaxBox}>
        <Pressable
          onPress={() => navigate('Signup')}
          style={[styles.button, styles.buttonClose]}>
          <Text style={styles.txnText}>PIN</Text>
          <View style={styles.arrowRight}>
            <Text style={styles.txnMiniText}>Set</Text>
            <Image
              style={styles.arrowRightIcon}
              source={require(ArrowRightIcon)}
            />
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigate('Signup')}
          style={[styles.button, styles.buttonClose]}>
          <Text style={styles.txnText}>Face ID</Text>
          <View style={styles.arrowRight}>
            <Text style={styles.txnMiniText}>OFF</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: '#dfdfdf', true: '#363853' }}
              thumbColor={'#fff'}
              ios_backgroundColor="#dfdfdf"
              value={false}
            />
            <Image
              style={styles.arrowRightIcon}
              source={require(ArrowRightIcon)}
            />
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigate('Signup')}
          style={[styles.button, styles.buttonClose]}>
          <Text style={styles.txnText}>Fingerprint</Text>
          <View style={styles.arrowRight}>
            <Text style={styles.txnMiniText}>ON</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: '#e0e0e0', true: '#363853' }}
              thumbColor={'#fff'}
              ios_backgroundColor="#3e3e3e"
              value={true}
            />
            <Image
              style={styles.arrowRightIcon}
              source={require(ArrowRightIcon)}
            />
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default LoginSetting;
