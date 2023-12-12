import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Router>
            <PrivateRoute
            isAuthorized={false}
            component={() => <h1>Private area</h1>}
            />
        </Router>, div);
});
