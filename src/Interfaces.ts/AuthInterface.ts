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
   }
   

export interface AuthState  {
     logged: boolean, 
}
 
export interface GlobalData {
    username: string,
    authdata: string,
    rol: string,
    roles: string,
    empresas: number,
    sucursales: number
} 
export interface ContextAuthType {
    globalData:GlobalData | null,
    user: AuthState,
    login: (body: User) => Promise<boolean>,
    logout: any 
}