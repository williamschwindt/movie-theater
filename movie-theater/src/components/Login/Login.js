import React, { useEffect } from 'react';
import { getRequestToken } from '../../actions/accoutActions/getRequestToken';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavBar from '../navbar/NavBar';

const Login = ({ getRequestToken, token }) => {

    useEffect(() => {
        getRequestToken();
    }, [getRequestToken])

    return (
        <div className="login-container">
            <NavBar/>
            <div className="TMDB-login">
                <h1>Login With Your TMDB Accoout</h1>
                <a href={`https://www.themoviedb.org/authenticate/${token}?redirect=https://www.thefilmhouse.now.sh/approved`} rel="noopener noreferrer" target='_blank'>Login</a>
                <Link to="/">Back to browse</Link>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.requestTokenReducer.token
    }
}

export default connect(mapStateToProps, {getRequestToken})(Login);