import React, {useState} from 'react';
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage, hideMessage} from "react-native-flash-message";
import {validateEmail} from '../utils/common';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

const EyeSlashImg = '../../assets/images/Eye-slashmini.png';

const styles = StyleSheet.create({
    fornaxBox: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'column',
        maxWidth: wp(72),
    },
    createAccText: {
        fontSize: 22,
        fontFamily: 'Quicksand-Medium',
        textAlign: 'center',
        color: '#ffffff',
        lineHeight: 35,
    },
    inputBox: {
        flex: 0,
        flexDirection: 'row',
        marginVertical: hp(2),
        justifyContent: 'space-between',
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
        width: wp(40.2),
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
        paddingTop: 6,
    },
    buttonClose: {
        backgroundColor: '#b27f29',
        width: wp(58),
        alignSelf: 'center',
        marginTop: 25,
        height: hp(7.3),
        justifyContent: 'center',
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
    pinEye: {
        height: hp(2),
        width: hp(2),
        resizeMode: 'contain',
        // marginLeft: -10,
    },
});

const Login = (props: any) => {
    const navigate = props.navigation.navigate;
    const [showPass, setShowPass] = useState(true);
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const handleLogin = async () => {
        try {
            if (user.email && user.password) {
                if (!validateEmail(user.email)) {
                    showMessage({
                        message: "Email Validation Failed!!!",
                        description: "Please enter valid Email Address",
                        type: "warning",
                    });
                    return;
                }
                const registerUser: any = await AsyncStorage.getItem('registerUser');
                const registerData = registerUser && JSON.parse(registerUser);
                if (registerData.password === user.password) {
                    hideMessage();
                    await AsyncStorage.setItem('loginUser', JSON.stringify(user));
                    const value = await AsyncStorage.getItem('accountList');
                    if (value) {
                        navigate('Tokens');
                        return;
                    }
                    navigate('WalletSetup');
                } else {
                    showMessage({
                        message: "Login Failed!!!",
                        description: "Please enter valid Email Address and Password",
                        type: "danger",
                    });
                }
            } else {
                showMessage({
                    message: "Login Failed!!!",
                    description: "Please enter Email Address and Password",
                    type: "danger",
                });
            }
        } catch (err) {
            console.log('Login Error', err);
        }
    };

    const onBlurEmail = () => {
        if (!validateEmail(user.email)) {
            if (user.email !== '') {
                showMessage({
                    message: "Email Validation Failed!!!",
                    description: "Please enter valid Email Address",
                    type: "danger",
                });
            }
        }
    }

    return (
        <>
            <View style={styles.fornaxBox}>
                <View style={{marginBottom: 50}}>
                    <Text style={styles.createAccText}>Login to your Account</Text>
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
                        onChangeText={e => setUser({...user, email: e})}
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
                        onChangeText={e => setUser({...user, password: e})}
                        value={user.password}
                    />
                    <Pressable onPress={() => setShowPass(!showPass)} style={{position: 'absolute', right: 0}}>
                        <Image source={require(EyeSlashImg)} style={styles.pinEye}/>
                    </Pressable>
                </View>
                <Pressable
                    onPress={handleLogin}
                    style={[styles.button, styles.buttonClose]}>
                    <Text style={styles.textStyle}>Login</Text>
                </Pressable>
                <Text style={styles.loginTextbox}>
                    You don't have account?
                    <Pressable
                        onPress={() => navigate('Signup')}>
                        <Text style={[styles.loginText, {marginLeft: 3,}]}>SignUp</Text>
                    </Pressable>
                </Text>
            </View>
        </>
    );
};

export default Login;
