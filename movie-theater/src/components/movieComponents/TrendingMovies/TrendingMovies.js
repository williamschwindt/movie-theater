import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getTrendingMovies } from '../../../actions/movieActions/getTrendingMovies';
import { getMovieConfig } from '../../../actions/movieActions/getMovieConfig';

const TrendingMovies = ({ getTrendingMovies, getMovieConfig, trendingMovies, isFetching, error, config }) => {
    const [slides, setSlides] = useState([]);
    //auto slide
    const auto = true;
    const intervalTime = 7000;
    let slideInterval;

    useEffect(() => {
        getTrendingMovies();
        getMovieConfig();
    },[getTrendingMovies, getMovieConfig])

    useEffect(() => {
        const trending = trendingMovies.slice(0,3);
        setSlides(trending);
    }, [])

    useEffect(() => {
    const slides = document.querySelectorAll('.trending-movie');
    slides[0].classList.add('current');
    }, [trendingMovies])

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
        slideInterval = setInterval(nextSlide, intervalTime);
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
    const movies = trendingMovies.slice(0,3);

    return(
        <div>
            <div className="trending-movies">
                {movies.map(movie => {
                    return(
                        <div className="trending-movie" key={movie.id} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${movieConfig}w1280${movie.backdrop_path})`}}>
                            <div className="content">
                                <h1>{movie.title}</h1>
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                    )
                })}
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