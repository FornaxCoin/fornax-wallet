import React, {useCallback} from 'react';
import {Image, Pressable, Linking, StyleSheet, Text, View, Alert, Button} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
const FacebookImage = '../../assets/images/facebook.png';
const CocoLineInstaImage = '../../assets/images/COCO_Line_Instagrammaga.png';
const TwitterImage = '../../assets/images/twitter.png';
const InstagramImage = '../../assets/images/instagram.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 240,
    alignSelf: 'center',
    marginBottom: 43,
  },
  button: {
    borderRadius: 20,
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
    marginLeft: 26,
    marginTop: 32,
  },
  arrowRightIcon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  fornaxIcon: {
    // width:80,
    // height:80,
    // width:  hp(9),
    // height: hp(9),
    marginBottom: 30,
  },
  fornaxInnerBox: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: hp('5'),
    marginBottom: hp('4'),
  },
});
// @ts-ignore
const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

const SocialMedia = (props: any) => {
  const handlePress = async(url: any)=>{
    console.log(url);
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
  const navigate = props.navigation.navigate;
  return (
    <>
      <View>
        <Pressable onPress={() => navigate('ServiceCenter')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
      </View>
      <View style={styles.fornaxInnerBox}>
        <Image style={styles.fornaxIcon} source={require(CocoLineInstaImage)} />
        <Text style={styles.textStyle}>Our Social Media</Text>
      </View>
      <View style={styles.fornaxBox}>
        <Pressable
            onPress={() => handlePress('https://www.facebook.com/fornaxcoin')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require(FacebookImage)} />
          <Text style={styles.txnText}>Facebook</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require(ArrowRightIcon)} />
          </View>
        </Pressable>
        <Pressable
            onPress={() => handlePress('https://twitter.com/FornaxCoin')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require(TwitterImage)} />
          <Text style={styles.txnText}>Twitter</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require(ArrowRightIcon)} />
          </View>
        </Pressable>
        <Pressable
            onPress={() => handlePress('https://www.instagram.com/fornaxcoin/')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require(InstagramImage)} />
          <Text style={styles.txnText}>Instagram</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require(ArrowRightIcon)} />
          </View>
        </Pressable>
        {/*<OpenURLButton url={supportedURL}>Open Supported URL</OpenURLButton>*/}
      </View>
    </>
  );
};

export default SocialMedia;
