import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function WrappedApp() {
  return (
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  );
}

ReactDOM.render(<WrappedApp />, document.getElementById('root'));
