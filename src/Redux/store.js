import { applyMiddleware, compose, createStore } from 'redux';
import { createHashHistory } from 'history';
import { responsiveStoreEnhancer } from 'redux-responsive';
import { routerMiddleware } from 'connected-react-router';
import rootReducer from './Reducers';

/* eslint-disable */
const composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
    compose;

export const history = createHashHistory();

export const store = createStore(
    rootReducer(history),
    composeEnhancers(
        compose(
            responsiveStoreEnhancer,
            applyMiddleware(routerMiddleware(history)),
        ),
    ),
);
