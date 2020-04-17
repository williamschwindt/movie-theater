import React, { useEffect } from 'react';
import { getRequestToken } from '../../actions/accoutActions/getRequestToken';
import { connect } from 'react-redux';

const Login = ({ getRequestToken, token }) => {

    useEffect(() => {
        getRequestToken();
    }, [getRequestToken])

    return (
        <a href={`https://www.themoviedb.org/authenticate/${token}?redirect=https://www.theflimhouse.now.sh/approved`} rel="noopener noreferrer" target='_blank'>Login With TMDB</a>
    )
}

const mapStateToProps = state => {
    return {
        token: state.requestTokenReducer.token
    }
}

export default connect(mapStateToProps, {getRequestToken})(Login);