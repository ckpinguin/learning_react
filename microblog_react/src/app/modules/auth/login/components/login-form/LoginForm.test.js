import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './LoginForm';

import { reduxForm } from 'redux-form';
import Login from '../..';


it('renders without crashing', () => {
    const lf = reduxForm({
        form: 'LoginForm',
        getFormState: (state) => Login.selectors.getForm(state),
        validate: {}
    })(LoginForm);
    const onSubmit = () => {
        console.log('TEST: submit form');
    };
    const div = document.createElement('div');
    ReactDOM.render(<lf onSubmit={onSubmit} />, div);
});
