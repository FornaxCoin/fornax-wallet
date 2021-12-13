import { createSlice } from '@reduxjs/toolkit';

interface WalletState {
  mnemonic: string;
  privateKey: string;
  ethAddress: string;
  web3: any;
  accounts: any;
  txnInfo: any;
  txnResponse: any;
  defaultAddress: string;
  sendTxnStatus: string;
}

const initialState = {
  mnemonic: '',
  privateKey: '',
  ethAddress: '',
  web3: null,
  accounts: [],
  txnInfo: null,
  defaultAddress: '',
  txnResponse: null,
  sendTxnStatus: '',
} as WalletState;

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
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
  },
});

export const {
  setMnemonic,
  initWallet,
  setWeb3,
  setAccounts,
  setTxnsInfo,
  setTxnsResponse,
  setDefaultAddress,
  setSendTxnStatus
} = walletSlice.actions;
export default walletSlice.reducer;
