import { GET_SEARCH_MOVIES_START, GET_SEARCH_MOVIES_SUCCESS, GET_SEARCH_MOVIES_FAILURE } from '../../actions/types';

const initialState = {
    movies: [],
    isFetching: false,
    error: ''
}

export const searchMoviesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SEARCH_MOVIES_START :
            return {
                ...state,
                isFetching: true
            }
        case GET_SEARCH_MOVIES_SUCCESS :
            return {
                ...state,
                movies: action.payload,
                isFetching: 'fetched'
            }
        case GET_SEARCH_MOVIES_FAILURE :
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        default :
            return state;
    }
}