import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ContextAuthType } from '../Interfaces.ts/AuthInterface';
import { AuthContext } from '../Context/AuthContext';



export const PrivateRoute = ({ children }: { children: any }) => {
    const { user }: ContextAuthType = useContext(AuthContext);
    console.log('ruta privada');
    console.log(user);
    return (user?.logged) ? children : <Navigate to="/login" />
}
