import { combineReducers } from 'redux';

import { getMovieConfig } from './movieReducers/getMovieConfig';
import { getTrendingMovies } from './movieReducers/getTrendingMovies';
import { getPopularMovies } from './movieReducers/getPopularMovies';

export const rootReducer = combineReducers({
    getMovieConfig,
    getTrendingMovies,
    getPopularMovies
});