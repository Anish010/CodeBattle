import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import submissionReducer from "./reducers/submissionReducer";
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
// import { legacy_createStore as createStore } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']

}

const combineReducer = combineReducers({
  user: userReducer,
  submissions: submissionReducer
});

const persistedReducer = persistReducer(persistConfig, combineReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export const persistedStore = persistStore(store);