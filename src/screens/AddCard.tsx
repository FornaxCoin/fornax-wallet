import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAccounts} from '../redux/reducers/Wallet';
import {useDispatch, useSelector} from 'react-redux';

const backLines = '../../assets/images/Group_37background.png';
const backCard = '../../assets/images/Group_36card.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';

const styles = StyleSheet.create({
    fornaxBox: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryTxnText: {
        color: '#363853',
    },
    txnText: {
        // marginLeft: 17,
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium',
        marginTop: -5,
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
    secondaryButton: {
        backgroundColor: '#fff',
        color: '#b27f29',
        marginTop: hp(10),
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
    centerContainer: {
        position: 'absolute',
    },
    center: {
        top: hp(-5),
        zIndex: -99,
        position: 'absolute',
        alignSelf: 'center',
    },
    card: {
        height: hp(39.5),
        resizeMode: 'contain',
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

const AddCard = (props: any) => {
    const dispatch = useDispatch();
    const navigate = props.navigation.navigate;

    const {web3} = useSelector(({wallet}: any) => {
        return {
            web3: wallet?.web3,
        };
    });

    const storeDataAsync = async (account: any) => {
        try {
            const accounts: any = [];
            const accountList = await AsyncStorage.getItem('accountList');
            if (accountList !== null) {
                accounts.push(...JSON.parse(accountList));
                accounts.push(account);
            }
            await AsyncStorage.setItem('accountList', JSON.stringify(accounts));
            dispatch(setAccounts(accounts));
            navigate('Dashboard');
        } catch (error) {
            // Error saving data
        }
    };

    const getBalance = async (account: any) => {
        web3.eth.getBalance(account?.address).then(
            async (bal: any) => {
                if (bal >= 0) {
                    const balance = await web3.utils.fromWei(bal, 'ether');
                    storeDataAsync({...account, balance});
                }
            },
            (error: any) => {
                console.log(error, 'getBalance');
            },
        );
    };

    const handleCreateWallet = async () => {
        try {
            if (web3) {
                const account = await web3.eth.accounts.create();
                getBalance(account);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <View>
                <View style={{overflow: 'hidden'}}>
                    <Pressable
                        android_ripple={{color: '#ffffff20', borderless: false}} onPress={() => navigate('Dashboard')}>
                        <Image style={styles.backIcon} source={require(BackIcon)}/>
                    </Pressable>
                </View>
            </View>
            <View style={styles.fornaxInnerBox}>
                {/*<Image style={styles.fornaxIcon} source={require(SettingImage)} />*/}
                <View style={styles.centerContainer}>
                    <Image style={styles.center} source={require(backLines)}/>
                    <Image style={[styles.center, styles.card]} source={require(backCard)}/>
                </View>
                <Text style={styles.textStyle}>Add Card</Text>
            </View>
            <View style={styles.fornaxBox}>
                <View style={{overflow: 'hidden'}}>
                    <Pressable
                        android_ripple={{color: '#00000030', borderless: false}}
                    onPress={() => navigate('ImportCard')}
                    style={(state) => [state.pressed && styles.pressed, styles.button, styles.buttonClose, styles.secondaryButton]}>
                    <Text style={[styles.txnText, styles.secondaryTxnText]}>
                        Import new Card
                    </Text>
                </Pressable>
                </View>
                <View style={{overflow: 'hidden'}}>
                    <Pressable
                        android_ripple={{color: '#00000030', borderless: false}}
                    onPress={handleCreateWallet}
                    style={(state) => [styles.button, styles.buttonClose, state.pressed && styles.pressed]}>
                    <Text style={styles.txnText}>Create a new Card</Text>
                </Pressable>
                </View>
            </View>
        </>
    );
};

export default AddCard;
