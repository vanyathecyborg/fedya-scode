import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';


const Wrapper = styled.div`
  margin-bottom: 60px;
`;

const ErrorCode = styled.div`
  font-size: 15.625rem;
  color: white;
  text-align: center;
  text-shadow: 3px 11px 21px rgba(246, 160, 0, 0.3);
  padding-top: 80px;
  margin-bottom: 25px;
`;

const Description = styled.span`
  display: block;
  font-family: $subfont;
  text-align: center;
  font-size: 1rem;
  color: ${(props) => props.theme.gray};
`;

const Link = styled.span`
  cursor: pointer;
  padding: 0 4px;
  border-bottom: 1px dashed ${(props) => props.theme.gray};
`;

const Heading = styled.h1`
  text-align: center;
`;

const AccessDenied = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <ErrorCode>403</ErrorCode>
      <Heading>Доступ запрещен</Heading>
      <Description>
        Вы можете вернуться
        <Link onClick={history.goBack}>
          назад
        </Link>
        или перейти на
        <Link onClick={() => history.push('/')}>
          главную страницу
        </Link>
        сайта.
      </Description>
    </Wrapper>
  )
}

export default AccessDenied;
