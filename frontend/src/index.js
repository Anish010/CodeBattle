import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
// import { legacy_createStore as createStore } from 'redux';
// import { configureStore } from "@reduxjs/toolkit";
import store from './store';
import {persistedStore} from './store'
import { PersistGate } from 'redux-persist/integration/react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistedStore}>
            <App />
        </PersistGate>
        
    </Provider>
);