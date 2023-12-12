import { reducer as formReducer } from 'redux-form';

import * as t from '../actions/actionTypes';

export default formReducer.plugin({
    // 'LoginForm' is name of form given to reduxForm()
    LoginForm: (state, action) => {
        switch(action.type) {
        case t.LOGIN_SUCCESS:
            // blow away form data
            return {};
        case t.LOGIN_FAILED:
            return {};
        case t.LOGIN_CANCELLED:
            return {};
        default:
            return state;
        }
    }
});