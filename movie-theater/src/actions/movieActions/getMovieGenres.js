import axios from 'axios';

import { GET_MOVIE_GENRES_START, GET_MOVIE_GENRES_SUCCESS, GET_MOVIE_GENRES_FAILURE } from '../types';

export const getMovieGenres = () => dispatch => {
    dispatch({ type: GET_MOVIE_GENRES_START });

    axios
    .get("https://api.themoviedb.org/3/genre/movie/list?api_key=f45d181e4568e696ff8f68048d522dc8&language=en-US")
    .then(res => {
        dispatch({ type: GET_MOVIE_GENRES_SUCCESS, payload: res.data.genres });
    })
    .catch(err => {
        dispatch({ type: GET_MOVIE_GENRES_FAILURE, payload: err });
    })
}