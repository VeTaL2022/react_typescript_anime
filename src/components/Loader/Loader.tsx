import {CircularProgress} from "@mui/material";
import {FC} from "react";

import './Loader.scss';

export const Loader: FC<{ height: number }> = ({height}) => {

    return (
        <div className={'loader'} style={{height: height + 'vh'}}>
            <h5>Loading</h5>
            <CircularProgress/>
        </div>
    );
};
