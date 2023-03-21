import { Menu } from './Interfaces.ts/MenuItems';
import { AiOutlineUser, AiOutlineSetting } from 'react-icons/ai';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { Dashboard } from './Pages/Dashboard';
import { Usuarios } from './Pages/Usuarios';
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
                name: 'Configuración 1',
                Component: Usuarios,
                to: '/configuracion',
                path: '/configuracion',
                esRutaHome: false
            },
            {
                name: 'Configuración 2',
                Component: Usuarios,
                to: '/configuracion',
                path: '/configuracion',
                esRutaHome: false
            }
            , {
                name: 'Configuración 3',
                Component: Usuarios,
                to: '/configuracion',
                path: '/configuracion',
                esRutaHome: false
            }
        ]
    }
]
