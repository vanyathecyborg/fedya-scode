import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Login from '../../app/pages/Login';
import SetPasswordPage from '../../app/pages/SetPassword';
// import SetPasswordPage from '../../app/pages/SetPassword';
import AccessDeniedPage from "../../app/pages/403";


export const routes = [
  {
    path: '/',
    component: Login,
    exact: true,
  },
  {
    path: '/login',
    component: Login,
  }, 
  {
    path: '/setPassword',
    component: SetPasswordPage,
  },
  {
    path: '/403',
    component: AccessDeniedPage,
    exact: true,
  },
];

export const ConfiguredRouter = () => (
  <Switch>
    {routes.map((route) => (
      <Route
        key={route.path}
        path={route.path}
        component={route.component}
        exact={route?.exact}
      />
    ))}
  </Switch>
);

export default ConfiguredRouter;
