import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";

const handleAsync = storeAPI => next => action => {
    if (typeof action === 'function')
        return action(storeAPI.dispatch, storeAPI.getState)

    next(action)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose()

const store = createStore(
    combineReducers({}),
    composeEnhancers(applyMiddleware(handleAsync)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);