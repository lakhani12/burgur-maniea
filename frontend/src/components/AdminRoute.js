import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const user = useSelector(state => state.user);
    
    if (!user?.user || !user.user.isAdmin) {
        return <Navigate to="/" replace />;
    }
    
    return children;
};

export default AdminRoute;
