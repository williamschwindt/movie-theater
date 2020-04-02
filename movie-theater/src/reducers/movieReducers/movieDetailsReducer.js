import { GET_MOVIE_DETAILS_START, GET_MOVIE_DETAILS_SUCCESS, GET_MOVIE_DETAILS_FAILURE } from '../../actions/types';

const initialState = {
    details: {this: "test"},
    isFetching: false,
    error: ''
}

export const movieDetailsRuducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_MOVIE_DETAILS_START :
            return {
                ...state,
                isFetching: true
            }
        case GET_MOVIE_DETAILS_SUCCESS :
            return {
                ...state,
                details: action.payload,
                isFetching: 'fetched'
            }
        case GET_MOVIE_DETAILS_FAILURE :
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        default :
            return state;
    }
}