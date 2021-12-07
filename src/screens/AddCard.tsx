import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAccounts } from '../redux/reducers/Wallet';
import { useDispatch, useSelector } from 'react-redux';

const backLines = '../../assets/images/Group_37background.png';
const backCard = '../../assets/images/Group_36card.png';
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
  centerContainer: {
    position: 'absolute',
  },
  center: {
    // flexDirection: 'column',
    top: hp(-5),
    zIndex: -99,
    position: 'absolute',
    alignSelf: 'center',
  },
});

const AddCard = (props: any) => {
  const dispatch = useDispatch();
  const navigate = props.navigation.navigate;

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
      // Error saving data
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

  const handleCreateWallet = async () => {
    try {
      if (web3) {
        const account = await web3.eth.accounts.create();
        getBalance(account);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <View>
        <Pressable onPress={() => navigate('Dashboard')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
      </View>
      <View style={styles.fornaxInnerBox}>
        {/*<Image style={styles.fornaxIcon} source={require(SettingImage)} />*/}
        <View style={styles.centerContainer}>
          <Image style={styles.center} source={require(backLines)} />
          <Image style={styles.center} source={require(backCard)} />
        </View>
        <Text style={styles.textStyle}>Add Card</Text>
      </View>
      <View style={styles.fornaxBox}>
        <Pressable
          onPress={() => navigate('ImportCard')}
          style={[styles.button, styles.buttonClose, styles.secondaryButton]}>
          <Text style={[styles.txnText, styles.secondaryTxnText]}>
            Import new Card
          </Text>
        </Pressable>
        <Pressable
          onPress={handleCreateWallet}
          style={[styles.button, styles.buttonClose]}>
          <Text style={styles.txnText}>Create a new Card</Text>
        </Pressable>
      </View>
    </>
  );
};

export default AddCard;
