import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/api/authSlice"; // 👈 import authSlice
import { authApi } from "../features/api/authApi";
import { promotersApi } from "../features/api/promotersApi";

const rootReducer = combineReducers({
    auth: authReducer, // 👈 now the token is available in state.auth.token
    [authApi.reducerPath]: authApi.reducer,
    [promotersApi.reducerPath]: promotersApi.reducer,
});

export default rootReducer;
