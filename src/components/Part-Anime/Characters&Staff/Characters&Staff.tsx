import {Link, useParams} from "react-router-dom";
import {FC, useEffect} from "react";

import {animeActions, animeResourcesActions} from "../../../redux";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {AnimeDetailsLeft} from "../AnimeDetailsLeft";
import {Loader} from "../../Loader";
import {Footer} from "../../Footer";
import {ToTop} from "../../ToTop";
import './Characters&Staff.scss';

export const CharactersStaff: FC = () => {
    const {selectedAnime} = useParams();

    const {staffData, characterData, animeData, staffLoad, characterLoad, animeLoad} = useAppSelector((state) => ({
        staffData: state.animeResourcesReducer.staffData,
        characterData: state.animeResourcesReducer.characterData,
        animeData: state.animeReducer.singleData,
        staffLoad: state.animeResourcesReducer.loading,
        characterLoad: state.animeResourcesReducer.loading,
        animeLoad: state.animeReducer.loading
    }));
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(animeResourcesActions.getStaffData({id: selectedAnime || ''}));
        dispatch(animeResourcesActions.getCharacterData({id: selectedAnime || ''}));
        dispatch(animeActions.getFullById({id: selectedAnime || ''}));
    }, [dispatch, selectedAnime]);

    const sortedCharacters = characterData.data ? [...characterData.data].sort((a, b) => b.favorites - a.favorites) : [];

    return (
        staffLoad || characterLoad || animeLoad ? <Loader height={100}/> :
            <>
                <div className={'staff'}>
                    <div className={'staff-header'}>
                        <h4>{animeData?.data.title}</h4>
                    </div>

                    <div className={'staff-body'}>
                        <AnimeDetailsLeft anime={animeData?.data}/>

                        <div className={'staff-right'}>
                            <h4>Characters & Voice Actors</h4>
                            <div className={'staff-section'}>
                                {sortedCharacters?.map((char, index) =>
                                    <div key={index} className={'character-children'}>
                                        <div className={'chr'}>
                                            <Link to={`/character/${char.character.mal_id}/${char.character.name}`}>
                                                <img src={char.character.images.jpg.image_url}
                                                     alt={char.character.name}/>
                                            </Link>
                                            <div>
                                            <span><Link
                                                to={`/character/${char.character.mal_id}/${char.character.name}`}>{char.character.name}</Link></span>
                                                <span>{char.role}</span>
                                                <span
                                                    style={{marginTop: 15}}>({char.favorites.toLocaleString('en-US')} Favorites)</span>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className={'actors-container'}>
                                            {char.voice_actors.map((actor, index) =>
                                                <div key={index} className={'actor-children'}>
                                                    <Link to={`/people/${actor.person.mal_id}/${actor.person.name}`}>
                                                        <img src={actor.person.images.jpg.image_url}
                                                             alt={actor.person.name}/>
                                                    </Link>
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        margin: '5px 0 0 5px'
                                                    }}>
                                                    <span>
                                                        <Link
                                                            to={`/people/${actor.person.mal_id}/${actor.person.name}`}>{actor.person.name}</Link></span>
                                                        <span>{actor.language}</span>
                                                    </div>
                                                </div>)}
                                        </div>
                                    </div>)}
                            </div>

                            <h4 id={'staff'}>Staff</h4>
                            <div className={'staff-section'}>
                                {staffData?.data.map((st, index) =>
                                    <div key={index} className={'staff-children'}>
                                        <Link to={`/people/${st.person.mal_id}/${st.person.name}`}>
                                            <img src={st.person.images.jpg.image_url} alt={st.person.name}/>
                                        </Link>
                                        <div className={'staff-info'}>
                                            <span>
                                            <Link
                                                to={`/people/${st.person.mal_id}/${st.person.name}`}>{st.person.name}</Link>
                                            </span>
                                            <div>{st.positions?.map((p, i) =>
                                                <i key={i}>
                                                    {p}{i < st.positions.length - 1 && ', '}
                                                </i>)}
                                            </div>
                                        </div>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer
                    info={'Anime characters are fictional individuals who drive the story. Voice actors bring characters to life by providing their voices, while anime staff work behind the scenes to create the anime.'}/>
                <ToTop/>
            </>
    );
};
