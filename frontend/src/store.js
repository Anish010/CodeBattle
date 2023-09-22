import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import submissionReducer from "./reducers/submissionReducer";
// import { legacy_createStore as createStore } from 'redux';

const combineReducer = combineReducers({
  user: userReducer,
  submissions: submissionReducer
});

const store = configureStore({
  reducer: combineReducer,
});

export default store;