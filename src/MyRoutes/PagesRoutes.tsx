import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LayoutProvider } from '../Context/LayoutContext';
import { UseItems } from '../hooks/UseItems';
import { HeaderComponent } from '../Layout/HeaderComponent';
import { SidebarComponent } from '../Layout/SidebarComponent';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const PagesRoutes = () => {
    const { rutas } = UseItems();
    const location = useLocation();
    const navigate = useNavigate();
    // Almacenar la ruta actual en LocalStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('rutaActual', location.pathname);
    }, [location.pathname]);
    // Obtener la ruta actual de LocalStorage al cargar la página
    useEffect(() => {
        const rutaActual = localStorage.getItem('rutaActual');
        if (rutaActual) {
            navigate(rutaActual);
        }
    }, []);
    return (
        <LayoutProvider>
            <HeaderComponent />
            <div className="app-main">
                <SidebarComponent />
                <div className="app-main__outer">
                    <div className='bodycontainer'>
                        <div className="app-main__inner">

                            {<Routes>
                                {
                                    rutas.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)
                                }
                                <Route path="/*" element={<Navigate to={'/'} />} />
                            </Routes>
                            }
                        </div>
                        <div className="app-wrapper-footer">
                            {/*   <div className="app-footer">
                    <div className="app-footer__inner">
                        <div className="app-footer-left">
                            <ul className="nav">
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        Footer Link 1
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        Footer Link 2
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="app-footer-right">
                            <ul className="nav">
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        Footer Link 3
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <div className="badge badge-success mr-1 ml-0">
                                            <small>NEW</small>
                                        </div>
                                        Footer Link 4
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </LayoutProvider>
    )
}