import React, { useContext } from 'react'
import { LayoutContext } from '../Context/LayoutContext';
import { LayoutObjectType } from '../Interfaces.ts/AuthInterface';

export const SidebarHeader = () => {
    const classNameDefault = 'hamburger hamburger--elastic mobile-toggle-nav ';
    const { sidebarState } = useContext<LayoutObjectType>(LayoutContext);
  return (
    <>
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
    </>
  )
}
