import React from 'react';
import './App.scss';
import { Route } from 'react-router-dom'; 
import { Home } from './components/Home';
import Movie from './components/movieComponents/Movie/Movie';
import DiscoverMovies from './components/movieComponents/DiscoverMovies/DiscoverMovies';

function App() {
  return (
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/discover" component={DiscoverMovies}/>
      <Route exact path="/login" />
      <Route exact path="/movie/:id" component={Movie}/>
    </div>
  );
}

export default App;
