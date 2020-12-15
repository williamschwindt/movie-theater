import React from 'react';
import { Link } from 'react-router-dom';

export const MovieCarousel = (props) => {

    const shortendText = (text, maxLength) => {
        if(text.length > maxLength) {
            text = text.substr(0,maxLength) + '...';
        }
        return text;
    }

    const slide = (amount) => {
        const row = document.querySelectorAll(`.${props.class}`);
        for(let i = 0; i < row.length; i++) { 
            row[i].style.transform = `translateX(${amount}%)`;
        }
    }

    let transform = 0;
    const next = () => {
        if(transform > -1513.2) {
            transform -= 116.4;
        } else {
            transform = 0;
        }
        slide(transform);
    }

    const prev = () => {
        if(transform > -.01 && transform < .01) {
            transform = -1513.2;
        } else {
            transform += 116.4;
        }
        slide(transform);
    }

    return (
        <div>
            <div className="movies-row">
                {props.movies.map(movie => {
                    return (
                        <Link to={`/movie/${movie.id}`}  key={movie.id} className={props.class}>
                            <img src={`${props.config}w1280${movie.poster_path}`} alt={movie.title}/>
                            <h2>{shortendText(movie.title, 40)}</h2>
                        </Link>
                    )
                })}
            </div>
            
            <button className="back c" onClick={prev}><ion-icon name="ios-arrow-back"/></button>
            <button className="next c" onClick={next}><ion-icon name="ios-arrow-forward"/></button>
        
        </div>
    )
}