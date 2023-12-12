import { NAME } from './constants';
import _ from 'lodash';
// We have to postfix auth state structure for nested levels
// I have to test, if this is not anymore necessary, when auth itself
// has direct elements/reducers.
const getAll = state => state.auth[NAME];

export const getForm = state => getAll(state).loginForm;
export const getLoggedInUser = state => getAll(state).loggedInUser;
export const isAuthenticated = state => !_.isEmpty(getAll(state).loggedInUser);
