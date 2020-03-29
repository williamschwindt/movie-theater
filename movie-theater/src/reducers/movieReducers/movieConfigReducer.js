import { GET_MOVIE_CONFIG } from '../../actions/types';

const initialState = {
    config: ""
}

export const movieConfigReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_MOVIE_CONFIG :
            return {
                ...state,
                config: action.payload
            }
        default :
            return state
    }
}