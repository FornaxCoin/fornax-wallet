import { createSlice } from '@reduxjs/toolkit';

interface WalletState {
  mnemonic: string;
  privateKey: string;
  ethAddress: string;
  web3: any;
  accounts: any;
  txnInfo: any;
}

const initialState = {
  mnemonic: '',
  privateKey: '',
  ethAddress: '',
  web3: null,
  accounts: [],
  txnInfo: null,
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
  },
});

export const { setMnemonic, initWallet, setWeb3, setAccounts, setTxnsInfo } =
  walletSlice.actions;
export default walletSlice.reducer;
