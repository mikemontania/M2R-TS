import { Menu } from "./Menu";

export interface Item {
    name: string,
    Component: () => JSX.Element,
    to: string,
    path: string
    esRutaHome: boolean,
    active:boolean

}
export interface SidebarMenuItemsProps {
    navItems: Item[]; 
    setMenuActive:(value:boolean)=>void;
    activeMenu:boolean;

  }
 