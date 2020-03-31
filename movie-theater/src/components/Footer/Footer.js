import React from 'react';

export const Footer = () => {
    return(
        <div className="footer">
            <div className="footer-info">
                <div className="footer-nav">
                    <h1>THE FILM HOUSE</h1>
                    <div className="footer-links">
                        <a href="">home</a>
                        <a href="">discover</a>
                        <a href="">login</a>
                    </div>
                </div>
                <div className="copyright">
                    <h2>Copyright &copy;2020</h2>
                    <p>Code and design by William Schwindt</p>
                </div>
            </div>
            <div className="moviedb-logo">
                <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="the movie db"/>
            </div>
        </div>
    )
}