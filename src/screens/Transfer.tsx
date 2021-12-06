import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAccounts } from '../redux/reducers/Wallet';
import { useDispatch, useSelector } from 'react-redux';

const SendImage = '../../assets/images/Sendmini.png';
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
    marginTop: hp('10'),
    marginBottom: hp('4'),
  },
  fornaxMiniText: {
    fontSize: 16,
    color: '#bdbdbd',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
  },
});

const Transfer = (props: any) => {
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

  const handleCreateWallet = async () => {
    try {
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
        <Image style={styles.fornaxIcon} source={require(SendImage)} />
        <Text style={styles.textStyle}>Transfer</Text>
        <Text style={styles.fornaxMiniText}>
          Import an existing wallet or create a new one
        </Text>
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

export default Transfer;