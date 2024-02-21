import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { firestoreApi } from "./features/firestore/firestoreAPI";
import firestoreSlice from "./features/firestore/firestoreSlice";
import { authApi } from "./features/auth/authAPI";

export const store = () => {
  return configureStore({
    reducer: {
      firestore: firestoreSlice,
      [firestoreApi.reducerPath]: firestoreApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        firestoreApi.middleware,
        authApi.middleware
      ),
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
