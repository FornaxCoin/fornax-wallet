import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CocoFaceImage = '../../assets/images/COCO_Line_Scan-maga.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
const styles = StyleSheet.create({
  fornaxBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  txnText: {
    marginLeft: 17,
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
    marginTop: -5,
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
  fornaxMiniText: {
    fontSize: 16,
    color: '#bdbdbd',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
  },
  camera: {
    height: 288,
    width: 288,
    borderRadius: 120,
    backgroundColor: '#afa2ff',
    marginBottom: 48,
  },
});

const FaceId = (props: any) => {
  const navigate = props.navigation.navigate;

  return (
    <>
      <View>
        <Pressable onPress={() => navigate('LoginSetting')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
      </View>
      <View style={styles.fornaxInnerBox}>
        <Image style={styles.fornaxIcon} source={require(CocoFaceImage)} />
        <Text style={styles.textStyle}>Face ID</Text>
        <Text style={styles.fornaxMiniText}>Verify it's you</Text>
      </View>
      <View style={styles.fornaxBox}>
        <View style={styles.camera} />
        <Text style={styles.txnText}>Turn your face to the camera</Text>
      </View>
    </>
  );
};

export default FaceId;
