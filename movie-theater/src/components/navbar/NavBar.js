import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [query, setQuery] = useState("");
    const [navLinks, setNavLinks] = useState({
        hidden: 'none',
        shown: 'none',
        close: 'none'
    })
    const windowWidth = window.innerWidth;

    useEffect(() => {
        if (windowWidth <= 500) {
            setNavLinks({
                hidden: 'flex',
                shown: 'none',
                close: 'none'
            })
        }
    }, [windowWidth])

    const changeHandler = (e) => {
        setQuery(e.target.value);
    }

    const showNav = () => {
        setNavLinks({
            hidden: 'none',
            shown: 'flex',
            close: 'flex'
        })
    }

    const closeNav = () => {
        setNavLinks({
            hidden: 'flex',
            shown: 'none',
            close: 'none'
        })
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
                    <Link className ="search-btn" to={`/search/${query}`}><ion-icon name="ios-search"/></Link>
                </div>
                <div className="nav-links-hidden" style={{ display: navLinks.hidden }}>
                    <ion-icon onClick={showNav} className="hidden-icon" name="ios-menu" />
                </div>
                <div className="nav-links-close" style={{ display: navLinks.close }}>
                    <ion-icon onClick={closeNav} className="close-icon" name="ios-close" />
                </div>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/discover">Discover</Link>
                    <Link to="/login">Login</Link>
                </div>
            </nav>
            <div className="nav-links-shown" style={{ display: navLinks.shown }}>
                <Link to="/">Home</Link>
                <Link to="/discover">Discover</Link>
                <Link to="/login">Login</Link>
            </div>
        </div>
    )
}

export default NavBar;