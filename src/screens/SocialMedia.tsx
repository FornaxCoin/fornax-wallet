import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
const FacebookImage = '../../assets/images/facebook.png';
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
    marginTop: 165,
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
    marginBottom: 100,
  },
  backIcon: {
    marginLeft: 26,
    marginTop: 32,
  },
  arrowRightIcon: {
    flex: 1,
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
});

const SocialMedia = (props: any) => {
  const navigate = props.navigation.navigate;

  return (
    <>
      <View>
        <Image style={styles.backIcon} source={require(BackIcon)} />
      </View>
      <View style={styles.fornaxBox}>
        <Text style={styles.textStyle}>Our Social Media</Text>
        <Pressable
          onPress={() => navigate('Signup')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require(FacebookImage)} />
          <Text style={styles.txnText}>Facebook</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require(ArrowRightIcon)} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigate('Signup')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require(TwitterImage)} />
          <Text style={styles.txnText}>Twitter</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require(ArrowRightIcon)} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigate('Signup')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require(InstagramImage)} />
          <Text style={styles.txnText}>Instagram</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require(ArrowRightIcon)} />
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default SocialMedia;
