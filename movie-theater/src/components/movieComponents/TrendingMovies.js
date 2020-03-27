import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTrendingMovies } from '../../actions/movieActions/getTrendingMovies';

const TrendingMovies = ({ getTrendingMovies, trendingMovies, isFetching, error }) => {

    useEffect(() => {
        getTrendingMovies()
    },[getTrendingMovies])

    if(isFetching === true) {
        return(
            <h1>waiting</h1>
        )
    }

    const movies = trendingMovies.slice(0,3);

    return(
        <div>
            {movies.map(movie => {
                return(
                    <>
                        <h1>{movie.title}</h1>
                    </>
                )
            })}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        trendingMovies: state.getTrendingMovies.trendingMovies,
        isFetching: state.isFetching,
        error: state.error
    }
}

export default connect(mapStateToProps, {getTrendingMovies})(TrendingMovies);