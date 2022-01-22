import {createSlice} from '@reduxjs/toolkit';

interface WalletState {
    mnemonic: string;
    privateKey: string;
    ethAddress: string;
    web3: any;
    web3Frx: any;
    web3Eth: any;
    web3Bnb: any;
    accounts: any;
    txnInfo: any;
    txnResponse: any;
    defaultAddress: string;
    sendTxnStatus: string;
    payTxn: any,
    tokens: any,
}

const initialState = {
    mnemonic: '',
    privateKey: '',
    ethAddress: '',
    payTxn: null,
    web3: null,
    web3Frx: null,
    web3Eth: null,
    web3Bnb: null,
    accounts: [],
    txnInfo: null,
    defaultAddress: '',
    txnResponse: null,
    sendTxnStatus: '',
    tokens: 'frx',
} as WalletState;

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setPayTxn(state, action) {
            state.payTxn = action.payload;
        },
        setMnemonic(state, action) {
            state.mnemonic = action.payload;
        },
        initWallet(state, action) {
            state.privateKey = action.payload.privateKey;
            state.ethAddress = action.payload.ethAddress;
        },
        setWeb3(state, action) {
            state.web3 = action.payload;
        },
        setWeb3Frx(state, action) {
            state.web3Frx = action.payload;
        },
        setWeb3Eth(state, action) {
            state.web3Eth = action.payload;
        },
        setWeb3Bnb(state, action) {
            state.web3Bnb = action.payload;
        },
        setAccounts(state, action) {
            state.accounts = action.payload;
        },
        setTxnsInfo(state, action) {
            state.txnInfo = action.payload;
        },
        setTxnsResponse(state, action) {
            state.txnResponse = action.payload;
        },
        setDefaultAddress(state, action) {
            state.defaultAddress = action.payload;
        },
        setSendTxnStatus(state, action) {
            state.sendTxnStatus = action.payload;
        },
        setTokens(state, action) {
            state.tokens = action.payload
        },

    },
});

export const {
    setMnemonic,
    initWallet,
    setWeb3,
    setWeb3Frx,
    setWeb3Eth,
    setWeb3Bnb,
    setAccounts,
    setTxnsInfo,
    setTxnsResponse,
    setDefaultAddress,
    setSendTxnStatus,
    setPayTxn,
    setTokens,
} = walletSlice.actions;
export default walletSlice.reducer;
