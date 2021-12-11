import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, ScrollView, Text, View } from 'react-native';
import CardCarousel from '../components/CardCarousel';
import MainTab from '../components/MainTab';
import NavTab from '../components/NaviTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setAccounts, setWeb3 } from '../redux/reducers/Wallet';
import { getWeb3 } from '../utils/common';
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Spinner from 'react-native-spinkit';

const BellIcon = '../../assets/images/bell.png';
const SettingIcon = '../../assets/images/setting.png';

const styles = StyleSheet.create({
  fornaxBox: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    marginTop: 30,
    marginHorizontal: 20,
  },
  navBar: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
    position: 'relative',
  },
  bellImg: {
    width: 24,
    height: 26,
    marginHorizontal: 27,
  },
  settingImg: {
    width: 26,
    height: 26,
  },
  fornaxText: {
    fontSize: 28,
    color: '#b27f29',
    textAlign: 'left',
    fontFamily: 'Quicksand-Bold',
    marginTop: 5,
    marginBottom: 5,
  },
  cardCarousel: {
    height:216,
    // backgroundColor:'red',
    width: 450,
  },
  tabBox: {
    // height: 310,
    // backgroundColor:'red',
    height: hp(45),
    marginBottom: 30,
  },
  badge: {
    width: 7,
    height: 7,
    borderRadius: 20,
    backgroundColor: '#ff3333',
    position: 'absolute',
    right: 40,
    top: 0,
  },
  loaderBack: {
    flex: 1,
    backgroundColor: '#00000057',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    left: 0,
    bottom: 0,
    top: 0
  },
  navTabBox: {
    height: 70,
    //new
    // position: 'absolute',
    // bottom: 0,
  },
  colco:{
    // backgroundColor: 'red',
    position:"absolute",
    width:wp(90),
    bottom: 5,
  },
  innerContainer:{
    // backgroundColor:'blue',
    // flex: 1,
    flexDirection: 'column',
    // height:hp(50),
    // overflow:"scroll",
    // paddingBottom:50,
  },
  extrahight:{
    height:hp(10),
  }
});

const Dashboard = (props: any) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const navigate = props.navigation.navigate;

  // const getBalances = async (data: any, web3: any) => {
  //   return data.map(async (account: any, index: any) => {
  //     web3.eth.getBalance(account?.address).then(
  //       (balance: any) => {
  //         if (balance >= 0) {
  //           data[index] = Object.assign({ balance }, data[index]);
  //           // dispatch(setAccounts(data));
  //           console.log(balance, data[index], index, "balance");
  //         }
  //       },
  //       (error: any) => {
  //         console.log(error, 'getallBalance');
  //       },
  //     );
  //   });
  // };

  const checkAccount = async () => {
    try {
      const value = await AsyncStorage.getItem('accountList');
      if (value != null) {
        const data = JSON.parse(value);
        dispatch(setAccounts(data));
        setLoader(false);
        // const _bal =
        //   data?.length > 0 && (await web3.eth.getBalance(data[0]?.address));
        // console.log(_bal);
        // await getBalances(data, web3);
      }
    } catch (err) {
      console.log('Account Error', err);
    }
  };

  const connectWallet = async () => {
    try {
      // const remove = await AsyncStorage.removeItem('accountList');
      const mnemonicPhrase = await AsyncStorage.getItem('mnemonicPhrase');
      const web3 = mnemonicPhrase && getWeb3(mnemonicPhrase);
      if (web3) {
        checkAccount();
        // await web3.eth.accounts.wallet.clear();
        // await AsyncStorage.removeItem('accountList');
        dispatch(setWeb3(web3));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    connectWallet();
    setLoader(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loader && (
        <View style={styles.loaderBack}>
          <Spinner isVisible={true} size={50} type={'9CubeGrid'} color="#b27f29"/>
        </View>
      )}
      <View style={styles.fornaxBox}>
        <View style={styles.navBar}>
          <View style={styles.badge} />
          <Pressable onPress={() => navigate('Notifications')}>
            <Image source={require(BellIcon)} style={styles.bellImg} />
          </Pressable>
          <Pressable onPress={() => navigate('Settings')}>
            <Image source={require(SettingIcon)} style={styles.settingImg} />
          </Pressable>
        </View>
        <Text style={styles.fornaxText}>Dashboard</Text>
        {!loader && (
          <>
            <ScrollView style={styles.innerContainer}>
              <View style={styles.cardCarousel}>
                <CardCarousel navigate={navigate} />
              </View>
              <View style={styles.tabBox}>
                <MainTab />
              </View>
              <View style={styles.extrahight}>

              </View>
            </ScrollView>
            <View style={styles.colco}>
              <View style={styles.navTabBox}>
                <NavTab navigate={navigate} />
              </View>
            </View>
          </>
        )}
        </View>
    </>
  );
};

export default Dashboard;
