import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import { routerMiddleware } from 'react-router-redux';

import rootReducer from './rootReducer';
import * as myMiddleware from './middleware.js';

const configureStore = (initialState = {}, history ) => {
    const middlewares = [
        promise(),
        thunk,
        routerMiddleware(history),
        myMiddleware.logger,
        myMiddleware.error
    ];

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middlewares)
    );
    return store;
};
export default configureStore;