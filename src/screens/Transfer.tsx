import React, {useEffect, useState} from 'react';
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
    widthPercentageToDP
} from 'react-native-responsive-screen';
import {setTxnsInfo} from '../redux/reducers/Wallet';
import {useDispatch, useSelector} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {showMessage, hideMessage} from "react-native-flash-message";

const SendImage = '../../assets/images/transfer.png';
const QrcodeImage = '../../assets/images/COCO_Line_Menumini.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
// const DownArrow = '../../assets/images/Vector-arrow.png';
let qrCodeIconVisibility = false;
const styles = StyleSheet.create({
    fornaxBox: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // maxWidth:wp(76),
        // backgroundColor: 'red',
    },
    textStyle: {
        fontSize: 24,
        color: '#b27f29',
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
        marginTop: hp('12'),
        marginBottom: hp('4'),
    },
    fornaxMiniText: {
        width: wp(76),
        fontSize: 16,
        color: '#bdbdbd',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium',
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
        width: wp(76),
        marginBottom: 20,
        // paddingRight:20,
    },
    input: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 16,
        width: wp(76),
        color: '#000',
        paddingHorizontal: 20,
        paddingRight:40,
    },
    qrCodeImg: {
        // backgroundColor: 'red',
        height: 50,
        width: 50,
        marginTop: 3,
        marginLeft: -25,

    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width: wp(76),
        fontSize: 16,
        color: '#000',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    inputAndroid: {
        width: wp(76),
        fontSize: 16,
        color: '#000',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
});

const Transfer = (props: any) => {
    const dispatch = useDispatch();
    const navigate = props.navigation.navigate;
    const [accountOpt, setAccountOpt] = useState<any>([]);
    const [txnData, setTxnData] = useState({
        to: '',
        from: {} as any,
    });

    const {web3, accounts} = useSelector(({wallet}: any) => {
        return {
            web3: wallet?.web3,
            accounts: wallet?.accounts,
        };
    });

    useEffect(() => {
        const options =
            accounts.length > 0 &&
            accounts.reduce((newAcc: any, acc: any) => {
                newAcc.push({label: acc?.address, value: acc});
                return newAcc;
            }, []);
        console.log('Options:', options)
        setAccountOpt(options);
    }, [accounts]);

    const handleValue = (value: string, key: string) => {
        setTxnData({...txnData, [key]: value});
        console.log("From:", value)
        if (value) {
            qrCodeIconVisibility = true;
        }else{
            qrCodeIconVisibility = false;
        }
    };

    const handleSend = async () => {
        console.log("inside handle")
        const isValid = await web3.utils.isAddress(txnData.to.toLowerCase().trim());
        if (txnData.from?.address && isValid) {
            hideMessage();
            dispatch(setTxnsInfo(txnData));
            navigate('SetAmount');
        } else {
            showMessage({
                message: "Address is Invalid!",
                description: "Again enter valid address",
                type: "warning",
            });
            console.log('adress is invalid');
        }
    };

    useEffect(() => {
        if (txnData.to) {
            handleSend();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [txnData]);

    return (
        <>
            <View>
                <View style={{overflow: 'hidden'}}>
                    <Pressable
                        android_ripple={{color: '#ffffff20', borderless: false}}e onPress={() => navigate('Dashboard')}>
                    <Image style={styles.backIcon} source={require(BackIcon)}/>
                </Pressable>
                </View>
            </View>
            <View style={styles.fornaxInnerBox}>
                <Image style={styles.fornaxIcon} source={require(SendImage)}/>
                <Text style={styles.textStyle}>Transfer</Text>
                <Text style={styles.fornaxMiniText}>
                    Import an existing wallet or create a new one
                </Text>
            </View>
            <View style={styles.fornaxBox}>
                <View style={styles.inputBox}>
                    <RNPickerSelect
                        onValueChange={value => handleValue(value, 'from')}
                        style={pickerSelectStyles}
                        items={accountOpt}
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={[styles.input, styles.inputFrom]}
                        placeholder="Send Address"
                        placeholderTextColor="#bdbdbd"
                        onChangeText={e => handleValue(e, 'to')}
                        value={txnData.to}
                    />
                    {qrCodeIconVisibility &&
                        <Pressable onPress={() => {
                            dispatch(setTxnsInfo(txnData));
                            navigate('QRScanner')
                        }} style={styles.qrCodeImg}>
                            <Image
                                style={{height: 30, width: 30, position: 'absolute', right: 35, bottom: 10}}
                                source={require(QrcodeImage)}
                            />
                        </Pressable>
                    }
                </View>
            </View>
        </>
    );
};

export default Transfer;
