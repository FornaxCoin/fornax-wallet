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
const sendImg = '../../assets/images/Iconly_Curved_Send.png';

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
  fornaxText: {
    fontSize: 48,
    color: '#b27f29',
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
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
        <Image source={require(sendImg)} style={styles.topImg} />
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

const SignUp = () => {
  const [isModalVisible, setModalVisible] = useState(true);
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  return (
    <>
      <View style={styles.fornaxBox}>
        <PhoneModal isModalVisible={isModalVisible}>
          <VerifyModal
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
          />
        </PhoneModal>
        <View style={{ marginBottom: 50 }}>
          <Text style={styles.createAccText}>Create an account,</Text>
          <Text style={styles.createAccText}>
            and enjoy transactions in an easier way
          </Text>
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="username"
            placeholderTextColor="#bdbdbd"
            onChangeText={e => setUser({ ...user, username: e })}
            value={user.username}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="example@mail.com"
            placeholderTextColor="#bdbdbd"
            onChangeText={e => setUser({ ...user, email: e })}
            value={user.email}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="xxxxxxxx"
            placeholderTextColor="#bdbdbd"
            onChangeText={e => setUser({ ...user, password: e })}
            value={user.password}
          />
        </View>
        <Pressable
          onPress={() => setModalVisible(!isModalVisible)}
          style={[styles.button, styles.buttonClose]}>
          <Text style={styles.textStyle}>Register</Text>
        </Pressable>
        <Text style={styles.loginTextbox}>
          You have account?
          <Pressable style={{ paddingTop: 6 }}>
            <Text style={styles.loginText}> Login</Text>
          </Pressable>
        </Text>
      </View>
    </>
  );
};

export default SignUp;
