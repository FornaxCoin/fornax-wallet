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
import { useDispatch, useSelector } from 'react-redux';
import { setAccounts } from '../redux/reducers/Wallet';
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
  inputBox: {
    width: 340,
    marginVertical: 13,
  },
  inputLabel: {
    fontSize: 16,
    color: '#b27f29',
    marginTop: 8,
    marginBottom: 10,
    fontFamily: 'Quicksand-Medium',
  },
  input: {
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
    fontFamily: 'Quicksand-Medium',
    color: '#ffffff',
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

const ImportCard = (props: any) => {
  const dispatch = useDispatch();
  const navigate = props.navigation.navigate;
  const [privateKey, setPrivateKey] = useState('');

  const { web3 } = useSelector(({ wallet }: any) => {
    return {
      web3: wallet?.web3,
    };
  });

  const storeDataAsync = async (account: any) => {
    try {
      const accounts: any = [];
      const accountList = await AsyncStorage.getItem('accountList');
      if (accountList !== null) {
        accounts.push(...JSON.parse(accountList));
        accounts.push(account);
      }
      await AsyncStorage.setItem('accountList', JSON.stringify(accounts));
      dispatch(setAccounts(accounts));
      navigate('Dashboard');
    } catch (error) {
      // Error saving data 0xde863f561914f42e185fa0dff531c5bb5ae35423bd3fea130493545df324e533
    }
  };

  const ignoreLength: any = false;

  const handleImport = async () => {
    try {
      if (web3) {
        const account = await web3.eth.accounts.privateKeyToAccount(
          privateKey,
          [ignoreLength],
        );
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
        <Text style={styles.textStyle}>Import Card</Text>
      </View>
      <View style={styles.fornaxBox}>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Private Key</Text>
          <TextInput
            style={styles.input}
            placeholder="Private Key"
            placeholderTextColor="#bdbdbd"
            onChangeText={e => setPrivateKey(e)}
            value={privateKey}
          />
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

export default ImportCard;