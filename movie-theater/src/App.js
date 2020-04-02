import React from 'react';
import './App.scss';
import { Route } from 'react-router-dom'; 
import { Home } from './components/Home';
import { NavBar } from './components/navbar/NavBar';
import { Footer } from './components/Footer/Footer';
import Movie from './components/movieComponents/Movie/Movie';

function App() {
  return (
    <div>
      <NavBar />
      <Route exact path="/" component={Home}/>
      <Route exact path="/discover" />
      <Route exact path="/login" />
      <Route exact path="/movie/:id" component={Movie}/>
      <Footer />
    </div>
  );
}

export default App;
