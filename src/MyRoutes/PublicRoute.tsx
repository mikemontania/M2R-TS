import { useContext } from 'react';
import { Navigate  } from 'react-router-dom';
import { ContextAuthType } from '../Interfaces.ts/AuthInterface';
import { AuthContext } from '../Context/AuthContext';
 


export const PublicRoute = ( { children }: { children: any }) => {
console.log('RUTAS PUBLICAS')
    const { user }: ContextAuthType = useContext(AuthContext);
    console.log('Rutas Publicas')
    console.log(user)
    return (user?.logged)?<Navigate to="/" />:children
}
