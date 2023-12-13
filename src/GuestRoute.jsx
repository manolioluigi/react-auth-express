/*
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from './AuthContext';

const GuestRoute = ({ element, ...props }) => {
    const { user } = useAuth();

    return user ? (
        <Navigate to="/" replace />
    ) : (
        <Route {...props} element={element} />
    );
};

export default GuestRoute;
*/
