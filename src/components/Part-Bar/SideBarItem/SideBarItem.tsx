import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {SpeedDialIcon} from "@mui/material";
import {Link} from "react-router-dom";
import {FC, useState} from "react";

import {INavItem} from "../../../interfaces";
import './SideBarItem.scss';

interface IProps {
    item: INavItem,
    hideSideBar: () => void,
}

export const SideBarItem: FC<IProps> = ({item, hideSideBar}) => {
    const [open, setOpen] = useState<boolean>(false);
    const showOpen = () => setOpen(!open);

    if (item.children) {
        return (
            <div className={open ? 'sidebar-item open' : 'sidebar-item'}>
                <div onClick={showOpen} className={'father'}>
                    <div>
                        <SpeedDialIcon icon={<item.icon/>} className={'icons'}/>
                        <span>{item.title}</span>
                        {open ? (<ExpandLess className={'father-icon'}/>) : (
                            <ExpandMore className={'father-icon'}/>
                        )}
                    </div>
                </div>
                <div className={'sidebar-content'}>
                    {item.children.map((child, index) => <SideBarItem item={child} key={index}
                                                                      hideSideBar={hideSideBar}/>)}
                </div>
            </div>
        )
    } else {
        return (
            <div className={item.cName}>
                <Link to={item.path} onClick={hideSideBar}>
                    <SpeedDialIcon icon={<item.icon/>} className={'icons'}/>
                    <span>{item.title}</span>
                </Link>
            </div>
        );
    }
};
