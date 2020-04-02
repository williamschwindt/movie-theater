import { GET_TRENDING_MOVIES_START, GET_TRENDING_MOVIES_SUCCESS, GET_TRENDING_MOVIES_FAILURE } from '../../actions/types';

const initialState = {
    trendingMovies: [],
    isFetching: false,
    error: ''
}

export const trendingMoviesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TRENDING_MOVIES_START :
            return {
                ...state,
                isFetching: true
            }
        case GET_TRENDING_MOVIES_SUCCESS : 
            return {
                ...state,
                trendingMovies: action.payload,
                isFetching: 'fetched'
            }
        case GET_TRENDING_MOVIES_FAILURE :
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        default :
            return state
    }
}