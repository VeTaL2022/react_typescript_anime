import {Link, useParams} from "react-router-dom";
import {FC, useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {characterActions} from "../../../redux";
import {Loader} from "../../Loader";
import {Footer} from "../../Footer";
import './Character.scss';

export const Character: FC = () => {
    const {selectedCharacter} = useParams();
    const {data: character, loading} = useAppSelector(({characterReducer}) => characterReducer)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(characterActions.getFullById({id: selectedCharacter || ''}));
    }, [dispatch, selectedCharacter]);

    return (
        loading ? <Loader height={100}/> :
            <>
                <div className={'character'}>
                    <div className={'character-header'}>
                        <span>{character.name}</span>
                    </div>

                    <div className={'character-body'}>
                        <div className={'left-part'}>
                            <img src={character.images.jpg.image_url} alt={character.name}/>
                            <span
                                className={'member-favorite'}>Member Favorites: {character.favorites.toLocaleString('en-US')}</span>
                            {character.nicknames.length > 0 && (
                                <div className={'section'}>
                                    <h4>Nicknames</h4>
                                    <span>{character.nicknames.map((nick, index) => <span
                                        key={index}>{index + 1}: {nick}{index < character.nicknames.length - 1 && ','}</span>)}</span>
                                </div>
                            )}

                            <div className={'section'}>
                                <h4>Animeography</h4>
                                {character.anime.map((a, i) =>
                                    <div key={i} className={'character-items'}>
                                        <Link to={`/anime/${a.anime.mal_id}/${a.anime.title}`}>
                                            <img src={a.anime.images.jpg.image_url}
                                                 alt={a.anime.title}/>
                                        </Link>
                                        <div>
                                            <span><Link
                                                to={`/anime/${a.anime.mal_id}/${a.anime.title}`}>{a.anime.title}</Link></span>
                                            <span>{a.role}</span>
                                        </div>
                                    </div>)}
                            </div>

                            <div className={'section'}>
                                <h4>Mangaography</h4>
                                {character.manga.map((a, i) =>
                                    <div key={i} className={'character-items'}>
                                        <img src={a.manga.images.jpg.image_url}
                                             alt={a.manga.title}/>
                                        <div>
                                            <span>{a.manga.title}</span>
                                            <span>{a.role}</span>
                                        </div>
                                    </div>)}
                            </div>
                        </div>


                        <div className={'right-part'}>
                            <div className={'character-section'}>
                                <div className={'head'}>
                                    <span><b>{character.name}</b> ({character.name_kanji})</span>
                                </div>
                                {character.about.split('\n').map((info, index) => <p
                                    key={index}>{info?.replaceAll('&gt;', '>')}</p>)}
                            </div>

                            <div className={'character-section'}>
                                <div className={'head'}>
                                    <h4>Voice Actors</h4>
                                </div>
                                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>

                                    {character.voices.map((voice, index) =>
                                        <div key={index} className={'character-voices'}>
                                            <Link to={`/people/${voice.person.mal_id}/${voice.person.name}`}>
                                                <img src={voice.person.images.jpg.image_url}
                                                     alt={voice.person.name}/>
                                            </Link>
                                            <div>
                                            <span><Link
                                                to={`/people/${voice.person.mal_id}/${voice.person.name}`}>{voice.person.name}</Link></span>
                                                <span>{voice.language}</span>
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer
                    info={"Anime characters are adored for their unique personalities, captivating backstories, and engaging designs. They're celebrated through cosplay, merchandise, and fan art as cultural icons."}/>
            </>
    );
};
