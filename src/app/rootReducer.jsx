

import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/api/authSlice"; 
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
import { fdAccounts } from "../features/api/fdAccounts";
import { rdAccounts } from "../features/api/rdAccounts";

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [promotersApi.reducerPath]: promotersApi.reducer,
  [membersApi.reducerPath]: membersApi.reducer,
  [savingAccounts.reducerPath]: savingAccounts.reducer,
  [shareHoldingApi.reducerPath]: shareHoldingApi.reducer,
  [branchesApi.reducerPath]: branchesApi.reducer,
  [agentsApi.reducerPath]: agentsApi.reducer,
  [employeesApi.reducerPath]: employeesApi.reducer,
  [cspsApi.reducerPath]: cspsApi.reducer,
  [fdAccounts.reducerPath]: fdAccounts.reducer,
  [rdAccounts.reducerPath]: rdAccounts.reducer,
});

export default rootReducer;
