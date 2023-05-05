import {Link} from "react-router-dom";
import React, {FC} from "react";

import {IAnimeData} from "../../../../interfaces";
import "./BackSide.scss";

interface Props {
    anime: IAnimeData;
    setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
}

export const duration = (minute: string) => {
    const matchResult = minute.match(/\d+/g);
    if (matchResult === null) {
        return "Invalid input";
    }
    const [hours, minutes] = matchResult.map(Number);
    return hours * 60 + minutes + " min";
}

export const BackSide: FC<Props> = ({anime, setIsFlipped}) => {
    const description = anime.synopsis;

    const status = (status: string) => {
        if (status === 'Finished Airing') {
            status = 'Finished';
        } else if (status === 'Currently Airing') {
            status = 'Airing';
        } else {
            status = 'Not Aired'
        }
        return status;
    }
    const lastIndex = anime.themes.length - 1;

    return (
        <div className="back-side">
            <div onClick={() => setIsFlipped(false)} className="back-side-clickable">
                <div className="back-side-header">
                    <img
                        src={anime.images.jpg.small_image_url}
                        alt={anime.title}
                    />
                    <div className={'header-info'}>
                        <div>{anime.episodes ? anime.episodes : '?'} eps, {anime.duration !== 'Unknown' ? anime.duration.includes('hr') ? duration(anime.duration) : anime.duration.slice(0, 7) : '0 min'}</div>
                        <span>Status: {status(anime.status)}</span>
                    </div>
                </div>

                <div className={'names'}>
                    <span><b>Studio:</b>&nbsp;{anime.studios.length > 0 ? anime.studios[0]?.name : '?'}</span>
                    <span><b>Source:</b>&nbsp;{anime.source ? anime.source : '?'}</span>
                    {anime.themes.length > 0 && <span><b>Themes:</b>&nbsp;{anime.themes.map((theme, index) => <span
                        key={index}>{theme.name}{index < lastIndex && ','}&nbsp;</span>)}</span>}
                    {anime.demographics.length > 0 && (
                        <span><b>Demographic:</b>&nbsp;{anime.demographics[0].name}</span>
                    )}
                </div>
            </div>

            <div className="back-side-non-clickable">
                <span>
                {description ? description.slice(0, 150) + "..." : 'Nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant ...'}
                </span>
                <div className="link">
                    <Link to={`/anime/${anime.mal_id}/${anime.title}`}>
                        View More
                    </Link>
                </div>
            </div>
        </div>
    );
};
