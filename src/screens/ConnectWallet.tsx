import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import bip39 from 'react-native-bip39';
// import Web3 from 'web3';

const ConnectWallet = () => {
  const connectWeb3 = async () => {
    // const data = await bip39.generateMnemonic(256);
    console.log(bip39.validateMnemonic('basket actual'));
    // const NODE_URL =
    //   'wss://co3:Co3Blockchain_2019@co3-pantheon.di.unito.it:8545/ws/';
    // const web3 = null;
    try {
      // web3 = new Web3(NODE_URL.trim());
      // console.log(web3);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    connectWeb3();
  }, []);

  return (
    <View>
      <Text>Connect Wallets</Text>
    </View>
  );
};

export default ConnectWallet;
