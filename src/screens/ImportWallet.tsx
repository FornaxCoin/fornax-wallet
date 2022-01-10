import React, { useState } from 'react';
import {
  Image,
  Pressable, ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import _join from 'lodash/join';
import { setWeb3 } from '../redux/reducers/Wallet';
import { useDispatch } from 'react-redux';
import { getWeb3 } from '../utils/common';
import { showMessage, hideMessage } from "react-native-flash-message";

const bip39 = require('bip39');

const SettingImage = '../../assets/images/Settingmaga.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';

const styles = StyleSheet.create({
  fornaxBox: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: wp(49.3),
    height:hp(6.6),
    alignSelf: 'center',
    justifyContent:'center',
  },
  button: {
    borderRadius: hp(2.4),
    marginTop: hp('1'),
    marginBottom: hp('6'),
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
    marginLeft: wp(6.3),
    marginTop: hp(3.7),
    height:hp(3),
    width:hp(3),
  },
  fornaxIcon: {
    resizeMode: 'contain',
    width:  hp(6.5),
    height: hp(6.5),
    marginBottom: hp(5.5),
  },
  fornaxInnerBox: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: hp('1'),
    marginBottom: hp('2'),
  },
  fornaxMiniText: {
    fontSize: 18,
    color: '#bdbdbd',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
    width: wp('80'),
  },
  seedBox: {
    borderWidth: 2,
    borderRadius: 20,
    justifyContent:'center',
    borderStyle: 'dotted',
    borderColor: '#b27f29',
    marginVertical: hp(1),
    paddingHorizontal: 10,
    width: wp('30'),
    height: hp('5'),
  },
  seedCountText: {
    color: '#b27f29',
    fontSize: 14,
    marginRight: 8,
  },
  seedText: {
    fontSize: 14,
    includeFontPadding: true,
    color: '#ffffff',
    textAlign: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
  seedList: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  seedListBox: {
    width: wp('75'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
const seedArray = ['', '', '', '', '', '', '', '', '', '', '', ''];

const ImportWallet = (props: any) => {
  const dispatch = useDispatch();
  const navigate = props.navigation.navigate;
  const [seed, setSeed] = useState<any>(seedArray);

  const handleSeeds = (e: any, index: number) => {
    seed[index] = e;
    setSeed([...seed]);
  };

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

  const getBalance = (web3: any, account: any, mnemonicPhrase: any) => {
    web3.eth.getBalance(account?.address).then(
      async (bal: any) => {
        if (bal >= 0) {
          const balance = await web3.utils.fromWei(bal, 'ether');
          storeDataAsync({ ...account, balance }, mnemonicPhrase);
        }
      },
      (error: any) => {
        console.log(error, 'getBalance');
      },
    );
  };

  const handleImport = async () => {
    const mnemonicPhrase = _join(seed, ' ');
    try {
      if (bip39.validateMnemonic(mnemonicPhrase.toString().toLowerCase().trim())) {
        hideMessage();
        const web3 = getWeb3(mnemonicPhrase);
        if (web3) {
          dispatch(setWeb3(web3));
          const account = await web3.eth.accounts.create();
          getBalance(web3, account, mnemonicPhrase);
        }
      } else {
        showMessage({
          message: "Import Phrase Failed!!!",
          description: "Please enter correct mnemonic phrase",
          type: "danger",
        });
      }
    } catch (err) {
      hideMessage();
      console.log(err);
    }
  };

  return (
    <>
      <View>
        <Pressable onPress={() => navigate('WalletSetup')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
      </View>
      <ScrollView>
        <View style={styles.fornaxBox}>
          <View style={styles.fornaxInnerBox}>
            <Image style={styles.fornaxIcon} source={require(SettingImage)} />
            <Text style={styles.textStyle}>Import Wallet</Text>
            <Text style={styles.fornaxMiniText}>
              Write down your Secret Recovery Phrase
            </Text>
          </View>
          <View>
            <View style={styles.seedListBox}>
              <View style={styles.seedList}>
                {seedArray.map((sed: any, index: any) => {
                  if (index <= 5) {
                    return (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                          <Text style={styles.seedCountText}>{index + 1}.</Text>
                          <View style={styles.seedBox}>
                            <TextInput
                                style={styles.seedText}
                                // placeholder={sed}
                                placeholderTextColor="#bdbdbd"
                                onChangeText={e => handleSeeds(e, index)}
                                value={seed[index]}
                                autoCapitalize={'none'}
                            />
                          </View>
                        </View>
                    );
                  }
                })}
              </View>
              <View style={styles.seedList}>
                {seedArray.map((sed: any, index: any) => {
                  if (index >= 6) {
                    return (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', marginLeft: 10 }}>
                          <Text style={styles.seedCountText}>{index + 1}.</Text>
                          <View style={styles.seedBox}>
                            <TextInput
                                style={styles.seedText}
                                placeholder={sed}
                                placeholderTextColor="#bdbdbd"
                                onChangeText={e => handleSeeds(e, index)}
                                value={seed[index]}
                                autoCapitalize={'none'}
                            />
                          </View>
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
        </View>
      </ScrollView>
    </>
  );
};

export default ImportWallet;
