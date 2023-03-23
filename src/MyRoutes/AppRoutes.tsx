import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { LayoutProvider } from '../Context/LayoutContext';
import { UseItems } from '../hooks/UseItems'; 
import { LoginPage } from '../Login/Login';
import { PagesRoutes } from './PagesRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
export const AppRouter = () => {
    const { rutas } = UseItems();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login/*" element={
                    <PublicRoute>

                        <Routes>
                            <Route path="/*" element={<LoginPage />} />
                        </Routes>
                    </PublicRoute>
                }
                />
                <Route path="/*" element={
                    <PrivateRoute>
                        <PagesRoutes/>
                    </PrivateRoute>
                } />
            </Routes>

        </BrowserRouter>
    )
}