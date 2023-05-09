import {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

import {image_categories} from "../../../configs";
import {Loader} from "../../Loader";
import {Footer} from "../../Footer";
import './ImagesCategory.scss';

export const ImagesCategory: FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        loading ? <Loader height={100}/> :
            <>
                <div className={'images-category-container'}>
                    <div className="category-buttons-container">
                        {image_categories.map((category, index) =>
                            <div key={index} className="category-button-wrapper">
                                <Button fullWidth><Link to={category}>{category}</Link></Button>
                            </div>)}
                    </div>
                </div>
                <Footer
                    info={'Anime\'s image category includes its visual style, character designs, and overall aesthetic, which can greatly impact the viewer\'s perception and enjoyment.'}/>
            </>
    );
};
