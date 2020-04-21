import axios from 'axios';

import { GET_MOVIE_REVIEW_START, GET_MOVIE_REVIEW_SUCCESS, GET_MOVIE_REVIEW_FAILURE } from '../types';

export const getMovieReview = (id) => dispatch => {
    dispatch({ type: GET_MOVIE_REVIEW_START });

    axios
    .get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_KEY}`)
    .then(res => {
        dispatch({ type: GET_MOVIE_REVIEW_SUCCESS, payload: res.data.results });
    })
    .catch(err => {
        dispatch({ type: GET_MOVIE_REVIEW_FAILURE, payload: err });
    })
}