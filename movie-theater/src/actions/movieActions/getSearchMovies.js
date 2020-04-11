import axios from 'axios';

import { GET_SEARCH_MOVIES_START, GET_SEARCH_MOVIES_SUCCESS, GET_SEARCH_MOVIES_FAILURE } from '../types';

export const getSearchMovies = (query) => dispatch => {
    dispatch({ type: GET_SEARCH_MOVIES_START })

    axios
    .get(`https://api.themoviedb.org/3/search/movie?api_key=f45d181e4568e696ff8f68048d522dc8&language=en-US&query=${query}`)
    .then(res => {
        console.log(res);
        dispatch({ type: GET_SEARCH_MOVIES_SUCCESS, payload: res.data.results })
    })
    .catch(err => {
        console.log(err);
        dispatch({ type: GET_SEARCH_MOVIES_FAILURE })
    })
}