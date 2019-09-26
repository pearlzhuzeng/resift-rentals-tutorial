import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// ReSift
import { ResiftProvider } from 'resift';
import dataService from './dataService';

function WrappedApp() {
  return (
    <ResiftProvider dataService={dataService}>
      <App />
    </ResiftProvider>
  );
}

ReactDOM.render(<WrappedApp />, document.getElementById('root'));
