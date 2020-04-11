import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSearchMovies } from '../../actions/movieActions/getSearchMovies';

const NavBar = ({ getSearchMovies, movies, isFetching, error }) => {
    const [query, setQuery] = useState("");

    const changeHandler = (e) => {
        setQuery(e.target.value);
    }

    return (
        <nav className="nav">
            <div className="logo">
                <h1>The Film House</h1>
                <ion-icon className="film-icon" name="ios-film"/>
            </div>
            <input onChange={changeHandler} placeholder="search" />
            <a className ="search-btn" href={`/search/${query}`}><ion-icon name="ios-search"/></a>
            <div className="nav-links">
                <a href="/">Home</a>
                <a href="/discover">Discover</a>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    )
}

const mapStateToProps = state => {
    return {
        movies: state.searchMoviesReducer.movies,
        isFetching: state.searchMoviesReducer.isFetching,
        error: state.searchMoviesReducer.error
    }
}

export default connect(mapStateToProps, {getSearchMovies})(NavBar);