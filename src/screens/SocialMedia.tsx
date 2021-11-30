import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
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
  fornaxText: {
    fontSize: 48,
    color: '#b27f29',
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
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
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: '#b27f29',
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
  fornaxInnerBox: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: 'green',
    // marginTop: 120,
    marginTop: hp('10'),
    marginBottom: hp('4'),
  },
  fornaxIcon: {
    marginBottom: 44,
  },
});

const SocialMedia = (props: any) => {
  const navigate = props.navigation.navigate;

  return (
    <>
      <View>
        <Image style={styles.backIcon} source={require('../../assets/images/Iconly_Curved_Arrow.png')} />
      </View>
      <View style={styles.fornaxInnerBox}>
        <Image
            style={styles.fornaxIcon}
            source={require(CocoLineInstaImage)}
        />
        <Text style={styles.textStyle}>Our Social Media</Text>
      </View>
      <View style={styles.fornaxBox}>
        <Pressable
          onPress={() => navigate('Signup')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require('../../assets/images/facebook.png')} />
          <Text style={styles.txnText}>Facebook</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require('../../assets/images/arrow-right.png')} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigate('Signup')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require('../../assets/images/twitter.png')} />
          <Text style={styles.txnText}>Twitter</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require('../../assets/images/arrow-right.png')} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigate('Signup')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require('../../assets/images/instagram.png')} />
          <Text style={styles.txnText}>Instagram</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require('../../assets/images/arrow-right.png')} />
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default SocialMedia;
