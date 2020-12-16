import { combineReducers } from 'redux';

import { movieConfigReducer } from './movieReducers/movieConfigReducer';
import { trendingMoviesReducer } from './movieReducers/trendingMoviesReducer';
import { popularMoviesReducer } from './movieReducers/popularMoviesReducer';
import { movieGenresRuducer } from './movieReducers/movieGenresRuducer';
import { nowPlayingReducer } from './movieReducers/nowPlayingReducer';
import { upcomingReducer } from './movieReducers/upcomingReducer';
import { movieDetailsRuducer } from './movieReducers/movieDetailsReducer';
import { movieCastReducer } from './movieReducers/movieCastReducer';
import { movieReviewReducer } from './movieReducers/movieReviewReducer';
import { discoverMoviesReducer } from './movieReducers/discoverMoviesReducer';
import { searchMoviesReducer } from './movieReducers/searchMoviesReducer';
import { requestTokenReducer } from './accoutReducers/requestTokenReducer';
import { sessionIdReducer } from './accoutReducers/sessionIdReducer';

export const rootReducer = combineReducers({
    movieConfigReducer,
    trendingMoviesReducer,
    popularMoviesReducer,
    movieGenresRuducer,
    nowPlayingReducer,
    upcomingReducer,
    movieDetailsRuducer,
    movieCastReducer,
    movieReviewReducer,
    discoverMoviesReducer,
    searchMoviesReducer,
    requestTokenReducer,
    sessionIdReducer,
});