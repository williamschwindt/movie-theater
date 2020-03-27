import axios from 'axios';
import { GET_MOVIE_CONFIG } from '../types';

export const getMovieConfig = () => dispatch => {
    axios
    .get("https://api.themoviedb.org/3/configuration?api_key=f45d181e4568e696ff8f68048d522dc8")
    .then(res => {
        dispatch({ type: GET_MOVIE_CONFIG, payload: res.data.images.secure_base_url })
    })
}
