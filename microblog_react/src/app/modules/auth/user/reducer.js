import userList from './reducers/userList';

const user = (state = {}, action) => {
    return {
        // giving also full state access to be make
        // decisions upon other parts of the state-tree possible
        userList: userList(state.entries, action, state)
    };
};
export default user;



