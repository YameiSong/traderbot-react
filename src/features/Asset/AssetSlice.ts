import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api";

export const getAssetByID = createAsyncThunk('/asset/getAssetByID', async (assetId: string) => {
    try {
        const response = await api.get(`/api/assets/${assetId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);

export const getAssetDetails = createAsyncThunk('/asset/getAssetDetails', async (coinId: string) => {
    try {
        const response = await api.get(`/api/assets/coin/${coinId}/user`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);

export const getUserAssets = createAsyncThunk('/asset/getUserAssets', async () => {
    try {
        const response = await api.get('/api/assets');
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
    currentPrice: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    total_volume: number;
};

export type AssetDetails = {
    id: string;
    coin: CoinDetails;
    quantity: number;
    averageBuyPrice: number;
    profitLoss: number;
    profitLossPercentage: number;
};

const initialState = {
    asset: null as AssetDetails | null,
    userAssets: [] as AssetDetails[],
    assetDetails: null as AssetDetails | null,
    loading: false,
    error: null as string | null,
};

const assetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAssetByID.fulfilled, (state, action) => {
                state.loading = false;
                state.asset = action.payload;
            })
            .addCase(getAssetDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.assetDetails = action.payload;
            })
            .addCase(getUserAssets.fulfilled, (state, action) => {
                state.loading = false;
                state.userAssets = action.payload;
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
    },
});

export default assetSlice.reducer;