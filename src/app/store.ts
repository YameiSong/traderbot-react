import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/Auth/AuthSlice';
import coinReducer from '@/features/Coin/CoinSlice';
import walletReducer from '@/features/Wallet/WalletSlice';
import withdrawalReducer from '@/features/Withdrawal/WithdrawalSlice';
import orderReducer from '@/features/Order/OrderSlice';
import assetReducer from '@/features/Asset/AssetSlice';
import watchlistReducer from '@/features/Watchlist/WatchlistSlice';
import chatbotReducer from '@/features/Chatbot/ChatbotSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    coin: coinReducer,
    wallet: walletReducer,
    withdrawal: withdrawalReducer,
    order: orderReducer,
    asset: assetReducer,
    watchlist: watchlistReducer,
    chatbot: chatbotReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
