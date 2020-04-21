import axios from 'axios';

import { GET_POPULAR_MOVIES_START, GET_POPULAR_MOVIES_SUCCESS, GET_POPULAR_MOVIES_FAILURE } from '../types';

export const getPopularMovies = () => dispatch => {
    dispatch({ type: GET_POPULAR_MOVIES_START });

    axios
    .get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=1`)
    .then(res => {
        dispatch({ type: GET_POPULAR_MOVIES_SUCCESS, payload: res.data.results });
    })
    .catch(err => {
        dispatch({ type: GET_POPULAR_MOVIES_FAILURE, payload: err });
    })
}

