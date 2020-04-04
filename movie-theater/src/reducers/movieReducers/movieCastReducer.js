import { GET_MOVIE_CAST_START, GET_MOVIE_CAST_SUCCESS, GET_MOVIE_CAST_FAILURE } from '../../actions/types';

const initialState = {
    cast: [],
    isFetching: false,
    error: ''
}

export const movieCastReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_MOVIE_CAST_START :
            return {
                ...state,
                isFetching: true
            }
        case GET_MOVIE_CAST_SUCCESS :
            return {
                ...state,
                cast: action.payload,
                isFetching: 'fetched'
            }
        case GET_MOVIE_CAST_FAILURE :
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        default :
            return state;
    }
}