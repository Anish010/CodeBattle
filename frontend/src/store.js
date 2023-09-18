import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
// import { legacy_createStore as createStore } from 'redux';

const combineReducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: combineReducer,
});

export default store;