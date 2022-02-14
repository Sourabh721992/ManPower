import React from 'react';
import {
    withRouter,
    Route,
    Redirect
} from 'react-router-dom';
import UserProfile from '../../utils/UserProfile';

// const AllowedAccessList = [];

const PrivateRoute = ({
    component: Component,
    ...rest
}) => (<Route {...rest}
    render={
        props => {
            return (
                UserProfile.isLoggedOn() ? <Component {...props} /> :
                    <Redirect to={{
                        pathname: "",
                        state: { from: props.location }
                    }} />
            )
        }
    }
/>
)

export default withRouter(PrivateRoute)