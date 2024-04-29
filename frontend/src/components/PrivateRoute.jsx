import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust this path as necessary

function PrivateRoute({ children, role }) {
    const { isAuthenticated,userRole } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (role && userRole !== role) {
        // Redirect to unauthorized or dashboard
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

export default PrivateRoute; // Ensure this is a default export
