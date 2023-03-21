import { useContext } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { LayoutContext, LayoutObjectType } from '../Context/LayoutContext';
import { AiOutlineUser, AiOutlineSetting } from 'react-icons/ai';
export const HeaderComponent = () => {
    const classNameDefault = 'hamburger close-sidebar-btn hamburger--elastic ';
    const { setSidebarState, sidebarState } = useContext<LayoutObjectType>(LayoutContext);

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
            <div className="app-header__menu">
                <span>
                    <button type="button" className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                        <span className="btn-icon-wrapper">
                        </span>
                    </button>
                </span>
            </div>
            <div className="app-header__content">
                <div className="app-header-left">

                    <ul className="header-menu nav">
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                Statistics
                            </a>
                        </li>
                        <li className="btn-group nav-item">
                            <a href="#" className="nav-link">
                                Projects
                            </a>
                        </li>
                        <li className="dropdown nav-item">
                            <a href="#" className="nav-link">
                                Settings
                            </a>
                        </li>
                    </ul>        </div>
                <div className="app-header-right">
                    <div className="header-btn-lg pr-0">
                        <div className="widget-content p-0">
                            <div className="widget-content-wrapper">
                                <div className="widget-content-left">
                                    <div className="btn-group">
                                        <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                            className="p-0 btn">
                                            <img width="42" className="rounded-circle" src={reactLogo}
                                                alt="" />

                                        </a>
                                        <div role="menu" aria-hidden="true"
                                            className="dropdown-menu dropdown-menu-right">
                                            <button type="button" className="dropdown-item">User
                                                Account</button>
                                            <button type="button" className="dropdown-item">Settings</button>
                                            <h6 className="dropdown-header">Header</h6>
                                            <button type="button" className="dropdown-item">Actions</button>
                                            <div className="dropdown-divider"></div>
                                            <button type="button" className="dropdown-item">Dividers</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="widget-content-left  ml-3 header-user-info">
                                    <div className="widget-heading">
                                        Mike Montania                                    </div>
                                    <div className="widget-subheading">
                                        mikemontania@gmail.com
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
