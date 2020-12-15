import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {getAuthenticatedUser} from "../../utils";

const PrivateRoute = ({component, ...rest}: any) => {
    const routeComponent = (props: any) => (
        getAuthenticatedUser()
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/login'}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};

export default PrivateRoute;