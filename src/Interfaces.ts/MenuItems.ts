import { IconType } from "react-icons";

export interface Menu {
    Icon: IconType,
    name: string,
    items: Item[]
}

export interface Item {
    name: string,
    Component: () => JSX.Element,
    to: string,
    path: string
    esRutaHome: boolean

}