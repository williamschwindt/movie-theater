import axios from 'axios';

import { GET_DISCOVER_MOVIES_START, GET_DISCOVER_MOVIES_SUCCESS, GET_DISCOVER_MOVIES_FAILURE } from '../types';

export const getDiscoverMovies = (sortType, page, year, vote) => dispatch => {
    dispatch({ type: GET_DISCOVER_MOVIES_START })

    axios
    .get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_KEY}&language=en-US&sort_by=${sortType}&include_adult=false&include_video=false&page=${page}&year=${year}&vote_average.gte=${vote}`)
    .then(res => {
        dispatch({ type: GET_DISCOVER_MOVIES_SUCCESS, payload: res.data.results })
    })
    .catch(err => {
        dispatch({ type: GET_DISCOVER_MOVIES_FAILURE })
    })
}