import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SettingImage = '../../assets/images/Settingmaga.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
const ProfileIcon = '../../assets/images/Iconly_Curved_Profilemini.png';
const NotificationIcon =
  '../../assets/images/Iconly_Curved_Notificationmini.png';
const WalletIcon = '../../assets/images/Iconly_Curved_Walletmini.png';
const LoginIcon = '../../assets/images/Iconly_Curved_Unlockmini.png';
const CallingIcon = '../../assets/images/Iconly_Curved_Callingmini.png';
const LogoutIcon = '../../assets/images/Iconly_Curved_Logoutmini.png';
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
  arrowRightIcon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'center',
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
});

const Settings = (props: any) => {
  const navigate = props.navigation.navigate;

  const handleLogout = async () => {
    // await web3.eth.accounts.wallet.clear();
    // await AsyncStorage.removeItem('accountList');
    await AsyncStorage.removeItem('loginUser');
    navigate('Login');
  };

  return (
    <>
      <View>
        <Pressable onPress={() => navigate('Dashboard')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
      </View>
      <View style={styles.fornaxInnerBox}>
        <Image style={styles.fornaxIcon} source={require(SettingImage)} />
        <Text style={styles.textStyle}>Settings</Text>
      </View>
      <View style={styles.fornaxBox}>
        <Pressable
          onPress={() => navigate('Signup')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require(ProfileIcon)} />
          <Text style={styles.txnText}>Account</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require(ArrowRightIcon)} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigate('Notifications')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require(NotificationIcon)} />
          <Text style={styles.txnText}>Notifications</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require(ArrowRightIcon)} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigate('Wallet')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require(WalletIcon)} />
          <Text style={styles.txnText}>Your Wallet</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require(ArrowRightIcon)} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigate('LoginSetting')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require(LoginIcon)} />
          <Text style={styles.txnText}>Login Settings</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require(ArrowRightIcon)} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigate('ServiceCenter')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require(CallingIcon)} />
          <Text style={styles.txnText}>Help</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require(ArrowRightIcon)} />
          </View>
        </Pressable>
        <Pressable
          onPress={handleLogout}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require(LogoutIcon)} />
          <Text style={styles.txnText}>Log Out</Text>
          {/*<View style={styles.arrowRightIcon}>*/}
          {/*  <Image source={require(ArrowRightIcon)} />*/}
          {/*</View>*/}
        </Pressable>
      </View>
    </>
  );
};

export default Settings;
