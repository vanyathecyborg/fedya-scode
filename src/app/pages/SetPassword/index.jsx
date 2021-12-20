import React from 'react';
import { Wrapper } from 'ofd-ui-toolkit';
import SetPassword from '../../containers/SetPassword';
import endpointsList from '../../api';

const SetPasswordPage = () => (
  <Wrapper style={{ position: 'relative' }}>
    <SetPassword
      title="Задайте пароль вашей учетной записи"
      usernameKey="UserName"
      passwordKey="PassWord"
      endpointsList={endpointsList}
    />
  </Wrapper>
);

export default SetPasswordPage;
