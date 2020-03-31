import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MovieCarousel } from '../MovieCarousel/MovieCarousel';
import { getNowPlaying } from '../../../actions/movieActions/getNowPlaying';
import { getMovieConfig } from '../../../actions/movieActions/getMovieConfig';

const HomeMovies = ({ getNowPlaying, getMovieConfig, nowPlaying, isFetchingNowPlaying, errorNowPlaying, config }) => {

    useEffect(() => {
        getNowPlaying();
        getMovieConfig();
    }, [getNowPlaying, getMovieConfig]);

    if(isFetchingNowPlaying === 'fetched') {
        return(
            <div className="home-movies">
                <h1>Now Playing</h1>
                <MovieCarousel config={config} movies={nowPlaying} />
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

        config: state.movieConfigReducer.config
    }
}

export default connect(mapStateToProps, {getNowPlaying, getMovieConfig})(HomeMovies);