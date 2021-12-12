import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PhoneModal from '../components/Modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage, hideMessage } from "react-native-flash-message";
import { validateEmail } from '../utils/common';
import { widthPercentageToDP } from 'react-native-responsive-screen';
const SendImg = '../../assets/images/Iconly_Curved_Send.png';
const EyeSlashImg = '../../assets/images/Eye-slashmini.png';

const styles = StyleSheet.create({
  fornaxBox: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    maxWidth: 360,
  },
  createAccText: {
    fontSize: 22,
    fontFamily: 'Quicksand-Medium',
    textAlign: 'center',
    color: '#ffffff',
    lineHeight: 35,
  },
  inputBox: {
    flexDirection: 'row',
    marginVertical: 13,
    alignContent: 'center',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 16,
    color: '#b27f29',
    marginTop: 8,
    width: 80,
    fontFamily: 'Quicksand-Medium',
  },
  input: {
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
    fontFamily: 'Quicksand-Medium',
    color: '#ffffff',
    paddingHorizontal: 10,
    fontSize: 16,
    width: 200,
    marginLeft: 30,
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
  loginText: {
    fontSize: 14,
    color: '#81c2ff',
    fontFamily: 'Quicksand-Medium',
  },
  buttonClose: {
    backgroundColor: '#b27f29',
    width: 240,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 20,
  },
  textStyle: {
    fontSize: 20,
    color: '#ffffff',
    lineHeight: 23,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
  },
  verifyModalBox: {
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  topImg: {
    height: 42,
    width: 52,
    alignSelf: 'center',
    marginTop: 30,
  },
  verifyText: {
    fontSize: 16,
    fontFamily: 'Quicksand-Medium',
    textAlign: 'center',
    color: '#000000',
    lineHeight: 25,
    marginVertical: 30,
  },
  buttonCode: {
    backgroundColor: '#363853',
    width: 170,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 10,
    borderRadius: 20,
    paddingVertical: 20,
  },
  codeText: {
    fontSize: 20,
    color: '#ffffff',
    lineHeight: 23,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
  },
});

const VerifyModal = ({ isModalVisible, setModalVisible }: any) => {
  return (
    <>
      <View style={styles.verifyModalBox}>
        <Image source={require(SendImg)} style={styles.topImg} />
        <Text style={styles.verifyText}>
          Verify your account, we have sent a verification code to your mobile
          number
        </Text>
        <Pressable
          onPress={() => setModalVisible(!isModalVisible)}
          style={styles.buttonCode}>
          <Text style={styles.codeText}>Send Code</Text>
        </Pressable>
      </View>
    </>
  );
};

const SignUp = (props: any) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigate = props.navigation.navigate;
  const [showPass, setShowPass] = useState(true);
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSignup = async () => {
    try {
      if (user.email && user.password && user.username) {
        if (!validateEmail(user.email)) {
          showMessage({
            message: "Email Validation Failed!!!",
            description: "Please enter valid Email Address",
            type: "warning",
          });
          return;
        }
        if (user.password.length < 6) {
          showMessage({
            message: "Password Strenght is Weak!",
            description: "Please enter password length atleast 6 or more for registration",
            type: "warning",
          });
          return; 
        }
        hideMessage();
        await AsyncStorage.setItem('registerUser', JSON.stringify(user));
        navigate('WalletSetup');
      } else {
        showMessage({
          message: "Registration Failed!!!",
          description: "Please enter data for registration",
          type: "warning",
        });
      }
    } catch (err) {
      console.log('Signup Error', err);
    }
  };

  const handlePass = (e: any) => {
    setUser({ ...user, password: e });
    hideMessage();
  }

  const onBlurEmail = () => {
    if(!validateEmail(user.email)) {
      showMessage({
        message: "Email Validation Failed!!!",
        description: "Please enter valid Email Address",
        type: "warning",
      });
    }
  }

  const onBlurPassword = (e: any) => {
    if (e.length < 6) {
      showMessage({
        message: "Password Strenght is Weak!",
        description: "Please enter password length atleast 6 or more for registration",
        type: "warning",
      });
    }
  }

  return (
    <>
      <View style={styles.fornaxBox}>
        {isModalVisible && (
          <PhoneModal isModalVisible={isModalVisible}>
            <VerifyModal
              isModalVisible={isModalVisible}
              setModalVisible={setModalVisible}
            />
          </PhoneModal>
        )}
        <View style={{ marginBottom: 50 }}>
          <Text style={styles.createAccText}>Create an account,</Text>
          <Text style={[styles.createAccText, { width: widthPercentageToDP('85')}]}>
            and enjoy transactions in an easier way
          </Text>
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="username"
            placeholderTextColor="#bdbdbd"
            onChangeText={e => { setUser({ ...user, username: e }); hideMessage();}}
            value={user.username}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="example@mail.com"
            placeholderTextColor="#bdbdbd"
            autoCapitalize='none'
            autoCorrect={false}
            onBlur={onBlurEmail}
            onChangeText={e => { setUser({ ...user, email: e }); hideMessage();}}
            value={user.email}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="xxxxxxxx"
            secureTextEntry={showPass}
            placeholderTextColor="#bdbdbd"
            onChangeText={e => handlePass(e)}
            onBlur={onBlurPassword}
            value={user.password}
          />
          <Pressable onPress={() => setShowPass(!showPass)} style={{ marginBottom: 20, marginRight: 10 }}>
            <Image source={require(EyeSlashImg)} style={{ width: 20, position: 'absolute', right: 0 }} />
          </Pressable>
        </View>
        <Pressable
          onPress={handleSignup}
          style={[styles.button, styles.buttonClose]}>
          <Text style={styles.textStyle}>Register</Text>
        </Pressable>
        <Text style={styles.loginTextbox}>
          You have account?
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

export default SignUp;
