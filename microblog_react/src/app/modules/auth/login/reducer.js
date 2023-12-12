import loggedInUser from './reducers/loggedInUser';
import loginForm from './reducers/loginForm';
import loginProcess from './reducers/loginProcess';

const login = (state = {}, action) => {
    return {
        // giving also full state access to be make
        // decisions upon other parts of the state-tree possible
        loggedInUser: loggedInUser(state.loggedInUser, action),
        loginForm: loginForm(state.loginForm, action),
        loginProcess: loginProcess(state.process, action)
    };
};
export default login;
