import { GET_UPCOMING_START, GET_UPCOMING_SUCCESS, GET_UPCOMING_FAILURE } from '../../actions/types';

const initialState = {
    upcoming: [],
    isFetching: false,
    error: ''
}

export const upcomingReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_UPCOMING_START :
            return {
                ...state,
                isFetching: true
            }
        case GET_UPCOMING_SUCCESS :
            return {
                ...state,
                isFetching: 'fetched',
                upcoming: action.payload
            }
        case GET_UPCOMING_FAILURE :
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        default :
            return state;
    }
}