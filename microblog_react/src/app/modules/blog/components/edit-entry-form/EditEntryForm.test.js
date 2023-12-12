import React from 'react';
import ReactDOM from 'react-dom';
import EditEntryForm from './EditEntryForm';

import { reduxForm } from 'redux-form';
import Blog from '../..';

it('renders without crashing', () => {
    const ef = reduxForm({
        form: 'EditEntryForm',
        getFormState: (state) => Blog.selectors.getForm(state),
        validate: {}
    })(EditEntryForm);

    const onSubmit = () => {
        console.log('TEST: submit form');
    };
    const div = document.createElement('div');
    ReactDOM.render(<ef onSubmit={onSubmit} />, div);
});
