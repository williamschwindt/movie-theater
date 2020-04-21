import axios from 'axios';

import { GET_MOVIE_CAST_START, GET_MOVIE_CAST_SUCCESS, GET_MOVIE_CAST_FAILURE } from '../types';

export const getMovieCast = (id) => dispatch => {
    dispatch({ type: GET_MOVIE_CAST_START });

    axios
    .get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_KEY}`)
    .then(res => {
        dispatch({ type: GET_MOVIE_CAST_SUCCESS, payload: res.data.cast });
    })
    .catch(err => {
        dispatch({ type: GET_MOVIE_CAST_FAILURE, payload: err });
    })
}