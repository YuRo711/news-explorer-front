import React from "react";
import { Navigate , Route } from "react-router-dom";

function ProtectedRoute(props) {
    if (!props.isLoggedIn) {
        return <Navigate to="/"/>;
    }
    return (
        <Route path={props.path}>
            {props.children}
        </Route>
    );
}

export default ProtectedRoute;