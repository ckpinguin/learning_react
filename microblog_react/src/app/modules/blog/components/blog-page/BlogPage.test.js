import React from 'react';
import ReactDOM from 'react-dom';
import BlogPage from './BlogPage';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../../../../store/configureStore';
import { createBrowserHistory as createHistory } from 'history';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const history = createHistory();
    const store = configureStore({}, history);   
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <BlogPage />
            </Router>
        </Provider>, div);
});
