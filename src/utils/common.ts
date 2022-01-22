import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
// const HDWalletProvider = require('@truffle/hdwallet-provider');

const web3Config = (providerUrl: string = '') => {
    if (providerUrl === 'ETH') {
        return {
            providerOrUrl: 'wss://rinkeby.infura.io/ws/v3/b20934f8d48849539969d4a6a28a3831',
            network_id: 4,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true,
        }
    } else if (providerUrl === 'BNB') {
        return {
            // providerOrUrl: 'wss://fornax:Allahis1!@apis.ankr.com/wss/5b3dd16ed45647b3bdb814709fb3d53d/af4fe5db126353ca4c12575c4893b063/eth/fast/rinkeby',
            // network_id: 4,
            // confirmations: 2,
            // timeoutBlocks: 200,
            // skipDryRun: true,
            providerOrUrl: 'wss://speedy-nodes-nyc.moralis.io/0c737387b1a66a69fdc98ec9/bsc/testnet/ws',
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

export {getWeb3, validateEmail};
