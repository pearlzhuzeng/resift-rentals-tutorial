import React from 'react';

// ReSift
import { ReSiftProvider } from 'resift';
import dataService from './dataService';

// Components
import AppBar from 'components/AppBar';

function App() {
  return (
    <ReSiftProvider dataService={dataService}>
      <AppBar />
    </ReSiftProvider>
  );
}

export default App;
