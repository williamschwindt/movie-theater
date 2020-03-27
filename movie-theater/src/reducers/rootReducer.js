import { combineReducers } from 'redux';

import { getTrendingMovies } from './movieReducers/getTrendingMovies';
import { getPopularMovies } from './movieReducers/getPopularMovies';

export const rootReducer = combineReducers({
    getTrendingMovies,
    getPopularMovies
});