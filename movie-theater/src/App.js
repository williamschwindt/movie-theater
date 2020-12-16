import React from 'react';
import './App.scss';
import { Route } from 'react-router-dom'; 
import Home from './components/Home';
import Movie from './components/movieComponents/Movie/Movie';
import DiscoverMovies from './components/movieComponents/DiscoverMovies/DiscoverMovies';
import SearchMovies from './components/movieComponents/SearchMovies/SearchMovies';
import Login from './components/Login/Login';

function App() {
  return (
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path ="/search/:query" component={SearchMovies}/>
      <Route exact path="/discover" component={DiscoverMovies}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/movie/:id" component={Movie}/>
    </div>
  );
}

export default App;
