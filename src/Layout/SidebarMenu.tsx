 
import { useState } from 'react';
import {   AiOutlineDoubleRight } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { Menu } from '../Interfaces.ts/Menu'; 
import { SidebarMenuItems } from './SidebarMenuItems';
export const SidebarMenu = (menu: Menu) => {  
    const [active, setActive] = useState(menu.active)
    return ( 
        <  > 
            <NavLink key={menu.name} aria-expanded={active} to={'#'}  onClick={()=>setActive(!active)}  >
                <i className="metismenu-icon">
                    <menu.Icon />
                </i>
                {menu.name}
                <i className="metismenu-state-icon    ">
                    <AiOutlineDoubleRight />
                </i>
            </NavLink>
            <ul className={active ? 'mm-collapse mm-show' : 'mm-collapse '}         > 
            <SidebarMenuItems navItems={menu.items} setMenuActive={setActive} activeMenu={active}/> 
            </ul> 
        </ > 
    )


}
