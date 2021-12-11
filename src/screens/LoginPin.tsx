import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage, hideMessage } from "react-native-flash-message";

const CocoPinImage = '../../assets/images/Iconly_Curved_Passwordmaga.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
const EyeSlashIcon = '../../assets/images/Eye-slashmini.png';
const CloseIcon = '../../assets/images/Closemini.png';

const styles = StyleSheet.create({
  fornaxBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonClose: {
    backgroundColor: '#b27f29',
    width: 240,
    alignSelf: 'center',
  },
  button: {
    borderRadius: 20,
    paddingVertical: 18,
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
  fornaxIcon: {
    // width:80,
    // height:80,
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
  input: {
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
    fontFamily: 'Quicksand-Medium',
    color: '#ffffff',
    paddingHorizontal: 10,
    fontSize: 16,
    width: 240,
  },
  pinInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  pinEye: {
    width: 20,
    marginLeft: -20,
  },
  NumPad: {
    width: 240,
    marginTop: 20,
    marginBottom: 30,
  },
  NumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  numClose: {
    width: 50,
    alignSelf: 'center',
  },
  num: {
    paddingVertical: 20,
  },
  crossIcon: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

const LoginPin = (props: any) => {
  const navigate = props.navigation.navigate;
  const [showPass, setShowPass] = useState(true);
  const [pin, setPin] = useState('');

  const handlePin = (val: any) => {
    if(pin.length < 4) {
      hideMessage();
      setPin(pin + val);
    }
  };
  
  const handleSetPin = async () => {
    if (pin && pin.length === 4) {
      const _pin = await AsyncStorage.getItem('loginPin')
      if (_pin === pin) {
        hideMessage();
        await AsyncStorage.setItem('isLoginPinSet', pin);
        navigate('Dashboard')
      } else {
        showMessage({
          message: "Login Pin Failed!",
          description: "Please enter 4 digit valid Pin",
          type: "danger",
        });
      }
    } else {
      showMessage({
        message: "Login Pin Failed!",
        description: "Please enter 4 digit Pin",
        type: "warning",
      });
    }
  };

  const handleRemove = () => {
    setPin(pin.substring(0, pin.toString().length - 1))
  }

  return (
    <>
      {/* <View>
        <Pressable onPress={() => navigate('LoginSetting')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
      </View> */}
      <View style={styles.fornaxInnerBox}>
        <Image style={styles.fornaxIcon} source={require(CocoPinImage)} />
        <Text style={styles.textStyle}>Enter Pin</Text>
      </View>
      <View style={styles.fornaxBox}>
        <View style={styles.pinInput}>
          <TextInput
            style={styles.input}
            value={pin}
            onChange={handlePin}
            placeholder="xxxx"
            secureTextEntry={showPass}
            placeholderTextColor="#bdbdbd"
          />
          <Pressable onPress={() => setShowPass(!showPass)} style={styles.pinEye}>
            <Image source={require(EyeSlashIcon)} />
          </Pressable>
        </View>
        <View style={styles.NumPad}>
          <View style={styles.NumRow}>
            <Pressable
              onPress={() => handlePin(1)}
              style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>1</Text>
            </Pressable>
            <Pressable
              onPress={() => handlePin(2)}
              style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>2</Text>
            </Pressable>
            <Pressable
              onPress={() => handlePin(3)}
              style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>3</Text>
            </Pressable>
          </View>
          <View style={styles.NumRow}>
            <Pressable
              onPress={() => handlePin(4)}
              style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>4</Text>
            </Pressable>
            <Pressable
              onPress={() => handlePin(5)}
              style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>5</Text>
            </Pressable>
            <Pressable
              onPress={() => handlePin(6)}
              style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>6</Text>
            </Pressable>
          </View>
          <View style={styles.NumRow}>
            <Pressable
              onPress={() => handlePin(7)}
              style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>7</Text>
            </Pressable>
            <Pressable
              onPress={() => handlePin(8)}
              style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>8</Text>
            </Pressable>
            <Pressable
              onPress={() => handlePin(9)}
              style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>9</Text>
            </Pressable>
          </View>
          <View style={styles.NumRow}>
            <Pressable style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle} />
            </Pressable>
            <Pressable
              onPress={() => handlePin(0)}
              style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>0</Text>
            </Pressable>
            <Pressable
              onPress={handleRemove}
              style={[styles.num, styles.numClose, styles.crossIcon]}>
              <Image style={styles.crossIcon} source={require(CloseIcon)} />
            </Pressable>
          </View>
        </View>
        <Pressable
          onPress={handleSetPin}
          style={[styles.button, styles.buttonClose]}>
          <Text style={styles.textStyle}>Verify PIN</Text>
        </Pressable>
      </View>
    </>
  );
};

export default LoginPin;
