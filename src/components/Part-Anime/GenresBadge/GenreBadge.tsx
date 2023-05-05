import {FC} from "react";

import {IAnimeGenre} from "../../../interfaces";
import './Badge.scss';

export const GenreBadge: FC<{ genres: IAnimeGenre[] }> = ({genres}) => {
    const lastIndex = genres.length - 1;

    return (
        <div className={'badge'}>
            {genres.map((genre, index) => (
                <div key={index}>
                    <i>{genre.name}</i>{index < lastIndex && ','}
                </div>
            ))}
        </div>
    );
};
