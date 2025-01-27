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

const coinSlice = createSlice({
    name: 'coin',
    initialState: {
        coinList: [],
        top50: [],
        searchCoinList: [],
        marketChart: { data: [], loading: false },
        coinByID: null,
        coinDetails: null,
        loading: false,
        error: null as string | null,
    },
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
            .addCase(getCoinByID.fulfilled, (state, action) => {
                state.loading = false;
                state.coinByID = action.payload;
            })
            .addCase(getCoinDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.coinDetails = null;
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
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