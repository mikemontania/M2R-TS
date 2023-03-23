import { Menu } from '../Interfaces.ts/Menu';
import { AiOutlineUser, AiOutlineSetting } from 'react-icons/ai';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { Dashboard } from '../Pages/Dashboard';
import { Usuarios } from '../Pages/Usuarios';
import { Configuracion } from '../Pages/Configuracion';
import { Parametros } from '../Pages/parametros';
export const MenuItems: Menu[] = [
    {
        name: 'Dashboard',
        Icon: MdOutlineSpaceDashboard,
        items: [
            {
                name: 'Dashboard',
                Component: Dashboard,
                to: '/',
                path: '/',
                esRutaHome: true
            }
        ]
    },
    {
        name: 'Usuarios',
        Icon: AiOutlineUser,
        items: [
            {
                name: 'Usuarios',
                Component: Usuarios,
                to: '/usuarios',
                path: '/usuarios',
                esRutaHome: false
            }
        ]
    },
    {
        name: 'Configuración',
        Icon: AiOutlineSetting,
        items: [
            {
                name: 'Configuración',
                Component: Configuracion,
                to: '/configuracion',
                path: '/configuracion',
                esRutaHome: false
            },
            {
                name: 'Parametros',
                Component: Parametros,
                to: '/parametros',
                path: '/parametros',
                esRutaHome: false
            }
            
        ]
    }
]
