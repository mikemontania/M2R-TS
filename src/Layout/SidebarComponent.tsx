import { Component, useContext, useState } from 'react'
import { LayoutObjectType, LayoutContext } from '../Context/LayoutContext';
import { MenuItems } from '../types/Menu';
import { SidebarMenu } from './SidebarMenu';


export const SidebarComponent = () => {
    const classNameDefault = 'hamburger hamburger--elastic mobile-toggle-nav ';
    const { sidebarState } = useContext<LayoutObjectType>(LayoutContext);
    const [menus, setMenus] = useState(MenuItems);
    const handleItemClick = (name: string, activo: boolean) => {
        if (activo) {
            setMenus(MenuItems);
        } else {
            const updatedItems = MenuItems.map((i) => ((i.name === name) && (i.active == false)) ? { ...i, active: true } : { ...i, active: false }
            );
            setMenus(updatedItems);
        }
    };

    return (
        <div className="app-sidebar sidebar-shadow">
            <div className="app-header__logo">
                <div className="logo-src"></div>
                <div className="header__pane ml-auto">
                    <div>
                        <button type="button" className="hamburger close-sidebar-btn hamburger--elastic">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="app-header__mobile-menu">
                <div>
                    <button type="button" className={(sidebarState) ? classNameDefault + 'is-active' : classNameDefault}>
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
            </div>

            <div className="scrollbar-sidebar">
                <div className="app-sidebar__inner">
                    <ul className="vertical-nav-menu">
                        {menus.map(menu =>
                            <li key={menu.name} className={menu.active ? "mm-active" : ""} onClick={() => handleItemClick(menu.name, menu.active)}  >
                                <SidebarMenu Icon={menu.Icon} name={menu.name} items={menu.items} key={menu.name} active={menu.active} />
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}
