import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
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
import _random from 'lodash/random';
import _isEqual from 'lodash/isEqual';
import { useSelector } from 'react-redux';
import { showMessage, hideMessage } from "react-native-flash-message";

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
  seedBoxMiss: {
    borderRadius: 20,
    backgroundColor: '#b27f29',
    marginVertical: hp(0.5),
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: wp('33'),
    height: hp('5'),
    justifyContent:'center',
  },
  seedCountText: {
    color: '#b27f29',
    fontSize: 14,
    marginRight: 8,
  },
  seedText: {
    // flex:1,
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    includeFontPadding: true,
    color: '#ffffff',
    textAlign: 'center',
    paddingTop: 0,
    paddingBottom: 0
    // paddingTop: 8,
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

let seedArray: any = ['', '', '', '', '', '', '', '', '', '', '', ''];

const VerifyMnemonic = (props: any) => {
  const navigate = props.navigation.navigate;
  const [seed, setSeed] = useState<any>(seedArray);
  const [passSeed, setPassSeed] = useState<any>([]);
  const [seedMissData, setSeedMissData] = useState<any>({});
  const [verifyBox, setVerifyBox] = useState(false);

  const handleCreateWallet = async () => {
    const mnemonicPhrase = await AsyncStorage.getItem('mnemonicPhrase');
    setSeed(mnemonicPhrase?.split(' '));
  }

  const { accounts } = useSelector(({ wallet }: any) => {
    return {
      accounts: wallet?.accounts,
    };
  });

  const setRandomData = async (randomNum1: number, randomNum2: number, randomNum3: number) => {
    const mnemonicPhrase = await AsyncStorage.getItem('mnemonicPhrase');
    const seedTemp: any = mnemonicPhrase?.split(' ');
    seedTemp[randomNum1] = ''
    seedTemp[randomNum2] = ''
    seedTemp[randomNum3] = ''
    setPassSeed(seedTemp);
    setSeedMissData({
      seed1: seed[randomNum1],
      random1: randomNum1,
      seed2: seed[randomNum2],
      random2: randomNum2,
      seed3: seed[randomNum3],
      random3: randomNum3,
    })

  }

  const handleImport = async () => {
    if(verifyBox) {
      const found = _isEqual(seed, passSeed);
      if (!found) {
        showMessage({
          message: "Verification Failed!!!",
          description: "Please select correct Mnemonic Phrase for Create Wallet",
          type: "warning",
        });
        setRandomData(seedMissData.random1, seedMissData.random2, seedMissData.random3);
      } else {
        hideMessage();
        await AsyncStorage.setItem('accountList', JSON.stringify([accounts]));
        navigate('Tokens');
      }
    } else {
      setVerifyBox(true);
      const randomNum1 = _random(0, 4)
      const randomNum2 = _random(5, 8)
      const randomNum3 = _random(9, 11)
      setRandomData(randomNum1, randomNum2, randomNum3);
    }
  }

  const handleMissData = async (phrase: any, value: any) => {
    const seedTemp: any = passSeed;
    const index = seedTemp.findIndex((sed: any) => sed === '');
    seedTemp[index] = phrase;
    setPassSeed([...seedTemp]);
    setSeedMissData({
      ...seedMissData,
      [`seed${value}`]: '',
    })
  }

  useEffect(() => {
    handleCreateWallet();
  }, []);

  return (
    <>
      <View>
        <Pressable onPress={() => navigate('WalletSetup')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
      </View>
      <View style={styles.fornaxBox}>
        <View style={styles.fornaxInnerBox}>
          <Image style={styles.fornaxIcon} source={require(SettingImage)} />
          <Text style={styles.textStyle}>Create Wallet</Text>
          <Text style={styles.fornaxMiniText}>
            Your Secret Recovery Phrase
          </Text>
        </View>
        <View>
          {!verifyBox ? (
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
                            editable = {false}
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
                            editable = {false}
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
          ) : (
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
                            editable = {false}
                            value={passSeed[index]}
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
                            editable = {false}
                            value={passSeed[index]}
                            autoCapitalize={'none'}
                            />
                        </View>
                      </View>
                    );
                  }
                })}
                </View>
              </View>
              <View style={{  width: wp('75'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 10, flexWrap: 'wrap' }}>
                {seedMissData?.seed1 !== '' && (
                  <Pressable onPress={() => handleMissData(seedMissData?.seed1, 1)}>
                    <View style={styles.seedBoxMiss}>
                      <Text style={styles.seedText}>{seedMissData?.seed1}</Text>
                    </View>
                  </Pressable>
                )}
                {seedMissData?.seed3 !== '' && (
                  <Pressable onPress={() => handleMissData(seedMissData?.seed3, 3)}>
                    <View style={styles.seedBoxMiss}>
                      <Text style={styles.seedText}>{seedMissData?.seed3}</Text>
                    </View>
                  </Pressable>
                )}
                {seedMissData?.seed2 !== '' && (
                  <Pressable onPress={() => handleMissData(seedMissData?.seed2, 2)}>
                    <View style={styles.seedBoxMiss}>
                      <Text style={styles.seedText}>{seedMissData?.seed2}</Text>
                    </View>
                  </Pressable>
                )}
              </View>
            </View>
          )}
          <Pressable
            onPress={handleImport}
            style={[styles.button, styles.buttonClose]}>
            <Text style={styles.txnText}>{verifyBox ? 'Verify Mnemonic': 'Continue' }</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default VerifyMnemonic;
