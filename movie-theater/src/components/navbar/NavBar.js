import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => {
    return (
        <nav className="nav">
            <div className="logo">
                <h1>The Film House</h1>
                <ion-icon className="film-icon" name="ios-film"/>
            </div>
            <div>
                <a href="/">Home</a>
                <a href="/discover">Discover</a>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    )
}