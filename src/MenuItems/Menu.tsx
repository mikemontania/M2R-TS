import { Menu } from '../Interfaces.ts/Menu';
import { AiOutlineUser, AiOutlineSetting } from 'react-icons/ai';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { Dashboard } from '../Pages/Dashboard';
import { Usuarios } from '../Pages/Usuarios';
import { Configuracion } from '../Pages/Configuracion';
import { Parametros } from '../Pages/parametros'; 
import Empleados from '../Pages/configuracion/Empleados';
 export const MenuItems: Menu[] = [
    {
        name: 'Dashboard',
        Icon: MdOutlineSpaceDashboard,
        active:false,
        items: [
            {
                name: 'Dashboard',
                Component: Dashboard,
                to: '/',
                path: '/',
                esRutaHome: true,
                active:false,
            }
        ]
    },
    {
        name: 'Usuarios',
        Icon: AiOutlineUser,
        active:false,
        items: [
            {
                name: 'Usuarios',
                Component: Usuarios,
                to: '/usuarios',
                path: '/usuarios',
                esRutaHome: false,
                active:false,
            }
        ]
    },
    {
        name: 'Configuración',
        Icon: AiOutlineSetting,
        active:false,
        items: [
            {
                name: 'Funcionarios',
                Component: Empleados,
                to: '/empleados',
                path: '/empleados',
                esRutaHome: false,
                active:false,
            },
            {
                name: 'Configuración',
                Component: Configuracion,
                to: '/configuracion',
                path: '/configuracion',
                esRutaHome: false,
                active:false,
            },
            {
                name: 'Parametros',
                Component: Parametros,
                to: '/parametros',
                path: '/parametros',
                esRutaHome: false,
                active:false,
            }
            
        ]
    }
]
