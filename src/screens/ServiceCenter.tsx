import React from 'react';
import {Alert, Button, Image, Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

const CocoLineCallImage = '../../assets/images/COCO_Line_Call.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
const CriticsIcon = '../../assets/images/critics.png';
const InstagramIcon = '../../assets/images/COCO_Line_Instagram.png';
const CallingIcon = '../../assets/images/COCO-Calling.png';
const ArrowRightIcon = '../../assets/images/arrow-right.png';
const styles = StyleSheet.create({
    fornaxBox: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
        // resizeMode:'contain',
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

const ServiceCenter = (props: any) => {
    const navigate = props.navigation.navigate;
    const handlePress = async (url: any) => {
        console.log(url);
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            console.log("supported Email")
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    };
    return (
        <>
            <View>
                <View style={{overflow: 'hidden'}}>
                    <Pressable
                        android_ripple={{color: '#ffffff20', borderless: false}} onPress={() => navigate('Settings')}>
                        <Image style={styles.backIcon} source={require(BackIcon)}/>
                    </Pressable>
                </View>
            </View>
            <View style={styles.fornaxInnerBox}>
                <Image style={styles.fornaxIcon} source={require(CocoLineCallImage)}/>
                <Text style={styles.textStyle}>Help</Text>
            </View>
            <View style={styles.fornaxBox}>
                <View style={{overflow: 'hidden'}}>
                    <Pressable
                        android_ripple={{color: '#ffffff20', borderless: false}}
                        onPress={() => navigate('CriticsSuggestion')}
                        style={(state) => [state.pressed && styles.pressed, styles.button, styles.buttonClose]}>
                        <Image source={require(CriticsIcon)} style={styles.innerIcons}/>
                        <Text style={styles.txnText}>Critics & Suggestions</Text>
                        <View style={styles.arrowRightIcon}>
                            <Image source={require(ArrowRightIcon)} style={styles.arrowIcon}/>
                        </View>
                    </Pressable>
                </View>
                <View style={{overflow: 'hidden'}}>
                    <Pressable
                        android_ripple={{color: '#ffffff20', borderless: false}}
                        onPress={() => navigate('SocialMedia')}
                        style={(state) => [state.pressed && styles.pressed, styles.button, styles.buttonClose]}>
                        <Image source={require(InstagramIcon)} style={styles.innerIcons}/>
                        <Text style={styles.txnText}>Social Media</Text>
                        <View style={styles.arrowRightIcon}>
                            <Image source={require(ArrowRightIcon)} style={styles.arrowIcon}/>
                        </View>
                    </Pressable>
                </View>
                <View style={{overflow: 'hidden'}}>
                    <Pressable
                        android_ripple={{color: '#ffffff20', borderless: false}}
                        onPress={() => handlePress('mailto:info@fornaxcoin.com')}
                        style={(state) => [state.pressed && styles.pressed, styles.button, styles.buttonClose]}>
                        <Image source={require(CallingIcon)} style={styles.innerIcons}/>
                        <Text style={styles.txnText}>Support</Text>
                        {/*<View style={styles.arrowRightIcon}>*/}
                        {/*  <Image source={require(ArrowRightIcon)} />*/}
                        {/*</View>*/}
                    </Pressable>
                </View>
            </View>
        </>
    );
};

export default ServiceCenter;
