import axios from 'axios';

import { GET_MOVIE_REVIEW_START, GET_MOVIE_REVIEW_SUCCESS, GET_MOVIE_REVIEW_FAILURE } from '../types';

export const getMovieReview = (id) => dispatch => {
    dispatch({ type: GET_MOVIE_REVIEW_START });

    axios
    .get(`https://api.themoviedb.org/3/movie/${id}/review?api_key=f45d181e4568e696ff8f68048d522dc8`)
    .then(res => {
        dispatch({ type: GET_MOVIE_REVIEW_SUCCESS, payload: res.data.results });
    })
    .catch(err => {
        dispatch({ type: GET_MOVIE_REVIEW_FAILURE, payload: err });
    })
}