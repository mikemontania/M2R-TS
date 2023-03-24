
import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { SidebarMenuItemsProps } from '../Interfaces.ts/Item';
export const SidebarMenuItems = ({ navItems, setMenuActive, activeMenu }: SidebarMenuItemsProps) => {
    {
        const [itemsState, setItems] = useState(navItems);

        

        const handleItemClick = (path: string, activo: boolean) => {
            if (activo) {
                setMenuActive(true);
                 setItems(navItems);
            } else {
                const updatedItems = navItems.map((i) => ((i.path === path) && (i.active == false)) ? { ...i, active: true } : { ...i, active: false }
                );
                setItems(updatedItems);
            }
        };

        return (
            <>
                {
                    itemsState.map(({ path, name, active }) =>
                        <li key={path}  >
                            <NavLink to={path} className={active ? "mm-active" : ""} onClick={() => handleItemClick(path, active)} >
                                {name}
                            </NavLink>
                        </li>
                    )
                }
            </>
        )
    }
}