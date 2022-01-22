import React, { useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    ImageBackground,
    StyleSheet,
    Image,
    Pressable,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Carousel from 'react-native-snap-carousel';
import {showMessage, hideMessage} from "react-native-flash-message";
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultAddress } from '../redux/reducers/Wallet';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { position } from 'html2canvas/dist/types/css/property-descriptors/position';

const BgImage = '../../assets/images/Mask.png';
const plusImg = '../../assets/images/Plusmini.png';
const copyImg = '../../assets/images/copy.png';
const keyImg = '../../assets/images/key.png';

const styles = StyleSheet.create({
    carouselBox: {
        paddingHorizontal: 40,
        paddingTop: 45,
        backgroundColor: '#936ee3',
        height:hp(25.8),
        borderRadius: hp(5),
        flexDirection: 'column',
        position:"relative",
    },
    carouselText: {
        fontSize: 16,
        fontFamily: 'Quicksand-Bold',
        color: '#ffffff',
        textAlign: 'left',
        marginBottom: 8,
        lineHeight:21,
    },
    addBtn: {
        backgroundColor: '#363853',
        padding: hp(1.3),
        position: 'absolute',
        bottom: hp(-1.3),
        right: wp(3.9),
        borderRadius: hp(2.5),
    },
    copyIcon: {
        height: 20,
        width: 20,
        marginLeft: 5,
        resizeMode: 'contain',

    },
});

const CardCarousel = (props: any) => {
    const carouselRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = props.navigate;
    const [activeIndex, setActiveIndex] = useState(0);

    const { accounts, web3 } = useSelector(({ wallet }: any) => {
        return {
            accounts: wallet?.accounts,
            web3: wallet?.web3,
        };
    });

    const handleClipboard = (address: string) => {
        showMessage({
            message: "Coppied",
            type: "success",
            position: "top",
        });
        Clipboard.setString(address);
    };

    const getBalance = async (account: any) => {
        web3.eth.getBalance(account?.address).then(
            async (bal: any) => {
                if (bal >= 0) {
                    const balance = await web3.utils.fromWei(bal, 'ether');
                    return parseFloat(balance)?.toFixed(2);
                }
            },
            (error: any) => {
                console.log(error, 'getBalance');
            },
        );
    };

    const handleActiveIndex = (index: any) => {
        dispatch(setDefaultAddress(accounts[index]?.address || ''));
        setActiveIndex(index)
    }

    useEffect(() => {

        dispatch(setDefaultAddress(accounts[0]?.address || ''));
    }, [accounts]);

    const _renderItem = ({ item, index }: any) => {
        return (
            <View style={styles.carouselBox}>
                <View style={{position: 'absolute', bottom: 0, left: 0, width: '100%'}}>
                    <Image source={require(BgImage)} style={{maxWidth: wp(78.5)}} />
                </View>
                <View style={{}}>
                    <Text style={styles.carouselText}>
                        {item?.title || `Account ${index + 1}`}
                    </Text>
                    <Text style={styles.carouselText}>
                        {(parseFloat(item?.balance) === 0.00 || parseFloat(item?.balance) === 0.0)
                            ? 0
                            : parseFloat(item?.balance)?.toFixed(6)
                        }
                    </Text>
                    <Text
                        style={styles.carouselText}
                        numberOfLines={1}
                        ellipsizeMode="middle">
                        {item?.address || '0x123...3213'}
                    </Text>
                    <Pressable onPress={() => handleClipboard(item?.address)} style={{position:"absolute",right:0}}>
                        <Image source={require(copyImg)} style={styles.copyIcon} />
                    </Pressable>
                    <Pressable onPress={() => handleClipboard(item?.privateKey)} style={{position:"absolute",right:40}}>
                        <Image source={require(keyImg)} style={styles.copyIcon} />
                    </Pressable>
                </View>
                <View style={styles.addBtn}>
                    <Pressable onPress={() => navigate('AddCard')}>
                        <Image
                            source={require(plusImg)}
                            style={{ width: hp(3.5), height: hp(3.5) }}
                        />
                    </Pressable>
                </View>
            </View>
        );
    };

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                    <View style={{}}>
                        <Carousel
                            layout={'default'}
                            ref={carouselRef}
                            data={accounts}
                            sliderWidth={wp(100)}
                            removeClippedSubviews={false}
                            itemWidth={wp(78.5)}
                            renderItem={_renderItem}
                            onSnapToItem={index => handleActiveIndex(index)}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

export default CardCarousel;
