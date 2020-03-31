import axios from 'axios';

import { GET_TRENDING_MOVIES_START, GET_TRENDING_MOVIES_SUCCESS, GET_TRENDING_MOVIES_FAILURE } from '../types';

export const getTrendingMovies = () => dispatch => {
    dispatch({ type: GET_TRENDING_MOVIES_START });

    axios
    .get("https://api.themoviedb.org/3/trending/movie/day?api_key=f45d181e4568e696ff8f68048d522dc8")
    .then(res => {
        dispatch({ type: GET_TRENDING_MOVIES_SUCCESS, payload: res.data.results })
    })
    .catch(err => {
        dispatch({ type: GET_TRENDING_MOVIES_FAILURE, payload: err })
    })
};