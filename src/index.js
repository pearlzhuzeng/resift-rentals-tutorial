import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// ReSift
import { ResiftProvider } from 'resift';
import dataService from './dataService';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function WrappedApp() {
  return (
    <ResiftProvider dataService={dataService}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ResiftProvider>
  );
}

ReactDOM.render(<WrappedApp />, document.getElementById('root'));
