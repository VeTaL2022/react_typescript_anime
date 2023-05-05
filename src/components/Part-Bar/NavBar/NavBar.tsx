import {Menu} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {FC} from "react";

import './NavBar.scss';

export const NavBar: FC<{ showSideBar: () => void }> = ({showSideBar}) => {

    return (
        <div className={'navbar'}>
            <Link to={'#'} className={'menu-bars'}>
                <Menu onClick={showSideBar} sx={{fontSize: 30, marginTop: 0.6}}/>
            </Link>
            <h2>
                <Link to={'home'} className={'main-title'}>
                    AniHub
                </Link>
            </h2>
        </div>
    );
};
