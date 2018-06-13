import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import Views from './views';
import theme from './theme';

import './App.css';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Views/>
  </MuiThemeProvider>
);

export default App;
