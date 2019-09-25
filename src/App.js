import React from 'react';
import Data from 'mockData';
import AppBar from 'components/AppBar';
import Category from 'components/Category';

function App() {
  return (
    <div>
      <AppBar />
      {Data.map(category => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
}

export default App;
