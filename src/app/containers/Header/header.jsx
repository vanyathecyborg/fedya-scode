import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import HeaderMenuItem from './components/HeaderMenuItem';

const Wrapper = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 60px;
  padding-top: 10px;
  padding-bottom: 10px;
  background: black;
  position: relative;
`;

const Logo = styled.img`
  height: 38px;
  margin: auto;
  margin-left: 45px;
  /* margin-left: 30px; */
`;

// const WelcomeText = styled.span`
//   position: absolute;
//   font-size: 27px;
//   color: ${(props) => props.theme.white};
//   top: 50%;
//   left: 385px;
//   transform: translateY(-50%);
// `;

const Menu = styled.div`
  color: ${(props) => props.theme.white};
  margin: auto;
  margin-right: 36px;
`;

const Header = () => {
  const isAuth = localStorage.getItem('token');

  const history = useHistory();
  return (
    <Wrapper>
      <Logo src="/assets/images/new-header-white-font.png" />
      {isAuth && (
        <Menu>
          <HeaderMenuItem
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('role');
              history.push('/login');
            }}
            text="Выйти"
          />
        </Menu>
      )}
    </Wrapper>
  );
}

export default Header;
