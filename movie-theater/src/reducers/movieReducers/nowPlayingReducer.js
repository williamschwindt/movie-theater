import { GET_NOW_PLAYING_START, GET_NOW_PLAYING_SUCCESS, GET_NOW_PLAYING_FAILURE } from '../../actions/types';

const initialState = {
    nowPlaying: [],
    isFetching: false,
    error: ''
}

export const nowPlayingReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_NOW_PLAYING_START :
            return {
                ...state,
                isFetching: true
            }
        case GET_NOW_PLAYING_SUCCESS :
            return {
                ...state,
                isFetching: 'fetched',
                nowPlaying: action.payload
            }
        case GET_NOW_PLAYING_FAILURE :
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        default :
            return state;
    }
}