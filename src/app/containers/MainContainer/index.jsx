import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import ConfiguredRouter from '../../../lib/router';
import Header from '../Header';
import Footer from '../Footer';
import SideMenu from '../SideMenu';

const MainWrapper = styled.main`
  display: flex;
  flex-direction: row;
  height: 100%;
  position: relative;
`;

const PageWrapper = styled.div`
  display: block;
  padding-left: ${({ fullWidth }) => (fullWidth ? '0' : '36px')};
  padding-right: ${({ fullWidth }) => (fullWidth ? '0' : '36px')};
  min-height: calc(100vh - 70px);
  width: ${(props) => (props.fullWidth
  ? '100%'
  : (props.toggle
    ? 'calc(100% - 156px)'
    : 'calc(100% - 422px)'))};
  background: ${({ theme }) => theme.white};
`;

export const Main = () => {
  const isAuth = localStorage.getItem('token');
  const [ fullWidth, setFullWidth ] = useState(!isAuth);
  const { pathname } = useLocation();

  const LC_MENU_KEY = 'isMenuClosed';
  const lcValue = localStorage.getItem(LC_MENU_KEY) === 'true';
  const [ toggle, setToggle ] = useState(lcValue);

  useEffect(() => {
    localStorage.setItem(LC_MENU_KEY, toggle);
  }, [toggle]);

  useEffect(() => {
    setFullWidth(!isAuth);
  }, [pathname]);

  const is403 = pathname === '/403';

  return (
    <>
      <Header />
      <MainWrapper>
        {!is403 && (
          <SideMenu
            toggle={toggle}
            setToggle={() => {
              setToggle(!toggle);
            }}
          />
        )}
        <PageWrapper toggle={toggle} fullWidth={is403 || fullWidth}>
          <ConfiguredRouter />
        </PageWrapper>
      </MainWrapper>
      <Footer/>
    </>
  );
};

export default Main;
