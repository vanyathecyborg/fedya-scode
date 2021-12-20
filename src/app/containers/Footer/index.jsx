import React from 'react';
import styled from 'styled-components';

const links = [
  { title: 'Публичная оферта', url: 'https://static.beeline.ru/upload/dpcupload/contents/288/MobileServicesB2B/2019-08-06_Oferta-fisk.pdf' },
  { title: 'Билайн ОФД', url: '' },
];

const Wrapper = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 150px;
  background: ${(props) => props.theme.dark};
  position: relative;
  padding-top: 25px;
  
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  min-width: calc(100% - 500px);
  margin-right: 120px;
  max-width: 1000px;
  margin: 0 auto;
  & > div {
    height: 110px;
  }
`;

const ContactsBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  & > span {
    color: ${(props) => props.theme.white};
    font-size: 21px;
  }

  & > a {
    color: ${(props) => props.theme.white};
    font-size: 17px;
    text-decoration: none;
  }
`;

const LinksBlock = styled.ul`
  margin: 0;
  padding: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 110px;
  justify-content: space-between;
`;

const ExternalLink = styled.li`
  cursor: pointer;
  list-style: none;
  text-decoration: none;
  margin-bottom: 2px;

  & a {
    color: ${(props) => props.theme.white};
    font-size: 13px;
    text-decoration: none;
    padding: 2px 0;
    border-bottom: solid 2px ${(props) => props.theme.white};

    &:hover {
      color: ${(props) => props.theme.lightOrange};
      border-bottom: solid 2px ${(props) => props.theme.lightOrange};
    }
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <ContactsBlock>
          <span>
            8 800 700 88 00
            <br />
            vassuport@beeline.ru
          </span>
          <a href="https://www.beeline.ru">www.beeline.ru</a>
        </ContactsBlock>
        <LinksBlock>
          {
            links.map((link) => (
              <ExternalLink>
                <a href={link.url}>{link.title}</a>
              </ExternalLink>
            ))
          }
        </LinksBlock>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Footer;
