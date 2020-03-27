import React from 'react';
import './App.scss';
import { Home } from './components/Home';
import { NavBar } from './components/navbar/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <Home />
    </div>
  );
}

export default App;
