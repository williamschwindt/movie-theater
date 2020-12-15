import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTrendingMovies } from '../../../actions/movieActions/getTrendingMovies';
import { getMovieConfig } from '../../../actions/movieActions/getMovieConfig';
import { getMovieGenres } from '../../../actions/movieActions/getMovieGenres';
import NavBar from '../../navbar/NavBar';
import axios from 'axios';

const TrendingMovies = ({ getTrendingMovies, getMovieConfig, getMovieGenres,
    trendingMovies, isFetchingTrendingMovies, errorTrendingMovies, 
    config,
    movieGenres, isFetchingMovieGenres, errorMovieGenres
    }) => {

    //image slider
    const [trendingSlides, setTrendingSlides] = useState([true, false, false, false])

    //session id
    const token = sessionStorage.getItem("token");
    useEffect(() => {
        if(token && !sessionStorage.getItem("session-id")) {
            axios
            .post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_KEY}`, { "request_token": `${token}` })
            .then(res => {
                sessionStorage.setItem("session-id", res.data.session_id);
            })
            .catch(err => {
                console.log('not logged in');
            })
        }
    }, [token])

    useEffect(() => {
        getTrendingMovies();
        getMovieConfig();
        getMovieGenres();
    },[getMovieConfig, getMovieGenres, getTrendingMovies])

    const nextSlide = () => {
        const slides = trendingSlides.slice(0);
        const currentSlide = trendingSlides.indexOf(true);
        if (currentSlide < 3) {
            slides[currentSlide] = false
            slides[currentSlide + 1] = true
            setTrendingSlides(slides)
        } else {
            slides[currentSlide] = false
            slides[0] = true
            setTrendingSlides(slides)
        }
    }

    const prevSlide = () => {
        const slides = trendingSlides.slice(0);
        const currentSlide = trendingSlides.indexOf(true);
        if (currentSlide > 0) {
            slides[currentSlide] = false
            slides[currentSlide - 1] = true
            setTrendingSlides(slides)
        } else {
            slides[currentSlide] = false
            slides[3] = true
            setTrendingSlides(slides)
        }
    }

    //auto slide
    useEffect(() => {
        const intervalId = setInterval(() => {
            nextSlide()
        }, 7000)

        return () => clearInterval(intervalId)
    }, [trendingSlides])

    if(errorTrendingMovies || errorMovieGenres) {
        return (
            <div style={{height: '94vh'}}>
                <h1>There was a problem loading this page</h1>
            </div>
        )
    }

    if (isFetchingTrendingMovies === 'fetched' && isFetchingMovieGenres === 'fetched' && config) {
        return(
            <div className="home-container">
                <NavBar/>
                <button className="t-back" onClick={prevSlide}><ion-icon name="ios-arrow-back"/></button>
                <button className="t-next" onClick={nextSlide}><ion-icon name="ios-arrow-forward"/></button>
                <div className="trending-movies">
                    {trendingMovies.map((movie, i) => {
                        return (
                            <Link to={`/movie/${movie.id}`} className={trendingSlides[i] ? "trending-movie current" : "trending-movie"} key={movie.id} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${config}w1280${movie.backdrop_path})`}}>
                                <div className="content">
                                    <p id="trending-tag">Trending</p>
                                    <h1>{movie.title}</h1>
                                    <p>{movieGenres.find(genre => genre.id === movie.genre_ids[0]).name}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
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