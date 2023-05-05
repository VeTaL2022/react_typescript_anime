import {Link} from "react-router-dom";
import {FC} from "react";

import {IVoice} from "../../../interfaces";
import './PersonVoiceAnime.scss';

export const PersonVoiceAnime: FC<{ singleAnime: IVoice }> = ({singleAnime}) => {
    const {anime, role, character} = singleAnime;

    return (
        <div className={'person-anime'}>
            <div className={'left-section'}>
                <Link to={`/anime/${anime.mal_id}/${anime.title}`}>
                    <img src={anime.images.jpg.image_url} alt={anime.title}/>
                </Link>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link
                        to={`/anime/${anime.mal_id}/${anime.title}`}>{anime.title.length > 65 ? anime.title.slice(0, 65) + '...' : anime.title}</Link>
                </div>
            </div>
            <div className={'right-section'}>
                <div>
                    <span><Link
                        to={`/character/${character.mal_id}/${character.name}`}>{character.name}</Link></span>
                    <span>{role}</span>
                </div>
                <Link to={`/character/${character.mal_id}/${character.name}`}>
                    <img src={character.images.jpg.image_url} alt={character.name}/>
                </Link>
            </div>
        </div>
    );
};
