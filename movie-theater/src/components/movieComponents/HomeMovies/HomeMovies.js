import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MovieCarousel } from '../MovieCarousel/MovieCarousel';
import { getNowPlaying } from '../../../actions/movieActions/getNowPlaying';

const HomeMovies = ({ getNowPlaying, nowPlaying, isFetchingNowPlaying, errorNowPlaying }) => {

    useEffect(() => {
        getNowPlaying();
    }, [getNowPlaying]);

    if(isFetchingNowPlaying === 'fetched') {
        return(
            <div>
                <MovieCarousel movie={nowPlaying[0]} />
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
        errorNowPlaying: state.nowPlayingReducer.error
    }
}

export default connect(mapStateToProps, {getNowPlaying})(HomeMovies);