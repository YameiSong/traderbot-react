import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api";

export const getUserWatchlist = createAsyncThunk('/watchlist/getUserWatchlist', async () => {
    try {
        const response = await api.get('/api/watchlist/user');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);

export const addToWatchlist = createAsyncThunk('/watchlist/addToWatchlist', async (coinId: string | undefined) => {
    if (!coinId) {
        console.log("Coin id is not provided");
        return;
    }
    try {
        const response = await api.patch(`/api/watchlist/add/coin/${coinId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);

export const removeFromWatchlist = createAsyncThunk('/watchlist/removeFromWatchlist', async (coinId: string | undefined) => {
    if (!coinId) {
        console.log("Coin id is not provided");
        return;
    }
    try {
        const response = await api.patch(`/api/watchlist/remove/coin/${coinId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);

type CoinDetails = {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number | null;
    total_volume: number;
    circulating_supply: number | null;
    total_supply: number | null;
    max_supply: number | null;
    ath: number | null;
    ath_change_percentage: number | null;
    ath_date: string | null;
    atl: number | null;
    atl_change_percentage: number | null;
    atl_date: string | null;
    last_updated: string | null;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
};

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState: {
        coins: [] as CoinDetails[],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserWatchlist.fulfilled, (state, action) => {
                state.loading = false;
                state.coins = action.payload.coins;
            })
            .addCase(addToWatchlist.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    const exists = state.coins.some(coin => coin.id === action.payload.id);
                    if (!exists) {
                        state.coins.push(action.payload);
                    }
                }
            })
            .addCase(removeFromWatchlist.fulfilled, (state, action) => {
                state.loading = false;
                state.coins = state.coins.filter(coin => coin.id !== action.payload.id);
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action: any) => {
                    state.loading = false;
                    state.error = action.error.message ?? null;
                }
            );
    }
});

export default watchlistSlice.reducer;