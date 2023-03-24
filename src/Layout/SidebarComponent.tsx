import { Component, useContext, useState } from 'react'
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { LayoutObjectType, LayoutContext } from '../Context/LayoutContext';
import { Menu } from '../Interfaces.ts/Menu';
import { MenuItems } from '../types/Menu';
import { SidebarHeader } from './SidebarHeader';
import { Item } from '../Interfaces.ts/Item';


export const SidebarComponent = () => {
    const [menus, setMenus] = useState(MenuItems);
    //Todo el array de menus inicia con active false y solo uno puede quedar activo a la vez
    // handleMenuClick() seteara los menu que nos sean activados en falso
    const handleMenuClick = (name: string, activo: boolean) => {
        if (activo) {
            setMenus(MenuItems);
        } else {
            const updatedMenus = menus.map((m) => ((m.name === name) && (m.active == false)) ? { ...m, active: true } : { ...m, active: false });
            setMenus(updatedMenus);
        }
    };

    //Al seleccionar un item el handleItemClick() debe restaurar el array de menu por defauld (todos items y menus en falsos)
    // luego debe cambiar a activo el menu y item pasado por parameto esos seria los elementos activos
    const handleItemClick = (menu: Menu, path: string) => {
         let updatedMenus = MenuItems.map((m) => ((m.name === menu.name) && (m.active == false)) ? { ...m, active: true } : { ...m, active: false }); 
        setMenus(updatedMenus);
    };

    return (
        <div className="app-sidebar sidebar-shadow">
            <SidebarHeader />

            <div className="scrollbar-sidebar">
                <div className="app-sidebar__inner">
                    <ul className="vertical-nav-menu">
                        {
                             menus.map(menu =>
                            <li key={menu.name} className={menu.active ? "mm-active" : ""}   >
                                <NavLink key={menu.name} aria-expanded={menu.active} to={'#'} onClick={() => handleMenuClick(menu.name, menu.active)}  >
                                    <i className="metismenu-icon">
                                        <menu.Icon />
                                    </i>
                                    {menu.name}
                                    <i className="metismenu-state-icon    ">
                                        <AiOutlineDoubleRight />
                                    </i>
                                </NavLink>
                                <ul className={menu.active ? 'mm-collapse mm-show' : 'mm-collapse '}         >
                                    {
                                    menu.items.map(({ path, name  }) =>
                                        <li key={path}  >
                                            <NavLink to={path} className={({isActive})=>isActive? "mm-active" : ""} onClick={() => handleItemClick(menu, path)} >
                                                {name}
                                            </NavLink>
                                        </li>
                                    )
                                    }
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}
