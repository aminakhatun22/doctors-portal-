import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, } = useContext(AuthContext);
    const location = useLocation();
    // if (loading) {
    //     return <progress className='progress w-56'></progress>
    // }
    if (user) {
        return children;
    }
    return <Navigate t="/login" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;