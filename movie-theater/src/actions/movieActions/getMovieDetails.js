import axios from 'axios';

import { GET_MOVIE_DETAILS_START, GET_MOVIE_DETAILS_SUCCESS, GET_MOVIE_DETAILS_FAILURE } from '../types';

export const getMovieDetails = (id) => dispatch => {
    dispatch({ type: GET_MOVIE_DETAILS_START });

    axios
    .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_KEY}&language=en-US`)
    .then(res => {
        dispatch({ type: GET_MOVIE_DETAILS_SUCCESS, payload: res.data });
    })
    .catch(err => {
        dispatch({ type: GET_MOVIE_DETAILS_FAILURE, payload: err });
    })
}