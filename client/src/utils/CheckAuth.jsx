import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CheckAuth = ({ children }) => {
    const isAuthorized = useSelector((state) => state.auth.isAuthorized);

    return isAuthorized ? children : <Navigate to="/login" replace={true} />;
};

export default CheckAuth;
