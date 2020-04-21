import axios from 'axios';

import { GET_UPCOMING_START, GET_UPCOMING_SUCCESS, GET_UPCOMING_FAILURE } from '../types';

export const getUpcoming = () => dispatch => {
    dispatch({ type: GET_UPCOMING_START });

    axios
    .get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=1`)
    .then(res => {
        dispatch({ type: GET_UPCOMING_SUCCESS, payload: res.data.results });
    })
    .catch(err => {
        dispatch({ type: GET_UPCOMING_FAILURE, payload: err });
    })
}

