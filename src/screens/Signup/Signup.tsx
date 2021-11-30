import React, { useState } from 'react';
import { styles } from './styles';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneModal from '../../components/Modal';
const sendIcon = '../../../assets/images/Iconly_Curved_Send.png';

const VerifyModal = ({ isModalVisible, setModalVisible }: any) => {
  return (
    <>
      <View style={styles.verifyModalBox}>
        <Image source={require(sendIcon)} style={styles.topImg} />
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
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSignup = async () => {
    try {
      await AsyncStorage.setItem('registerUser', JSON.stringify(user));
      navigate('WalletSetup');
    } catch (err) {
      console.log('Signup Error', err);
    }
  };

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
            secureTextEntry={true}
            placeholderTextColor="#bdbdbd"
            onChangeText={e => setUser({ ...user, password: e })}
            value={user.password}
          />
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
