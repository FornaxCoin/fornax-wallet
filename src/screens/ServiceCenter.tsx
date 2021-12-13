import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
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

const ServiceCenter = (props: any) => {
  const navigate = props.navigation.navigate;

  return (
    <>
      <View>
        <Pressable onPress={() => navigate('Dashboard')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
      </View>
      <View style={styles.fornaxInnerBox}>
        <Image style={styles.fornaxIcon} source={require(CocoLineCallImage)} />
        <Text style={styles.textStyle}>Help</Text>
      </View>
      <View style={styles.fornaxBox}>
        <Pressable
          onPress={() => navigate('Dashboard')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require(CriticsIcon)} />
          <Text style={styles.txnText}>Critics & Suggestions</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require(ArrowRightIcon)} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigate('Dashboard')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require(InstagramIcon)} />
          <Text style={styles.txnText}>Social Media</Text>
          <View style={styles.arrowRightIcon}>
            <Image source={require(ArrowRightIcon)} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigate('Dashboard')}
          style={[styles.button, styles.buttonClose]}>
          <Image source={require(CallingIcon)} />
          <Text style={styles.txnText}>Support</Text>
          {/*<View style={styles.arrowRightIcon}>*/}
          {/*  <Image source={require(ArrowRightIcon)} />*/}
          {/*</View>*/}
        </Pressable>
      </View>
    </>
  );
};

export default ServiceCenter;
