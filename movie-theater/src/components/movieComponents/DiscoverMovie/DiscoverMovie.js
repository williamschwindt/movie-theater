import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMovieDetails } from '../../../actions/movieActions/getMovieDetails';
import { getMovieConfig } from '../../../actions/movieActions/getMovieConfig';
import { getMovieCast } from '../../../actions/movieActions/getMovieCast';
import { getMovieReview } from '../../../actions/movieActions/getMovieReview';
import { ActorCarousel } from '../ActorCarousel/ActorCarousel';
import NavBar from '../../navbar/NavBar';
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

    useEffect(() => {
        getMovieDetails(id);
        getMovieConfig();
        getMovieCast(id);
        getMovieReview(id);
    }, [getMovieDetails, id, getMovieConfig, getMovieCast ,getMovieReview])

    //session id
    const token = sessionStorage.getItem("token");
    useEffect(() => {
        axios
        .post(`https://api.themoviedb.org/3/authentication/session/new?api_key=f45d181e4568e696ff8f68048d522dc8`, { "request_token": `${token}` })
        .then(res => {
            console.log(res.data);
            sessionStorage.setItem("session-id", res.data.session_id);
        })
        .catch(err => {
            console.log(err);
        })
    }, [token])

    const viewSummary = () => {
        document.querySelector('.summary-container').classList.toggle('view');
    }

    const displayMessage = (message, color) => {
        const messageTag = document.querySelector('#message');
        messageTag.innerHTML = `${message}`;
        messageTag.style.color = `${color}`;
        messageTag.style.display = 'block';
        setTimeout(() => {
            messageTag.style.display = 'none';
        }, 3000);
    }

    const showInput = () => {
        if(sessionStorage.getItem('session-id')) {
            if(didVote === false) {
                document.querySelector('#rate-movie-box').style.display = 'inline';
            } else {
                displayMessage('You Have Already Rated This Movie', 'rgb(255, 0, 0)');
            }
        } else {
            displayMessage('You Must Be Loged In To Rate A Movie', 'rgb(255, 0, 0)');
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
        if(checkNumber(rating)) {
            axios
            .post(`https://api.themoviedb.org/3/movie/${details.id}/rating?api_key=f45d181e4568e696ff8f68048d522dc8&session_id=${sessionStorage.getItem('session-id')}`, { "value": rating })
            .then(res => {
                console.log(res);
                displayMessage(`You Gave ${details.title} ${rating} Stars`, 'rgb(30, 255, 0)');
                didVote = true;
                setTimeout(() => {
                    document.querySelector('#rate-movie-box').style.display = 'none';
                }, 3000);
            })
            .catch(err => {
                displayMessage('Something Went Wrong', 'rgb(255, 0, 0)');
                setTimeout(() => {
                    document.querySelector('#rate-movie-box').style.display = 'none';
                }, 3000);
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
        let movieCast = cast.splice(0, 5);
        let movieGenres = details.genres.splice(0, 3);

        return(
            <div className="movie">
                <NavBar/>
                <div onClick={goBack} className="m-back"><ion-icon name="ios-arrow-back"/></div>
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
                    <div id="rate-movie-box">
                        <input onChange={changeRating} placeholder="10" type="number" min="1" max="10"/>
                        <button onClick={rateMovie}>Submit</button>
                    </div>
                    <p id="message"></p>
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
                <Footer/>
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