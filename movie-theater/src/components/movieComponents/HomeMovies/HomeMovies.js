import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MovieCarousel } from '../MovieCarousel/MovieCarousel';
import { getNowPlaying } from '../../../actions/movieActions/getNowPlaying';
import { getMovieConfig } from '../../../actions/movieActions/getMovieConfig';
import { getUpcoming } from '../../../actions/movieActions/getUpcoming';
import { getPopularMovies } from '../../../actions/movieActions/getPopularMovies';

const HomeMovies = ({ getNowPlaying, getMovieConfig, getUpcoming, getPopularMovies,
    nowPlaying, isFetchingNowPlaying, errorNowPlaying, 
    upcoming, isFetchingUpcoming, errorUpcoming,
    popularMovies, isFetchingPopularMovies, errorPopularMovies,
    config }) => {

    useEffect(() => {
        getNowPlaying();
        getMovieConfig();
        getUpcoming();
        getPopularMovies();
    }, [getNowPlaying, getMovieConfig, getUpcoming, getPopularMovies]);

    if(isFetchingNowPlaying && isFetchingUpcoming && isFetchingPopularMovies === 'fetched') {
        return(
            <div className="home-movies">
                <h1>Now Playing</h1>
                <MovieCarousel config={config} movies={nowPlaying} class={"now-playing-movies"}/>
                <h1>Popular</h1>
                <MovieCarousel config={config} movies={popularMovies} class={"popular-movies"}/>
                <h1>Upcoming</h1>
                <MovieCarousel config={config} movies={upcoming} class={"upcoming-movies"}/>
            </div>
        )
    }

    if(errorNowPlaying || errorUpcoming || errorPopularMovies) {
        return(
            <h1>There was a problem loading this page</h1>
        )
    }

    return (
        <h1>waiting</h1>
    )
}

const mapStateToProps = (state) => {
    return {
        nowPlaying: state.nowPlayingReducer.nowPlaying,
        isFetchingNowPlaying: state.nowPlayingReducer.isFetching,
        errorNowPlaying: state.nowPlayingReducer.error,

        upcoming: state.upcomingReducer.upcoming,
        isFetchingUpcoming: state.upcomingReducer.isFetching,
        errorUpcoming: state.upcomingReducer.error,

        popularMovies: state.popularMoviesReducer.popularMovies,
        isFetchingPopularMovies: state.popularMoviesReducer.isFetching,
        errorPopularMovies: state.popularMoviesReducer.error,

        config: state.movieConfigReducer.config
    }
}

export default connect(mapStateToProps, {getNowPlaying, getUpcoming, getPopularMovies, getMovieConfig})(HomeMovies);