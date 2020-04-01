import React from 'react';

export const NavBar = () => {
    return (
        <nav className="nav">
            <div className="logo">
                <h1>The Film House</h1>
                <ion-icon className="film-icon" name="ios-film"/>
            </div>
            <div>
                <a href="/">Home</a>
                <a href="/">Discover</a>
                <a href="/">Login</a>
            </div>
        </nav>
    )
}