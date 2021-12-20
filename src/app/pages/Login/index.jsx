import React from 'react';
import { Wrapper } from 'ofd-ui-toolkit';
import Login from '../../containers/Login';
import endpointsList from '../../api';

const LoginPage = () => (
  <Wrapper style={{ position: 'relative' }}>
    <Login
      title="Вход в личный кабинет Администратора"
      usernameKey="UserName"
      passwordKey="PassWord"
      endpointsList={endpointsList}
    />
  </Wrapper>
);

export default LoginPage;
