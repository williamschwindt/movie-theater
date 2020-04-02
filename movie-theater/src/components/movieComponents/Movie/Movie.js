import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMovieDetails } from '../../../actions/movieActions/getMovieDetails';
import { getMovieConfig } from '../../../actions/movieActions/getMovieConfig';

const Movie = (props) => {
    const { id } = props.match.params;
    const { getMovieDetails } = props;
    const { getMovieConfig } = props;
    const { config } = props;
    const { details } = props;

    useEffect(() => {
        getMovieDetails(id);
        getMovieConfig();
    }, [getMovieDetails, id, getMovieConfig])
    console.log(details);

    if(props.isFetching === 'fetched' && props.error === '') {
        return(
            <div className="movie">
                <a href="/" className="m-back"><ion-icon name="ios-arrow-back"/></a>
                <div className="movie-background" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${config}w1280${details.backdrop_path})`}}></div>
                    <div className="movie-details">  
                        <div className="image-box">
                            <img src={`${config}w1280${details.poster_path}`} alt="movie"/>
                                <div className="box-details">
                                    <h1>{details.title}</h1>
                                    <p className="rating">{details.vote_average}</p>
                                    <div className="genres">
                                        {details.genres.map(genre => {
                                            return (
                                                <p key={genre.id}>{genre.name}</p>
                                            )
                                        })}
                                    </div>
                                    <p>{Math.round(details.runtime / 60).toFixed(1)} hours</p>
                                </div>
                        </div>
                        <div className="summary-container">
                            <h2>Summary</h2>
                            <p>{details.overview}</p>
                        </div>
                    </div> 
            </div>
        )
    }

    return(
        <h1>waiting</h1>
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