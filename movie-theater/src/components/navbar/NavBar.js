import React from 'react';

export const NavBar = () => {
    return (
        <nav className="nav">
            <div className="logo">
                <h1>The film house</h1>
                <ion-icon className="film-icon" name="ios-film"/>
            </div>
            <div>
                <a href="">home</a>
                <a href="">discover</a>
                <a href="">login</a>
            </div>
        </nav>
    )
}