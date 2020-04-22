import axios from 'axios';

import { GET_SEARCH_MOVIES_START, GET_SEARCH_MOVIES_SUCCESS, GET_SEARCH_MOVIES_FAILURE } from '../types';

export const getSearchMovies = (query) => dispatch => {
    dispatch({ type: GET_SEARCH_MOVIES_START })

    axios
    .get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_KEY}&language=en-US&query=${query}`)
    .then(res => {
        dispatch({ type: GET_SEARCH_MOVIES_SUCCESS, payload: res.data.results })
    })
    .catch(err => {
        dispatch({ type: GET_SEARCH_MOVIES_FAILURE })
    })
}