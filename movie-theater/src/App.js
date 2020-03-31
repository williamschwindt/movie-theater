import React from 'react';
import './App.scss';
import { Home } from './components/Home';
import { NavBar } from './components/navbar/NavBar';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <div>
      <NavBar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
