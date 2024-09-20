import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import persistStore from "redux-persist/es/persistStore";


import sortingReducer from './sortingSlice.jsx';

const rootReducer = combineReducers({
    sorting: sortingReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["sorting"],
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
