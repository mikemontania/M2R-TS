import { IconType } from "react-icons";
import { Item } from "./Item";

export interface Menu {
    Icon: IconType,
    name: string,
    active:boolean,
    items: Item[]
}

