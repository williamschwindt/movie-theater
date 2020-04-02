import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMovieDetails } from '../../../actions/movieActions/getMovieDetails';
import { getMovieConfig } from '../../../actions/movieActions/getMovieConfig';

const Movie = (props) => {
    const { id } = props.match.params;
    const { getMovieDetails } = props;
    const { getMovieConfig } = props;
    const { config } = props;

    useEffect(() => {
        getMovieDetails(id);
        getMovieConfig();
    }, [getMovieDetails, id, getMovieConfig])
    console.log(props.details);

    return(
        <img src={`${config}w1280${props.details.poster_path}`} alt="movie"/>
    )
}

const mapStateToProps = state => {
    return {
        details: state.movieDetailsRuducer.details,
        isFetching: state.movieDetailsRuducer.isFetching,
        error: state.movieDetailsRuducer.error,

        config: state.movieConfigReducer.config
    }
}

export default connect(mapStateToProps, {getMovieDetails, getMovieConfig})(Movie);