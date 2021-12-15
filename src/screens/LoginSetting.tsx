import React, { useEffect, useState } from 'react';
import { Image, Pressable, Switch, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  arrowRightIcon: {
    marginLeft: 17,
  },
  fornaxIcon: {
    // width:80,
    // height:80,
    // width:  hp(9),
    // height: hp(9),
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
  switch: {
    // transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }],
  },
});

const LoginSetting = (props: any) => {
  const navigate = props.navigation.navigate;
  const [isFaceId, setIsFaceId] = useState(false);
  const [isFingerId, setIsFingerId] = useState(false);
  const [isFaceIdset, setIsFaceIdset] = useState(false);
  const [isFingerIdset, setIsFingerIdset] = useState(false);

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

  useEffect(() => {
    checkStorage();
  }, [])

  const handleFaceId = async (value:any) => {
    const loginPin = await AsyncStorage.getItem('loginPin');
    const faceIdset = await AsyncStorage.getItem('isfaceIdset');
    setIsFaceIdset(faceIdset === 'true')
    if(loginPin){
      setIsFaceId(!isFaceId);
      console.log('isFaceIdset:',isFaceIdset)
      if(isFaceIdset){
        console.log('isFaceIdset INSIDE:')
        if(value){
          await AsyncStorage.setItem('isfaceId', 'true');
        }else {
          await AsyncStorage.setItem('isfaceId', 'false');
        }
      }else{
        navigate('FaceId');
      }
    }
  }

  const handleFingerId = async (value:any) => {
    const loginPin = await AsyncStorage.getItem('loginPin');
    const fingerIdset = await AsyncStorage.getItem('isfingerIdset');
    setIsFingerIdset(fingerIdset === 'true')
    if(loginPin){
      setIsFingerId(!isFingerId);
      console.log('isFingerIdset:',isFingerIdset)
      if(isFaceIdset){
        console.log('isFingerIdset INSIDE:')
        if(value){
          await AsyncStorage.setItem('isfingerId', 'true');
        }else {
          await AsyncStorage.setItem('isfingerId', 'false');
        }
      }else{
        navigate('Fingerprint');
      }
    }
  }

  return (
    <>
      <View>
        <Pressable onPress={() => navigate('Settings')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
      </View>
      <View style={styles.fornaxInnerBox}>
        <Image style={styles.fornaxIcon} source={require(CocoLockImage)} />
        <Text style={styles.textStyle}>Login Settings</Text>
      </View>
      <View style={styles.fornaxBox}>
        <Pressable
          onPress={() => navigate('SetPin')}
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
          style={[styles.button, styles.buttonClose]}>
          <Text style={styles.txnText}>Face ID</Text>
          <View style={styles.arrowRight}>
            <Text style={styles.txnMiniText}>{isFaceId ? 'ON' : 'OFF'}</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: '#dfdfdf', true: '#363853' }}
              thumbColor={'#fff'}
              ios_backgroundColor="#dfdfdf"
              onValueChange={e=>handleFaceId(e)}
              value={isFaceId}
            />
            <Image
              style={styles.arrowRightIcon}
              source={require(ArrowRightIcon)}
            />
          </View>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonClose]}>
          <Text style={styles.txnText}>Fingerprint</Text>
          <View style={styles.arrowRight}>
            <Text style={styles.txnMiniText}>{isFingerId ? 'ON' : 'OFF'}</Text>
            <Switch
                style={styles.switch}
                trackColor={{ false: '#dfdfdf', true: '#363853' }}
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
    </>
  );
};

export default LoginSetting;
