import React from 'react';
import ReactDOM from 'react-dom';
import LoginFormContainer from './LoginFormContainer';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../../../../../store/configureStore';
import { createBrowserHistory as createHistory } from 'history';

it('renders without crashing', () => {
    const history = createHistory();
    const store = configureStore({}, history);  
    const newEntry = {
        id: undefined,
        title: '',
        text: '',
        image: ''
    };
    const onSubmit = () => {
        console.log('TEST: submit form');
    };
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <LoginFormContainer newEntry={newEntry} onSubmit={onSubmit} />
            </Router>
        </Provider>, div);
});
