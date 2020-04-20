import React, { useEffect, useState } from 'react';
import { getDiscoverMovies } from '../../../actions/movieActions/getDiscoverMovies';
import { getMovieConfig } from '../../../actions/movieActions/getMovieConfig';
import { connect } from 'react-redux';
import NavBar from '../../navbar/NavBar';
import { Footer } from '../../Footer/Footer';
import { Link } from 'react-router-dom'; 

const DiscoverMovies = ({ getDiscoverMovies, getMovieConfig, discoverMovies, isFetchingDiscoverMovies, errorDiscoverMovies, config }) => {
    let currentTime = new Date();
    let currYear = currentTime.getFullYear();
    const [page, setPage] = useState(1);
    
    const [discoverState, setDiscoverState] = useState({
        filter: "popularity.desc",
        year: currYear,
        vote: 0
    })

    useEffect(() => {
        getDiscoverMovies("popularity.desc", 1, currYear, 0);
        getMovieConfig();
    }, [getDiscoverMovies, getMovieConfig, currYear])

    const nextPage = () => {
        if(page < 500) {
            getDiscoverMovies(discoverState.filter, page +1, discoverState.year, discoverState.vote);
            setPage(page + 1);
        }
    }

    const previousPage = () => {
        if(page > 1) {
            getDiscoverMovies(discoverState.filter, page -1, discoverState.year, discoverState.vote);
            setPage(page - 1);
        }
    }

    const changeHandler = (e) => {
        setDiscoverState({
            ...discoverState,
            [e.target.name]: e.target.value
        })
    }

    const search = (e) => {
        e.preventDefault();
        getDiscoverMovies(discoverState.filter, 1, discoverState.year, discoverState.vote)
        setPage(1);
    }


    if(isFetchingDiscoverMovies === 'fetched') {
        return (
            <div className="discover">
                <NavBar />
                <h1 id="discover-title">Discover</h1>
                <form className="search-filter-bar">
                    <div>
                        <select name="filter" onChange={changeHandler}>
                            <option value="" disabled selected>filters</option>
                            <option value="popularity.asc">Popularity Ascending</option>
                            <option value="popularity.desc">Popularity Descending</option>
                            <option value="revenue.asc">Revenue Ascending</option>
                            <option value="revenue.desc">Revenue Descending</option>
                            <option value="vote_average.asc">Vote Average Ascending</option>
                            <option value="vote_average.desc">Vote Average Descending</option>
                        </select>
                        <input name="year" placeholder="year" onChange={changeHandler}/>
                        <input name="vote" placeholder="rating" onChange={changeHandler}/>
                    </div>
                    <button onClick={search}>Search</button>
                    <h2>page: {page}</h2>
                </form>
                <div className="discover-movies">
                    {discoverMovies.map(movie => {
                        return(
                            <Link to={`/discovermovie/${movie.id}`}key={movie.id} className="discover-movie">
                                <img src={`${config}w200${movie.poster_path}`} alt={movie.title} />
                            </Link>
                        )
                    })}
                </div>
                <div className="discover-btns">
                    <button id="discover-next" onClick={previousPage}><ion-icon name="ios-arrow-back"/> <span>prev</span></button>
                    <button id="discover-prev" onClick={nextPage}><span>next</span><ion-icon name="ios-arrow-forward"/></button>
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