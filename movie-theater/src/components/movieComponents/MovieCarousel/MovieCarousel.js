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
        const row = document.querySelectorAll('.movie');
        for(let i = 0; i < row.length; i++) {
            row[i].style.transform = `translateX(${transform}%)`;
        }
    }

    const prev = () => {
        if(transform === 0) {
            transform = -1513.2;
        } else {
            transform += 116.4;
        }
        const row = document.querySelectorAll('.movie');
        for(let i = 0; i < row.length; i++) {
            row[i].style.transform = `translateX(${transform}%)`;
        }
    }

    return (
        <div>
            <div className="movies-row">
                {props.movies.map(movie => {
                    return (
                        <div key={movie.id} className="movie">
                            <img src={`${props.config}w1280${movie.poster_path}`} alt="movie"/>
                        </div>
                    )
                })}
            </div>
            
            <button id="back" onClick={prev}><ion-icon name="ios-arrow-back"/></button>
            <button id="next" onClick={next}><ion-icon name="ios-arrow-forward"/></button>
        
        </div>
    )
}