import { Routes, Route, Navigate } from 'react-router-dom';
import { LayoutProvider } from '../Context/LayoutContext';
import { UseItems } from '../hooks/UseItems';
import { HeaderComponent } from '../Layout/HeaderComponent';
import { SidebarComponent } from '../Layout/SidebarComponent';
 
export const PagesRoutes = () => {
    const { rutas } = UseItems();
    return ( 
        <LayoutProvider> 
            <HeaderComponent />
            <div className="app-main">
                <SidebarComponent />
                <div className="app-main__outer">
                    <div className='bodycontainer'>
                        {<Routes>
                            {
                                rutas.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)
                            }
                            <Route path="/*" element={<Navigate to={'/'} />} />
                        </Routes>
                        }
                    </div>
                </div>
            </div> 
        </LayoutProvider> 
    )
}