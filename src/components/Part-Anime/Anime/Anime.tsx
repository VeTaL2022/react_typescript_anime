import {FC, useEffect, useState} from "react";
import ReactCardFlip from "react-card-flip";

import {BackSide, FrontSide} from "../AnimeCard";
import {IAnimeData} from "../../../interfaces";

export const Anime: FC<{ anime: IAnimeData }> = ({anime}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        let flipTimer: number;

        if (isFlipped) {
            flipTimer = window.setTimeout(() => setIsFlipped(false), 30000);
        }

        return () => window.clearTimeout(flipTimer);
    }, [isFlipped]);

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <FrontSide anime={anime} setIsFlipped={setIsFlipped}/>
            <BackSide anime={anime} setIsFlipped={setIsFlipped}/>
        </ReactCardFlip>
    );
};
