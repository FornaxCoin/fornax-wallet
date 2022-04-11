import * as React from 'react';
import {
    View,
    useWindowDimensions,
    Text,
    StyleSheet,
    ScrollView,
    Image, TextInput, Button, Pressable, Linking, Alert,
} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useState} from "react";

const DownArrowImg = '../../assets/images/Bottommini.png';

const styles = StyleSheet.create({
    titleText: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 20,
        textAlign: 'center',
    },
    roundIcon: {
        height: 60,
        width: 60,
        backgroundColor: '#936ee3',
        borderRadius: 30,
        marginLeft: 5,
        marginRight: 20,
    },
    symbolText: {
        fontFamily: 'Quicksand-Medium',
        color: '#363853',
        fontSize: 18,
        marginBottom: 4,
    },
    descriptionText: {
        fontSize: 14,
        color: '#bdbdbd',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium',
    },
    bankText: {
        fontSize: 16,
        color: '#363853',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium',
    },
    minusIcon: {
        fontFamily: 'Quicksand-Medium',
        color: '#363853',
        fontSize: 20,
        marginRight: 10,
        paddingBottom: 10,
    },
    amountText: {
        fontFamily: 'Quicksand-Medium',
        color: 'white',
        fontSize: 28,
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center',
    },
    scrollTable: {
        flex: 1,
    },
    bankBox: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        width: wp('80'),
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    roundBox: {
        height: 50,
        width: 50,
        borderRadius: 20,
        marginLeft: 5,
        marginRight: 15,
    },
    downIconBorder: {
        width: 25,
        height: 25,
        borderColor: '#363853',
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginRight: 15,
    },
    downIcon: {
        height: 5,
    },
    extrahight: {
        height: 100,
    },
    input: {
        height: hp(40),
        // borderBottomWidth: 2,
        borderRadius: 30,
        borderBottomColor: '#ffffff',
        fontFamily: 'Quicksand-Medium',
        color: '#000',
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingTop: 20,
        paddingBottom: 40,
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 16,
        width: wp(89.4),
        backgroundColor: '#fff',
        marginTop: hp(1),

    },
    inputBox: {
        // height: hp(40),
        // width: wp(80),
        flexDirection: 'row',
        marginVertical: 13,
        alignContent: 'center',
        // alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#fff',
        // borderBottomWidth: 2,
        borderRadius: 30,
        // borderBottomColor: '#ffffff',
        // paddingVertical:10,
    },
    buttonClose: {
        backgroundColor: '#b27f29',
        width: wp(49.3),
        height: hp(6.6),
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: -hp(3.3),
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
    pressed: {
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
    },
});

const FirstRoute = () => {
    const handleSuggestion = async (url: any) => {
        if (critics != '') {
            let URL = url + '?subject=SuggestionForWallet&body=' + critics;
            console.log(URL);
            const supported = await Linking.canOpenURL(URL);

            if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(URL);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        }
    };
    const [critics, setCritics] = useState('');
    return (
        <View style={styles.inputBox}>
            <TextInput
                style={styles.input}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => setCritics(text)}
                value={critics}/>
                <Pressable
                    android_ripple={{color: '#00000030', borderless: false}}
                    onPress={() => handleSuggestion('mailto:info@fornaxcoin.com')}
                    style={(state) => [state.pressed && styles.pressed, styles.button, styles.buttonClose]}>
                    <Text style={styles.textStyle}>Send</Text>
                </Pressable>
        </View>
    )
}

// );

const SecondRoute = () => {
    const handleSuggestion = async (url: any) => {
        if (suggestion != '') {
            let URL = url + '?subject=SuggestionForWallet&body=' + suggestion;
            console.log(URL);
            const supported = await Linking.canOpenURL(URL);

            if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                try {
                    let response = await Linking.openURL(URL);
                    // console.log('response:',e);
                } catch (e) {
                    console.log('response:', e);
                }

            } else {
                Alert.alert(`Don't know how to open this URL: ${URL}`);
            }
        }
    };
    const [suggestion, setSuggestion] = useState('');
    return (
        <View style={styles.inputBox}>
            <TextInput
                style={styles.input}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => setSuggestion(text)}
                value={suggestion}/>
            <Pressable
                android_ripple={{color: '#00000030', borderless: false}}
                onPress={() => handleSuggestion('mailto:info@fornaxcoin.com')}
                style={(state) => [state.pressed && styles.pressed, styles.button, styles.buttonClose]}>
                <Text style={styles.textStyle}>Send</Text>
            </Pressable>
        </View>
    )
};

const renderScene = SceneMap({
    balance: FirstRoute,
    spent: SecondRoute,
});

const WalletTabs = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'balance', title: 'Critics'},
        {key: 'spent', title: 'Suggestions'},
    ]);

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            activeColor={'#ffffff'}
            inactiveColor={'#bdbdbd'}
            renderLabel={({route, color}) => (
                <Text style={[styles.titleText, {color}]}>{route.title}</Text>
            )}
            indicatorStyle={{
                backgroundColor: '#5671ff',
                width: 15,
                height: 4,
                marginHorizontal: 75,
                marginTop: 30,
            }}
            style={{
                backgroundColor: 'transparent',
            }}
        />
    );

    return (
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
        />
    );
};

export default WalletTabs;
