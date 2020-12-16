import React from 'react';
import TrendingMovies from './movieComponents/TrendingMovies/TrendingMovies';
import HomeMovies from './movieComponents/HomeMovies/HomeMovies';
import { Footer } from '../components/Footer/Footer';

const Home = () => {
    return(
        <div className="home">
            <TrendingMovies />
            <HomeMovies />
            <Footer />
        </div>
    )
}

export default Home;