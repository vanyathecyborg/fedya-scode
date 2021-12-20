import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Button, InputWrapper, Loading } from 'ofd-ui-toolkit';
import useAPI from 'useAPI';
import {ROLE_TECHNICAL_SUPPORT} from "../SideMenu"; 

const Wrapper = styled.div`
  margin-top: 104px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Heading = styled.span`
  font-size: ${({ small }) => (small ? '21px' : '30px')};
  line-height: 1.3;
  font-weight: normal;
  margin-bottom: 50px;
`;

const Label = styled.span`
  position: absolute;
  left: -100px;
  top: 10px;
  font-size: 17px;
  line-height: 1.47;
  color: ${(props) => props.color || props.theme.gray};
  text-align: left;
  width: 123px;
`;

const RestorePasswordLink = styled.span`
  font-size: 15px;
  color: #28282d;
  line-height: 1.4;
  border-bottom: dotted 1px;
  margin-top: 25px;
  margin-bottom: 68px;
  cursor: pointer;
`;

const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  //height: 206px;
  background-color: #f5f5f5;
  padding-top: 40px;
  padding-bottom: 50px;
`;

const Login = ({ title, usernameKey = 'email', passwordKey = 'password', endpointsList }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const history = useHistory();

  const {
    data,
    fetch,
    loading,
  } = useAPI(null, false);

  const submitForm = () => {
    fetch(endpointsList.login({
      [usernameKey]: email,
      [passwordKey]: password,
    }));
  };

  useEffect(() => {
    // eslint-disable-next-line camelcase
    if (data?.access_token) {
      localStorage.setItem('token', data.access_token);
      if (data?.role) {
        localStorage.setItem('role', data?.role?.toLowerCase());
        if (data?.role.toLowerCase() === ROLE_TECHNICAL_SUPPORT) {
          return history.push('/vkrequests');
        }
      }
      return history.push('/kkt');
    }
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('role').toLowerCase() === ROLE_TECHNICAL_SUPPORT) {
        return history.push('/vkrequests');
      }
      return history.push('/kkt');
    }
  }, []);

  return (
    <Wrapper>
      <Loading loadingList={[loading]} withWrapper actualHeight="calc(100% + 66px)">
        <Heading>{title}</Heading>
        <InputWrapper noMarginRight alignItems="center">
          <Label>Email</Label>
          <Input
            onChange={({ target: { value } }) => setEmail(value)}
            noMarginRight
            small
          />
        </InputWrapper>
        <InputWrapper noMarginRight alignItems="center">
          <Label>Пароль</Label>
          <Input
            type="password"
            onChange={({ target: { value } }) => setPassword(value)}
            noMarginRight
            small
          />
        </InputWrapper>
        <Button onClick={submitForm} large>
            Войти
        </Button>
      </Loading>
    </Wrapper>
  );
};

export default Login;
