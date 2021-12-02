import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
const SettingImage = '../../assets/images/Settingmaga.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
const ProfileIcon = '../../assets/images/Iconly_Curved_Profilemini.png';
const NotificationIcon = '../../assets/images/Iconly_Curved_Notificationmini.png';
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
  arrowRightIcon: {
    flex: 1,
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'center',
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
});

const Settings = (props: any) => {
  const navigate = props.navigation.navigate;

  return (
    <>
      <View>
        <Image style={styles.backIcon} source={require(BackIcon)} />
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
          onPress={() => navigate('Signup')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require(NotificationIcon)} />
          <Text style={styles.txnText}>Notifications</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require(ArrowRightIcon)} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigate('Signup')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require(WalletIcon)} />
          <Text style={styles.txnText}>Your Wallet</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require(ArrowRightIcon)} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigate('Signup')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require(LoginIcon)} />
          <Text style={styles.txnText}>Login Settings</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require(ArrowRightIcon)} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigate('Signup')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require(CallingIcon)} />
          <Text style={styles.txnText}>Help</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require(ArrowRightIcon)} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigate('Signup')}
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
