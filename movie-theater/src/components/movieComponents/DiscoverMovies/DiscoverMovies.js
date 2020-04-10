import React, { useEffect } from 'react';
import { getDiscoverMovies } from '../../../actions/movieActions/getDiscoverMovies';
import { getMovieConfig } from '../../../actions/movieActions/getMovieConfig';
import { connect } from 'react-redux';
import { NavBar } from '../../navbar/NavBar';
import { Footer } from '../../Footer/Footer';
import { Link } from 'react-router-dom'; 

const DiscoverMovies = ({ getDiscoverMovies, getMovieConfig, discoverMovies, isFetchingDiscoverMovies, errorDiscoverMovies, config }) => {

    useEffect(() => {
        getDiscoverMovies("popularity.desc");
        getMovieConfig();
    }, [getDiscoverMovies, getMovieConfig])

    if(isFetchingDiscoverMovies === 'fetched') {
        return (
            <div className="discover">
                <NavBar />
                <h1 id="discover-title">Discover</h1>
                <form className="search-filter-bar">
                    <div>
                        <select>
                            <option value="" disabled selected>Add A Filter</option>
                            <option>Popularity Ascending</option>
                            <option>Popularity Descending</option>
                            <option>Release Date Ascending</option>
                            <option>Release Date Descending</option>
                            <option>Revenue Ascending</option>
                            <option>Revenue Descending</option>
                            <option>Vote Average Ascending</option>
                            <option>Vote Average Descending</option>
                        </select>
                        <input placeholder="title"/>
                    </div>
                    <button>Search</button>
                </form>
                <div className="discover-movies">
                    {discoverMovies.map(movie => {
                        return(
                            <Link to={`/discovermovie/${movie.id}`}key={movie.id} className="discover-movie">
                                <img src={`${config}w200${movie.poster_path}`} alt="movie" />
                            </Link>
                        )
                    })}
                </div>
                <Footer />
            </div>
        )
    }

    if(isFetchingDiscoverMovies === true) {
        return (
            <div className="discover">
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }

    return (
        <h1>There was a problem loading this page</h1>
    )
}

 const mapStateToProps = state => {
     return {
         discoverMovies: state.discoverMoviesReducer.movies,
         isFetchingDiscoverMovies: state.discoverMoviesReducer.isFetching,
         errorDiscoverMovies: state.discoverMoviesReducer.error,

         config: state.movieConfigReducer.config
     }
 }

export default connect(mapStateToProps, {getDiscoverMovies, getMovieConfig})(DiscoverMovies);