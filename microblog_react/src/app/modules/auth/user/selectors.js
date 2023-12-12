import _ from 'lodash';
import { NAME } from './constants';

const getAll = state => state.auth[NAME];

export const getAllUsers = state => getAll(state).userList.users;
export const findUserById = (state, id) => getAll(state).userList.users.filter(e => {
    return e.id === id;
});
// Giving lodash a try instead of filtering :-) no idea if it's slower now...
export const findUserByName = (state, name) => _.find(getAll(state).userList.users, {name: name});
// getAll(state).userList.users.filter(e => {
//    return e.name === name;
// });

