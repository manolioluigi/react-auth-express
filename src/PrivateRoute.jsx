import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children, ...props }) => {
    const { user } = useAuth();

    return user ? (
        children
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateRoute;

