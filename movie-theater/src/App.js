import React from 'react';
import './App.scss';
import { Route } from 'react-router-dom'; 
import { Home } from './components/Home';
import Movie from './components/movieComponents/Movie/Movie';
import DiscoverMovies from './components/movieComponents/DiscoverMovies/DiscoverMovies';
import DiscoverMovie from './components/movieComponents/DiscoverMovie/DiscoverMovie';
import SearchMovies from './components/movieComponents/SearchMovies/SearchMovies';

function App() {
  return (
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path ="/search/:query" component={SearchMovies}/>
      <Route exact path="/discover" component={DiscoverMovies}/>
      <Route exact path="/login" />
      <Route exact path="/movie/:id" component={Movie}/>
      <Route exact path="/discovermovie/:id" component={DiscoverMovie}/>
    </div>
  );
}

export default App;
