import React from 'react';
import PropTypes from 'prop-types';

import debug from '../../../../../debug';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';

import { toastr } from 'react-redux-toastr';

import Blog from '../..';
import Login from '../../../auth/login';
import validate from './validate';

import _ from 'lodash';

let EditEntryFormContainer = (
    { loggedInUser, entry, saveEntry, editEntryFinished,
        location, ...rest }
     ) => {

    // Lot of logic follows, I don't really like it, but with the current state
    // of react router v4, clean routing setup would take way too long and I cannot
    // afford their video-course right now :(

    // Don't show the form if it is not wanted by the entry
    if (!entry.showForm) {
        return null;
    }
    // Redirect to login if not logged in
    if (_.isEmpty(loggedInUser)) {
        if (debug) console.log(location);
        return <Redirect to={{
            pathname: '/login',
            state: { referrer: location.pathname }
        }}/>;
    }
    if (entry.id) {
        // TODO: how to check for new form?
        // BUG: This shows on every page route after once there is an error
        if (entry.user && entry.user !== loggedInUser.id) {
            toastr.error('You can only edit your own entries');
            return null;
        }
        // enrich with user/author data
        entry.user = loggedInUser.id;
        entry.author = loggedInUser.name;
    }
    const EditEntryForm = Blog.components.EditEntryForm;
    
    return (
        <div>
            <EditEntryForm
                onSubmit={saveEntry}
                onReset={editEntryFinished}
                fillForm={entry}
                {...rest}
            />
        </div>
    );
};

EditEntryFormContainer.propTypes = {
    entry:              PropTypes.object,
    // injected by mapStateToProps/mapDispatchToProps:
    saveEntry:          PropTypes.func.isRequired,
    editEntryFinished:  PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Blog.actions, dispatch);
};

const mapStateToProps = (state) => {
    return {
        loggedInUser: Login.selectors.getLoggedInUser(state)
    };
};

// reduxForm consumes props.initialValue if provided
EditEntryFormContainer = reduxForm({
    form: 'EditEntryForm',
    getFormState: (state) => Blog.selectors.getEditEntryForm(state),
    validate
})(EditEntryFormContainer);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(EditEntryFormContainer));
