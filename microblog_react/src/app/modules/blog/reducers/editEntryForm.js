import { reducer as formReducer } from 'redux-form';

import * as t from '../actions/actionTypes';


export default formReducer.plugin({
    // 'EditEntryForm' is name of form given to reduxForm()
    EditEntryForm: (state, action) => {
        switch(action.type) {
        case t.ADD_ENTRY_SUCCESS:
            // blow away form data
            return undefined;
        case t.UNSET_CURRENT_ENTRY:
            // blow away form data
            return undefined;
        default:
            return state;
        }
    }
});