import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from '../Interfaces.ts/Menu';
import { SidebarItems } from './SidebarItems';

export const SidebarMenu = (menu: Menu) => {
    const [active, setActive] = useState(false);
    return (

        <li key={menu.name} onClick={() => setActive(!active)} className={active ? 'mm-active' : ''}       >

            <NavLink key={menu.name} aria-expanded={active} to={'#'}   >
                <i className="metismenu-icon">
                    <menu.Icon />
                </i>
                {menu.name}
                <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
            </NavLink>
            { 
                menu.items.map(({ path, name, }) =>
                    <SidebarItems key={path} path={path} active={active} name={name} />

                )
            }


        </li>

    )


}
