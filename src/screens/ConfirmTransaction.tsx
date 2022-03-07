import React, { useEffect, useRef, useState } from 'react';
import {Alert, Image, Linking, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import ViewShot from 'react-native-view-shot';
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
    marginLeft: wp(6.3),
    marginTop: hp(3.7),
    // resizeMode:'contain',
    height:hp(3),
    width:hp(3),
  },
  fornaxIcon: {
    resizeMode: 'contain',
    width:  hp(10),
    height: hp(10),
    marginBottom: hp(5.5),
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
    paddingVertical: wp('4'),
    paddingHorizontal: hp('5'),
    backgroundColor: '#ffffff',
    width: wp('90'),
    height: hp('50'),
    borderRadius: 30,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  divider: {
    height: 2,
    backgroundColor: '#e0e0e0',
    marginTop: hp(2),
    marginBottom: 0,
  },
  detailSection: {
    paddingVertical: 10,
  },
  detailrow: {
    // backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(1/500)-hp(4/0.65-hp(1)),
  },
  detailText: {
    color: '#828282',
    fontSize: 16,
  },
  amountText: {
    color: '#363853',
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
    fontSize: 24,
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
    bottom: -hp(3),
    right: wp(6),
    flexDirection: 'row',
  },
  copyBox: {
    width: hp('7.1'),
    height: hp('7.1'),
    borderRadius: hp(5),
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
    width: hp('7.1'),
    height: hp('7.1'),
    borderRadius: hp(5),
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
    height: hp(2.2),
    width:hp(2.2),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  bookmarkIcon: {
    height: hp(2.2),
    width:hp(2.2),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  pressed: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10.00,
  },
});

const ConfirmTransaction = (props: any) => {
  let viewShotRef =  useRef(null);
  // console.log(viewShotRef && viewShotRef.current)

  const navigate = props.navigation.navigate;
  const [timeStamp, setTimeStamp] = useState<any>(null);
  const [total, setTotal] = useState<any>(null);

  const { web3, txnResponse , tokens, explorers} = useSelector(({ wallet }: any) => {
    console.log("web3Wallet", wallet?.web3)
    console.log("wallet?.txnResponse", wallet?.txnResponse)
    console.log("tokens:", wallet?.tokens)
    console.log("explorers:", wallet?.explorers)
    return {
      web3: wallet?.web3,
      txnResponse: wallet?.txnResponse,
      tokens: wallet?.tokens,
      explorers: wallet?.explorers,
    };
  });

  const getTimeStamp = async () => {
    console.log("Response23354345:", txnResponse);
    var _timeStamp = await web3?.eth?.getBlock(txnResponse.blockNumber)
      ?.timestamp;
    setTimeStamp({
      date: moment(_timeStamp).format('D MMMM YYYY'),
      time: moment(_timeStamp).format('LT'),
    });
  };

  useEffect(() => {
    console.log("Use Effect")
    console.log("web3")
    if (web3 && txnResponse) {
      console.log("web3 && txnResponse")
      getTimeStamp();
      console.log("All Values: ",parseInt(txnResponse?.gasUsed), parseInt(txnResponse?.gasPrice), 'amount:',parseInt(txnResponse?.amount), 'final Amount:',parseInt(web3.utils.toWei(txnResponse?.finalAmount,'ether')))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3, txnResponse]);

  const handleClipboard = async (hash: string) => {
    // Clipboard.setString(txnResponse);
    // console.log('txnResponse:',txnResponse);
    let url=`${explorers[tokens]}${txnResponse?.transactionHash}`
    console.log(url)
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const sendTxnResponse = async () => {
    // console.log(txnResponse);
    // const viewShotRef =  useRef();
    try{
      let imageUrl = await viewShotRef.current.capture();
      // console.log('imageUrl',imageUrl)
      await Share.share({title: 'Receipt', url: imageUrl})
    }catch (e) {

    }
    // onImageLoad = () => {
    //   viewShot.capture().then(uri => {
    //     console.log("do something with ", uri);
    //     await Share.share({title: 'Receipt', url: uri})
    //   })
  };

  console.log("txnRes123456", txnResponse);
  console.log("finalAmount234", txnResponse?.finalAmount);
  console.log("gasUsed456789", txnResponse?.gasUsed);
  console.log("gasUsed456789", txnResponse?.gasPrice);
  console.log("All Values: ",parseInt(txnResponse?.gasUsed), parseInt(txnResponse?.gasPrice), 'amount:',parseInt(txnResponse?.amount), 'final Amount:',parseInt(web3.utils.toWei(txnResponse?.finalAmount,'ether')))

  return (
    <>
      <ViewShot ref={viewShotRef} style={{flex:1}} options={{format: 'jpg', quality:1.0}}>
        <View>
          <View style={{overflow: 'hidden'}}>
            <Pressable
                android_ripple={{color: '#ffffff20', borderless: false}} onPress={() => navigate('Dashboard')}>
            <Image style={styles.backIcon} source={require(BackIcon)} />
          </Pressable>
          </View>
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
                {tokens} {parseFloat(txnResponse?.finalAmount).toFixed(4) || '0.0000'}
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
                  {timeStamp?.date || '24 December 2021'}
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
                  {tokens} {web3.utils.fromWei(((parseInt(txnResponse?.gasUsed) * parseInt(txnResponse?.gasPrice)) + parseInt(web3.utils.toWei(txnResponse?.finalAmount,'ether'))).toString(),'ether') || '0'}
                </Text>
              </View>
            </View>
            <View style={styles.footerBox}>
              <View style={styles.copyBox}>
                <View style={{overflow: 'hidden'}}>
                  <Pressable
                      android_ripple={{color: '#ffffff20', borderless: false}}
                    onPress={e=>handleClipboard(txnResponse?.transactionHash)}
                    style={(state) => [state.pressed && styles.pressed]}
                >
                  <Image style={styles.bookmarkIcon} source={require(Bookmark)} />
                </Pressable>
                </View>
              </View>
              <View style={styles.sendBox}>
                <View style={{overflow: 'hidden'}}>
                  <Pressable
                      android_ripple={{color: '#00000030', borderless: false}}
                    onPress={sendTxnResponse}
                    style={(state) => [state.pressed && styles.pressed]}
                >
                  <Image style={styles.boxIcon} source={require(SendImage)} />
                </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ViewShot>
    </>
  );
};

export default ConfirmTransaction;
