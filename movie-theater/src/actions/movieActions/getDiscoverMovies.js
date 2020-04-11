import axios from 'axios';

import { GET_DISCOVER_MOVIES_START, GET_DISCOVER_MOVIES_SUCCESS, GET_DISCOVER_MOVIES_FAILURE } from '../types';

export const getDiscoverMovies = (page) => dispatch => {
    dispatch({ type: GET_DISCOVER_MOVIES_START })

    axios
    .get(`https://api.themoviedb.org/3/discover/movie?api_key=f45d181e4568e696ff8f68048d522dc8&language=en-US&include_adult=false&include_video=false&page=${page}`)
    .then(res => {
        console.log(res);
        dispatch({ type: GET_DISCOVER_MOVIES_SUCCESS, payload: res.data.results })
    })
    .catch(err => {
        console.log(err);
        dispatch({ type: GET_DISCOVER_MOVIES_FAILURE })
    })
}