// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./rootReducer";
// import { authApi } from "../features/api/authApi";
// import { promotersApi } from "../features/api/promotersApi";
// import { shareHoldingApi } from "../features/api/shareHoldingApi";
// import { savingAccounts } from "../features/api/savingAccounts";
// import { branchesApi } from "../features/api/branchesApi";
// import { membersApi } from "../features/api/membersApi";

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(
//       authApi.middleware,
//       promotersApi.middleware,
//       membersApi.middleware,
//       shareHoldingApi.middleware,
//       savingAccounts.middleware,
//       branchesApi.middleware,
//     ),
// });

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
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
import { ddAccountsApi } from "../features/api/ddAccountsApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      promotersApi.middleware,
      membersApi.middleware,
      shareHoldingApi.middleware,
      savingAccounts.middleware,
      branchesApi.middleware,
      agentsApi.middleware,
      employeesApi.middleware,
      cspsApi.middleware,
      ddAccountsApi.middleware,
    ),
});
