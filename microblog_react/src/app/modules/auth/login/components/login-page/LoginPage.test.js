import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../../../../../store/configureStore';
import { createBrowserHistory as createHistory } from 'history';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const history = createHistory();
    const store = configureStore({}, history);   
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <LoginPage />
            </Router>
        </Provider>, div);
});
