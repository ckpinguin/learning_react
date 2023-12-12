import * as t from '../actions/actionTypes';

import debug from '../../../../../debug';


const loggedInUser = (state = {}, action) => {
    switch (action.type) {
    case t.SET_LOGGED_IN_USER:
        if (debug) console.log(`reducer ${action.type} called`);
        return action.payload;
    case t.UNSET_LOGGED_IN_USER:
        if (debug) console.log(`reducer ${action.type} called`);
        return {};
    default:
        return state;
    }
};
export default loggedInUser;