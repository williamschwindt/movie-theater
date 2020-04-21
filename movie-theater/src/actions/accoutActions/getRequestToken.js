import axios from 'axios';

import { GET_REQUEST_TOKEN_START, GET_REQUEST_TOKEN_SUCCESS, GET_REQUEST_TOKEN_FAILURE } from '../types';

export const getRequestToken = () => dispatch => {
    dispatch({ type: GET_REQUEST_TOKEN_START });

    axios
        .get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_KEY}`)
        .then(res => {
            dispatch({ type: GET_REQUEST_TOKEN_SUCCESS, payload: res.data.request_token });
            sessionStorage.setItem("token", res.data.request_token);
        })
        .catch(err => {
            dispatch({ type: GET_REQUEST_TOKEN_FAILURE, payload: err })
        })
}