import * as t from './actionTypes';

import debug from '../../../../../debug';

import { toastr } from 'react-redux-toastr';

import userModule from '../../user';

import md5 from 'md5';


// Action creators

const login = () => ({
    type: t.LOGIN
});
const loginSuccess = (user) => {
    return {
        type: t.LOGIN_SUCCESS,
        payload: user
    };
};
const loginFailed = (error) => ({
    type: t.LOGIN_FAILED,
    payload: error
});
const loginCancelled = () => ({
    type: t.LOGIN_CANCELLED
});

const logout = () => ({
    type: t.LOGOUT
});
const logoutSuccess = () => ({
    type: t.LOGOUT_SUCCESS
});
const logoutFailed = () => ({
    type: t.LOGOUT_FAILED
});


const setLoggedInUser = (id) => {
    return {
        type: t.SET_LOGGED_IN_USER,
        payload: id
    };
};
const unsetLoggedInUser = () => ({
    type: t.UNSET_LOGGED_IN_USER
});


// Thunk action creators (public API)

export const doLogin = (history, user) => {
    return (dispatch, getState) => {
        if (user.name) {
            dispatch(login(user));
            
            // do async stuff
            const storedUser = userModule.selectors.findUserByName(getState(), user.name);
            if (debug) console.log('user found: ', storedUser);
            if (storedUser.password === md5(user.password)) {
                if (debug) console.log('login success');
                dispatch(loginSuccess(user));
                toastr.success(`Welcome, ${user.name}`, 'You have logged in successfully.');
                dispatch(setLoggedInUser({id: storedUser.id, name: storedUser.name}));
                // dispatch(goBack('home'));
                history.push('/home');
            } else {
                toastr.error('Login failed.');
                dispatch(loginFailed(user));
            }
        }
    };
};

// History for navigation has to be provided (actions.js is not a component that is wrapped )
export const cancelLogin = (history) => {
    return (dispatch, getState) => {
        if (debug) console.log('login cancelled');
        dispatch(loginCancelled());
        history.push('/home');
    };
};

export const doLogout = () => {
    return (dispatch) => {
        dispatch(logout());
        dispatch(logoutSuccess());
        toastr.success('Goodbye', 'You have logged out.');
        dispatch(unsetLoggedInUser());
    };
};