import {   AuthAction, AuthActionTypes, AuthState } from "../Interfaces.ts/AuthInterface";

 
const initialState: AuthState = {
    logged: false ,
   
  };

export const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
      case AuthActionTypes.LOGIN:
        return {
          ...state,
          logged: true, 
        };
      case AuthActionTypes.LOGOUT:
        return {
          ...state,
          logged: false, 
        };
      default:
        return state;
    }
  }; 