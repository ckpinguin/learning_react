import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';

import auth from '../modules/auth';
import blog from '../modules/blog';

// only top-level here, rest is in the reducers (also nested reducers!)
export default combineReducers({
    [blog.constants.NAME]: blog.reducer,
    [auth.constants.NAME]: auth.reducer,
    toastr: toastrReducer
});