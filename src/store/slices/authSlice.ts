import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isSignedIn: boolean;
  isOnboarded: boolean;
  error: string | null;
  email: string | null;
  token: string | null;
}

const initialState: AuthState = {
  isSignedIn: false,
  isOnboarded: false,
  error: null,
  email: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInRequest(state) {
      state.error = null;
    },
    signInSuccess(state, action: PayloadAction<{ email: string; token: string }>) {
      state.isSignedIn = true;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.error = null;
    },
    signInFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.token = null;
    },
    signOut(state) {
      state.isSignedIn = false;
      state.isOnboarded = false;
      state.email = null;
      state.error = null;
      state.token = null;
    },
    finishOnboarding(state) {
      state.isOnboarded = true;
    },
  },
});

export const {
  signInRequest,
  signInSuccess,
  signInFailure,
  signOut,
  finishOnboarding,
} = authSlice.actions;
export default authSlice.reducer;