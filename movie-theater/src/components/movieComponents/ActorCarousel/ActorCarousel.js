import React from 'react';

export const ActorCarousel = (props) => {

    const slide = (amount) => {
        const row = document.querySelectorAll('.actor-box');
        for(let i = 0; i < row.length; i++) {
            row[i].style.transform = `translateX(${amount}%)`;
        }
    }

    let transform = 0;
    const next = () => {
        if(transform > -284.8) {
            transform -= 142.4;
        } else {
            transform = 0;
        }
        slide(transform);
    }

    const prev = () => {
        if(transform < .1 && transform > -.1) {
            transform = -284.8;
        } else {
            transform += 142.4;
        }
        slide(transform);
    }

    return (
        <div>
            <div className="cast">
                {props.movieCast.map(actor => {
                    return (
                        <div key={actor.cast_id} className="actor-box">
                            <img src={`${props.config}w200${actor.profile_path}`} alt='actor' />
                            <h3>{actor.name}</h3>
                        </div>
                    )
                })}
            </div>
            <button className="back-a" onClick={prev}><ion-icon name="ios-arrow-back"/></button>
            <button className="next-a" onClick={next}><ion-icon name="ios-arrow-forward"/></button>
        </div>
    )
}