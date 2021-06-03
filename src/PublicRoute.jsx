/* eslint react/prop-types: 0, react/jsx-props-no-spreading: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      (props) => (window.localStorage.getItem('accessToken')
        ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
        : (<Component {...props} />))
    }
  />
);

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PublicRoute;
