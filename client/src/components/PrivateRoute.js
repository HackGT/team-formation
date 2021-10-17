import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect
} from "react-router-dom";
import isLogin from "../utils";

const PrivateRoute = async ({
    component: Component,
    ...rest
}) => {
    const authed = await isLogin().then(authed => {
        return authed;
    })
    return (<Route {...rest} render={(
            props) => authed
            ? <Component {...props}/>
            : <Redirect to={{
                    pathname: '/login',
                    state: {
                        from: props.location
                    }
                }}/>}/>)
}

export default PrivateRoute;
