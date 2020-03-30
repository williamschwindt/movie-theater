import React from 'react';
import TrendingMovies from './movieComponents/TrendingMovies/TrendingMovies';
import HomeMovies from './movieComponents/HomeMovies/HomeMovies';

export const Home = () => {
    return(
        <div>
            <TrendingMovies />
            <HomeMovies />
        </div>
    )
}