import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import "bootstrap/dist/css/bootstrap.min.css"
import userReducer from "./reducers/userReducer";
import quizReducer from "./reducers/quizReducer";
import responseReducer from "./reducers/responseReducer";
import gradeAssignmentReducer from './reducers/gradeAssignmentReducer'
import {Provider} from "react-redux";
import {Container} from "react-bootstrap";

const handleAsync = storeAPI => next => action => {
    if (typeof action === 'function')
        return action(storeAPI.dispatch, storeAPI.getState)

    next(action)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose()

const store = createStore(
    combineReducers({userReducer, quizReducer, responseReducer, gradeAssignmentReducer: gradeAssignmentReducer}),
    composeEnhancers(applyMiddleware(handleAsync)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Container>
                <App/>
            </Container>
        </Provider>
    </React.StrictMode>
);