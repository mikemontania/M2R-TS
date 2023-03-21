
import { Navigate, Route, Routes } from 'react-router-dom';
import { UseItems } from '../hooks/UseItems';
export const MyRoutes = () => {
    const { rutas } = UseItems();

    console.log('misrutas', rutas);
    return (
        < >
            {<Routes>
                {
                    rutas.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)
                }
                <Route path="/*" element={<Navigate to={'/'} />} />
            </Routes>
            }
        </ >
    )
}