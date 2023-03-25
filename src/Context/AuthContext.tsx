
import axios, { AxiosResponse } from 'axios';
import { createContext, useEffect, useReducer, useState } from 'react'
import { post } from '../Axios/AxiosService';
import { AuthActionTypes, ContextAuthType, GlobalData, User  } from '../Interfaces.ts/AuthInterface';
import { authReducer } from '../Login/AuthReducer'; 
 export const AuthContext = createContext({} as ContextAuthType);
 
const init = () => {
  console.log('INIT');

  const userLocal = localStorage.getItem('user');
  const user = (userLocal) ? JSON.parse(userLocal) : null;

 
   return {
    logged: !!user,
    user: user,
  }
};

//Provaider
export const AuthProvider = ({ children }: { children: any }) => {
  const [user, dispatch] = useReducer(authReducer, {}, init); 
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
  
  useEffect(() => {
    const storedGlobal = localStorage.getItem('globalData');

    if (storedGlobal) { 
        // Actualizar el estado del globalData
        setGlobalData(JSON.parse(storedGlobal)); 
     } else {
      // No hay token almacenado, llamar a la función logout para limpiar el estado 
      logout();
    }
  }, []);


  const login = async (body: User) => {
    try {
      const resp: AxiosResponse  = await post('/public/login', body); 
      if (resp.data) {
        setGlobalData( resp.data   )
        localStorage.setItem('globalData', JSON.stringify(resp.data ));
         dispatch({ type: AuthActionTypes.LOGIN});
         localStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error) {
      return false;
    }
    return true;
  }
  const logout = () => {
    localStorage.removeItem('globalData');
    localStorage.removeItem('user');
    setGlobalData(null);
    dispatch({ type: AuthActionTypes.LOGOUT });

  }
 
  return (

    <AuthContext.Provider value={{  globalData, user, login, logout }}>
      {children}
    </AuthContext.Provider>

  )
} 
 
