import {Link} from "react-router-dom";
import {FC} from "react";

import {IAnimeCharacterResponse} from "../../../interfaces";
import './AnimeCharacters.scss';

export const AnimeCharacters: FC<{ characterData: IAnimeCharacterResponse }> = ({characterData}) => {

    return (
        <div className={'anime-character'}>
            {characterData?.data?.slice(0, 8).map((character, index) =>
                <div key={index} className={'character-child'}>
                    <div className={'le'}>
                        <Link to={`/character/${character.character.mal_id}/${character.character.name}`}>
                            <img src={character.character.images.jpg.image_url} alt={character.character.name}/>
                        </Link>
                        <div>
                            <span><Link
                                to={`/character/${character.character.mal_id}/${character.character.name}`}>{character.character.name}</Link></span>
                            <span>{character.role}</span>
                        </div>
                    </div>

                    {character.voice_actors[0]?.person.mal_id && (
                        <div className={'ri'}>
                            <div>
                            <span><Link
                                to={`/people/${character.voice_actors[0]?.person.mal_id}/${character.voice_actors[0]?.person.name}`}>{character.voice_actors[0]?.person.name}</Link></span>
                                <span>{character.voice_actors[0]?.language}</span>
                            </div>
                            <Link
                                to={`/people/${character.voice_actors[0]?.person.mal_id}/${character.voice_actors[0]?.person.name}`}>
                                <img
                                    src={character.voice_actors[0]?.person.images.jpg.image_url}
                                    alt={character.voice_actors[0]?.person.name}/>
                            </Link>
                        </div>
                    )}
                </div>)}
        </div>
    );
};
