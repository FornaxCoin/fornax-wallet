import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import WalletTabs from '../components/WalletTabs';
import { setDefaultAddress, setWeb3, setTokens, setAccounts } from "../redux/reducers/Wallet";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { getWeb3 } from '../utils/common';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-spinkit";

const WalletImage = '../../assets/images/Walletmaga.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
const DownArrowImg = '../../assets/images/roundRight.png';

const styles = StyleSheet.create({
    fornaxBox: {
        flex: 1,
        flexDirection: 'column',
    },
    textStyle: {
        fontSize: 20,
        color: '#ffffff',
        lineHeight: 23,
        fontFamily: 'Quicksand-Bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    backIcon: {
        marginLeft: wp(6.3),
        marginTop: hp(3.7),
        // resizeMode:'contain',
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
        marginBottom: hp('4'),
    },
    fornaxMiniText: {
        fontSize: 16,
        color: '#bdbdbd',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium',
    },
    tabBox: {
        height: 410,
        marginBottom: 30,
        // backgroundColor: 'red',
    },
    bankBox: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        height: hp(7.9),
        width: wp(67.6),
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    roundBox: {
        height: hp(4.4),
        width: hp(4.4),
        borderRadius: hp(1.9),
        marginLeft: 5,
        marginRight: 15,
    },
    bankText: {
        fontSize: 16,
        color: '#363853',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium',
    },
    downIconBorder: {
        width: hp(2.2),
        height: hp(2.2),
        // borderColor: '#363853',
        // borderWidth: 2,
        // borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 10,
        marginRight: 15,
    },
    downIcon: {
        width: hp(2.2),
        height: hp(2.2),
        resizeMode: 'contain',
    },
    extrahight: {
        height: 100,
    },
    loaderBack: {
        flex: 1,
        backgroundColor: '#00000057',
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

const Tokens = (props: any) => {
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch();
    const navigate = props.navigation.navigate;

    const { accounts, web3, web3Frx, web3Eth, web3Bnb, tokens } = useSelector(({ wallet }: any) => {
        return {
            accounts: wallet?.accounts,
            web3: wallet?.web3,
            web3Frx: wallet?.web3Frx,
            web3Eth: wallet?.web3Eth,
            web3Bnb: wallet?.web3Bnb,
            tokens: wallet?.tokens,
        };
    });

    const checkAccount = async () => {
        try {
            const value = await AsyncStorage.getItem('accountList');
            if (value != null) {
                const data = JSON.parse(value);
                dispatch(setAccounts(data));
                setLoader(false);
            }
        } catch (err) {
            console.log('Account Error', err);
        }
    };
    const storeDataAsync = async (account: any) => {
        try {
            let _accounts: any = [];
            let accountList = await AsyncStorage.getItem('accountList');
            console.log("MyAccountList:", accountList)
            if (accountList !== null) {
                let data: any = JSON.parse(accountList);
                var newAccounts = data.map((acc: any) => {
                    return acc.address === account?.address
                        ? { ...acc, balance: account.balance }
                        : acc;
                });
                _accounts.push(...newAccounts);
            }
            await AsyncStorage.setItem('accountList', JSON.stringify(_accounts));
            dispatch(setAccounts(_accounts));
        } catch (error) {
            // Error saving data
        }
    };
    const getBalance = async (account: any, web3: any) => {
        console.log("inside Balance");
        if (web3) {
            console.log("inside Balance2", account);
            try {
                let bal = await web3.eth.getBalance(account?.address);
                console.log("bal", bal);
                if (bal >= 0) {
                    const balance = web3.utils.fromWei(bal, 'ether');
                    console.log("balance:", balance)
                    await storeDataAsync({ ...account, balance });
                }
            } catch (e) {
                console.log('Error:', e)
            }
        } else {
            console.log('web3 not found')
        }

    };

    const [accountsCount, setAccountsCount] = useState(0);
    const handleNetwork = async (network: string = 'fornax') => {

        let mnemonicPhrase = await AsyncStorage.getItem('mnemonicPhrase');
        if (network === 'FRX') {
            setLoader(true);
            dispatch(setTokens('FRX'));
            let web3Frx = mnemonicPhrase && await getWeb3(mnemonicPhrase, 'FRX');
            dispatch(setWeb3(web3Frx));
            console.log("MyAccount:", accounts)
            if (accounts) {
                for (let i = 0; i < accounts.length; i++) {
                    console.log("hello")
                    await getBalance(accounts[i], web3Frx);
                }
            }
            setLoader(false);
            navigate('Dashboard')
        }
        if (network === 'ETH') {
            setLoader(true);
            dispatch(setTokens('ETH'));
            let web3Eth = mnemonicPhrase && await getWeb3(mnemonicPhrase, 'ETH');
            dispatch(setWeb3(web3Eth));
            if (accounts) {
                for (let i = 0; i < accounts.length; i++) {
                    console.log("hello")
                    await getBalance(accounts[i], web3Eth);
                }
            }
            setLoader(false);
            navigate('Dashboard')
        }
        if (network === 'BNB') {
            setLoader(true);
            dispatch(setTokens('BNB'));
            let web3Bnb = mnemonicPhrase && await getWeb3(mnemonicPhrase, 'BNB');
            dispatch(setWeb3(web3Bnb));
            if (accounts) {
                for (let i = 0; i < accounts.length; i++) {
                    console.log("hello")
                    await getBalance(accounts[i], web3Bnb);
                }
            }
            setLoader(false);
            navigate('Dashboard')
        }
    };
    useEffect(() => {
        checkAccount();
    }, []);
    return (
        <>
            {loader && (
                <View style={styles.loaderBack}>
                    <Spinner isVisible={true} size={50} type={'9CubeGrid'} color="#b27f29" />
                </View>
            )}
            <View>
                <Pressable
                    android_ripple={{ color: '#ffffff20', borderless: false }} onPress={() => navigate('Dashboard')}>
                    <Image style={styles.backIcon} source={require(BackIcon)} />
                </Pressable>
            </View>
            <View style={styles.fornaxBox}>
                <View style={styles.fornaxInnerBox}>
                    <Image style={styles.fornaxIcon} source={require(WalletImage)} />
                    <Text style={styles.textStyle}>Your Tokens</Text>
                    {/*<Text style={styles.fornaxMiniText}> {(accountsCount)} Accounts Connected</Text>*/}
                </View>
                <View style={styles.tabBox}>
                    <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', }}>
                        <Pressable
                            android_ripple={{ color: '#00000030', borderless: false }} style={(state) => [state.pressed && styles.pressed, styles.bankBox]} onPress={() => handleNetwork('FRX')}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={[styles.roundBox, { backgroundColor: '#4368c7' }]} />
                                <Text style={styles.bankText}>Fornax (FRX)</Text>
                            </View>
                            <View style={styles.downIconBorder}>
                                <Image source={require(DownArrowImg)} style={styles.downIcon} />
                            </View>
                        </Pressable>
                        {/*Other networks Codes*/}
                        <Pressable style={styles.bankBox} onPress={() => handleNetwork('ETH')}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={[styles.roundBox, { backgroundColor: '#936ee3' }]} />
                                <Text style={styles.bankText}>Ethereum (ETH)</Text>
                            </View>
                            <View style={styles.downIconBorder}>
                                <Image source={require(DownArrowImg)} style={styles.downIcon} />
                            </View>
                        </Pressable>
                        <Pressable style={styles.bankBox} onPress={() => handleNetwork('BNB')}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={[styles.roundBox, { backgroundColor: '#fa8315' }]} />
                                <Text style={styles.bankText}>Binance Coin (BNB)</Text>
                            </View>
                            <View style={styles.downIconBorder}>
                                <Image source={require(DownArrowImg)} style={styles.downIcon} />
                            </View>
                        </Pressable>
                        <View style={styles.extrahight} />
                    </View>
                </View>
            </View>
        </>
    );
};

export default Tokens;
