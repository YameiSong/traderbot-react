import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api";

export const requestWithdrawal = createAsyncThunk('/wallet/withdraw/request',
    async ( amount: number) => {
        try {
            const response = await api.post(`/api/withdrawal/${amount}`, null);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const proceedWithdrawal = createAsyncThunk('/wallet/withdraw/proceed',
    async ({ id, accept }: { id: string, accept: boolean }) => {
        try {
            const response = await api.patch(`/api/admin/withdraw/${id}/proceed/${accept}`, null);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getWithdrawalHistory = createAsyncThunk('/wallet/getWithdrawalHistory',
    async () => {
        try {
            const response = await api.get('/api/withdrawal');
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getAllWithdrawalRequests = createAsyncThunk('/wallet/getAllWithdrawalRequests',
    async () => {
        try {
            const response = await api.get('/api/admin/withdrawal');
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const addPaymentDetails = createAsyncThunk('/wallet/addPaymentDetails',
    async (paymentDetails: object) => {
        try {
            const response = await api.post('/api/payment-details', paymentDetails);
            console.log("Add payment detail", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getPaymentDetails = createAsyncThunk('/wallet/getPaymentDetails',
    async () => {
        try {
            const response = await api.get('/api/payment-details');
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export interface WithdrawalRequest {
    id: string;
    date: string;
    amount: number;
    status: string;
}

export interface PaymentDetails {
    id: string;
    accountNumber: string;
    bankName: string;
    accountHolderName: string;
    ifsc: string;
}

type withdrawalState = {
    withdrawalRequests: WithdrawalRequest[];
    paymentDetails: PaymentDetails | null;
    loading: boolean;
    error: string | null;
};

const initialState: withdrawalState = {
    withdrawalRequests: [],
    paymentDetails: null,
    loading: false,
    error: null,
};

const withdrawalSlice = createSlice({
    name: 'withdrawal',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(requestWithdrawal.fulfilled, (state, action) => {
                state.withdrawalRequests.push(action.payload);
                state.loading = false;
            })
            .addCase(proceedWithdrawal.fulfilled, (state, action) => {
                const index = state.withdrawalRequests.findIndex(
                    (request) => request.id === action.payload.id
                );
                if (index !== -1) {
                    state.withdrawalRequests[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(getWithdrawalHistory.fulfilled, (state, action) => {
                state.withdrawalRequests = action.payload;
                state.loading = false;
            })
            .addCase(getAllWithdrawalRequests.fulfilled, (state, action) => {
                state.withdrawalRequests = action.payload;
                state.loading = false;
            })
            .addCase(addPaymentDetails.fulfilled, (state, action) => {
                state.paymentDetails = action.payload;
                state.loading = false;
            })
            .addCase(getPaymentDetails.fulfilled, (state, action) => {
                state.paymentDetails = action.payload;
                state.loading = false;
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
                    state.error = action.error.message;
                }
            );
    },
});

export default withdrawalSlice.reducer;