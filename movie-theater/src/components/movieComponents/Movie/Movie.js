import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getMovieDetails } from '../../../actions/movieActions/getMovieDetails';
import { getMovieConfig } from '../../../actions/movieActions/getMovieConfig';
import { getMovieCast } from '../../../actions/movieActions/getMovieCast';
import { getMovieReview } from '../../../actions/movieActions/getMovieReview';
import { ActorCarousel } from '../ActorCarousel/ActorCarousel';
import axios from 'axios';

const Movie = (props) => {
    const { id } = props.match.params;
    const { getMovieDetails } = props;
    const { getMovieConfig } = props;
    const { getMovieCast } = props;
    const { getMovieReview } = props;
    const { config } = props;
    const { details } = props;
    const { cast } = props;
    const { reviews } = props;

    useEffect(() => {
        getMovieDetails(id);
        getMovieConfig();
        getMovieCast(id);
        getMovieReview(id);
    }, [getMovieDetails, id, getMovieConfig, getMovieCast ,getMovieReview])

    const viewSummary = () => {
        document.querySelector('.summary-container').classList.toggle('view');
    }

    const showInput = () => {
        if(didVote === false) {
            document.querySelector('#rate-movie-box').style.display = 'inline';
        }
    }

    const checkNumber = (num) => {
        if(num >= 1 && num <= 10) {
            return true;
        }
        else {
            return false;
        }
    }

    let rating;
    const changeRating = (e) => {
        rating = e.target.value
    }

    let didVote = false;
    const rateMovie = () => {
        if(didVote === false) {
            if(sessionStorage.getItem("session-id")) {
                if(checkNumber(rating)) {
                    axios
                    .post(`https://api.themoviedb.org/3/movie/${details.id}/rating?api_key=f45d181e4568e696ff8f68048d522dc8&session_id=${sessionStorage.getItem('session-id')}`, { "value": rating })
                    .then(res => {
                        console.log(res);
                        document.querySelector('#error-message').innerHTML = 'success';
                        document.querySelector('#error-message').style.color = 'rgb(30, 255, 0)';
                        didVote = true;
                        setTimeout(() => {
                            document.querySelector('#rate-movie-box').style.display = 'none';
                        }, 2000);
                    })
                    .catch(err => {
                        document.querySelector('#error-message').innerHTML = 'something went wrong';
                        document.querySelector('#error-message').style.color = 'rgb(30, 255, 0)';
                        setTimeout(() => {
                            document.querySelector('#rate-movie-box').style.display = 'none';
                        }, 2000);
                    })
                } else {
                    document.querySelector('#error-message').innerHTML = 'please chose a number between 1 and 10';
                }
            }
            else {
                document.querySelector('#error-message').innerHTML = 'you must be loged in to rate a mvoie';
                didVote = true;
                setTimeout(() => {
                    document.querySelector('#rate-movie-box').style.display = 'none';
                }, 3000);
            }
        }
    }

    const shortendText = (text, maxLength) => {
        if(text.length > maxLength) {
            text = text.substr(0,maxLength) + '...';
        }
        return text;
    }

    if(props.isFetchingMovieDetails === 'fetched' && props.isFetchingMovieCast === 'fetched' && props.isFetchingMovieReviews === 'fetched' && config !== '' && props.errorMovieDetails === '') {
        let movieCast = cast.splice(0, 5);

        return(
            <div className="movie">
                <a href="/" className="m-back"><ion-icon name="ios-arrow-back"/></a>
                <div className="movie-background" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 9)), url(${config}w1280${details.backdrop_path})`}}></div> 
                <div className="movie-details">
                    <h1>{details.title}</h1>
                    <div className="info-box">
                        <p className="rating">{details.vote_average}</p>
                        <div className="genres">
                            {details.genres.map(genre => {
                                return (
                                    <p key={genre.id}>{genre.name}</p>
                                )
                            })}
                        </div>
                        <p className="runtime">{details.runtime} minutes</p>
                    </div>
                    <button onClick={viewSummary} className="view-summary"><p>Summary</p></button>
                    <button onClick={showInput} className="rate-movie">Rate this movie</button>
                    <div id="rate-movie-box">
                        <input onChange={changeRating} placeholder="10" type="number" min="1" max="10"/>
                        <button onClick={rateMovie}>Submit</button>
                        <p id="error-message"></p>
                    </div>
                </div>
                <div className="summary-container">
                    <p>{details.overview}</p>
                </div>
                <h2>Cast</h2>
                <ActorCarousel config={config} movieCast={movieCast}/>
                <div className="reviews">
                    <h2>Reviews</h2>
                    {reviews.map(review => {
                        return (
                            <div key={review.id} className="review">
                                <h3>{review.author}</h3>
                                <p>{shortendText(review.content, 400)}</p>
                                <a href={review.url}>See Full Review</a>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return(
        <h1>waiting</h1>
    )
}

const mapStateToProps = state => {
    return {
        details: state.movieDetailsRuducer.details,
        isFetchingMovieDetails: state.movieDetailsRuducer.isFetching,
        errorMovieDetails: state.movieDetailsRuducer.error,

        cast : state.movieCastReducer.cast,
        isFetchingMovieCast: state.movieCastReducer.isFetching,
        errorMovieCast: state.movieCastReducer.error,

        reviews: state.movieReviewReducer.reviews,
        isFetchingMovieReviews: state.movieReviewReducer.isFetching,
        errorMovieReviews: state.movieReviewReducer.error,

        config: state.movieConfigReducer.config
    }
}

export default connect(mapStateToProps, {getMovieDetails, getMovieConfig, getMovieCast, getMovieReview})(Movie);