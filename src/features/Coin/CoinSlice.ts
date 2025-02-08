import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api";

export const getCoinList = createAsyncThunk('/coin/getCoinList', async (page: number) => {
    try {
        const response = await api.get(`/coins?page=${page}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const getTop50Coins = createAsyncThunk('coin/getTop50Coins', async () => {
    try {
        const response = await api.get('/coins/top50');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const getMarkectChart = createAsyncThunk('coin/getMarkectChart',
    async ({ coinId, days }: { coinId: string, days: number }) => {
        try {
            const response = await api.get(`/coins/${coinId}/chart?days=${days}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    });

export const getCoinByID = createAsyncThunk('coin/getCoinByID', async (coinId: string) => {
    try {
        const response = await api.get(`/coins/${coinId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const getCoinDetails = createAsyncThunk('coin/getCoinDetails', async (coinId: string) => {
    try {
        const response = await api.get(`/coins/details/${coinId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);

export const searchCoin = createAsyncThunk('coin/searchCoin', async (keyword: string) => {
    try {
        const response = await api.get(`/coins/search?q=${keyword}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);

export interface CoinData {
    id: string;
    name: string;
    symbol: string;
    image: object;
    current_price: number;
    market_cap: number;
    total_volume: number;
    price_change_percentage_24h: number;
}

type CoinState = {
    coinList: CoinData[];
    top50: CoinData[];
    searchCoinList: CoinData[];
    marketChart: any[];
    coinDetails: any;
    loading: boolean;
    error: string | null;
}

const initialState: CoinState = {
    coinList: [],
    top50: [],
    searchCoinList: [],
    marketChart: [],
    coinDetails: null,
    loading: false,
    error: null,
}

const coinSlice = createSlice({
    name: 'coin',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCoinList.fulfilled, (state, action) => {
                state.loading = false;
                state.coinList = action.payload;
                state.error = null;
            })
            .addCase(getTop50Coins.fulfilled, (state, action) => {
                state.loading = false;
                state.top50 = action.payload;
                state.error = null;
            })
            .addCase(getMarkectChart.fulfilled, (state, action) => {
                state.loading = false;
                state.marketChart = action.payload.prices;
                state.error = null;
            })
            .addCase(getCoinDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.coinDetails = action.payload;
                state.error = null;
            })
            .addCase(searchCoin.fulfilled, (state, action) => {
                state.loading = false;
                state.searchCoinList = action.payload.coins;
                state.error = null;
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
            )
    }
});

export default coinSlice.reducer;