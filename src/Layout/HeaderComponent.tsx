import { useContext } from 'react'
import reactLogo from '../assets/react.svg' 
import { LayoutContext, LayoutObjectType } from '../Context/LayoutContext'; 
import { NavLink } from 'react-router-dom';
import { ContextAuthType } from '../Interfaces.ts/AuthInterface';
import { AuthContext } from '../Context/AuthContext';
import { MdLogout } from 'react-icons/md';
export const HeaderComponent = () => {
    const classNameDefault = 'hamburger close-sidebar-btn hamburger--elastic ';
    const { setSidebarState, sidebarState } = useContext<LayoutObjectType>(LayoutContext);
    const { logout } = useContext<ContextAuthType>(AuthContext);

    return (
        <div className="app-header header-shadow">
            <div className="app-header__logo">
                <div className="logo-src">
                    <div className="d-inline-flex">
                        <img src={reactLogo} />
                        <h4>M2R/TS</h4>
                    </div>

                </div>
                <div className="header__pane ml-auto">
                    <div>
                        <button type="button" className={(sidebarState) ? classNameDefault + 'is-active' : classNameDefault} onClick={() => setSidebarState(!sidebarState)}>
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="app-header__mobile-menu">
                <div>
                    <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav" onClick={() => setSidebarState(!sidebarState)}>
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
            </div>

            <div className="app-header__content">
                <div className="app-header-left">

                    <ul className="header-menu nav">
                        <li className="nav-item">
                            <NavLink to='#' className="nav-link">
                                Statistics
                            </NavLink>
                        </li>
                        <li className="btn-group nav-item">
                            <NavLink to='#' className="nav-link">
                                Projects
                            </NavLink>
                        </li>
                        <li className="dropdown nav-item">
                            <NavLink to='#' className="nav-link">
                                Settings
                            </NavLink>
                        </li>
                    </ul>        </div>
                <div className="app-header-right">
                    <span onClick={logout}>
                        <MdLogout className='border-radius' />
                    </span>
                </div>
            </div>
        </div>
    )
}
