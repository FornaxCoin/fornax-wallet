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
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
const backLines = '../../assets/images/Group_37background.png';
const backCard = '../../assets/images/Group_36card.png';

const styles = StyleSheet.create({
  fornaxBox: {
    flex: 1,
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
  fornaxIcon: {
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
  inputBox: {
    width: 300,
    marginVertical: 13,
    marginTop: 300,
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
  center: {
    top: hp(-5),
    zIndex: -99,
    position: 'absolute',
    alignSelf: 'center',
  },
});

const ImportCard = (props: any) => {
  const dispatch = useDispatch();
  const navigate = props.navigation.navigate;
  const [privateKey, setPrivateKey] = useState('');

  const { web3, accounts } = useSelector(({ wallet }: any) => {
    return {
      web3: wallet?.web3,
      accounts: wallet?.accounts,
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

  const getBalance = async (account: any) => {
    web3.eth.getBalance(account?.address).then(
      async (bal: any) => {
        if (bal >= 0) {
          const balance = await web3.utils.fromWei(bal, 'ether');
          storeDataAsync({ ...account, balance });
        }
      },
      (error: any) => {
        console.log(error, 'getBalance');
      },
    );
  };

  const ignoreLength: any = false;

  const handleImport = async () => {
    try {
      if (web3) {
        const found = accounts.length > 0 && accounts.find((acc: any) => acc.privateKey === privateKey)
        if(found) {
          getBalance(found);
        } else {
          const account = await web3.eth.accounts.privateKeyToAccount(
            privateKey,
            [ignoreLength],
          );
          getBalance(account);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <View>
        <Pressable onPress={() => navigate('AddCard')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
      </View>
      <View style={styles.fornaxInnerBox}>
        <View>
          <Image style={styles.center} source={require(backLines)} />
          <Image style={styles.center} source={require(backCard)} />
        </View>
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
