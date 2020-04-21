import React from 'react';
import TrendingMovies from './movieComponents/TrendingMovies/TrendingMovies';
import { Footer } from '../components/Footer/Footer';

const Home = () => {
    return(
        <div className="home">
            <TrendingMovies />
            <Footer />
        </div>
    )
}

export default Home;