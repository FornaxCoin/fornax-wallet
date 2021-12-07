/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import CardCarousel from '../components/CardCarousel';
import MainTab from '../components/MainTab';
import NavTab from '../components/NaviTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import Web3 from 'web3';
import { setAccounts, setWeb3 } from '../redux/reducers/Wallet';
const HDWalletProvider = require('@truffle/hdwallet-provider');

const BellIcon = '../../assets/images/bell.png';
const SettingIcon = '../../assets/images/setting.png';

const styles = StyleSheet.create({
  fornaxBox: {
    flex: 1,
    flexDirection: 'column',
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
    height: 260,
    width: 450,
  },
  tabBox: {
    height: 320,
    marginBottom: 30,
  },
  navTabBox: {
    height: 70,
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
});

const Dashboard = (props: any) => {
  const dispatch = useDispatch();
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
        // const _bal =
        //   data?.length > 0 && (await web3.eth.getBalance(data[0]?.address));
        // console.log(_bal);
        // await getBalances(data, web3);
      }
    } catch (err) {
      console.log('Account Error', err);
    }
  };

  const getTransactions = async (web3: any) => {
    const address = '0xC21a4AD429e4E2E194816d989d9bBd255c67Fd6C';
    const privateKey =
      '0x6343d2e0502e5133cb74c528189598264456fdd079c72cbaa78d3605defc3801';
    web3.eth.accounts.wallet.add(privateKey);
    web3.eth.defaultAccount = address;
    const ignoreLength: any = false;
    console.log(privateKey, address);
    const data = await web3.eth.accounts.privateKeyToAccount(privateKey, [
      ignoreLength,
    ]);
    console.log(data, 'data');
    web3.eth
      .getPastLogs({
        fromBlock: '0x0',
        address: address,
      })
      .then((res: any) => {
        console.log(res, 'res');
        res.forEach((rec: any) => {
          console.log(rec.blockNumber, rec.transactionHash, rec.topics, 'rec');
        });
      })
      .catch((err: any) => console.log('getPastLogs failed', err));
  };

  const connectWallet = async () => {
    try {
      // const remove = await AsyncStorage.removeItem('accountList');
      const mnemonicPhrase = await AsyncStorage.getItem('mnemonicPhrase');
      const provider = new HDWalletProvider({
        mnemonic: {
          phrase: mnemonicPhrase,
        },
        providerOrUrl: 'wss://node.watchfornax.com/ws',
        network_id: 13936,
        confirmations: 10,
        timeoutBlocks: 200,
        skipDryRun: true,
      });
      const web3 = new Web3(provider);
      if (web3) {
        checkAccount();
        getTransactions(web3);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={styles.fornaxBox}>
        <View style={styles.navBar}>
          <View style={styles.badge} />
          <Image source={require(BellIcon)} style={styles.bellImg} />
          <Image source={require(SettingIcon)} style={styles.settingImg} />
        </View>
        <Text style={styles.fornaxText}>Dashboard</Text>
        <View style={styles.cardCarousel}>
          <CardCarousel navigate={navigate} />
        </View>
        <View style={styles.tabBox}>
          <MainTab />
        </View>
        <View style={styles.navTabBox}>
          <NavTab navigate={navigate} />
        </View>
      </View>
    </>
  );
};

export default Dashboard;
