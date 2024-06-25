import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartSlice from "./features/CartSlice";
import LoginSlice from "./features/LoginSlice";
import globalSlice from "./features/globalSlice";
import { apiSlice } from "./services/apiSlice";
import networkSlice from "./features/networkSlice";

const persistConfig = {
  key: "cart",
  storage,
};

const persistedCart = persistReducer(persistConfig, cartSlice);

export const store = configureStore({
  reducer: {
    network: networkSlice,
    cart: persistedCart,
    login: LoginSlice,
    global: globalSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["cart._persist"],
      },
    }).concat(apiSlice.middleware),
});
export const persister = persistStore(store);
