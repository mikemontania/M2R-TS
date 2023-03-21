import React, { useEffect, useState } from 'react'
import { Item } from '../Interfaces.ts/MenuItems';
import { MenuItems } from '../Menu';

export const UseItems = () => {

    const [rutas, setRutas] = useState<Item[]>([]);

    const parseMenusToItems = () => {
        let misrutas: Item[] = [];
        MenuItems.map((menu) => misrutas = [...menu.items.map(i => i), ...misrutas])
        setRutas(misrutas);
    }
     useEffect(() => { parseMenusToItems() }, []);
  return {
    rutas
  }
}
