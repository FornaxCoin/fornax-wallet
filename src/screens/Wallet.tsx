import React, {useEffect, useState} from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import WalletTabs from '../components/WalletTabs';
import {setDefaultAddress} from "../redux/reducers/Wallet";
import {useSelector} from "react-redux";
const WalletImage = '../../assets/images/Walletmaga.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';

const styles = StyleSheet.create({
  fornaxBox: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 30,
  },
  textStyle: {
    fontSize: 20,
    color: '#ffffff',
    lineHeight: 23,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  backIcon: {
    marginLeft: 26,
    marginTop: 32,
  },
  fornaxIcon: {
    // width:80,
    // height:80,
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
  tabBox: {
    height: 410,
    marginBottom: 30,
  },
});

const Wallet = (props: any) => {
  const navigate = props.navigation.navigate;

  const { accounts, web3 } = useSelector(({ wallet }: any) => {
    return {
      accounts: wallet?.accounts,
      web3: wallet?.web3,
    };
  });
  const [accountsCount, setAccountsCount] = useState(0);

  useEffect(() => {
    setAccountsCount(accounts.length);
    // dispatch(setDefaultAddress(accounts[0]?.address || ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <View>
        <Pressable onPress={() => navigate('Settings')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
      </View>
      <View style={styles.fornaxBox}>
        <View style={styles.fornaxInnerBox}>
          <Image style={styles.fornaxIcon} source={require(WalletImage)} />
          <Text style={styles.textStyle}>Your Wallet</Text>
          <Text style={styles.fornaxMiniText}> {(accountsCount)} Accounts Connected</Text>
        </View>
        <View style={styles.tabBox}>
          <WalletTabs />
        </View>
      </View>
    </>
  );
};

export default Wallet;
