import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from './header';

const HeaderContainer = (props) => (
  <Header {...props} />
);

export default HeaderContainer;
