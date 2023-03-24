import { useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { useLocation } from "react-router-dom";

export const SidebarItem = ({path, name}:{path: string,   name: string}) => {
    {
        const location = useLocation() 
         return ( 
                    <NavLink to={path} className={(location.pathname == path) ? 'mm-active' : ''} >
                         {name}
                    </NavLink> 
         )
    }
}