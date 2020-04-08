import { GET_DISCOVER_MOVIES_START, GET_DISCOVER_MOVIES_SUCCESS, GET_DISCOVER_MOVIES_FAILURE } from '../../actions/types';

const initialState = {
    movies: [],
    isFetching: false,
    error: ''
}

export const discoverMoviesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_DISCOVER_MOVIES_START :
            return {
                ...state,
                isFetching: true
            }
        case GET_DISCOVER_MOVIES_SUCCESS :
            return {
                ...state,
                movies: action.payload,
                isFetching: 'fetched'
            }
        case GET_DISCOVER_MOVIES_FAILURE :
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        default :
            return state;
    }
}