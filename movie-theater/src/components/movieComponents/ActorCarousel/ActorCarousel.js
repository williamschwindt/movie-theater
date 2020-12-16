import React, { useState } from 'react';

export const ActorCarousel = (props) => {

    const [slideAmount, setSlideAmount] = useState(0);

    const next = () => {
        if(slideAmount > -284.8) {
            setSlideAmount(slideAmount - 142.4);
        } else {
            setSlideAmount(0)
        }
    }

    const prev = () => {
        if(slideAmount < .1 && slideAmount > -.1) {
            setSlideAmount(-284.8);
        } else {
            setSlideAmount(slideAmount + 142.4);
        }
    }

    return (
        <div>
            <div className="cast">
                {props.movieCast.map(actor => {
                    return (
                        <div key={actor.cast_id} className="actor-box" style={{ transform: `translateX(${slideAmount}%)` }}>
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