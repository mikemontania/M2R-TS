export interface Item {
    name: string,
    Component: () => JSX.Element,
    to: string,
    path: string
    esRutaHome: boolean

}