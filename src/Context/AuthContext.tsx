
import { createContext, useReducer } from 'react'
import { AuthActionTypes, ContextAuthType, PayloadType, User, logout } from '../Interfaces.ts/AuthInterface';
import { authReducer } from '../Login/AuthReducer';
import { AuthService } from '../Service/auth/AuthService';
export const AuthContext = createContext({} as ContextAuthType);
const init = () => {
  console.log('INIT'); 

  const userLocal = localStorage.getItem('user');
   const user =  (userLocal)? JSON.parse(userLocal):null; 
  return {
    logged: !!user,
    user: user,
  } 
};

//Provaider
export const AuthProvider = ({ children }: { children: any }) => {
  const [user, dispatch] = useReducer(authReducer, {}, init);

  const login = async (body: User) => {
    try {
      const resp = await AuthService.login(body)
      console.log(resp)
      if (resp.data) {
        dispatch({ type: AuthActionTypes.LOGIN, payload: resp.data as PayloadType });
        localStorage.setItem('user', JSON.stringify(user)); 
      }
    } catch (error) {
      return false;
    }
    return true;
  }
  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: AuthActionTypes.LOGOUT });

  }



  return (

    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>

  )
} 