import {   useContext, useState } from 'react'
import { LayoutContext } from '../Context/LayoutContext';
import { LayoutObjectType } from '../Interfaces.ts/AuthInterface';
 import { MenuItems } from '../types/Menu';
import { SidebarMenu } from './SidebarMenu';

export const SidebarComponent = () => {
    const classNameDefault = 'hamburger hamburger--elastic mobile-toggle-nav ';
    const { sidebarState } = useContext<LayoutObjectType>(LayoutContext);
    const [active, setActive] = useState(false);
    console.log('sidebarState', sidebarState);
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
                        {MenuItems.map(menu =>
                            <SidebarMenu Icon={menu.Icon} name={menu.name} items={menu.items} key={menu.name} />
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}
