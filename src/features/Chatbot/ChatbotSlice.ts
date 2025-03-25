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
        messages: [] as Message[],
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
                state.messages.push({ role: Role.AI, text: action.payload });
            })
            .addCase(simpleChat.pending, (state) => {
                state.loading = true;
            })
            .addCase(simpleChat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            });
    }
});

export const { addMessage } = chatbotSlice.actions;
export default chatbotSlice.reducer;