
import { createContext, useState } from 'react' 
export const LayoutContext = createContext({}as LayoutObjectType);

export interface  LayoutObjectType {
    sidebarState:boolean,
    setSidebarState: (value: boolean) => void; 
}
//Provaider
export const LayoutProvider = ({children}:{children:any}) => {
    const [sidebarState, setSidebarState] = useState(true) 
    const escritorio = 'app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header';
   const mobile = 'app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header';
   let classNameDefault = '';
   if (screen.width > 1279) {
       classNameDefault = (sidebarState)?escritorio:escritorio+' closed-sidebar'; 
   }else{
       classNameDefault = (sidebarState)?mobile:mobile+' sidebar-mobile-open';  
   }
  return (
    <div className={classNameDefault}>
    <LayoutContext.Provider value={{sidebarState, setSidebarState }}>
        {children}
    </LayoutContext.Provider>
    </div>
  )
} 