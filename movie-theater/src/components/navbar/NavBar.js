import React, { useState } from 'react';
import { getSearchMovies } from '../../actions/movieActions/getSearchMovies';

const NavBar = () => {
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
                <a href="/login">Login</a>
            </div>
        </nav>
    )
}

export default NavBar;