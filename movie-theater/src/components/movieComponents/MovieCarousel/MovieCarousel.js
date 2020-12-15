import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const MovieCarousel = (props) => {

    const shortendText = (text, maxLength) => {
        if(text.length > maxLength) {
            text = text.substr(0,maxLength) + '...';
        }
        return text;
    }

    const [slideAmount, setSlideAmount] = useState(0);

    const next = () => {
        if(slideAmount > -1513.2) {
            setSlideAmount(slideAmount - 116.4);
        } else {
            setSlideAmount(0)
        }
    }

    const prev = () => {
        if(slideAmount > -.01 && slideAmount < .01) {
            setSlideAmount(-1513.2);
        } else {
            setSlideAmount(slideAmount + 116.4);
        }
    }

    return (
        <div>
            <div className="movies-row">
                {props.movies.map(movie => {
                    return (
                        <Link to={`/movie/${movie.id}`}  key={movie.id} className={props.class} style={{ transform: `translateX(${slideAmount}%)` }}>
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