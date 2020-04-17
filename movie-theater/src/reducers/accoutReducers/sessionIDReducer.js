import { GET_SESSIONID_START, GET_SESSIONID_SUCCESS, GET_SESSIONID_FAILURE } from '../../actions/types';

const initialState = {
    sessionID: '',
    isFetching: false,
    error: ''
}

export const requestTokenReducer = (state = initialState, action) => {
    switch(action.type) {
        default :
            return state
        case GET_SESSIONID_START : 
            return {
                ...state,
                isFetching: true
            }
        case GET_SESSIONID_SUCCESS :
            return {
                ...state,
                token: action.payload,
                isFetching: 'fetched'
            }
        case GET_SESSIONID_FAILURE :
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
    }
}