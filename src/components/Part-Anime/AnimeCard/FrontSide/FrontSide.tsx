import {Person, StarBorder} from "@mui/icons-material";
import React, {FC} from "react";

import {GenreBadge} from "../../GenresBadge/GenreBadge";
import {IAnimeData} from "../../../../interfaces";
import './FrontSide.scss';

interface Props {
    anime: IAnimeData,
    setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>,
}

const fixedMembers = (num: number) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'm';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed() + 'k';
    }
    return num;
};

export const FrontSide: FC<Props> = ({anime, setIsFlipped}) => {

    return (
        <div className={'front-side'} onClick={() => setIsFlipped(true)}>
            <div className={'front-side-header'}>
                <div className={'head'}>
                    <span>
                        <StarBorder fontSize={'inherit'}/>
                        {anime.score ? anime.score : 'N/A'}
                    </span>
                    <hr className={'hor-line'}/>
                    <span>
                        <Person fontSize={'inherit'}/>
                        {fixedMembers(anime.members)}
                    </span>
                    <hr className={'hor-line'}/>
                    {anime.aired.prop.from.year ? (
                        <span>
                        {anime.type},{anime.aired.prop.from.year}
                        </span>
                    ) : (
                        <span>{anime.type}</span>
                    )}
                </div>
            </div>
            <img src={anime.images.jpg.image_url} alt={anime.title}/>
            <div className={'front-side-footer'}>
                {anime.title.length > 48 ? (
                    <h5><b>{anime.title.slice(0, 48)}...</b></h5>
                ) : (<h5><b>{anime.title}</b></h5>)}
                <GenreBadge genres={anime.genres}/>
            </div>
        </div>
    );
};
