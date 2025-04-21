import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: { id: string; name: string } | null;
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
};

export const STATE_KEY = 'auth';
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ user: { id: string; name: string }; access_token: string; refresh_token: string }>) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.access_token;
            state.refreshToken = action.payload.refresh_token;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.accessToken = null;
        },
        setAuthState(state, action: PayloadAction<{ isAuthenticated: boolean; user: { id: string; name: string } | null; accessToken: string | null; }>) {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
        setAccessToken(state, action: PayloadAction<string | null>) {
            state.accessToken = action.payload;
        },
        clearAccessToken(state) {
            state.accessToken = null;
        },
        setIsAuthenticated(state, action: PayloadAction<boolean>) {
            state.isAuthenticated = action.payload; 
        },
    },
});

export const { login, logout, setAuthState, setAccessToken, setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;
export const auth_selector = (state: any) => state[STATE_KEY];