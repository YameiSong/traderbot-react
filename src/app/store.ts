import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/Auth/AuthSlice';
import coinReducer from '@/features/Coin/CoinSlice';
import walletReducer from '@/features/Wallet/WalletSlice';
import withdrawalReducer from '@/features/Withdrawal/WithdrawalSlice';
import orderReducer from '@/features/Order/OrderSlice';
import assetReducer from '@/features/Asset/AssetSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    coin: coinReducer,
    wallet: walletReducer,
    withdrawal: withdrawalReducer,
    order: orderReducer,
    asset: assetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
