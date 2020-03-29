import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getTrendingMovies } from '../../../actions/movieActions/getTrendingMovies';
import { getMovieConfig } from '../../../actions/movieActions/getMovieConfig';

const TrendingMovies = ({ getTrendingMovies, getMovieConfig, trendingMovies, isFetching, error, config }) => {

    //auto slide
    const auto = true;
    const intervalTime = 7000;

    useEffect(() => {
        getTrendingMovies();
        getMovieConfig();
    },[getTrendingMovies, getMovieConfig])

    const nextSlide = () => {
        const slides = document.querySelectorAll('.trending-movie');

        const current = document.querySelector('.current');
        current.classList.remove('current');
        if(current.nextElementSibling) {
            console.log(current.nextElementSibling);
            current.nextElementSibling.classList.add('current');
        } else {
            slides[0].classList.add('current');
        }
    }

    const prevSlide = () => {
        const slides = document.querySelectorAll('.trending-movie');

        const current = document.querySelector('.current');
        current.classList.remove('current');
        if(current.previousElementSibling) {
            current.previousElementSibling.classList.add('current');
        } else {
            slides[slides.length - 1].classList.add('current');
        }
    }

    if(auto) {
        setInterval(prevSlide, intervalTime);
    }

    if(isFetching === true) {
        return(
            <h1>waiting</h1>
        )
    }

    if(error) {
        return (
            <h1>There was an error loading this page</h1>
        )
    }

    const movieConfig = config;
    const movies = trendingMovies.slice(0,4);

    return(
        <div>
            <div className="trending-movies">
                <div className="trending-movie current" key={movies[0].id} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${movieConfig}w1280${movies[0].backdrop_path})`}}>
                    <div className="content">
                        <h1>{movies[0].title}</h1>
                        <p>{movies[0].overview}</p>
                    </div>
                </div>
                <div className="trending-movie" key={movies[1].id} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${movieConfig}w1280${movies[1].backdrop_path})`}}>
                    <div className="content">
                        <h1>{movies[1].title}</h1>
                        <p>{movies[1].overview}</p>
                    </div>
                </div>
                <div className="trending-movie" key={movies[2].id} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${movieConfig}w1280${movies[2].backdrop_path})`}}>
                    <div className="content">
                        <h1>{movies[2].title}</h1>
                        <p>{movies[2].overview}</p>
                    </div>
                </div>
                <div className="trending-movie" key={movies[3].id} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${movieConfig}w1280${movies[3].backdrop_path})`}}>
                    <div className="content">
                        <h1>{movies[3].title}</h1>
                        <p>{movies[3].overview}</p>
                    </div>
                </div>
            </div>
            <div className="buttons">
                <button id="prev" onClick={prevSlide}><ion-icon name="ios-arrow-back"/></button>
                <button id="next" onClick={nextSlide}><ion-icon name="ios-arrow-forward"/></button>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        trendingMovies: state.getTrendingMovies.trendingMovies,
        isFetching: state.isFetching,
        error: state.error,
        config: state.getMovieConfig.config
    }
}

export default connect(mapStateToProps, {getTrendingMovies, getMovieConfig})(TrendingMovies);