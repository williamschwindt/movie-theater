import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTrendingMovies } from '../../../actions/movieActions/getTrendingMovies';
import { getMovieConfig } from '../../../actions/movieActions/getMovieConfig';
import { getMovieGenres } from '../../../actions/movieActions/getMovieGenres';

const TrendingMovies = ({ getTrendingMovies, getMovieConfig, getMovieGenres,
    trendingMovies, isFetchingTrendingMovies, errorTrendingMovies, 
    config,
    movieGenres, isFetchingMovieGenres, errorMovieGenres
    }) => {

    useEffect(() => {
        getTrendingMovies();
        getMovieConfig();
        getMovieGenres();
    },[getMovieConfig, getMovieGenres, getTrendingMovies])

    //auto slide
    const auto = true;
    const intervalTime = 7000;

    const nextSlide = () => {
        const slides = document.querySelectorAll('.trending-movie');

        const current = document.querySelector('.trending-movie.current');
        current.classList.remove('current');
        if(current.nextElementSibling) {
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
        setInterval(nextSlide, intervalTime);
    }

    if(isFetchingTrendingMovies === true || isFetchingMovieGenres === true) {
        return(
            <h1>waiting</h1>
        )
    }

    if(errorTrendingMovies || errorMovieGenres) {
        return (
            <h1>There was an error loading this page</h1>
        )
    }

    if (isFetchingTrendingMovies === false && isFetchingMovieGenres === 'fetched' && errorTrendingMovies === '' && errorMovieGenres === '') {
        const movieConfig = config;
        const movies = trendingMovies.slice(0,4);
        let genres = [];

        const movieGenreIDs = movies.map(movie => movie.genre_ids[0]);

        for (let i = 0; i < movieGenreIDs.length; i++) {
            genres.push(movieGenres.find(genre => genre.id === movieGenreIDs[i]));
        }

        return(
            <div>
                <div className="trending-movies">
                    <div className="trending-movie current" key={movies[0].id} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${movieConfig}w1280${movies[0].backdrop_path})`}}>
                        <div className="content">
                            <h1>{movies[0].title}</h1>
                            <p>{genres[0].name}</p>
                        </div>
                    </div>
                    <div className="trending-movie" key={movies[1].id} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${movieConfig}w1280${movies[1].backdrop_path})`}}>
                        <div className="content">
                            <h1>{movies[1].title}</h1>
                            <p>{genres[1].name}</p>
                        </div>
                    </div>
                    <div className="trending-movie" key={movies[2].id} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${movieConfig}w1280${movies[2].backdrop_path})`}}>
                        <div className="content">
                            <h1>{movies[2].title}</h1>
                            <p>{genres[2].name}</p>
                        </div>
                    </div>
                    <div className="trending-movie" key={movies[3].id} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${movieConfig}w1280${movies[3].backdrop_path})`}}>
                        <div className="content">
                            <h1>{movies[3].title}</h1>
                            <p>{genres[3].name}</p>
                        </div>
                    </div>
                </div>
                <button id="back" onClick={prevSlide}><ion-icon name="ios-arrow-back"/></button>
                <button id="next" onClick={nextSlide}><ion-icon name="ios-arrow-forward"/></button>
            </div>
        )
    }

    return (
        <h1>waiting</h1>
    )
}

const mapStateToProps = state => {
    return {
        trendingMovies: state.trendingMoviesReducer.trendingMovies,
        isFetchingTrendingMovies: state.trendingMoviesReducer.isFetching,
        errorTrendingMovies: state.trendingMoviesReducer.error,

        config: state.movieConfigReducer.config,

        movieGenres: state.movieGenresRuducer.genres,
        isFetchingMovieGenres: state.movieGenresRuducer.isFetching,
        errorMovieGenres: state.movieGenresRuducer.error
    }
}

export default connect(mapStateToProps, {getTrendingMovies, getMovieConfig, getMovieGenres})(TrendingMovies);