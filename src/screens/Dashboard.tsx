import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, ScrollView, Text, View} from 'react-native';
import CardCarousel from '../components/CardCarousel';
import MainTab from '../components/MainTab';
import NavTab from '../components/NaviTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setAccounts, setWeb3} from '../redux/reducers/Wallet';
import {getWeb3} from '../utils/common';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Spinner from 'react-native-spinkit';

const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';


const BellIcon = '../../assets/images/bell.png';
const SettingIcon = '../../assets/images/setting.png';

const styles = StyleSheet.create({
    fornaxBox: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'space-between',
        // marginTop: 30,
        marginTop: hp(3.3),
        // marginHorizontal: 20,
        marginHorizontal: wp(5.3),
        zIndex: 0,
    },
    navBar: {
        flexDirection: 'row',
        alignContent: 'flex-end',
        alignSelf: 'flex-end',
        position: 'relative',
    },
    bellImg: {
        // width: 24,
        // height: 26,
        // marginHorizontal: 27,
        width: hp(3.3),
        resizeMode: 'contain',
        height: hp(3.3),
        marginHorizontal: wp(5.3),
    },
    settingImg: {
        // width: 25,
        resizeMode: 'contain',

        width: hp(3.3),
        // height: 26,
        height: hp(3.3),
    },
    fornaxText: {
        // fontSize: 28,
        fontSize: hp(3.3),
        color: '#b27f29',
        textAlign: 'left',
        fontFamily: 'Quicksand-Bold',
        // marginTop: 5,
        marginTop: hp(6),
        // marginBottom: 5,
        marginBottom: hp(3.5),
        marginLeft: hp(2),
    },
    cardCarousel: {
        height: hp(27.2),
        // backgroundColor:'red',
        // width: 450,
        // height:216,
    },
    tabBox: {
        // height: 310,
        // backgroundColor:'red',
        height: hp(34.5),
    },
    badge: {
        width: 7,
        height: 7,
        borderRadius: 20,
        backgroundColor: '#ff3333',
        position: 'absolute',
        right: 40,
        top: 0,
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
    navTabBox: {
        height: 70,
        //new
        // position: 'absolute',
        // bottom: 0,
    },
    colco: {
        // backgroundColor: 'red',
        position: "absolute",
        width: wp(90),
        bottom: 5,
    },
    backIcon: {
        marginLeft: wp(-60.3),
        marginTop: hp(0.5),
        height: hp(3),
        width: hp(3),
    },
    innerContainer: {
        // backgroundColor:'blue',
        // flex: 1,
        flexDirection: 'column',
        // height:hp(50),
        // overflow:"scroll",
        // paddingBottom:50,
    },
    extrahight: {
        height: hp(10),
    }
});

const Dashboard = (props: any) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true);
    const navigate = props.navigation.navigate;
    const {tokens} = useSelector(({wallet}: any) => {
        return {
            tokens: wallet?.tokens,
        };
    });
    // const getBalances = async (data: any, web3: any) => {
    //   return data.map(async (account: any, index: any) => {
    //     web3.eth.getBalance(account?.address).then(
    //       (balance: any) => {
    //         if (balance >= 0) {
    //           data[index] = Object.assign({ balance }, data[index]);
    //           // dispatch(setAccounts(data));
    //           console.log(balance, data[index], index, "balance");
    //         }
    //       },
    //       (error: any) => {
    //         console.log(error, 'getallBalance');
    //       },
    //     );
    //   });
    // };

    const checkAccount = async () => {
        try {
            const value = await AsyncStorage.getItem('accountList');
            if (value != null) {
                const data = JSON.parse(value);
                dispatch(setAccounts(data));
                setLoader(false);
                // const _bal =
                //   data?.length > 0 && (await web3.eth.getBalance(data[0]?.address));
                // console.log(_bal);
                // await getBalances(data, web3);
            }
        } catch (err) {
            console.log('Account Error', err);
        }
    };

    const connectWallet = async () => {
        try {
            // await AsyncStorage.removeItem('registerUser');
            const mnemonicPhrase = await AsyncStorage.getItem('mnemonicPhrase');
            let web3 = null;
            web3 = mnemonicPhrase && getWeb3(mnemonicPhrase, tokens);

            if (web3) {
                console.log("latest web3:", web3)
                await checkAccount();
                dispatch(setWeb3(web3));

                // await web3.eth.accounts.wallet.clear();
                // await AsyncStorage.removeItem('accountList');
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        connectWallet();
        console.log('Acconut Connected')
        setLoader(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loader && (
                <View style={styles.loaderBack}>
                    <Spinner isVisible={true} size={50} type={'9CubeGrid'} color="#b27f29"/>
                </View>
            )}
            <View style={styles.fornaxBox}>
                <View style={styles.navBar}>
                    <View>
                        <Pressable onPress={() => navigate('Tokens')}>
                            <Image style={styles.backIcon} source={require(BackIcon)}/>
                        </Pressable>
                    </View>
                    <View style={styles.badge}/>
                    <Pressable onPress={() => navigate('Notifications')}>
                        <Image source={require(BellIcon)} style={styles.bellImg}/>
                    </Pressable>
                    <Pressable onPress={() => navigate('Settings')}>
                        <Image source={require(SettingIcon)} style={styles.settingImg}/>
                    </Pressable>
                </View>
                <Text style={styles.fornaxText}>Dashboard</Text>
                {!loader && (
                    <>
                        {/*<ScrollView style={styles.innerContainer}>*/}
                        <View style={styles.cardCarousel}>
                            <CardCarousel navigate={navigate}/>
                        </View>
                        <View style={styles.tabBox}>
                            <MainTab/>
                        </View>
                        <View style={styles.extrahight}>

                        </View>
                        {/*</ScrollView>*/}
                        <View style={styles.colco}>
                            <View style={styles.navTabBox}>
                                <NavTab navigate={navigate}/>
                            </View>
                        </View>
                    </>
                )}
            </View>
        </>
    );
};

export default Dashboard;
