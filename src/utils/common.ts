import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
// const HDWalletProvider = require('@truffle/hdwallet-provider');

const web3Config = {
  providerOrUrl: 'wss://node.watchfornax.com/ws',
  network_id: 13936,
  confirmations: 10,
  timeoutBlocks: 200,
  skipDryRun: true,
};

const getWeb3 = (mnemonicPhrase: string) => {
  try {
    const provider = new HDWalletProvider({
      mnemonic: {
        phrase: mnemonicPhrase.trim(),
      },
      ...web3Config,
    });
    const web3 = new Web3(provider);
    return web3;
  } catch (error) {
    console.log('Web3 Connection Failed');
  }
};

const validateEmail = (email: any) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());  
}

export { getWeb3, validateEmail };
