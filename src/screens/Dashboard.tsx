/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import CardCarousel from '../components/CardCarousel';
import MainTab from '../components/MainTab';
import NavTab from '../components/navTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import Web3 from 'web3';
import {
  setAccounts as setWeb3Accounts,
  setWeb3,
} from '../redux/reducers/Wallet';
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
  txnText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
    marginTop: 4,
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

const Dashboard = () => {
  const dispatch = useDispatch();
  // const navigate = props.navigation.navigate;
  const [accounts, setAccounts] = useState<any>([]);

  const checkAccount = async (web3: any) => {
    try {
      const value = await AsyncStorage.getItem('accountList');
      if (value != null) {
        const data = [JSON.parse(value)];
        setAccounts([]);
        data.length > 0 &&
          data.map(async (acc: any) => {
            try {
              const balance =
                web3 &&
                acc?.address &&
                (await web3?.eth?.getBalance(acc?.address));
              balance && Object.assign(acc, { balance });
              accounts.findIndex((ac: any) => ac.address === acc.address) ===
                -1 && accounts.push(acc);
              setAccounts([...accounts]);
              dispatch(setWeb3Accounts(accounts));
            } catch (err) {
              console.log(err);
              return;
            }
            return acc;
          });

        return;
      }
    } catch (err) {
      console.log('Accoun Error', err);
    }
  };

  const connectWallet = async () => {
    try {
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
        checkAccount(web3);
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
          <Image source={require('../../assets/images/bell.png')} style={styles.bellImg} />
          <Image source={require('../../assets/images/setting.png')} style={styles.settingImg} />
        </View>
        <Text style={styles.fornaxText}>Dashboard</Text>
        <View style={styles.cardCarousel}>
          <CardCarousel />
        </View>
        <View style={styles.tabBox}>
          <MainTab />
        </View>
        <View style={styles.navTabBox}>
          <NavTab />
        </View>
      </View>
    </>
  );
};

export default Dashboard;
