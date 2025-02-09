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
    image: string;
    current_price: number;
    market_cap: number;
    total_volume: number;
    price_change_percentage_24h: number;
}

export interface CoinDetails {
    id: string;
    name: string;
    symbol: string;
    image: {
        thumb: string;
        small: string;
        large: string;
    };
    market_cap_rank: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_percentage_24h: number;
    market_data: {
        current_price: {
            [key: string]: number;
        };
        ath: {
            [key: string]: number;
        };
        ath_change_percentage: {
            [key: string]: number;
        };
        ath_date: {
            [key: string]: string;
        };
        atl: {
            [key: string]: number;
        };
        atl_change_percentage: {
            [key: string]: number;
        };
        atl_date: {
            [key: string]: string;
        };
        market_cap: {
            [key: string]: number;
        };
        total_volume: {
            [key: string]: number;
        };
        high_24h: {
            [key: string]: number;
        };
        low_24h: {
            [key: string]: number;
        };
        price_change_24h: number;
        price_change_percentage_24h: number;
        price_change_percentage_7d: number;
        price_change_percentage_14d: number;
        price_change_percentage_30d: number;
        price_change_percentage_60d: number;
        price_change_percentage_200d: number;
        price_change_percentage_1y: number;
        market_cap_change_24h: number;
        market_cap_change_percentage_24h: number;
        total_supply: number;
        max_supply: number;
        circulating_supply: number;
    };
}

type MarketChartData = {
    prices: [number, number][];
    market_caps: [number, number][];
    total_volumes: [number, number][];
}

type CoinState = {
    coinList: CoinData[];
    top50: CoinData[];
    searchCoinList: CoinData[];
    marketChart: MarketChartData;
    coinDetails: CoinDetails | null;
    loading: boolean;
    error: string | null;
}

const initialState: CoinState = {
    coinList: [],
    top50: [],
    searchCoinList: [],
    marketChart: {
        prices: [],
        market_caps: [],
        total_volumes: []
    },
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
            })
            .addCase(getTop50Coins.fulfilled, (state, action) => {
                state.loading = false;
                state.top50 = action.payload;
            })
            .addCase(getMarkectChart.fulfilled, (state, action) => {
                state.loading = false;
                state.marketChart = action.payload;
            })
            .addCase(getCoinDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.coinDetails = action.payload;
            })
            .addCase(searchCoin.fulfilled, (state, action) => {
                state.loading = false;
                state.searchCoinList = action.payload.coins;
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