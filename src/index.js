/* eslint-disable */

import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';
import { Provider as AlertProvider } from 'react-alert';
import { Provider as ReduxProvider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

import 'App.css';

import { store, history } from 'Redux/store';
import Client from 'Client';
import Theme from 'Styles/Theme';
import App from 'Containers/App';
import { AlertTemplate, AlertOptions } from 'Components/Alerts';

const Jeffflix = () => (
    <ReduxProvider store={store}>
        <ConnectedRouter history={history}>
            <ApolloProvider client={Client}>
                <ThemeProvider theme={Theme}>
                    <AlertProvider template={AlertTemplate} {...AlertOptions}>
                        <App />
                    </AlertProvider>
                </ThemeProvider>
            </ApolloProvider>
        </ConnectedRouter>
    </ReduxProvider>
);

render(<Jeffflix />, document.getElementById('jeffflix'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
