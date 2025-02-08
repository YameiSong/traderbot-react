import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/Auth/AuthSlice';
import coinReducer from '@/features/Coin/CoinSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    coin: coinReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
