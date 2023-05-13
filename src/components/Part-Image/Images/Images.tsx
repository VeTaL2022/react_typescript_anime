import {useParams} from "react-router-dom";
import {Replay} from "@mui/icons-material";
import Masonry from 'react-masonry-css';
import {FC, useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {image_categories} from "../../../configs";
import {imageActions} from "../../../redux";
import {Loader} from "../../Loader";
import {Image} from "../Image";
import './Images.scss';

export const Images:FC = () => {
    const {selectedCategory} = useParams();

    const {image: {files}, loading, clickedImage, randomCategory} = useAppSelector(({imageReducer}) => imageReducer);
    const dispatch = useAppDispatch();

    const handleReplayClick = () => {
        if (selectedCategory) {
            dispatch(imageActions.getAllByCategory({category: selectedCategory}));
        } else {
            dispatch(imageActions.getAllByCategory({category: randomCategory}));
        }
    };

    const handleRandomCategory = (category: string) => {
        dispatch(imageActions.setRandomCategory(category));
    }

    useEffect(() => {
        handleRandomCategory(image_categories[Math.floor(Math.random() * image_categories.length)]);
        handleReplayClick();
    }, [dispatch, selectedCategory]);

    const handleClickImage = (image: string) => {
        dispatch(imageActions.setClickedImage(image));
    };

    const breakColumns = {
        default: 4,
        1200: 3,
        800: 2,
        400: 1
    };

    return (
        loading ? <Loader height={100}/> :
            <>
                <div style={{margin: '100px auto'}}>
                    <Masonry breakpointCols={breakColumns} className={'images-masonry-grid'}
                             columnClassName={'images-masonry-grid_column'}>
                        {files?.map((image, index) => <Image image={image} key={index}
                                                             setClickedImage={handleClickImage}/>)}
                    </Masonry>

                    {clickedImage && (
                        <div className={'clicked-image'} onClick={(event) => {
                            if (event.target === event.currentTarget) {
                                handleClickImage('')
                            }
                        }}>
                            <img src={clickedImage} alt="clicked"/>
                        </div>
                    )}

                    <div className={'replay-container'} onClick={handleReplayClick}>
                        <Replay className={'replay-icon'}/>
                    </div>
                </div>
            </>
    );
};
