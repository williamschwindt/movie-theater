import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return(
        <div className="footer">
            <div className="footer-info">
                <div className="footer-nav">
                    <h1>The Film House</h1>
                    <div className="footer-links">
                        <Link to="/">home</Link>
                        <Link to="/discover">discover</Link>
                        <Link to="/login">login</Link>
                    </div>
                </div>
                <div className="copyright">
                    <h2>Copyright &copy;2020</h2>
                    <a href="https://williamschwindt.netlify.app/">William Schwindt</a>
                    <a href="https://github.com/williamschwindt">Github</a>
                </div>
            </div>
            <div className="moviedb-logo">
                <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="the movie db"/>
            </div>
        </div>
    )
}