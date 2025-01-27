import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api";

interface UserData {
  email: string;
  username: string;
  password: string;
}

export const registerUser = createAsyncThunk('auth/signup', async (userData: UserData) => {
  const response = await api.post('/auth/signup', userData);
  return response.data;
});

export const loginUser = createAsyncThunk('auth/signin', async (userData: UserData) => {
  const response = await api.post('/auth/signin', userData);
  return response.data;
});

// export const loginTwoFactor = createAsyncThunk('auth/two-factor/otp', async (data) => {
//   const response = await api.post(`/auth/two-factor/otp/${data.otp}`, { id: data.id });
//   return response.data;
// });

export const getUser = createAsyncThunk('/user-profile', async () => {
  try {
    const response = await api.get('/api/users/profile');
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    email: '',
    loggedIn: false,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    logout(state) {
      state.username = '';
      state.email = '';
      state.loggedIn = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign up
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.loggedIn = true;
        localStorage.setItem('token', action.payload.jwt);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action as any).error.message ?? null;
      })
      // Sign in
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        localStorage.setItem('token', action.payload.jwt);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      // Two-factor authentication
      // .addCase(loginTwoFactor.fulfilled, (state, action) => {
      //   state.loading = false;
      //   // Assuming your API returns { username, email, jwt }
      //   state.username = action.payload.username;
      //   state.email = action.payload.email;
      //   localStorage.setItem('token', action.payload.jwt); // Store JWT in localStorage
      // })
      // .addCase(loginTwoFactor.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message ?? null;
      // })
      // Get user profile
      .addCase(getUser.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.email = action.payload.email;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
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
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
