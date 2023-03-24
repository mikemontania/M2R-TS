export interface LayoutObjectType {
    sidebarState: boolean,
    setSidebarState: (value: boolean) => void;
}

export interface User {
    name?: string,
    username: string,
    password: string,
    repeatPassword?: string
}
 
export interface login {
    login: string;
}
export interface logout {
    logout: string;
}

export enum AuthActionTypes {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
  }
  
  export interface AuthAction {
    type: AuthActionTypes;
    payload?: PayloadType;
  }
   

export interface AuthState  {
     logged: boolean,
    payload?: PayloadType
}
 
export interface PayloadType {
    username: string,
    authdata: string,
    rol: string,
    roles: string,
    empresas: number,
    sucursales: number
} 
export interface ContextAuthType {
    user?: {
        logged: boolean,
    }
    login: (body: User) => Promise<boolean>,
    logout: any 
}