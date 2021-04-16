import React from 'react';
import {bool, func, string} from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {AppRoute} from '../../const.js';


const PrivateRoute = (props) => {
  const {
    exact,
    isAuthorized,
    path,
    render,
  } = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) =>
        isAuthorized
          ? render(routeProps)
          : <Redirect push to={AppRoute.SIGN_IN}/>
      }
    />
  );
};

PrivateRoute.propTypes = {
  exact: bool.isRequired,
  isAuthorized: bool.isRequired,
  path: string.isRequired,
  render: func.isRequired,
};

export default PrivateRoute;
