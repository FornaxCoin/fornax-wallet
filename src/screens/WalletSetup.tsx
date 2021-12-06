import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { generateMnemonic } from 'bip39';
import Web3 from 'web3';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setWeb3 } from '../redux/reducers/Wallet';
import { useDispatch } from 'react-redux';
const HDWalletProvider = require('@truffle/hdwallet-provider');

const SettingImage = '../../assets/images/Settingmaga.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';

const styles = StyleSheet.create({
  fornaxBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fornaxText: {
    fontSize: 48,
    color: '#b27f29',
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
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
    marginTop: 185,
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
    marginBottom: 44,
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
    color: '#bdbdbd',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
  },
});

const WalletSetup = (props: any) => {
  const dispatch = useDispatch();
  const navigate = props.navigation.navigate;

  const storeDataAsync = async (account: any, mnemonicPhrase: string) => {
    try {
      await AsyncStorage.multiRemove(['accountList', 'mnemonicPhrase']);
      await AsyncStorage.multiSet([
        ['accountList', JSON.stringify([account])],
        ['mnemonicPhrase', mnemonicPhrase],
      ]);
      navigate('Dashboard');
    } catch (error) {
      // Error saving data
    }
  };

  const handleCreateWallet = async () => {
    const mnemonicPhrase = await generateMnemonic();
    try {
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
        dispatch(setWeb3(web3));
        const account = await web3.eth.accounts.create();
        storeDataAsync(account, mnemonicPhrase);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <View>
        <Image style={styles.backIcon} source={require(BackIcon)} />
      </View>
      <View style={styles.fornaxInnerBox}>
        <Image style={styles.fornaxIcon} source={require(SettingImage)} />
        <Text style={styles.textStyle}>Wallet Setup</Text>
        <Text style={styles.fornaxMiniText}>
          Import an existing wallet or create a new one
        </Text>
      </View>
      <View style={styles.fornaxBox}>
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
          style={[styles.button, styles.buttonClose]}>
          <Text style={styles.txnText}>Create a new Wallet</Text>
        </Pressable>
      </View>
    </>
  );
};

export default WalletSetup;
