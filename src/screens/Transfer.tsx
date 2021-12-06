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
import { setTxnsInfo } from '../redux/reducers/Wallet';
import { useDispatch, useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';

const SendImage = '../../assets/images/Sendmini.png';
const BackIcon = '../../assets/images/Iconly_Curved_Arrow.png';
// const DownArrow = '../../assets/images/Vector-arrow.png';

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
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    borderRadius: 15,
    fontFamily: 'Quicksand-Medium',
    backgroundColor: '#ffffff',
    color: '#bdbdbd',
    fontSize: 16,
    width: 340,
    marginBottom: 20,
  },
  inputImg: {
    height: 10,
    width: 20,
    marginTop: 6,
    position: 'absolute',
    right: 15,
    top: 20,
  },
  input: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
    width: 340,
    paddingHorizontal: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: 340,
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputAndroid: {
    width: 340,
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

const Transfer = (props: any) => {
  const dispatch = useDispatch();
  const navigate = props.navigation.navigate;
  const [accountOpt, setAccountOpt] = useState<any>([]);
  const [txnData, setTxnData] = useState({
    to: '',
    from: {} as any,
  });

  const { web3, accounts } = useSelector(({ wallet }: any) => {
    return {
      web3: wallet?.web3,
      accounts: wallet?.accounts,
    };
  });

  useEffect(() => {
    const options =
      accounts.length > 0 &&
      accounts.reduce((newAcc: any, acc: any) => {
        newAcc.push({ label: acc?.address, value: acc });
        return newAcc;
      }, []);
    setAccountOpt(options);
  }, [accounts]);

  const handleValue = (value: string, key: string) => {
    setTxnData({ ...txnData, [key]: value });
  };

  const handleSend = async () => {
    const isValid = await web3.utils.isAddress(txnData.to);
    if (txnData.from?.address && isValid) {
      dispatch(setTxnsInfo(txnData));
      navigate('SetAmount');
    } else {
      console.log('adress is invalid');
    }
  };

  useEffect(() => {
    if (txnData.to) {
      handleSend();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txnData]);

  return (
    <>
      <View>
        <Pressable onPress={() => navigate('Dashboard')}>
          <Image style={styles.backIcon} source={require(BackIcon)} />
        </Pressable>
      </View>
      <View style={styles.fornaxInnerBox}>
        <Image style={styles.fornaxIcon} source={require(SendImage)} />
        <Text style={styles.textStyle}>Transfer</Text>
        <Text style={styles.fornaxMiniText}>
          Import an existing wallet or create a new one
        </Text>
      </View>
      <View style={styles.fornaxBox}>
        <View style={styles.inputBox}>
          <RNPickerSelect
            onValueChange={value => handleValue(value, 'from')}
            style={pickerSelectStyles}
            items={accountOpt}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Send Address"
            placeholderTextColor="#bdbdbd"
            onChangeText={e => handleValue(e, 'to')}
            value={txnData.to}
          />
        </View>
      </View>
    </>
  );
};

export default Transfer;
