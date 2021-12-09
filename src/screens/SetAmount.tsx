import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAccounts, setTxnsInfo, setTxnsResponse } from '../redux/reducers/Wallet';
import Spinner from 'react-native-spinkit';

const CocoPinImage = '../../assets/images/Iconly_Curved_Passwordmaga.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
const CloseIcon = '../../assets/images/Closemini.png';
const styles = StyleSheet.create({
  fornaxBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    marginTop: hp('8'),
    marginBottom: hp('4'),
  },
  input: {
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
    fontFamily: 'Quicksand-Medium',
    color: '#ffffff',
    paddingHorizontal: 10,
    fontSize: 16,
    width: 240,
  },
  pinInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  NumPad: {
    width: 240,
    marginTop: 20,
    marginBottom: 30,
  },
  NumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  numClose: {
    width: 50,
    alignSelf: 'center',
  },
  num: {
    paddingVertical: 20,
  },
  crossIcon: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  loaderBack: {
    flex: 1,
    backgroundColor: '#00000057',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    left: 0,
    bottom: 0,
    top: 0
  },
});

const SetAmount = (props: any) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const navigate = props.navigation.navigate;
  const [amount, setAmount] = useState('');
  const [accIndex, setAccIndex] = useState(-1);

  const handleAmonut = (val: any) => {
    setAmount(amount + val);
    dispatch(setTxnsInfo({ ...txnData, amount }));
  };

  const { web3, accounts, txnData } = useSelector(({ wallet }: any) => {
    return {
      web3: wallet?.web3,
      accounts: wallet?.accounts,
      txnData: wallet?.txnInfo,
    };
  });

  const storeDataAsync = async (account: any) => {
    try {
      const _accounts: any = [];
      const accountList = await AsyncStorage.getItem('accountList');
      if (accountList !== null) {
        const data: any = JSON.parse(accountList);
        var newAccounts = data.map((acc: any) => {
          return acc.address === account?.address
            ? { ...acc, balance: account.balance }
            : acc;
        });
        _accounts.push(...newAccounts);
      }
      await AsyncStorage.setItem('accountList', JSON.stringify(_accounts));
      dispatch(setAccounts(_accounts));
      const found = accounts.find((ac: any) => ac.address === txnData?.to);
      if (!found) {      
        setLoader(false);
        navigate('ConfirmTransaction');
      } else if (found && account?.address === found?.address) {
        setLoader(false);
        navigate('ConfirmTransaction');
      }
    } catch (error) {
      // Error saving data
    }
  };

  const getBalance = (account: any) => {
    web3.eth.getBalance(account?.address).then(
      async (bal: any) => {
        if (bal >= 0) {
          const balance = await web3.utils.fromWei(bal, 'ether');
          storeDataAsync({ ...account, balance });
        }
      },
      (error: any) => {
        console.log(error, 'getBalance');
        setLoader(false);
      },
    );
  };

  const sendTxn = async () => {
    try {
      const gasPrice = await web3.eth
        .getGasPrice()
        .then(async (result: any) => {
          return result;
        });
      const nonce = await web3.eth
        .getTransactionCount(txnData.from?.address)
        .then((count: any) => {
          return count;
        });
      const ignoreLength: any = false;
      console.log(txnData, 'txnData');
      web3.eth.accounts.wallet.add(txnData?.from?.privateKey);
      web3.eth.defaultAccount = txnData?.from?.address;
      await web3.eth.accounts.privateKeyToAccount(txnData?.from?.privateKey, [
        ignoreLength,
      ]);
      web3.eth
        .sendTransaction({
          from: txnData.from?.address,
          to: txnData.to,
          value: web3.utils.toWei(amount, 'ether'),
          gasPrice: gasPrice,
          gas: 21000,
          nonce: nonce,
        })
        .on('transactionHash', function (hash: any) {
          console.log(hash, 'hash');
        })
        .on('receipt', function (receipt: any) {
          console.log(receipt, 'receipt');
        })
        .on('confirmation', function (confirmationNumber: any, receipt: any) {
          console.log(confirmationNumber, 'confirmationNumber');
          console.log(receipt, 'receipt');
          getBalance(txnData.from);
          const found = accounts.find((ac: any) => ac.address === txnData?.to);
          if (found) {
            getBalance(found);
          }
          dispatch(setTxnsResponse({ ...receipt, amount, ...txnData, gasPrice}))
        })
        .on('error', (console.error));
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  useEffect(() => {
    const found = accounts.findIndex((acc: any) => acc.address === txnData?.from?.address);
    found !== -1 && setAccIndex(found);
  }, [accounts])

  const handleTransfer = () => {
    if (txnData.from?.address && txnData.to && parseInt(amount, 10) > 0) {
      setLoader(true);
      sendTxn();
    }
  };

  return (
    <>
      {loader && (
        <View style={styles.loaderBack}>
          <Spinner isVisible={true} size={50} type={'9CubeGrid'} color="#b27f29"/>
        </View>
      )}
      <View>
        <Pressable onPress={() => navigate('Transfer')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
      </View>
      <View style={styles.fornaxInnerBox}>
        <Image style={styles.fornaxIcon} source={require(CocoPinImage)} />
        <Text style={[styles.textStyle, { marginBottom: 20 }]}>Wallet {accIndex + 1}</Text>
        <Text style={styles.textStyle}>FRX {accIndex && accounts[accIndex]?.balance || 0}</Text>
      </View>
      <View style={styles.fornaxBox}>
        <View style={styles.pinInput}>
          <TextInput
            style={styles.input}
            value={amount}
            placeholder="0"
            placeholderTextColor="#bdbdbd"
          />
        </View>
        <View style={styles.NumPad}>
          <View style={styles.NumRow}>
            <Pressable
              onPress={() => handleAmonut(1)}
              style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>1</Text>
            </Pressable>
            <Pressable
              onPress={() => handleAmonut(2)}
              style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>2</Text>
            </Pressable>
            <Pressable
              onPress={() => handleAmonut(3)}
              style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>3</Text>
            </Pressable>
          </View>
          <View style={styles.NumRow}>
            <Pressable
              onPress={() => handleAmonut(4)}
              style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>4</Text>
            </Pressable>
            <Pressable
              onPress={() => handleAmonut(5)}
              style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>5</Text>
            </Pressable>
            <Pressable
              onPress={() => handleAmonut(6)}
              style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>6</Text>
            </Pressable>
          </View>
          <View style={styles.NumRow}>
            <Pressable
              onPress={() => handleAmonut(7)}
              style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>7</Text>
            </Pressable>
            <Pressable
              onPress={() => handleAmonut(8)}
              style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>8</Text>
            </Pressable>
            <Pressable
              onPress={() => handleAmonut(9)}
              style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>9</Text>
            </Pressable>
          </View>
          <View style={styles.NumRow}>
            <Pressable
              onPress={() => handleAmonut('.')}
              style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>.</Text>
            </Pressable>
            <Pressable
              onPress={() => handleAmonut(0)}
              style={[styles.num, styles.numClose]}>
              <Text style={styles.textStyle}>0</Text>
            </Pressable>
            <Pressable
              onPress={() => setAmount('')}
              style={[styles.num, styles.numClose, styles.crossIcon]}>
              <Image style={styles.crossIcon} source={require(CloseIcon)} />
            </Pressable>
          </View>
        </View>
        <Pressable
          onPress={handleTransfer}
          style={[styles.button, styles.buttonClose]}>
          <Text style={styles.textStyle}>Transfer</Text>
        </Pressable>
      </View>
    </>
  );
};

export default SetAmount;
