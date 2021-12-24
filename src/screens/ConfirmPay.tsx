import React, {useEffect, useState} from 'react';
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {setAccounts, setPayTxn, setTxnsInfo, setTxnsResponse} from '../redux/reducers/Wallet';
import {useDispatch, useSelector} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {showMessage, hideMessage} from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-spinkit";

const SendImage = '../../assets/images/transfer.png';
const PayImage = '../../assets/images/pay.png';
const QrcodeImage = '../../assets/images/COCO_Line_Menumini.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
// const DownArrow = '../../assets/images/Vector-arrow.png';

const styles = StyleSheet.create({
    fornaxBox: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 20,
        color: '#ffffff',
        lineHeight: 23,
        fontFamily: 'Quicksand-Bold',
        textAlign: 'center',
    },
    text: {
        marginBottom: 15,
        width: wp('90'),
    },
    backIcon: {
        marginLeft: wp(6.3),
        marginTop: hp(3.7),
        // resizeMode:'contain',
        height:hp(3),
        width:hp(3),
    },
    fornaxIcon: {
        resizeMode: 'contain',
        width:  hp(6.5),
        height: hp(6.5),
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
        width: wp(80),
    },
    inputBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 55,
        borderRadius: 15,
        fontFamily: 'Quicksand-Medium',
        backgroundColor: '#ffffff',
        color: '#bdbdbd',
        fontSize: 16,
        width: wp('90'),
        marginBottom: 20,
        // paddingRight:20,
    },
    input: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 16,
        width: wp('90'),
        color: '#000',
        paddingHorizontal: 20,
    },
    qrCodeImg: {
        // backgroundColor: 'red',
        height: 50,
        width: 50,
        marginTop: 3,
        marginLeft: -25,
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
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width: wp('110'),
        fontSize: 16,
        color: '#000',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    inputAndroid: {
        width: wp('110'),
        fontSize: 16,
        color: '#000',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
});

const ConfirmPay = (props: any) => {

    const dispatch = useDispatch();
    const navigate = props.navigation.navigate;
    const [accountOpt, setAccountOpt] = useState<any>([]);
    const [payTxnData, setPayTxnData] = useState({});
    const [txnData, setTxnData] = useState({
        to: '',
        from: {} as any,
    });
    const [loader, setLoader] = useState(false);

    const {web3, accounts, payTxn} = useSelector(({wallet}: any) => {
        return {
            web3: wallet?.web3,
            accounts: wallet?.accounts,
            payTxn: wallet?.payTxn,
        };
    });

    useEffect(() => {
        setPayTxnData(payTxn);
        console.log('\n payTxnData:', payTxnData);
        const options =
            accounts.length > 0 &&
            accounts.reduce((newAcc: any, acc: any) => {
                newAcc.push({label: acc?.address, value: acc});
                return newAcc;
            }, []);
        console.log('Options:', payTxn)
        setAccountOpt(options);
    }, [payTxn]);

    const handleValue = (value: string, key: string) => {
        setPayTxnData({...payTxnData, [key]: value});
        console.log("payTxnData:", payTxnData)
    };

    const handleSend = async () => {
        console.log("inside handle")
        const isValid = await web3.utils.isAddress(payTxnData.data.to.toLowerCase().trim());
        if (payTxnData.from?.address && isValid && payTxnData?.data?.value > 0) {
            setLoader(true);
            await sendTxn(payTxnData.data.value.toString());
        } else {
            showMessage({
                message: "Address is Invalid!",
                description: "Again enter valid address",
                type: "warning",
            });
            console.log('address is invalid');
        }
    };

    const sendTxn = async (amt: string) => {
        txnData.to = payTxnData.data.to;
        console.log('Sending Transaction ..... :', amt, " to =>", payTxnData)
        try {
            const gasPrice = await web3.eth
                .getGasPrice()
                .then(async (result: any) => {
                    return result;
                });
            const nonce = await web3.eth
                .getTransactionCount(payTxnData.from?.address)
                .then((count: any) => {
                    return count;
                });
            const ignoreLength: any = true;
            console.log(txnData, 'txnData');
            web3.eth.accounts.wallet.add(payTxnData?.from?.privateKey);
            web3.eth.defaultAccount = payTxnData?.from?.address;
            await web3.eth.accounts.privateKeyToAccount(payTxnData?.from?.privateKey, [
                ignoreLength,
            ]);

            let finalAmount = amt;
            console.log('\nSENDING AMOUNT ==>>', finalAmount);
            if (finalAmount) {
                web3.eth
                    .sendTransaction({
                        from: payTxnData.from?.address,
                        to: payTxnData.data.to,
                        value: payTxnData.data.value,
                        gasPrice: gasPrice,
                        gas: 21000,
                        nonce: nonce,
                    })
                    .on('transactionHash', function (hash: any) {
                        console.log('Transaction Hash:', hash);
                    })
                    .on('receipt', function (receipt: any) {
                        console.log(receipt, 'receipt');
                        let amount = web3.utils.fromWei(finalAmount.toString(), 'ether');
                        dispatch(setTxnsResponse({...receipt, amount, ...txnData, gasPrice}))
                        getBalance(payTxnData.from);
                        const found = accounts.find((ac: any) => ac.address === payTxnData?.data?.to);
                        if (found) {
                            getBalance(found);
                        }
                    })
                    // .on('confirmation', function (confirmationNumber: any, receipt: any) {
                    //     console.log(confirmationNumber, 'confirmationNumber');
                    //     // console.log(receipt, 'receipt');
                    //     // dispatch(setTxnsResponse({...receipt, amount, ...txnData, gasPrice}))
                    //     // getBalance(txnData.from);
                    //     // const found = accounts.find((ac: any) => ac.address === txnData?.to);
                    //     // if (found) {
                    //     //     getBalance(found);
                    //     // }
                    // })
                    .on('error', (console.error));
            } else {
                console.log("error");
                setLoader(false);
                return
            }
        } catch (err) {
            console.log(err);
            setLoader(false);
        }
    };

    const getBalance = (account: any) => {
        web3.eth.getBalance(account?.address).then(
            async (bal: any) => {
                if (bal >= 0) {
                    const balance = await web3.utils.fromWei(bal, 'ether');
                    storeDataAsync({...account, balance});
                }
            },
            (error: any) => {
                console.log(error, 'getBalance');
                setLoader(false);
            },
        );
    };
    const storeDataAsync = async (account: any) => {
        try {
            const _accounts: any = [];
            const accountList = await AsyncStorage.getItem('accountList');
            if (accountList !== null) {
                const data: any = JSON.parse(accountList);
                var newAccounts = data.map((acc: any) => {
                    return acc.address === account?.address
                        ? {...acc, balance: account.balance}
                        : acc;
                });
                _accounts.push(...newAccounts);
            }
            await AsyncStorage.setItem('accountList', JSON.stringify(_accounts));
            dispatch(setAccounts(_accounts));
            const found = accounts.find((ac: any) => ac.address === txnData?.to);
            if (!found) {
                setLoader(false);
                navigate('ConfirmTransaction');
            } else if (found && account?.address === found?.address) {
                setLoader(false);
                navigate('ConfirmTransaction');
            }
        } catch (error) {
            // Error saving data
        }
    };
    return (
        <>
            {loader && (
                <View style={styles.loaderBack}>
                    <Spinner isVisible={true} size={50} type={'9CubeGrid'} color="#b27f29"/>
                </View>
            )}
            <View>
                <Pressable onPress={() => navigate('Dashboard')}>
                    <Image style={styles.backIcon} source={require(BackIcon)}/>
                </Pressable>
            </View>
            <View style={styles.fornaxInnerBox}>
                <Image style={styles.fornaxIcon} source={require(PayImage)}/>
                <Text style={styles.textStyle}>Confirm Pay</Text>
                <Text style={styles.fornaxMiniText}>
                    Confirm Payment by select Account to Pay Bills
                </Text>
            </View>
            <View style={styles.fornaxBox}>
                <Text style={[styles.textStyle, styles.text]}>To: {payTxnData?.data?.to || '0x00000...000'}</Text>
                <Text
                    style={[styles.textStyle, styles.text]}>Amount: {web3.utils.fromWei(payTxnData?.data?.value.toString() || '0', 'ether') || '0.00'} FRX</Text>
                <View style={styles.inputBox}>
                    <RNPickerSelect
                        onValueChange={value => handleValue(value, 'from')}
                        style={pickerSelectStyles}
                        items={accountOpt}
                    />
                </View>
                <Pressable
                    onPress={handleSend}
                    style={[styles.button, styles.buttonClose]}>
                    <Text style={styles.textStyle}>Confirm</Text>
                </Pressable>
            </View>
        </>
    );
};

export default ConfirmPay;
