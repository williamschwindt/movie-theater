import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MovieCarousel } from '../MovieCarousel/MovieCarousel';
import { getNowPlaying } from '../../../actions/movieActions/getNowPlaying';
import { getMovieConfig } from '../../../actions/movieActions/getMovieConfig';
import { getUpcoming } from '../../../actions/movieActions/getUpcoming';

const HomeMovies = ({ getNowPlaying, getMovieConfig, getUpcoming, 
    nowPlaying, isFetchingNowPlaying, errorNowPlaying, 
    upcoming, isFetchingUpcoming, errorUpcoming,
    config }) => {

    useEffect(() => {
        getNowPlaying();
        getMovieConfig();
        getUpcoming();
    }, [getNowPlaying, getMovieConfig, getUpcoming]);

    if(isFetchingNowPlaying === 'fetched') {
        return(
            <div className="home-movies">
                <h1>Now Playing</h1>
                <MovieCarousel config={config} movies={nowPlaying} class={"now-playing-movies"}/>
                <h1>Upcoming</h1>
                <MovieCarousel config={config} movies={upcoming} class={"upcoming-movies"}/>
            </div>
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

        config: state.movieConfigReducer.config
    }
}

export default connect(mapStateToProps, {getNowPlaying, getUpcoming, getMovieConfig})(HomeMovies);