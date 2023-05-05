import {ElementType} from "react";

export interface INavItem {
    title: string,
    path: string,
    icon: ElementType,
    cName: string,
    children?: INavItem[]
}
