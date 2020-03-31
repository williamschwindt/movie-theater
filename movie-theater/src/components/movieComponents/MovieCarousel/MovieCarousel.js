import React from 'react';

export const MovieCarousel = (props) => {
    console.log(props);

    let transform = 0;
    const next = () => {
        if(transform > -1513.2) {
            transform -= 116.4;
        } else {
            transform = 0;
        }
        const row = document.querySelectorAll(`.${props.class}`);
        for(let i = 0; i < row.length; i++) {
            row[i].style.transform = `translateX(${transform}%)`;
        }
    }

    const prev = () => {
        if(transform > -.01 && transform < .01) {
            transform = -1513.2;
        } else {
            transform += 116.4;
        }
        const row = document.querySelectorAll(`.${props.class}`);
        for(let i = 0; i < row.length; i++) {
            row[i].style.transform = `translateX(${transform}%)`;
        }
    }

    return (
        <div>
            <div className="movies-row">
                {props.movies.map(movie => {
                    return (
                        <div key={movie.id} className={props.class}>
                            <img src={`${props.config}w1280${movie.poster_path}`} alt="movie"/>
                            <h2>{movie.title}</h2>
                        </div>
                    )
                })}
            </div>
            
            <button className="back c" onClick={prev}><ion-icon name="ios-arrow-back"/></button>
            <button className="next c" onClick={next}><ion-icon name="ios-arrow-forward"/></button>
        
        </div>
    )
}