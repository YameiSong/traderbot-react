import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api";

export const simpleChat = createAsyncThunk('/ai/chat', async (message: string) => {
    try {
        const response = await api.post('/ai/chat', { prompt: message });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);

export enum Role {
    AI,
    User,
}

type Message = {
    role: Role;
    text: string;
};

const chatbotSlice = createSlice({
    name: 'chatbot',
    initialState: {
        messages: [
            { role: Role.AI, text: 'Hello! Feel free to ask me anything about cryptocurrencies!' },
        ] as Message[],
        loading: false,
        error: null as string | null,
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push({ role: Role.User, text: action.payload });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(simpleChat.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.messages.push({ role: Role.AI, text: action.payload });
                } else {
                    state.messages.push({ role: Role.AI, text: 'Sorry, I could not process your request. Please try again.' });
                }
            })
            .addCase(simpleChat.pending, (state) => {
                state.loading = true;
            })
            .addCase(simpleChat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
                state.messages.push({ role: Role.AI, text: 'An error occurred. Please try again later.' });
            });
    }
});

export const { addMessage } = chatbotSlice.actions;
export default chatbotSlice.reducer;