import {Close, GitHub} from '@mui/icons-material';
import {Link} from "react-router-dom";
import React, {FC} from "react";

import {side_bar_items} from "../../../configs";
import {SideBarItem} from "../SideBarItem";
import {NavBar} from "../NavBar";
import './SideBar.scss';

interface IProps {
    sideBar: boolean,
    showSideBar: () => void
}

export const SideBar: FC<IProps> = ({sideBar, showSideBar}) => {

        return (
            <>
                <NavBar showSideBar={showSideBar}/>

                <nav className={sideBar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className={'nav-menu-items'}>
                        <li className={'navbar-toggle'}>
                            <Link to={'#'} className={'menu-bars'}>
                                <Close onClick={showSideBar}/>
                            </Link>
                        </li>
                        {side_bar_items.map((item, index) => <SideBarItem item={item} key={index}
                                                                          hideSideBar={showSideBar}/>)}
                    </ul>

                    <Link to={'https://github.com/VeTaL2022/react_native_tom_macdonald_app'} target={'_blank'}
                          className={'github'}>
                        <div>
                            <GitHub/>
                            <span>GitHub</span>
                        </div>
                    </Link>
                </nav>

            </>
        );
    }
;
