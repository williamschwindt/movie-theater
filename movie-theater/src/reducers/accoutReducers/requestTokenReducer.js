import { GET_REQUEST_TOKEN_START, GET_REQUEST_TOKEN_SUCCESS, GET_REQUEST_TOKEN_FAILURE } from '../../actions/types';

const initialState = {
    token: '',
    isFetching: false,
    error: ''
}

export const requestTokenReducer = (state = initialState, action) => {
    switch(action.type) {
        default :
            return state
        case GET_REQUEST_TOKEN_START : 
            return {
                ...state,
                isFetching: true
            }
        case GET_REQUEST_TOKEN_SUCCESS :
            return {
                ...state,
                token: action.payload,
                isFetching: 'fetched'
            }
        case GET_REQUEST_TOKEN_FAILURE :
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
    }

}