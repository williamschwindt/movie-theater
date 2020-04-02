import React from 'react';
import TrendingMovies from './movieComponents/TrendingMovies/TrendingMovies';
import { NavBar } from '../components/navbar/NavBar';
import { Footer } from '../components/Footer/Footer';

export const Home = () => {
    return(
        <div>
            <NavBar />
            <TrendingMovies />
            <Footer />
        </div>
    )
}