import { createSlice } from '@reduxjs/toolkit';

interface WalletState {
  mnemonic: string;
  privateKey: string;
  ethAddress: string;
  web3: any;
  accounts: any;
  txnInfo: any;
  txnResponse: any;
}

const initialState = {
  mnemonic: '',
  privateKey: '',
  ethAddress: '',
  web3: null,
  accounts: [],
  txnInfo: null,
  txnResponse: {
    amount: '4',
    privateKey:
      '0x53e9fd3be773a1b668836e7b50f99cc5defb65e07c8aee93c447a1e3651f3507',
    blockHash:
      '0x4d1d55a60cc2a3c3e2c72b1869ec8674b2d741cc99e2bed81e36eb51d2497f18',
    blockNumber: 233777,
    contractAddress: null,
    cumulativeGasUsed: 21000,
    effectiveGasPrice: '0x3b9aca07',
    from: '0x1ce0b86637220a09999c40c13e2ce75689e7cd53',
    gasUsed: 21000,
    logs: [],
    logsBloom:
      '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    status: true,
    to: '0xc21a4ad429e4e2e194816d989d9bbd255c67fd6c',
    transactionHash:
      '0x4d6f4ba2dfbdc04b0d16c9be7ace3ab6ba326621d8e8155def894035438026de',
    transactionIndex: 0,
    type: '0x0',
  },
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
  },
});

export const {
  setMnemonic,
  initWallet,
  setWeb3,
  setAccounts,
  setTxnsInfo,
  setTxnsResponse,
} = walletSlice.actions;
export default walletSlice.reducer;
