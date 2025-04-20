import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: { id: string; name: string } | null;
    access_token: string | null;
    refresh_token: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    access_token: null,
    refresh_token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ user: { id: string; name: string }; access_token: string; refresh_token: string }>) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.access_token = null;
        },
        setAuthState(state, action: PayloadAction<{ isAuthenticated: boolean; user: { id: string; name: string } | null; access_token: string | null; refresh_token: string | null }>) {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
        },
        setAccessToken(state, action: PayloadAction<string | null>) {
            state.access_token = action.payload;
        }
    },
});

export const { login, logout, setAuthState } = authSlice.actions;

export default authSlice.reducer;