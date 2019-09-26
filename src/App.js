import React from 'react';

// ReSift
import { ResiftProvider } from 'resift';
import dataService from './dataService';

// Components
import AppBar from 'components/AppBar';

function App() {
  return (
    <ResiftProvider dataService={dataService}>
      <AppBar />
    </ResiftProvider>
  );
}

export default App;
