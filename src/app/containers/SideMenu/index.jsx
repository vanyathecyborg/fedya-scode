import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Tooltip } from 'ofd-ui-toolkit';

import employeeIcon from '../../../assets/images/sideMenuIcons/employee.svg';
import clientsIcon from '../../../assets/images/sideMenuIcons/clients.svg';
import kktIcon from '../../../assets/images/sideMenuIcons/kkt.svg';
import fdocsIcon from '../../../assets/images/sideMenuIcons/fdocs.svg';
import toggleIcon from '../../../assets/images/sideMenuIcons/toggle.svg';
import vkrequestsIcon from '../../../assets/images/sideMenuIcons/vkrequests.svg';
import tplansIcon from '../../../assets/images/sideMenuIcons/tplans.svg';
import marketIcon from '../../../assets/images/sideMenuIcons/market.svg';
import lessorsIcon from '../../../assets/images/sideMenuIcons/lessors.svg';
import brokerIcon from '../../../assets/images/sideMenuIcons/broker.svg';
import dbIcon from '../../../assets/images/sideMenuIcons/db.svg';
import dbParamsIcon from '../../../assets/images/sideMenuIcons/dbParams.svg';


const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${(props) => (props.toggle ? '84px' : '350px')};
  background: ${(props) => props.theme.roseDust};
  z-index: 1;
  position: sticky;
  top: 0;
  height: 100vh;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.toggle ? '84px' : '350px')};
  background: ${(props) => props.theme.roseDust};
  align-items: flex-start;
  height: auto;
  max-height: calc(100% - 120px);

  & > *:first-child {
    margin-top: 30px;
  }
`;

const MenuBack = styled.div`
  height: 100vh;
  position: fixed;
  background: ${(props) => props.theme.roseDust};;
  width: ${(props) => (props.toggle ? '84px' : '350px')};
  z-index: -2;
  bottom: 0;
`;

const MenuItem = styled(NavLink).attrs((props) => ({
  black: props.theme.black,
  yellow: props.theme.yellow,
  toggle: props.toggle,
}))`
  display: flex;
  align-items: center;
  text-decoration: none;
  /* height: 54px; */
  height: 40px;
  max-height: 40px;
  min-height: 40px;
  width: ${(props) => props.isFolderItem ? 'calc(100% - 10px)' : '100%'};
  padding-left: ${(props) => (props.isFolderItem ? '10px' : '0')};
  color: ${(props) => props.black};
  justify-content: flex-start;

  &.active {
    background: ${(props) => props.yellow};
  }

  &:hover {
    background: ${(props) => props.yellow};
  }
`;

const Icon = styled.img`
  margin-left: 45px;
  margin-right: 15px;
  width: 24px;
`;

const ToggleButton = styled.img`
  position: sticky;
  bottom: 20px;
  margin-left: 30px;
  margin-bottom: 20px;
  width: 24px;
  cursor: pointer;
  z-index: 1;
`;

const FolderMenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 40px;
  max-height: 40px;
  min-height: 40px;
  /* height: 54px; */
  width: 100%;
  color: ${(props) => props.theme.black};
  justify-content: flex-start;

  &.active {
    background: ${(props) => props.theme.yellow};
  }

  &:hover {
    background: ${(props) => props.theme.yellow};
  }
`;

const FolderContent = styled.div`
  display: ${(props) => (props.folderToggle ? 'flex' : 'none')};
  align-items: center;
  text-decoration: none;
  height: ${(props) => (props.folderToggle ? 'auto' : '0')};
  width: 100%;
  color: ${(props) => props.theme.black};
  justify-content: flex-start;
  flex-direction: column;
`;

// sysadmin - суперпользователь
// TechnicalSupport - тех специалист
// KktSupport - поддержка ККТ
// LessorSupport - поддержка арендодателей

// пока не используется:
// PartnerSupport - поддержка партнеров

export const ROLE_SYSADMIN = 'sysadmin';
export const ROLE_TECHNICAL_SUPPORT = 'TechnicalSupport'.toLowerCase();
export const ROLE_KKT_SUPPORT = 'KktSupport'.toLowerCase();
export const ROLE_LESSOR_SUPPORT = 'LessorSupport'.toLowerCase();
export const ROLE_OFD_MANAGER = 'OfdManager'.toLowerCase();
// const ROLE_PARTNER_SUPPORT = 'PartnerSupport';

const KKT_LIST_ROUTE = '/kkt';
const DOCS_LIST_ROUTE = '/fdocs';

const routes = [
  {
    text: 'Сотрудники',
    route: '/users',
    icon: employeeIcon,
    roles: [ROLE_SYSADMIN],
  },
  {
    text: 'Клиенты',
    route: '/clients',
    icon: clientsIcon,
    roles: [ ROLE_SYSADMIN, ROLE_KKT_SUPPORT, ROLE_OFD_MANAGER ],
  },
  {
    text: 'Кассы',
    route: KKT_LIST_ROUTE,
    icon: kktIcon,
    roles: [ ROLE_SYSADMIN, ROLE_KKT_SUPPORT, ROLE_LESSOR_SUPPORT, ROLE_OFD_MANAGER ],
  },
  {
    text: 'Фискальные документы',
    route: DOCS_LIST_ROUTE,
    icon: fdocsIcon,
    roles: [ ROLE_SYSADMIN, ROLE_KKT_SUPPORT, ROLE_OFD_MANAGER ],
  },
  {
    text: 'Запросы к ИШ',
    route: '/vkrequests',
    icon: vkrequestsIcon,
    roles: [ ROLE_SYSADMIN, ROLE_TECHNICAL_SUPPORT ],
  },
  {
    text: 'Тарифные планы',
    route: '/tplan',
    icon: tplansIcon,
    roles: [ ROLE_SYSADMIN, ROLE_KKT_SUPPORT ],
  },
  {
    text: 'Маркет коды',
    route: '/marketcode',
    icon: marketIcon,
    roles: [ ROLE_SYSADMIN, ROLE_KKT_SUPPORT ],
  },
  {
    text: 'Арендодатели',
    route: '/lessors',
    icon: lessorsIcon,
    roles: [ ROLE_SYSADMIN, ROLE_LESSOR_SUPPORT ],
  },
  {
    text: 'Кассы арендодателя',
    route: '/lessorKktList',
    icon: lessorsIcon,
    roles: [ ROLE_SYSADMIN, ROLE_LESSOR_SUPPORT ],
    showOnlyWhenActive: true,
    nonStrict: true,
  },
  {
    text: 'ОПФ',
    route: '/opf',
    icon: marketIcon,
    roles: [ ROLE_SYSADMIN, ROLE_KKT_SUPPORT ],
  },
  {
    text: 'Базы данных',
    route: '/database',
    icon: dbIcon,
    roles: [ ROLE_SYSADMIN, ROLE_KKT_SUPPORT, ROLE_LESSOR_SUPPORT, ROLE_OFD_MANAGER ],
  },
  {
    text: 'Параметры БД',
    route: '/dbsConfigList',
    icon: dbParamsIcon,
    roles: [ ROLE_SYSADMIN, ROLE_KKT_SUPPORT, ROLE_LESSOR_SUPPORT, ROLE_OFD_MANAGER ],
  },
  {
    text: 'Брокеры ККТ',
    route: '/kktBrokers',
    icon: brokerIcon,
    roles: [ ROLE_SYSADMIN, ROLE_KKT_SUPPORT, ROLE_LESSOR_SUPPORT, ROLE_OFD_MANAGER ],
  },
];

export const SideMenu = ({ location: { pathname }, toggle, setToggle }) => {
  // const [ toggledFolder, setToggledFolder ] = useState([]);
  const isAuth = localStorage.getItem('token');
  const role = localStorage.getItem('role') || '';


  

  const isLinkActive = (url, nonStrict = false) => {
    if (nonStrict) {
      return pathname.includes(url) ? 'active' : '';
    }
    return (pathname === url ? 'active' : '');
  };

  const isFolderActive = (folderRoutes) => folderRoutes.includes(pathname) ? 'active' : '';

  
  const renderMenuItem = ({ route, icon, text, showOnlyWhenActive, nonStrict, isFolderItem }) => {
    return (
      <Tooltip
        text={text}
        isActive={toggle}
        arrowPosition="left"
        textStyle={{ left: '92px', bottom: '12px' }}
        wrapperStyle={{ width: '100%' }}
        childrenWrapperStyle={{ width: '100%' }}
      >
        <MenuItem
          key={route}
          to={showOnlyWhenActive ? '#' : route}
          toggle={toggle}
          className={isLinkActive(route, nonStrict)}
          isFolderItem={isFolderItem}
          onClick={() => removeFiltersOnRouteChange(route)}
        >
          <Icon src={icon} toggle={toggle} isFolderItem={isFolderItem} />
          {!toggle && text}
        </MenuItem>
      </Tooltip>
    )
  }


  if (isAuth) {
    return (
      <>
        <MenuBack toggle={toggle} />
        <MenuWrapper toggle={toggle}>
          <Menu toggle={toggle}>
            {
              routes.map(({ route, icon, text, showOnlyWhenActive, nonStrict, roles = [], isFolder, folderItems, folderRoutes, name }) => {
                if (!roles.includes(role.toLowerCase())) { return null };
                if (showOnlyWhenActive && !isLinkActive(route, nonStrict)) { return null };
                // if (isFolder) {
                //   const isFolderToggled = toggledFolder.includes(name);
                //   return (
                //     <>
                //       <FolderMenuItem
                //         toggle={toggle}
                //         folderToggle={isFolderToggled}
                //         className={isFolderActive(folderRoutes)}
                //         onClick={isFolderToggled
                //           ? () => setToggledFolder([ ...toggledFolder.filter((el) => el !== name) ])
                //           : () => setToggledFolder([ ...toggledFolder, name ])}
                //       >
                //         <Icon src={icon} toggle={toggle} />
                //         {!toggle && text}
                //       </FolderMenuItem>
                //       <FolderContent toggle={toggle} folderToggle={isFolderToggled}>
                //         {
                //           folderItems.map((folderItem) => (
                //             renderMenuItem({
                //               route: folderItem.route,
                //               icon: folderItem.icon,
                //               text: folderItem.text,
                //               showOnlyWhenActive: folderItem.showOnlyWhenActive,
                //               nonStrict: folderItem.nonStrict,
                //               isFolderItem: true,
                //             })
                //           ))
                //         }
                //       </FolderContent>
                //     </>
                //   );
                // }
                return (
                  renderMenuItem({ route, icon, text, showOnlyWhenActive, nonStrict })
                );
              })
            }
          </Menu>
          <ToggleButton onClick={setToggle} src={toggleIcon} />
        </MenuWrapper>
      </>
    );
  }

  return null;
};

SideMenu.propTypes = {
  toggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  })
};

SideMenu.defaultProps = {
  location: {},
};

export default withRouter(SideMenu);
