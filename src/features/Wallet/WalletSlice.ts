import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api";

export const getUserWallet = createAsyncThunk('/wallet/getUserWallet', async () => {
    try {
        const response = await api.get('/api/wallet');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const getWalletTransactions = createAsyncThunk('/wallet/getWalletTransactions', async () => {
    try {
        const response = await api.get('/api/wallet/transactions');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const depositMoney = createAsyncThunk('/wallet/depositMoney',
    async ( orderId: string ) => {
        try {
            const response = await api.put('/api/wallet/deposit', {
                params: {
                    order_id: orderId
                },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
        // TODO: navigate to /wallet
    });

export const paymentHandler = createAsyncThunk('/wallet/paymentHandler',
    async ({ amount, paymentMethod }: { amount: number, paymentMethod: string }) => {
        try {
            const response = await api.post(`/api/payment/${paymentMethod}/amount/${amount}`);
            window.location.href = response.data.payment_url;
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    });

export const transferMoney = createAsyncThunk('/wallet/transferMoney',
    async ({ walletId, reqData }: { walletId: string, reqData: object }) => {
        try {
            const response = await api.post(`/api/wallet/${walletId}/transfer`, reqData);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    });

export interface User {
    id: number;
    username: string;
    email: string;
    two_factor_auth: {
        enabled: boolean;
        verification_type: string | null;
        send_to: string | null;
    };
    role: string;
}

export interface userWallet {
    id: string;
    user: User;
    balance: number;
}

type walletState = {
    userWallet: userWallet;
    transactions: [];
    loading: boolean;
    error: string | null;
}

const initialState: walletState = {
    userWallet: {
        id: '',
        user: {
            id: 0,
            username: '',
            email: '',
            two_factor_auth: {
                enabled: false,
                verification_type: null,
                send_to: null,
            },
            role: '',
        },
        balance: 0,
    },
    transactions: [],
    loading: false,
    error: null,
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserWallet.fulfilled, (state, action) => {
                state.loading = false;
                state.userWallet = action.payload;
            })
            .addCase(getWalletTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(depositMoney.fulfilled, (state, action) => {
                state.loading = false;
                state.userWallet = action.payload;
            })
            // .addCase(paymentHandler.fulfilled, (state, action) => {
            //     state.loading = false;
            // })
            // .addCase(transferMoney.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.userWallet = action.payload;
            // })
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

export default walletSlice.reducer;