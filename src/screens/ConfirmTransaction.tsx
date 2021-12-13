import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import { useSelector } from 'react-redux';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
const SendImage = '../../assets/images/Sendmini.png';
const Bookmark = '../../assets/images/Bookmarkmini.png';
const TxnSuccess = '../../assets/images/txn_success.png';

const styles = StyleSheet.create({
  fornaxBox: {
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    flexDirection: 'column',
    maxWidth: 360,
  },
  textStyle: {
    fontSize: 20,
    color: '#ffffff',
    lineHeight: 23,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
    letterSpacing: 2,
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
  txnDetailBox: {
    paddingVertical: wp('8'),
    paddingHorizontal: hp('5'),
    backgroundColor: '#ffffff',
    width: wp('90'),
    height: hp('45'),
    borderRadius: 30,
  },
  divider: {
    height: 2,
    backgroundColor: '#e0e0e0',
    marginTop: 25,
    marginBottom: 10,
  },
  detailSection: {
    paddingVertical: 10,
  },
  detailrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  detailText: {
    color: '#828282',
    fontSize: 16,
  },
  amountText: {
    color: '#363853',
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
    fontSize: 28,
    marginBottom: 5,
  },
  sentText: {
    color: '#828282',
    textAlign: 'center',
    fontSize: 16,
  },
  valueText: {
    width: wp('34'),
    textAlign: 'left',
  },
  footerBox: {
    position: 'absolute',
    bottom: -35,
    right: 30,
    flexDirection: 'row',
  },
  copyBox: {
    width: wp('17'),
    height: hp('8'),
    borderRadius: 50,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sendBox: {
    width: wp('17'),
    height: hp('8'),
    borderRadius: 50,
    backgroundColor: '#363853',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxIcon: {
    height: 27,
    alignSelf: 'center',
  },
  bookmarkIcon: {
    height: 27,
    alignSelf: 'center',
  },
});

const ConfirmTransaction = (props: any) => {
  const navigate = props.navigation.navigate;
  const [timeStamp, setTimeStamp] = useState<any>(null);
  const [total, setTotal] = useState<any>(null);

  const { web3, txnResponse } = useSelector(({ wallet }: any) => {
    return {
      web3: wallet?.web3,
      txnResponse: wallet?.txnResponse,
    };
  });

  const getTimeStamp = async () => {
    var _timeStamp = await web3?.eth?.getBlock(txnResponse.blockNumber)
      ?.timestamp;
    setTimeStamp({
      date: moment(_timeStamp).format('D MMMM YYYY'),
      time: moment(_timeStamp).format('LT'),
    });
  };

  useEffect(() => {
    if (web3 && txnResponse) {
      getTimeStamp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3, txnResponse]);

  const handleClipboard = () => {
    Clipboard.setString(txnResponse);
  };

  const sendTxnResponse = () => {
    console.log(txnResponse);
  };

  return (
    <>
      <View>
        <Pressable onPress={() => navigate('Dashboard')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
      </View>
      <View style={styles.fornaxBox}>
        <View style={styles.fornaxInnerBox}>
          <Image style={styles.fornaxIcon} source={require(TxnSuccess)} />
          <Text style={styles.textStyle}>Your</Text>
          <Text style={[styles.textStyle, { marginTop: 5 }]}>
            Transaction Success!
          </Text>
        </View>
        <View style={styles.txnDetailBox}>
          <View>
            <Text style={styles.amountText}>
              FRX {parseFloat(txnResponse?.amount).toFixed(2) || '0.00'}
            </Text>
            <Text style={styles.sentText}>Success sent to</Text>
            <Text style={[styles.sentText, { marginTop: 2}]} ellipsizeMode="middle" numberOfLines={1}>
              {txnResponse?.to}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailSection}>
            <View style={styles.detailrow}>
              <Text style={styles.detailText}>Gas Limit(Units)</Text>
              <Text style={[styles.detailText, styles.valueText]}>
                {txnResponse?.gasUsed}
              </Text>
            </View>
            <View style={styles.detailrow}>
              <Text style={styles.detailText}>Date</Text>
              <Text style={[styles.detailText, styles.valueText]}>
                {timeStamp?.date || '1 july 2021'}
              </Text>
            </View>
            <View style={styles.detailrow}>
              <Text style={styles.detailText}>Time</Text>
              <Text style={[styles.detailText, styles.valueText]}>
                {timeStamp?.time || '9:13 PM'}
              </Text>
            </View>
            <View style={styles.detailrow}>
              <Text style={styles.detailText}>Total</Text>
              <Text style={[styles.detailText, styles.valueText]}>
                FRX {(parseInt(txnResponse?.gasUsed, 10) * parseInt(txnResponse?.gasPrice, 10)) + parseInt(txnResponse?.amount, 10) || 0}
              </Text>
            </View>
          </View>
          <View style={styles.footerBox}>
            <View style={styles.copyBox}>
              <Pressable onPress={handleClipboard}>
                <Image style={styles.bookmarkIcon} source={require(Bookmark)} />
              </Pressable>
            </View>
            <View style={styles.sendBox}>
              <Pressable onPress={sendTxnResponse}>
                <Image style={styles.boxIcon} source={require(SendImage)} />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ConfirmTransaction;
