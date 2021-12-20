import { createGlobalStyle } from 'styled-components';

import BeelineHandRegular from 'assets/fonts/Beeline_Hand-Regular.woff';
import BeelineSansRegular from 'assets/fonts/Beeline_Sans-Regular.woff';
import BeelineSansBold from 'assets/fonts/Beeline_Sans-Bold.woff';
import BeelineSansMedium from 'assets/fonts/Beeline_Sans-Medium.woff';
import BeelineSansBlack from 'assets/fonts/Beeline_Sans-Black.woff';

export const theme = {
  black: '#000',
  white: '#fff',
  dark: '#282828',
  roseDust: '#eeeae5',
  yellow: '#ffdc7d',
  paleYellow: '#eed99f',
  lightOrange: '#fac12b',
  gray: '#787878',
  lightGray: '#e9e9e9',
  baseButtonHeight: '52px',
  green: '#80b980',
  red: '#e44141',
  errorRed: '#dc0000',
  pink: '#fff0f0',
};

export const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'Beeline Hand';
  src: url('${BeelineHandRegular}') format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Beline Sans';
  src: url('${BeelineSansRegular}') format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Beline Sans';
  src: url('${BeelineSansBold}') format('woff');
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: 'Beline Sans';
  src: url('${BeelineSansMedium}') format('woff');
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: 'Beline Sans';
  src: url('${BeelineSansBlack}') format('woff');
  font-weight: 800;
  font-style: normal;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Officina Serif', sans-serif;
}
`;

export default theme;
