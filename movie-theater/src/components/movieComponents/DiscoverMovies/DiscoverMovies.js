import React, { useEffect } from 'react';
import { getDiscoverMovies } from '../../../actions/movieActions/getDiscoverMovies';
import { connect } from 'react-redux';

const DiscoverMovies = ({ getDiscoverMovies }) => {
    useEffect(() => {
        getDiscoverMovies("popularity.desc")
    }, [])

    return (
        <div>
            test
        </div>
    )
}

 const mapStateToProps = state => {
     return {
         discoverMovies: state.discoverMoviesReducer.movies,
         isFetchingDiscoverMovies: state.discoverMoviesReducer.isFetching,
         errorDiscoverMovies: state.discoverMoviesReducer.error
     }
 }

export default connect(mapStateToProps, {getDiscoverMovies})(DiscoverMovies);