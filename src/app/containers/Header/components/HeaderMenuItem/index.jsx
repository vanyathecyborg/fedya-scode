import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MenuItem = styled.span`
  color: ${(props) => props.theme.white};
  height: 25px;
  font-size: 21px;
  margin-left: 30px;
  cursor: pointer;
`;

const HeaderMenuItem = (props) => {
  const { text, onClick } = props;

  return (
    <MenuItem onClick={onClick}>
      {text}
    </MenuItem>
  );
};

HeaderMenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

HeaderMenuItem.defaultProps = {
  onClick: () => {},
};

export default HeaderMenuItem;
