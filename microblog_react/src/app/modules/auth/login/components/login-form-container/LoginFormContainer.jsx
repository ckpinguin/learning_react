import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';


import Login from '../..';
import validate from './validate';

let LoginFormContainer = ({ doLogin, cancelLogin, loggedInUser, history, ...rest }) => {
    const LoginForm = Login.components.LoginForm;
    return (
        (loggedInUser.id !== undefined)
            ?  <div>
                  <p>Already logged in with user
                    {loggedInUser.name}
                  </p>
              </div>
            :
                <div>
                    <LoginForm
                        // actions do not have access to history directly, so we need to
                        // provide them explicitly (TODO: find something nicer to solve this)
                        // tried: withRouter in actions => fail / bind this here and access props in function => fail
                        // currying, as we need more args later
                        onSubmit={doLogin.bind(null, history)}
                        onCancel={cancelLogin.bind(null, history)} 
                        {...rest}
                    />
                </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loggedInUser: Login.selectors.getLoggedInUser(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Login.actions, dispatch);
};

LoginFormContainer = reduxForm({
    form: 'LoginForm',
    getFormState: (state) => Login.selectors.getForm(state),
    validate
})(LoginFormContainer);

export default withRouter(connect(
     mapStateToProps,
     mapDispatchToProps,
)(LoginFormContainer));
