import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTrendingMovies } from '../../actions/movieActions/getTrendingMovies';
import { getMovieConfig } from '../../actions/movieActions/getMovieConfig';

const TrendingMovies = ({ getTrendingMovies, getMovieConfig, trendingMovies, isFetching, error, config }) => {
    console.log(config);
    useEffect(() => {
        getTrendingMovies();
        getMovieConfig();
    },[getTrendingMovies, getMovieConfig])

    if(isFetching === true) {
        return(
            <h1>waiting</h1>
        )
    }

    if(error) {
        return (
            <h1>There was an error loading this page</h1>
        )
    }

    const movieConfig = config;
    const movies = trendingMovies.slice(0,3);

    return(
        <div>
            {movies.map(movie => {
                return(
                    <div key={movie.id}>
                        <h1>{movie.title}</h1>
                        <img src={`${movieConfig}w1280${movie.backdrop_path}`} />
                    </div>
                )
            })}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        trendingMovies: state.getTrendingMovies.trendingMovies,
        isFetching: state.isFetching,
        error: state.error,
        config: state.getMovieConfig.config
    }
}

export default connect(mapStateToProps, {getTrendingMovies, getMovieConfig})(TrendingMovies);