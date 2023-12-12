import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import Shared from '../modules/shared';
import Blog from '../modules/blog';
import Login from '../modules/auth/login';

// Best practice (Medium: redux-best-practices-64d59775802e): Only
// use smart components (aka containers) as Route targets
const Routes = ({ isAuthenticated, ...rest }) => {
    // The components used in such routes, get the `match` property
    const Layout = Shared.components.Layout;
    const PrivateRoute = Shared.components.PrivateRoute;
    return (
    <Layout>
        <Switch>
            <Route
                exact path="/"
                component={Blog.components.BlogPage}
            />
            <Route
                path="/home"
                component={Blog.components.BlogPage}
            />
            <Route
                path="/blog/"
                component={Blog.components.BlogPage}
            />
            <Route
                path="/login/"
                component={Login.components.LoginPage}
            />
            <PrivateRoute
                isAuthorized={isAuthenticated}
                path="/admin"
                component={() => <h1>Private area</h1>}
            />
            <Route
                path="*"
                component={() => <h1>Like a 404: unknown page</h1>}
            />
        </Switch>
    </Layout>
    );
};

Routes.propTypes = {
    // injected by mapStateToProps/mapDispatchToProps:
    loggedInUser:       PropTypes.object,
    isAuthenticated:    PropTypes.bool.isRequired,
};


const mapStateToProps = (state) => {
    return {
        // loggedInUser: Login.selectors.getLoggedInUser(state),
        isAuthenticated: Login.selectors.isAuthenticated(state)
    };
};

// withRouter is needed to update page according to URL
export default withRouter(connect(
     mapStateToProps,
     // mapDispatchToProps,
     null
)(Routes));