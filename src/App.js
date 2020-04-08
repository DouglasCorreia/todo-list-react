import React from 'react';

import './styles/css/style.css';

import Header from './components/header';
import Main from './pages/main';

function App() {
  return (
    <div className="App">
      <Header title="To-Do List" />
      <Main />
    </div>
  );
}

export default App;
