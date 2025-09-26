import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "../features/api/authApi";
import { promotersApi } from "../features/api/promotersApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, promotersApi.middleware),
});
