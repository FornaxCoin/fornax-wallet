import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CocoPinImage = '../../assets/images/Iconly_Curved_Passwordmaga.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
const EyeSlashIcon = '../../assets/images/Eye-slashmini.png';
const CloseIcon = '../../assets/images/Closemini.png';
const styles = StyleSheet.create({
  fornaxBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // marginTop: 165,
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
    backgroundColor: '#b27f29',
    width: 240,
    alignSelf: 'center',
  },
  button: {
    borderRadius: 20,
    paddingVertical: 18,
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
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  fornaxIcon: {
    // marginTop: -119,
    marginBottom: 44,
  },
  fornaxCenterIcon: {
    marginBottom: 142,
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
  fornaxMiniText: {
    // marginLeft: 17,
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
  },
  input: {
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
    fontFamily: 'Quicksand-Medium',
    color: '#ffffff',
    paddingHorizontal: 10,
    fontSize: 16,
    width: 240,
  },
  pinInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  pinEye: {
    width: 20,
    marginLeft: -20,
  },
  NumPad: {
    width: 240,
    // height: 10,
    marginTop: 20,
    marginBottom: 30,
    // backgroundColor: '#afa2ff',
  },
  NumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // alignSelf: 'center',
  },
  numClose: {
    // backgroundColor: '#b27f29',
    width: 50,
    alignSelf: 'center',
  },
  num: {
    paddingVertical: 20,
  },
  crossIcon: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

const SetPin = () => {
  // const navigate = props.navigation.navigate;

  return (
    <>
      <View>
        <Image style={styles.backIcon} source={require(BackIcon)} />
      </View>
      <View style={styles.fornaxInnerBox}>
        <Image style={styles.fornaxIcon} source={require(CocoPinImage)} />
        <Text style={styles.textStyle}>Set Pin</Text>
      </View>
      <View style={styles.fornaxBox}>
        <View style={styles.pinInput}>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor="#bdbdbd"
          />
          <Pressable style={styles.pinEye}>
            <Image source={require(EyeSlashIcon)} />
          </Pressable>
        </View>
        <View style={styles.NumPad}>
          <View style={styles.NumRow}>
            <Pressable style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>1</Text>
            </Pressable>
            <Pressable style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>2</Text>
            </Pressable>
            <Pressable style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>3</Text>
            </Pressable>
          </View>
          <View style={styles.NumRow}>
            <Pressable style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>4</Text>
            </Pressable>
            <Pressable style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>5</Text>
            </Pressable>
            <Pressable style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>6</Text>
            </Pressable>
          </View>
          <View style={styles.NumRow}>
            <Pressable style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>7</Text>
            </Pressable>
            <Pressable style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>8</Text>
            </Pressable>
            <Pressable style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>9</Text>
            </Pressable>
          </View>
          <View style={styles.NumRow}>
            <Pressable style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle} />
            </Pressable>
            <Pressable style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>0</Text>
            </Pressable>
            <Pressable style={[styles.num, styles.numClose, styles.crossIcon]}>
              <Image style={styles.crossIcon} source={require(CloseIcon)} />
            </Pressable>
          </View>
        </View>
        <Pressable style={[styles.button, styles.buttonClose]}>
          <Text style={styles.textStyle}>Set PIN</Text>
        </Pressable>
      </View>
    </>
  );
};

export default SetPin;
