import axios from 'axios';

import { GET_SESSIONID_START, GET_SESSIONID_SUCCESS, GET_SESSIONID_FAILURE } from '../types';

export const getSessionID = (token) => dispatch => {
    dispatch({ type: GET_SESSIONID_START });

    axios
        .post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_KEY}`, { "request_token": `${token}` })
        .then(res => {
            dispatch({ type: GET_SESSIONID_SUCCESS, payload: res.data.session_id })
        })
        .catch(err => {
            dispatch({ type: GET_SESSIONID_FAILURE, payload: err })
        })
}