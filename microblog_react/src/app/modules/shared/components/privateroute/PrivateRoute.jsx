import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({component: Component, isAuthorized, ...rest}) => (
    <Route {...rest} render={props => (
      (isAuthorized)
      ? (
          <Component {...props}/>
      )
      : (
          <Redirect
            to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
      )
    )}/>
);

PrivateRoute.propTypes = {
    component:          PropTypes.func.isRequired,
    isAuthorized:       PropTypes.bool.isRequired,
};

export default PrivateRoute;