import React from 'react'
import {connect} from 'react-redux';
import { Redirect, Route } from 'react-router-dom'

const mapStateToProps = state => {
    return state
}

let user

const PrivateRoute = ({ component: Component, ...rest }) => {

    if(this.props.user) {
        user = this.props.user
    } else {
        user = null
    }
    return (
        <Route
        {...rest}
        render={props =>
            user ? (
            <Component {...props} />
            ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )
        }
        />
    )
}

export default connect(mapStateToProps)(PrivateRoute);