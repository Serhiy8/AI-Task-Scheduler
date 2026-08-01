import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import storage from 'redux-persist/es/storage';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import tasksSlice from "./slice/tasksSlice";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "isLoggedIn"],
};

const persistedAuthSlice = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    auth: persistedAuthSlice,
    tasks: tasksSlice,
    
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
