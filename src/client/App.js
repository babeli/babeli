import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { I18nextProvider } from 'react-i18next';

import Views from './views';
import theme from './theme';
import i18n from './i18n';

import './App.css';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <I18nextProvider i18n={i18n}>
      <Views/>
    </I18nextProvider>
  </MuiThemeProvider>
);

export default App;
