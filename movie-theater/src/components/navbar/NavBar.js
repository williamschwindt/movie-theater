import React, { useState } from 'react';

const NavBar = () => {
    const [query, setQuery] = useState("");

    const changeHandler = (e) => {
        setQuery(e.target.value);
    }

    const showNav = () => {
        document.querySelector('.nav-links-hidden').style.display = 'none';
        document.querySelector('.nav-links-close').style.display = 'flex';
        document.querySelector('.nav-links-shown').style.display = 'flex';
    }

    const closeNav = () => {
        document.querySelector('.nav-links-hidden').style.display = 'flex';
        document.querySelector('.nav-links-close').style.display = 'none';
        document.querySelector('.nav-links-shown').style.display = 'none';
    }


    return (
        <div>
            <nav className="nav">
                <div className="logo">
                    <h1>The Film House</h1>
                    <ion-icon className="film-icon" name="ios-film"/>
                </div>
                <div className="search-container">
                    <input onChange={changeHandler} placeholder="search" />
                    <a className ="search-btn" href={`/search/${query}`}><ion-icon name="ios-search"/></a>
                </div>
                <div className="nav-links-hidden">
                    <ion-icon onClick={showNav} className="hidden-icon" name="ios-menu" />
                </div>
                <div className="nav-links-close">
                    <ion-icon onClick={closeNav} className="close-icon" name="ios-close" />
                </div>
                <div className="nav-links">
                    <a href="/">Home</a>
                    <a href="/discover">Discover</a>
                    <a href="/login">Login</a>
                </div>
            </nav>
            <div className="nav-links-shown">
                <a href="/">Home</a>
                <a href="/discover">Discover</a>
                <a href="/login">Login</a>
            </div>
        </div>
    )
}

export default NavBar;