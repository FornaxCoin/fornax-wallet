import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
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
        // paddingHorizontal: wp(6.3),
        // marginTop:hp(3.7),
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
        // backgroundColor:'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: wp(65.5),
        alignSelf: 'center',
        marginBottom: hp(5.5),
        height: hp(2.6),
    },
    button: {
        borderRadius: 0,
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
        marginLeft: wp(6.3),
        marginTop: hp(3.7),
        height: hp(3),
        width: hp(3),
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
        resizeMode: 'contain',
        width: hp(6.5),
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
    innerIcons: {
        height: hp(2.6),
        width: wp(5.8),
        resizeMode: 'contain',
    },
    arrowIcon: {
        height: hp(1),
        resizeMode: 'contain',
    },
    pressed: {
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
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
                <View style={{overflow: 'hidden'}}>
                    <Pressable
                        android_ripple={{color: '#ffffff20', borderless: false}}
                        onPress={() => navigate('Dashboard')}
                        style={(state) => [state.pressed && styles.pressed]}
                    >
                        <Image style={styles.backIcon} source={require(BackIcon)}/>
                    </Pressable>
                </View>
            </View>
            <View style={styles.fornaxInnerBox}>
                <Image style={styles.fornaxIcon} source={require(SettingImage)}/>
                <Text style={styles.textStyle}>Settings</Text>
            </View>
            <View style={styles.fornaxBox}>
                {/*<Pressable*/}
                {/*  onPress={() => navigate('Signup')}*/}
                {/*  style={[styles.button, styles.buttonClose]}>*/}
                {/*  <Image source={require(ProfileIcon)} />*/}
                {/*  <Text style={styles.txnText}>Account</Text>*/}
                {/*  <View style={styles.arrowRightIcon}>*/}
                {/*    <Image source={require(ArrowRightIcon)} />*/}
                {/*  </View>*/}
                {/*</Pressable>*/}
                <View style={{overflow: 'hidden'}}>
                    <Pressable
                        android_ripple={{color: '#ffffff20', borderless: false}}
                        onPress={() => navigate('Notifications')}
                        style={(state) => [styles.button, styles.buttonClose, state.pressed && styles.pressed]}>
                        <Image source={require(NotificationIcon)} style={styles.innerIcons}/>
                        <Text style={styles.txnText}>Notifications</Text>
                        <View style={styles.arrowRightIcon}>
                            <Image source={require(ArrowRightIcon)} style={styles.arrowIcon}/>
                        </View>
                    </Pressable>
                </View>
                {/*<Pressable*/}
                {/*  onPress={() => navigate('Wallet')}*/}
                {/*  style={[styles.button, styles.buttonClose]}>*/}
                {/*  <Image source={require(WalletIcon)} style={styles.innerIcons}/>*/}
                {/*  <Text style={styles.txnText}>Your Wallet</Text>*/}
                {/*  <View style={styles.arrowRightIcon}>*/}
                {/*    <Image source={require(ArrowRightIcon)} style={styles.arrowIcon}/>*/}
                {/*  </View>*/}
                {/*</Pressable>*/}
                <View style={{overflow: 'hidden'}}>
                    <Pressable
                        android_ripple={{color: '#ffffff20', borderless: false}}
                        onPress={() => navigate('LoginSetting')}
                        style={(state) => [state.pressed && styles.pressed, styles.button, styles.button, styles.buttonClose]}>
                        <Image source={require(LoginIcon)} style={styles.innerIcons}/>
                        <Text style={styles.txnText}>Login Settings</Text>
                        <View style={styles.arrowRightIcon}>
                            <Image source={require(ArrowRightIcon)} style={styles.arrowIcon}/>
                        </View>
                    </Pressable>
                </View>
                <View style={{overflow: 'hidden'}}>
                    <Pressable
                        android_ripple={{color: '#ffffff20', borderless: false}}
                        onPress={() => navigate('ServiceCenter')}
                        style={(state) => [state.pressed && styles.pressed, styles.button, styles.button, styles.buttonClose]}>
                        <Image source={require(CallingIcon)} style={styles.innerIcons}/>
                        <Text style={styles.txnText}>Help</Text>
                        <View style={styles.arrowRightIcon}>
                            <Image source={require(ArrowRightIcon)} style={styles.arrowIcon}/>
                        </View>
                    </Pressable>
                </View>
                <View style={{overflow: 'hidden'}}>
                    <Pressable
                        android_ripple={{color: '#ffffff20', borderless: false}}
                        onPress={handleLogout}
                        style={(state) => [state.pressed && styles.pressed, styles.button, styles.button, styles.buttonClose]}>
                        <Image source={require(LogoutIcon)} style={styles.innerIcons}/>
                        <Text style={styles.txnText}>Log Out</Text>
                        {/*<View style={styles.arrowRightIcon}>*/}
                        {/*  <Image source={require(ArrowRightIcon)} />*/}
                        {/*</View>*/}
                    </Pressable>
                </View>
            </View>
        </>
    );
};

export default Settings;
/*

<View style={{overflow: 'hidden'}}>
<Pressable
    android_ripple={{color: '#00000030', borderless: false}}

<View style={{overflow: 'hidden'}}>
                    <Pressable
                        android_ripple={{color: '#ffffff20', borderless: false}}

 */
