import { GET_POPULAR_MOVIES_START, GET_POPULAR_MOVIES_SUCCESS, GET_POPULAR_MOVIES_FAILURE } from '../../actions/types';

const initialState = {
    popularMovies: [],
    isFetching: false,
    error: ''
}

export const popularMoviesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_POPULAR_MOVIES_START :
            return {
                ...state,
                isFetching: true
            }
        case GET_POPULAR_MOVIES_SUCCESS :
            return {
                ...state,
                isFetching: 'fetched',
                popularMovies: action.payload
            }
        case GET_POPULAR_MOVIES_FAILURE :
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        default :
            return state;
    }
}