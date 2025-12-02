import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") || null,

};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, user } = action.payload;
            state.token = token;
            state.user = user;

            // persist in localStorage
            localStorage.setItem("token", token);
        },
        logout: (state) => {
            state.token = null;
            // remove from localStorage
            localStorage.removeItem("token");
        },
    },
});

// named exports for actions
export const { setCredentials, logout } = authSlice.actions;

// ✅ default export for rootReducer
export default authSlice.reducer;
