import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { generateMnemonic } from 'bip39';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setWeb3 } from '../redux/reducers/Wallet';
import { useDispatch } from 'react-redux';
import { getWeb3 } from '../utils/common';
import Spinner from 'react-native-spinkit';

const SettingImage = '../../assets/images/Settingmaga.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';

const styles = StyleSheet.create({
  fornaxBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0
  },
  secondaryTxnText: {
    color: '#363853',
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
    marginTop: 25,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 18,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    color: '#b27f29',
    marginTop: hp('30'),
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
    marginBottom: 44,
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
  loaderBack: {
    flex: 1,
    backgroundColor: '#00000096',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    right: 0,
    left: 0,
    bottom: 0,
    top: 0
  },
});

const WalletSetup = (props: any) => {
  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch();
  const navigate = props.navigation.navigate;

  const storeDataAsync = async (account: any, mnemonicPhrase: string) => {
    try {
      await AsyncStorage.multiRemove(['accountList', 'mnemonicPhrase']);
      await AsyncStorage.multiSet([
        ['accountList', JSON.stringify([account])],
        ['mnemonicPhrase', mnemonicPhrase],
      ]);
      setLoader(false);
      navigate('Dashboard');
    } catch (error) {
      setLoader(false);
      // Error saving data
    }
  };

  const getBalance = async (web3: any, account: any, mnemonicPhrase: any) => {
    web3.eth.getBalance(account?.address).then(
      async (bal: any) => {
        if (bal >= 0) {
          const balance = await web3.utils.fromWei(bal, 'ether');
          console.log(balance, "balance");
          storeDataAsync({ ...account, balance }, mnemonicPhrase);
        }
      },
      (error: any) => {
        setLoader(false);
        console.log(error, 'getBalance');
      },
    );
  };

  const handleCreateWallet = async () => {
    setLoader(true);
    try {
      const mnemonicPhrase = await generateMnemonic();
      const web3 = getWeb3(mnemonicPhrase);
      if (web3) {
        dispatch(setWeb3(web3));
        const account = await web3.eth.accounts.create();
        getBalance(web3, account, mnemonicPhrase);
      }
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  return (
    <>
      {loader && (
        <View style={styles.loaderBack}>
          <Spinner isVisible={true} size={50} type={'9CubeGrid'} color="#b27f29"/>
        </View>
      )}
      <View style={{ zIndex: 0 }}>
        <Pressable onPress={() => navigate('Dashboard')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
      </View>
      <View style={styles.fornaxBox}>
        <View style={styles.fornaxInnerBox}>
          <Image style={styles.fornaxIcon} source={require(SettingImage)} />
          <Text style={styles.textStyle}>Wallet Setup</Text>
          <Text style={styles.fornaxMiniText}>
            Import an existing wallet or create a new one
          </Text>
        </View>
        <Pressable
          onPress={() => navigate('Import')}
          style={[styles.button, styles.buttonClose, styles.secondaryButton]}>
          <Text style={[styles.txnText, styles.secondaryTxnText]}>
            Import using Secret
          </Text>
          <Text
            style={[styles.txnText, styles.secondaryTxnText, { marginTop: 5 }]}>
            Recovery Phrase
          </Text>
        </Pressable>
        <Pressable
          onPress={handleCreateWallet}
          style={[styles.button, styles.buttonClose, { marginBottom: hp('10') }]}>
          <Text style={styles.txnText}>Create a new Wallet</Text>
        </Pressable>
      </View>
    </>
  );
};

export default WalletSetup;
