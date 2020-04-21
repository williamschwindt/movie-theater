import axios from 'axios';

import { GET_NOW_PLAYING_START, GET_NOW_PLAYING_SUCCESS, GET_NOW_PLAYING_FAILURE } from '../types';

export const getNowPlaying = () => dispatch => {
    dispatch({ type: GET_NOW_PLAYING_START });

    axios
    .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=1`)
    .then(res => {
        dispatch({ type: GET_NOW_PLAYING_SUCCESS, payload: res.data.results });
    })
    .catch(err => {
        dispatch({ type: GET_NOW_PLAYING_FAILURE, payload: err });
    })
}

