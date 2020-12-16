import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getMovieDetails } from '../../../actions/movieActions/getMovieDetails';
import { getMovieConfig } from '../../../actions/movieActions/getMovieConfig';
import { getMovieCast } from '../../../actions/movieActions/getMovieCast';
import { getMovieReview } from '../../../actions/movieActions/getMovieReview';
import { getSessionId } from '../../../actions/accoutActions/getSessionId';
import { ActorCarousel } from '../ActorCarousel/ActorCarousel';
import MovieNavBar from '../MovieNavBar/MovieNavBar';
import { Footer } from '../../Footer/Footer';
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
    const { getSessionId } = props;
    const { sessionId } = props;

    const [summary, setSummary] = useState(false)
    const [rateMovieMessage, setRateMovieMessage] = useState({
        message: '',
        color: '',
        display: 'none',
    })
    const [rateMovieInput, setRateMovieInput] = useState('none')
    const [didVote, setDidVote] = useState(false)

    useEffect(() => {
        getMovieDetails(id);
        getMovieConfig();
        getMovieCast(id);
        getMovieReview(id);
    }, [getMovieDetails, id, getMovieConfig, getMovieCast ,getMovieReview])

    //session id
    const token = sessionStorage.getItem("token");
    useEffect(() => {
        getSessionId(token);
    }, [getSessionId, token])

    const viewSummary = () => {
        setSummary(!summary);
    }

    const displayMessage = (message, color) => {
        setRateMovieMessage({
            message: message,
            color: color,
            display: 'flex',
        })
        setTimeout(() => {
            setRateMovieMessage({
                visible: 'none',
            })
        }, 3000);
    }

    const showInput = () => {
        if(sessionId) {
            if(didVote === false) {
                setRateMovieInput('inline')
            } else {
                displayMessage('You Have Already Rated This Movie', 'rgb(255, 0, 0)');
            }
        } else {
            displayMessage('You Must Be Logged In To Rate A Movie', 'rgb(255, 0, 0)');
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

    const [rating, setRating] = useState();
    const changeRating = (e) => {
        setRating(e.target.value);
    }

    const rateMovie = () => {
        if(checkNumber(rating)) {
            axios
            .post(`https://api.themoviedb.org/3/movie/${details.id}/rating?api_key=${process.env.REACT_APP_KEY}&session_id=${sessionId}`, { "value": rating })
            .then(res => {
                displayMessage(`You Gave ${details.title} ${rating} Stars`, 'rgb(30, 255, 0)');
                setRateMovieInput('none');
                setDidVote(true);
            })
            .catch(err => {
                setRateMovieInput('none');
                displayMessage('Something Went Wrong', 'rgb(255, 0, 0)');
            })
        } else {
            displayMessage('Please Chose A Number Between 1 And 10', 'rgb(255, 0, 0)');
        }
    }

    const shortendText = (text, maxLength) => {
        if(text.length > maxLength) {
            text = text.substr(0,maxLength) + '...';
        }
        return text;
    }

    const goBack = () => {
        props.history.goBack();
    }

    if(props.isFetchingMovieDetails === 'fetched' && props.isFetchingMovieCast === 'fetched' && props.isFetchingMovieReviews === 'fetched' && config !== '' && props.errorMovieDetails === '') {
        let movieCast = cast.slice(0, 5);
        let movieGenres = details.genres.slice(0, 2);
        let movieReviews = reviews.slice(0, 3);

        return(
            <div className="movie">
                <MovieNavBar/>
                <div onClick={goBack} className="m-back" style={{ cursor: 'pointer' }}><ion-icon name="ios-arrow-back"/></div>
                <div className="movie-background" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 9)), url(${config}w1280${details.backdrop_path})`}}></div> 
                <div className="movie-details">
                    <h1>{details.title}</h1>
                    <div className="info-box">
                        <p className="rating">{details.vote_average}</p>
                        <div className="genres">
                            {movieGenres.map(genre => {
                                return (
                                    <p key={genre.id}>{genre.name}</p>
                                )
                            })}
                        </div>
                        <p className="runtime">{details.runtime} minutes</p>
                    </div>
                    <button onClick={viewSummary} className="view-summary"><p>Summary</p></button>
                    <button onClick={showInput} className="rate-movie">Rate this movie</button>
                    <div id="rate-movie-box" style={{ display: rateMovieInput }}>
                        <input onChange={changeRating} placeholder="10" type="number" min="1" max="10"/>
                        <button onClick={rateMovie}>Submit</button>
                    </div>
                    <p id="message"style={{ display: rateMovieMessage.display, color:rateMovieMessage.color }}>{rateMovieMessage.message}</p>
                    <p className="small-screen-summary">Summary</p>
                </div>
                <div className={summary ? "summary-container view" : "summary-container"}>
                    <p>{shortendText(details.overview, 300)}</p>
                </div>
                <h2 id="cast-title">Cast</h2>
                {movieCast.length > 0 ? 
                    <ActorCarousel config={config} movieCast={movieCast}/> : 
                    <h3 id="no-cast">There Is No Cast For This Movie</h3>
                }
                {movieReviews.length > 0 &&
                    <div className="reviews">
                        <h2 id="reviews-title">Reviews</h2>
                        {movieReviews.map(review => {
                            return (
                                <div key={review.id} className="review">
                                    <h3>{review.author}</h3>
                                    <p>{shortendText(review.content, 400)}</p>
                                    <a href={review.url}>See Full Review</a>
                                </div>
                            )
                        })}
                    </div>
                }
                <Footer/>
            </div>
        )
    }

    return (
        <div style={{height: '94vh'}}>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
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

        config: state.movieConfigReducer.config,

        sessionId: state.sessionIdReducer.sessionId
    }
}

export default connect(mapStateToProps, {getMovieDetails, getMovieConfig, getMovieCast, getMovieReview, getSessionId})(Movie);