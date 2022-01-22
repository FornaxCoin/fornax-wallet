import React, {useRef} from 'react';
import {Image, Linking, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useDispatch, useSelector} from 'react-redux';
import {setPayTxn, setTokens, setTxnsInfo, setWeb3} from "../redux/reducers/Wallet";
import {showMessage} from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getWeb3} from "../utils/common";

const PayImage = '../../assets/images/pay.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
const qrCodeWidth = hp('26');
const styles = StyleSheet.create({
    fornaxBox: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        // resizeMode:'contain',
        height: hp(3),
        width: hp(3),
    },
    fornaxIcon: {
        resizeMode: 'contain',
        width: hp(10.3),
        height: hp(10.3),
        marginBottom: hp(5.5),
    },
    fornaxInnerBox: {
        flex: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: hp('5'),
        marginBottom: hp('4'),
    },
    fornaxMiniText: {
        fontSize: 16,
        color: '#bdbdbd',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium',
        // marginTop: 20,
        marginTop: hp(1.8),
    },
    inputBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        borderRadius: 15,
        fontFamily: 'Quicksand-Medium',
        backgroundColor: '#ffffff',
        color: '#bdbdbd',
        fontSize: 16,
        width: 340,
        marginBottom: 20,
    },
    input: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 16,
        width: 340,
        paddingHorizontal: 20,
    },
    qrCodeImg: {
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
        height: qrCodeWidth,
        width: qrCodeWidth,
        borderWidth: 5,
        borderColor: 'aliceblue',
        borderRadius: 30,
        backgroundColor: 'aliceblue',
    },
    topLine: {
        height: 6,
        backgroundColor: '#021124',
        width: wp('49'),
        position: 'absolute',
        top: -6,
    },
    leftLine: {
        width: 6,
        backgroundColor: '#021124',
        height: hp('23'),
        position: 'absolute',
        left: -6,
        top: 40,
    },
    rightLine: {
        width: 6,
        backgroundColor: '#021124',
        height: hp('23'),
        position: 'absolute',
        right: -6,
        top: 40,
    },
    bottomLine: {
        height: 6,
        backgroundColor: '#021124',
        width: wp('49'),
        position: 'absolute',
        bottom: -6,
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 42,
        color: '#777'
    },
    cameraContainer: {
        height: qrCodeWidth - 70,
        width: qrCodeWidth - 70,
    }
});

const Pay = (props: any) => {
    const dispatch = useDispatch();
    const navigate = props.navigation.navigate;
    let scanner = useRef(null);

    const {web3, accounts, defaultAdress, tokens} = useSelector(({wallet}: any) => {
        return {
            web3: wallet?.web3,
            accounts: wallet?.accounts,
            defaultAdress: wallet?.defaultAdress,
            tokens: wallet?.tokens,
        };
    });

    const onSuccess = async (e: any) => {
        // Linking.openURL(e.data).catch(err =>
        //   console.error('An error occured', err)
        // );
        console.log(e.data);
        const found = accounts.find((acc: any) => acc.address === defaultAdress);
        let data = e.data.split('?');
        if (data[0].split(':')[0] === 'fornax' || data[0].split(':')[0] === 'ethereum' || data[0].split(':')[0] === 'binance') {
            let value = data[1].split('=')[1];
            console.log('value:', value, parseFloat(value), typeof value)
            let payTxnData = {
                to: data[0].split(':')[1],
                value: parseFloat(value),
            }
            console.log('payTxnData:', payTxnData);
            let mnemonicPhrase = await AsyncStorage.getItem('mnemonicPhrase');
            let web3Frx = web3;
            if (data[0].split(':')[0] === 'fornax' && tokens !== "FRX") {
                dispatch(setTokens('FRX'));
                web3Frx = mnemonicPhrase && await getWeb3(mnemonicPhrase, 'FRX');
            } else if (data[0].split(':')[0] === 'ethereum' && tokens !== "ETH") {
                dispatch(setTokens('ETH'));
                web3Frx = mnemonicPhrase && await getWeb3(mnemonicPhrase, 'ETH');
            } else if (data[0].split(':')[0] === 'binance' && tokens !== "BNB") {
                dispatch(setTokens('FRX'));
                web3Frx = mnemonicPhrase && await getWeb3(mnemonicPhrase, 'FRX');
            } else {
            }
            dispatch(setWeb3(web3Frx));
            dispatch(setPayTxn({from: {...found}, data: payTxnData}));
            navigate('ConfirmPay');
        } else {
            showMessage({
                message: "Invalid Pay! Not Fornax network",
                description: "Must use fornax network pay address",
                type: "danger",
            });
        }
        // fornax:0xfb6916095ca1df60bb79Ce92ce3ea74c37c5d359?value=2.014e18,
    };

    return (
        <>
            <View>
                <Pressable onPress={() => navigate('Dashboard')}>
                    <Image style={styles.backIcon} source={require(BackIcon)}/>
                </Pressable>
            </View>
            <View style={styles.fornaxBox}>
                <View style={styles.fornaxInnerBox}>
                    <Image style={styles.fornaxIcon} source={require(PayImage)}/>
                    <Text style={styles.textStyle}>Pay Me</Text>
                    <Text style={styles.fornaxMiniText}>Scan QR code</Text>
                    <Text style={styles.fornaxMiniText}>Please move your camera {"\n"} over the QR Code</Text>
                </View>
                <View style={styles.qrCodeImg}>
                    {/*<View style={styles.topLine} />*/}
                    {/*<View style={styles.leftLine} />*/}
                    <QRCodeScanner
                        reactivate={true}
                        showMarker={false}
                        ref={scanner}
                        containerStyle={styles.cameraContainer}
                        cameraStyle={styles.cameraContainer}
                        onRead={onSuccess}
                    />
                    {/*<View style={styles.rightLine} />*/}
                    {/*<View style={styles.bottomLine} />*/}
                </View>
                <View>
                    <Text style={styles.fornaxMiniText}>Or pay your bill</Text>
                </View>
            </View>
        </>
    );
};

export default Pay;
