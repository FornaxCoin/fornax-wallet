import React, {useEffect, useState} from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { setSendTxnStatus } from '../redux/reducers/Wallet';
import SplashScreen from "react-native-splash-screen";
import TouchID from "react-native-touch-id";

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
    visibility: 'visible',
    marginTop: 32,
  },
  loginTextbox: {
    fontSize: 14,
    color: '#bdbdbd',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 10,
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
    width: 240,
  },
  loginText: {
    fontSize: 14,
    color: '#81c2ff',
    fontFamily: 'Quicksand-Medium',
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
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(true);
  const [pin, setPin] = useState('');

  const { sendTxnStatus } = useSelector(({ wallet }: any) => {
    return {
      sendTxnStatus: wallet?.sendTxnStatus,
    };
  });

  const handlePin = (val: any) => {
    if(pin.length < 4) {
      hideMessage();
      setPin(pin + val);
    }
  };

  const handleSetPin = async () => {
    if (pin && pin.length === 4) {
      const _pin = await AsyncStorage.getItem('loginPin')
      const accountList = await AsyncStorage.getItem('accountList');

      if (sendTxnStatus && sendTxnStatus?.includes('pin')) {
        if (_pin === pin) {
          dispatch(setSendTxnStatus(sendTxnStatus.replace('pin', 'done')));
          navigate('SetAmount')
        } else {
          showMessage({
            message: "Pin Failed!",
            description: "Please enter 4 digit valid Pin",
            type: "danger",
          });
        }
        return ;
      }
      if (_pin === pin) {
        hideMessage();
        await AsyncStorage.setItem('isLoginPinSet', pin);
        if (accountList === null) {
          navigate('WalletSetup');
          return;
        }
        navigate('Dashboard')
      } else {
        showMessage({
          message: "Login Pin Failed!",
          description: "Please enter 4 digit valid Pin",
          type: "danger",
        });
      }
    } else {
      if (sendTxnStatus && sendTxnStatus?.include('pin')) {
        showMessage({
          message: "Pin Failed!",
          description: "Please enter 4 digit Pin",
          type: "warning",
        });
        return ;
      }
      showMessage({
        message: "Login Pin Failed!",
        description: "Please enter 4 digit Pin",
        type: "warning",
      });
    }
  };
  const [biometryType, setBiometryType] = useState('');
  const [nextScreen, setNextScreen] = useState('');
  const handleRemove = () => {
    setPin(pin.substring(0, pin.toString().length - 1))
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
          setBiometryType(biometryType)
          console.log("biometryType:", biometryType);
        })
        .catch(error => {
          // Failure code
          console.log(error);
          setBiometryType('notfound')
        });
  }, [])
  const handleNextScreen= async () => {
    const registerUser = await AsyncStorage.getItem('registerUser');
    const loginUser = await AsyncStorage.getItem('loginUser');
    const faceId = await AsyncStorage.getItem('isfaceId');
    const fingerId = await AsyncStorage.getItem('isfingerId');
    const loginPin = await AsyncStorage.getItem('loginPin');
    const isloginPin = await AsyncStorage.getItem('isLoginPinSet');
    const accountList = await AsyncStorage.getItem('accountList');
    console.log("faceId:", faceId);
    console.log("fingerId:", fingerId);

    if (loginPin !== null && biometryType && (faceId&&faceId==='true' || fingerId&&fingerId==='true')) {
      TouchID.authenticate('Open your FornaxWallet', optionalConfigObject)
          .then((success: any) => {
            if (accountList === null) {
              navigate('WalletSetup');
              return;
            }
            if (registerUser && loginUser && accountList && (loginPin)) {
              navigate('Dashboard');
              return;
            }
            console.log(success, "success");
          })
          .catch((error: any) => {
            console.log(error, "error");
            if (loginPin) {
              navigate('LoginPin');
              return;
            }else{
              navigate('Login');
              return;
            }
          });
    }
  }
  useEffect(() => {
    if (biometryType !== '') {
      handleNextScreen();
    }
  }, [biometryType]);

  return (
    <>
      {/*<View>*/}
      {/*  <Pressable >*/}
      {/*    <Image style={styles.backIcon} source={require(BackIcon)} />*/}
      {/*  </Pressable>*/}
      {/*</View>*/}
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
        <Text style={styles.loginTextbox}>
          PIN forgot?
          <Pressable
              onPress={() => navigate('Login')}
              style={{ paddingTop: 6 }}>
            <Text style={styles.loginText}> Login</Text>
          </Pressable>
        </Text>
      </View>
    </>
  );
};

export default LoginPin;
