import React, {useCallback} from 'react';
import {Image, Pressable, Linking, StyleSheet, Text, View, Alert, Button} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
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
    width: wp(65.5),
    alignSelf: 'center',
    marginBottom: hp(5.5),
    height:hp(2.6),
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
    height:hp(3),
    width:hp(3),
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
    width:  hp(6.5),
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
  innerIcons:{
    height:hp(2.6),
    width: wp(5.8),
    resizeMode: 'contain',
  },
  arrowIcon:{
    height:hp(1),
    resizeMode: 'contain',
  }
});


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
          <Image source={require(FacebookImage)} style={styles.innerIcons}/>
          <Text style={styles.txnText}>Facebook</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require(ArrowRightIcon)} style={styles.arrowIcon}/>
          </View>
        </Pressable>
        <Pressable
            onPress={() => handlePress('https://twitter.com/FornaxCoin')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require(TwitterImage)} style={styles.innerIcons}/>
          <Text style={styles.txnText}>Twitter</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require(ArrowRightIcon)} style={styles.arrowIcon}/>
          </View>
        </Pressable>
        <Pressable
            onPress={() => handlePress('https://www.instagram.com/fornaxcoin/')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require(InstagramImage)} style={styles.innerIcons}/>
          <Text style={styles.txnText}>Instagram</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require(ArrowRightIcon)} style={styles.arrowIcon}/>
          </View>
        </Pressable>
        {/*<OpenURLButton url={supportedURL}>Open Supported URL</OpenURLButton>*/}
      </View>
    </>
  );
};

export default SocialMedia;
