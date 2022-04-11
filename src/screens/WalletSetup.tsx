import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {generateMnemonic} from 'bip39';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAccounts, setWeb3, setWeb3Frx, setWeb3Eth, setWeb3Bnb} from '../redux/reducers/Wallet';
import {useDispatch, useSelector} from 'react-redux';
import {getWeb3} from '../utils/common';
import Spinner from 'react-native-spinkit';

const SettingImage = '../../assets/images/Settingmaga.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
let disable:boolean;
const styles = StyleSheet.create({
    fornaxBox: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 0
    },
    secondaryTxnText: {
        color: '#363853',
    },
    txnText: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium',
        marginTop: -5,
    },
    buttonClose: {
        backgroundColor: '#b27f29',
        width: wp(65.5),
        alignSelf: 'center',
        marginTop: 25,
    },
    button: {
        borderRadius: hp(2.4),
        paddingVertical: hp(2),
    },
    secondaryButton: {
        backgroundColor: '#fff',
        color: '#b27f29',
        marginTop: hp('25'),
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
    fornaxIcon: {
        resizeMode: 'contain',
        width: hp(6.5),
        height: hp(6.5),
        marginBottom: hp(5.5),
    },
    fornaxInnerBox: {
        flex: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: hp('12'),
        marginBottom: hp('0'),
    },
    fornaxMiniText: {
        fontSize: 16,
        color: '#bdbdbd',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium',
    },
    loaderBack: {
        flex: 1,
        backgroundColor: '#00000096',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        right: 0,
        left: 0,
        bottom: 0,
        top: 0
    },
    pressed: {
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10.00,
    },
});

const WalletSetup = (props: any) => {
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch();
    const navigate = props.navigation.navigate;
    const {tokens} = useSelector(({wallet}: any) => {
        return {
            tokens: wallet?.tokens,
        };
    });

    const storeDataAsync = async (account: any, mnemonicPhrase: string) => {
        try {
            await AsyncStorage.multiRemove(['accountList', 'mnemonicPhrase']);
            await AsyncStorage.setItem('mnemonicPhrase', mnemonicPhrase);
            dispatch(setAccounts(account));
            setLoader(false);
            navigate('VerifyMnemonic');
        } catch (error) {
            setLoader(false);
            // Error saving data
        }
    };

    const getBalance = async (web3: any, account: any, mnemonicPhrase: any) => {
        web3.eth.getBalance(account?.address).then(
            async (bal: any) => {
                if (bal >= 0) {
                    const balance = await web3.utils.fromWei(bal, 'ether');
                    console.log(balance, "balance");
                    storeDataAsync({...account, balance}, mnemonicPhrase);
                }
            },
            (error: any) => {
                setLoader(false);
                console.log(error, 'getBalance');
            },
        );
    };

    const handleCreateWallet = async () => {
        disable=true;
        await setLoader(true);
        try {
            const mnemonicPhrase = await generateMnemonic();
            const web3 = await getWeb3(mnemonicPhrase,tokens);

            if (web3) {
                dispatch(setWeb3(web3));
                // dispatch(setWeb3Frx(web3));
                // dispatch(setWeb3Eth(web3eth));
                // dispatch(setWeb3Bnb(web3bnb));
                const account = await web3.eth.accounts.create();
                getBalance(web3, account, mnemonicPhrase);
            }
        } catch (err) {
            setLoader(false);
            disable = false;
            console.log(err);
        }
    };
    useEffect(() => {
        disable = false;
    })
    return (
        <>
            {loader && (
                <View style={styles.loaderBack}>
                    <Spinner isVisible={true} size={50} type={'9CubeGrid'} color="#b27f29"/>
                </View>
            )}
            <View style={{zIndex: 0}}>
                <Pressable onPress={() => navigate('Login')}>
                    {/*<Image style={styles.backIcon} source={require(BackIcon)} />*/}
                </Pressable>
            </View>
            <View style={styles.fornaxBox}>
                <View style={styles.fornaxInnerBox}>
                    <Image style={styles.fornaxIcon} source={require(SettingImage)}/>
                    <Text style={styles.textStyle}>Wallet Setup</Text>
                    <Text style={styles.fornaxMiniText}>
                        Import an existing wallet or create a new one
                    </Text>
                </View>
                <Pressable
                    android_ripple={{color: '#00000030', borderless: false}}
                    onPress={() => navigate('Import')}
                    style={(state)=>[state.pressed && styles.pressed,styles.button, styles.buttonClose, styles.secondaryButton]}>
                    <Text style={[styles.txnText, styles.secondaryTxnText]}>
                        Import using Secret
                    </Text>
                    <Text
                        style={[styles.txnText, styles.secondaryTxnText, {marginTop: 5}]}>
                        Recovery Phrase
                    </Text>
                </Pressable>
                {!disable &&
                    <Pressable
                        android_ripple={{color: '#00000030', borderless: false}}
                        disabled={disable}
                        onPress={async ()=>{disable = true; await setLoader(true); handleCreateWallet()}}
                        style={(state)=>[state.pressed && styles.pressed, styles.button, styles.buttonClose, {marginBottom: hp('10')}]}>
                        <Text style={styles.txnText}>Create a new Wallet</Text>
                    </Pressable>
                }
            </View>
        </>
    );
};

export default WalletSetup;
