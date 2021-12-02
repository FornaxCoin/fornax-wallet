import {
  combineReducers,
  configureStore,
  createImmutableStateInvariantMiddleware,
} from '@reduxjs/toolkit';
import walletReducer from './reducers/Wallet';

const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware({
  ignoredPaths: ['ignoredPath', 'ignoredNested.one', 'ignoredNested.two'],
});

const rootReducer = combineReducers({
  wallet: walletReducer,
});

const store: any = configureStore({
  reducer: rootReducer,
  // Note that this will replace all default middleware
  middleware: [immutableInvariantMiddleware],
});

export default store;
