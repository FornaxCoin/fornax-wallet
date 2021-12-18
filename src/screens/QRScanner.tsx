import React, { useRef } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useDispatch, useSelector } from 'react-redux';
import { setTxnsInfo } from '../redux/reducers/Wallet';
import { showMessage, hideMessage } from "react-native-flash-message";

const PayImage = '../../assets/images/pay.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
const  qrCodeWidth = hp('34');

const styles = StyleSheet.create({
  fornaxBox: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
    marginBottom: hp(3),
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
    marginTop: hp(1.8),
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    borderRadius: 15,
    fontFamily: 'Quicksand-Medium',
    backgroundColor: '#ffffff',
    color: '#bdbdbd',
    fontSize: 16,
    width: 340,
    marginBottom: 20,
  },
  input: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
    width: 340,
    paddingHorizontal: 20,
  },
  qrCodeImg: {
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    height:qrCodeWidth,
    width: qrCodeWidth,
    borderWidth: 5,
    borderColor: 'aliceblue',
    borderRadius: 30,
    backgroundColor: 'aliceblue',
  },
  topLine: {
    height: 6,
    backgroundColor: '#021124',
    width: wp('49'),
    position: 'absolute',
    top: -6,
  },
  leftLine: {
    width: 6,
    backgroundColor: '#021124',
    height: hp('23'),
    position: 'absolute',
    left: -6,
    top: 40,
  },
  rightLine: {
    width: 6,
    backgroundColor: '#021124',
    height: hp('23'),
    position: 'absolute',
    right: -6,
    top: 40,
  },
  bottomLine: {
    height: 6,
    backgroundColor: '#021124',
    width: wp('49'),
    position: 'absolute',
    bottom: -6,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 42,
    color: '#777'
  },
  cameraContainer: {
    height: qrCodeWidth -70,
    width: qrCodeWidth-70,
  }
});

const QRScanner = (props: any) => {
  const dispatch = useDispatch();
  const navigate = props.navigation.navigate;
  let scanner = useRef(null);

  const { txnInfo, web3 } = useSelector(({ wallet }: any) => {
    return {
      txnInfo: wallet?.txnInfo,
      web3: wallet?.web3,
    };
  });

  const onSuccess = async (e: any) => {
    dispatch(setTxnsInfo({ ...txnInfo, to: e.data}));
    const isValid = await web3.utils.isAddress(e.data);
    if(e.data && isValid) {
      hideMessage();
      navigate('SetAmount');
    } else {
      showMessage({
        message: "Address is Invalid!",
        description: "Again scan QR code",
        type: "warning",
      });
    }
  };

  return (
    <>
      <View>
        <Pressable onPress={() => navigate('Transfer')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
      </View>
      <View style={styles.fornaxBox}>
        <View style={styles.fornaxInnerBox}>
          <Image style={styles.fornaxIcon} source={require(PayImage)} />
          <Text style={styles.textStyle}>Scan QR code</Text>
          <Text style={styles.fornaxMiniText}>Please move your camera {"\n"} over the QR Code</Text>
        </View>
        <View style={styles.qrCodeImg}>
          <QRCodeScanner
            reactivate={true}
            showMarker={false}
            ref={scanner}
            containerStyle={styles.cameraContainer}
            cameraStyle={styles.cameraContainer}
            onRead={onSuccess}
          />
        </View>
      </View>
    </>
  );
};

export default QRScanner;
