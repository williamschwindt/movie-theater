import axios from 'axios';

import { GET_NOW_PLAYING_START, GET_NOW_PLAYING_SUCCESS, GET_NOW_PLAYING_FAILURE } from '../types';

export const getNowPlaying = () => dispatch => {
    dispatch({ type: GET_NOW_PLAYING_START });

    axios
    .get("https://api.themoviedb.org/3/movie/now_playing?api_key=f45d181e4568e696ff8f68048d522dc8&language=en-US&page=1")
    .then(res => {
        console.log(res);
        dispatch({ type: GET_NOW_PLAYING_SUCCESS, payload: res.data.results });
    })
    .catch(err => {
        dispatch({ type: GET_NOW_PLAYING_FAILURE, payload: err });
    })
}

