

import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/api/authSlice"; // 👈 import authSlice
import { authApi } from "../features/api/authApi";
import { promotersApi } from "../features/api/promotersApi";
import { shareHoldingApi } from "../features/api/shareHoldingApi";
import { savingAccounts } from "../features/api/savingAccounts";
import { branchesApi } from "../features/api/branchesApi";
import { membersApi } from "../features/api/membersApi";


// New APIs
import { agentsApi } from "../features/api/agentsApi";
import { employeesApi } from "../features/api/employeesApi";
import { cspsApi } from "../features/api/cspsApi";
import ddAccountsApi from "../features/api/ddAccountsApi";


const rootReducer = combineReducers({
  auth: authReducer, // 👈 now the token is available in state.auth.token
  [authApi.reducerPath]: authApi.reducer,
  [promotersApi.reducerPath]: promotersApi.reducer,
  [membersApi.reducerPath]: membersApi.reducer,
  [savingAccounts.reducerPath]: savingAccounts.reducer,
  [shareHoldingApi.reducerPath]: shareHoldingApi.reducer,
  [branchesApi.reducerPath]: branchesApi.reducer,
  [agentsApi.reducerPath]: agentsApi.reducer,
  [employeesApi.reducerPath]: employeesApi.reducer,
  [cspsApi.reducerPath]: cspsApi.reducer,
  [ddAccountsApi.reducerPath]: ddAccountsApi.reducer,
});

export default rootReducer;

