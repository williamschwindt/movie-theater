import { GET_MOVIE_GENRES_START, GET_MOVIE_GENRES_SUCCESS, GET_MOVIE_GENRES_FAILURE } from '../../actions/types';

const initialState = {
    genres: [{
        id: 0,
        name: 'initial'
    }],
    isFetching: false,
    error: ''
}

export const movieGenresRuducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_MOVIE_GENRES_START :
            return {
                ...state,
                isFetching: true
            }
        case GET_MOVIE_GENRES_SUCCESS :
            return {
                ...state,
                genres: action.payload,
                isFetching: 'fetched'
            }
        case GET_MOVIE_GENRES_FAILURE :
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        default :
            return state;
    }
}