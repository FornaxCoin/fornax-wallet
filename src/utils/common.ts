import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
// const HDWalletProvider = require('@truffle/hdwallet-provider');

const web3Config = (providerUrl: string = '') => {
    if (providerUrl === 'ETH') {
        return {
            providerOrUrl: 'wss://speedy-nodes-nyc.moralis.io/16b2663894f95ed9a21fb53a/eth/mainnet/ws',
            network_id: 4,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true,
        }
    } else if (providerUrl === 'BNB') {
        return {
            providerOrUrl: 'wss://speedy-nodes-nyc.moralis.io/16b2663894f95ed9a21fb53a/bsc/mainnet/ws',
            network_id: 97,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true,
        }
    } else {
        return {
            providerOrUrl: 'wss://node.watchfornax.com/ws',
            network_id: 13936,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true,
        }
    }
};

const getWeb3 = (mnemonicPhrase: string, providerUrl: string = '') => {
    try {
        let config = web3Config(providerUrl);
        console.log(config)
        const provider = new HDWalletProvider({
            mnemonic: {
                phrase: mnemonicPhrase.trim(),
            },
            ...config,
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
