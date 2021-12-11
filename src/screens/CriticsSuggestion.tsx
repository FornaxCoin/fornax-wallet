import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
    marginLeft: 26,
    marginTop: 32,
  },
  fornaxIcon: {
    width:  hp(9),
    height: hp(9),
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

const CriticsSuggestion = (props: any) => {
  const navigate = props.navigation.navigate;

  return (
    <>
      <View>
        <Pressable onPress={() => navigate('Dashboard')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
      </View>
      <View style={styles.fornaxInnerBox}>
        <Image
          style={styles.fornaxIcon}
          source={require(CocoLineMessageImage)}
        />
        <Text style={styles.textStyle}>Critics & Suggestion</Text>
      </View>
      <View style={styles.fornaxBox} />
    </>
  );
};

export default CriticsSuggestion;
