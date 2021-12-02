import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import _join from 'lodash/join';
const HDWalletProvider = require('@truffle/hdwallet-provider');
import Web3 from 'web3';
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
    marginTop: hp('5'),
    marginBottom: hp('10'),
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
  arrowRightIcon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  fornaxIcon: {
    marginBottom: 30,
  },
  fornaxInnerBox: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: hp('5'),
    marginBottom: hp('1'),
  },
  fornaxMiniText: {
    fontSize: 18,
    color: '#bdbdbd',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
    width: 300,
  },
  seedBox: {
    borderWidth: 2,
    borderRadius: 20,
    borderStyle: 'dotted',
    borderColor: '#b27f29',
    marginVertical: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: 125,
  },
  seedText: {
    color: '#ffffff',
    textAlign: 'center',
    width: 80,
  },
  seedList: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  seedListBox: {
    width: 280,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
const seedArray = [
  'twenty',
  'fruit',
  'robot',
  'used',
  'surround',
  'ladder',
  'priority',
  'own',
  'industry',
  'share',
  'pyramid',
  'snap',
];
const ImportWallet = (props: any) => {
  const navigate = props.navigation.navigate;
  const [seed, setSeed] = useState<any>(seedArray);

  const handleSeeds = (e: any, index: number) => {
    seed[index] = e;
    setSeed([...seed]);
  };

  const storeDataAsync = async (account: any) => {
    try {
      const value = await AsyncStorage.getItem('accountList');
      if (value) {
        navigate('Dashboard');
        return;
        // We have data!!
        // const data: any = JSON.parse(value);
        // newAccounts.push(data[0]);
      }
      await AsyncStorage.setItem('accountList', JSON.stringify(account));
    } catch (error) {
      // Error saving data
    }
  };

  const handleImport = async () => {
    const mnemonicPhrase = _join(seed, ' ');
    console.log(mnemonicPhrase, 'mnemonicPhrase');
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
        const account = await web3.eth.accounts.create();
        storeDataAsync(account);
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
        <Text style={styles.textStyle}>Import Wallet</Text>
        <Text style={styles.fornaxMiniText}>
          Write down your Secret Recovery Phrase
        </Text>
      </View>
      <View style={styles.fornaxBox}>
        <View style={styles.seedListBox}>
          <View style={styles.seedList}>
            {seedArray.map((sed: any, index: any) => {
              if (index <= 5) {
                return (
                  <View key={index} style={styles.seedBox}>
                    <TextInput
                      style={styles.seedText}
                      placeholder={sed}
                      placeholderTextColor="#bdbdbd"
                      onChangeText={e => handleSeeds(e, index)}
                      value={seed[index]}
                    />
                  </View>
                );
              }
            })}
          </View>
          <View style={styles.seedList}>
            {seedArray.map((sed: any, index: any) => {
              if (index >= 6) {
                return (
                  <View key={index} style={styles.seedBox}>
                    <TextInput
                      style={styles.seedText}
                      placeholder={sed}
                      placeholderTextColor="#bdbdbd"
                      onChangeText={e => handleSeeds(e, index + 6)}
                      value={seed[index + 6]}
                    />
                  </View>
                );
              }
            })}
          </View>
        </View>
        <Pressable
          onPress={handleImport}
          style={[styles.button, styles.buttonClose]}>
          <Text style={styles.txnText}>Continue</Text>
        </Pressable>
      </View>
    </>
  );
};

export default ImportWallet;
