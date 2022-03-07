import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import WalletTabs from "../components/WalletTabs";
import SuggestionTabs from "../components/SuggestionTabs";
const CocoLineMessageImage = '../../assets/images/COCO_Line_Message.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';

const styles = StyleSheet.create({
  fornaxBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
  tabBox: {
    // backgroundColor:'red',
    height: hp(55),
    // width: wp(89.4),
    // marginBottom: 30,
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

const CriticsSuggestion = (props: any) => {
  const navigate = props.navigation.navigate;

  return (
    <>
      <View>
        <View style={{overflow: 'hidden'}}>
          <Pressable
              android_ripple={{color: '#ffffff10', borderless: false}} onPress={() => navigate('ServiceCenter')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
        </View>
      </View>
      <View style={styles.fornaxInnerBox}>
        <Image
          style={styles.fornaxIcon}
          source={require(CocoLineMessageImage)}
        />
        <Text style={styles.textStyle}>Critics & Suggestion</Text>
      </View>
      <View style={styles.tabBox}>
        <SuggestionTabs />
      </View>
      <View style={styles.fornaxBox}>

      </View>
    </>
  );
};

export default CriticsSuggestion;
