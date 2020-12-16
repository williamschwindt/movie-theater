import React from 'react';
import { Link } from 'react-router-dom';

const MovieNavBar = () => {
    return (
        <div className="movie-nav-links">
            <Link to="/">Home</Link>
            <Link to="/discover">Discover</Link>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default MovieNavBar;