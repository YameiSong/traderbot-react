import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api";

export const payOrder = createAsyncThunk('/order/payOrder', async (orderData: object) => {
    try {
        const response = await api.post(`/api/orders/pay`, orderData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);

export const getOrderByID = createAsyncThunk('/order/getOrderByID', async (orderId: string) => {
    try {
        const response = await api.get(`/api/orders/${orderId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);

export const getAllOrdersForUser = createAsyncThunk('/order/getAllOrdersForUser', async ({orderType, assetSymbol} : {orderType: string, assetSymbol: string}) => {
    try {
        const response = await api.get('/api/orders', {
            params: {
                order_type: orderType,
                asset_symbol: assetSymbol
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);
const initialState = {
    order: null,
    orders: [],
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(payOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(getOrderByID.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(getAllOrdersForUser.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
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

export default orderSlice.reducer;