import { combineReducers } from 'redux';

import { movieConfigReducer } from './movieReducers/movieConfigReducer';
import { trendingMoviesReducer } from './movieReducers/trendingMoviesReducer';
import { popularMoviesReducer } from './movieReducers/popularMoviesReducer';
import { movieGenresRuducer } from './movieReducers/movieGenresRuducer';

export const rootReducer = combineReducers({
    movieConfigReducer,
    trendingMoviesReducer,
    popularMoviesReducer,
    movieGenresRuducer
});