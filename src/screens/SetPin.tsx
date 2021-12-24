import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage, hideMessage } from "react-native-flash-message";
import {backgroundColor} from "html2canvas/dist/types/css/property-descriptors/background-color";

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
    width: wp(49.3),
    height:hp(6.6),
    alignSelf: 'center',
    justifyContent:'center',
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
  backIcon: {
    marginLeft: wp(6.3),
    marginTop: hp(3.7),
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
    // backgroundColor: 'red',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: hp('12'),
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
    width: wp(58),
  },
  pinInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  pinEye: {
    height:hp(2),
    width: hp(2),
    resizeMode: 'contain',
    marginLeft: -20,
  },
  NumPad: {
    width: wp(58),
    marginTop: 20,
    marginBottom: hp(3),
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
    // paddingVertical: 20,
    paddingVertical: hp(1.8),
  },
  crossIcon: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

const SetPin = (props: any) => {
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
      hideMessage();
      await AsyncStorage.setItem('loginPin', pin);
      await AsyncStorage.setItem('isLoginPinSet', JSON.stringify(true));
      navigate('Dashboard')
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
      <View>
        <Pressable onPress={() => navigate('LoginSetting')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
      </View>
      <View style={styles.fornaxInnerBox}>
        <Image style={styles.fornaxIcon} source={require(CocoPinImage)} />
        <Text style={styles.textStyle}>Set Pin</Text>
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
          <Pressable onPress={() => setShowPass(!showPass)} >
            <Image source={require(EyeSlashIcon)} style={styles.pinEye}/>
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
          <Text style={styles.textStyle}>Set PIN</Text>
        </Pressable>
      </View>
    </>
  );
};

export default SetPin;
