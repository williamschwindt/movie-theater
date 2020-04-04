import { GET_MOVIE_REVIEW_START, GET_MOVIE_REVIEW_SUCCESS, GET_MOVIE_REVIEW_FAILURE } from '../../actions/types';

const initialState = {
    reviews: [],
    isFetching: false,
    error: ''
}

export const movieReviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_MOVIE_REVIEW_START :
            return {
                ...state,
                isFetching: true
            }
        case GET_MOVIE_REVIEW_SUCCESS :
            return {
                ...state,
                reviews: action.payload,
                isFetching: 'fetched'
            }
        case GET_MOVIE_REVIEW_FAILURE :
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        default :
            return state;
    }
}