import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, isAuthenticated, requiredRole }) => {


    // const token = localStorage.getItem("accessToken");
    const role = JSON.parse(localStorage.getItem("ADMIN"))?.role;

    if (!isAuthenticated || (requiredRole && role !== requiredRole)) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    requiredRole: PropTypes.string,
};


