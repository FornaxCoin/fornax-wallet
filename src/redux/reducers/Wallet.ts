import { createSlice } from '@reduxjs/toolkit';

interface WalletState {
  mnemonic: string;
  privateKey: string;
  ethAddress: string;
}

const initialState = {
  mnemonic: '',
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
  },
});

export const { initWallet } = walletSlice.actions;
export default walletSlice.reducer;
