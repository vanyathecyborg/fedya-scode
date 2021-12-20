import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyles } from '../lib/styled';
import { configureStore } from '../lib/redux';
import { withToastProvider } from 'ofd-ui-toolkit';

import MainContainer from './containers/MainContainer';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';
import './polyfills';

const store = configureStore();

const App = () => (
  <>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <MainContainer />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </>
);

const AppWithToastProvider = withToastProvider(App);

ReactDOM.render(
  <AppWithToastProvider />,
  document.getElementById('app'),
);
