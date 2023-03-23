import { NavLink } from 'react-router-dom'

export const SidebarItems = ({path,active,name}:{path: string, active: boolean, name: string}) => {
    {
        return (
            <ul key={path} className={active ? 'mm-collapse mm-show' : 'mm-collapse '}                 >
                <li key={path} className={active ? 'mm-active' : ''}>
                    <NavLink to={path}   >
                         {name}
                    </NavLink>
                </li>
            </ul>
        )
    }
}