import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "../features/api/authApi";
import { promotersApi } from "../features/api/promotersApi";
import { shareHoldingApi } from "../features/api/shareHoldingApi";

import { savingAccounts } from "../features/api/savingAccounts";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      promotersApi.middleware,
      shareHoldingApi.middleware,
      savingAccounts.middleware

    ),
});
