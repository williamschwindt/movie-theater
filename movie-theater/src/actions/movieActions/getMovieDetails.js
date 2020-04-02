import axios from 'axios';

import { GET_MOVIE_DETAILS_START, GET_MOVIE_DETAILS_SUCCESS, GET_MOVIE_DETAILS_FAILURE } from '../types';

export const getMovieDetails = (id) => dispatch => {
    dispatch({ type: GET_MOVIE_DETAILS_START });

    axios
    .get(`https://api.themoviedb.org/3/movie/${id}?api_key=f45d181e4568e696ff8f68048d522dc8&language=en-US`)
    .then(res => {
        console.log(res);
        dispatch({ type: GET_MOVIE_DETAILS_SUCCESS, payload: res.data });
    })
    .catch(err => {
        dispatch({ type: GET_MOVIE_DETAILS_FAILURE, payload: err });
    })
}