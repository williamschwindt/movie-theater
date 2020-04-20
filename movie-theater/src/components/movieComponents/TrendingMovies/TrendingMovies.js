import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTrendingMovies } from '../../../actions/movieActions/getTrendingMovies';
import { getMovieConfig } from '../../../actions/movieActions/getMovieConfig';
import { getMovieGenres } from '../../../actions/movieActions/getMovieGenres';
import NavBar from '../../navbar/NavBar';
import HomeMovies from '../HomeMovies/HomeMovies';
import axios from 'axios';

const TrendingMovies = ({ getTrendingMovies, getMovieConfig, getMovieGenres,
    trendingMovies, isFetchingTrendingMovies, errorTrendingMovies, 
    config,
    movieGenres, isFetchingMovieGenres, errorMovieGenres
    }) => {


    //session id
    const token = sessionStorage.getItem("token");
    useEffect(() => {
        axios
        .post(`https://api.themoviedb.org/3/authentication/session/new?api_key=f45d181e4568e696ff8f68048d522dc8`, { "request_token": `${token}` })
        .then(res => {
            console.log(res.data);
            sessionStorage.setItem("session-id", res.data.session_id);
        })
        .catch(err => {
            console.log('not logged in');
        })
    }, [token])

    useEffect(() => {
        getTrendingMovies();
        getMovieConfig();
        getMovieGenres();
    },[getMovieConfig, getMovieGenres, getTrendingMovies])

    //auto slide
    let auto = false;
    let intervalTime;
    let intervalFunc;

    if(isFetchingTrendingMovies === 'fetched' && isFetchingMovieGenres === 'fetched' && config) {
        auto = true;
        intervalTime = 7000;
    }

    const stopSliding = () => {
        auto = false;
        clearInterval(intervalFunc);
    }

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

    if(auto === true) {
        intervalFunc = setInterval(nextSlide, intervalTime);
    }

    if(errorTrendingMovies || errorMovieGenres) {
        return (
            <div style={{height: '94vh'}}>
                <h1>There was a problem loading this page</h1>
            </div>
        )
    }

    if (isFetchingTrendingMovies === 'fetched' && isFetchingMovieGenres === 'fetched' && config) {
        const movieConfig = config;
        const movies = trendingMovies.slice(0,4);
        let genres = [];

        const movieGenreIDs = movies.map(movie => movie.genre_ids[0]);

        for (let i = 0; i < movieGenreIDs.length; i++) {
            genres.push(movieGenres.find(genre => genre.id === movieGenreIDs[i]));
        }

        return(
            <div className="home-container">
                <NavBar/>
                <button className="t-back" onClick={prevSlide}><ion-icon name="ios-arrow-back"/></button>
                <button className="t-next" onClick={nextSlide}><ion-icon name="ios-arrow-forward"/></button>
                <div className="trending-movies">
                    <Link onClick={stopSliding} to={`/movie/${movies[0].id}`} className="trending-movie current" key={movies[0].id} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${movieConfig}w1280${movies[0].backdrop_path})`}}>
                        <div className="content">
                            <p id="trending-tag">Trending</p>
                            <h1>{movies[0].title}</h1>
                            <p>{genres[0].name}</p>
                        </div>
                    </Link>
                    <Link onClick={stopSliding} to={`/movie/${movies[1].id}`} className="trending-movie" key={movies[1].id} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${movieConfig}w1280${movies[1].backdrop_path})`}}>
                        <div className="content">
                            <p id="trending-tag">Trending</p>
                            <h1>{movies[1].title}</h1>
                            <p>{genres[1].name}</p>
                        </div>
                    </Link>
                    <Link onClick={stopSliding} to={`/movie/${movies[2].id}`} className="trending-movie" key={movies[2].id} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${movieConfig}w1280${movies[2].backdrop_path})`}}>
                        <div className="content">
                            <p id="trending-tag">Trending</p>
                            <h1>{movies[2].title}</h1>
                            <p>{genres[2].name}</p>
                        </div>
                    </Link>
                    <Link onClick={stopSliding} to={`/movie/${movies[3].id}`} className="trending-movie" key={movies[3].id} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${movieConfig}w1280${movies[3].backdrop_path})`}}>
                        <div className="content">
                            <p id="trending-tag">Trending</p>
                            <h1>{movies[3].title}</h1>
                            <p>{genres[3].name}</p>
                        </div>
                    </Link>
                </div>

                <HomeMovies stopSliding={stopSliding}/>
            </div>
        )
    }

    return (
        <div style={{height: '94vh'}}>
        <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
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