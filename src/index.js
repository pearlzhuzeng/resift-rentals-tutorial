import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// ReSift
import { ResiftProvider } from 'resift';
import dataService from './dataService';

// Styles
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function WrappedApp() {
  return (
    <ResiftProvider dataService={dataService}>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ResiftProvider>
  );
}

ReactDOM.render(<WrappedApp />, document.getElementById('root'));
