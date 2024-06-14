import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  if (!props.isLoggedIn) {
    return <Navigate to="/" />;
  }
  return <div className="protected-route">{props.children}</div>;
}

export default ProtectedRoute;
