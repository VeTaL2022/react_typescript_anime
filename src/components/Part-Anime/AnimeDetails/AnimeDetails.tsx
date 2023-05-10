import {Link, useParams} from "react-router-dom";
import {HashLink} from "react-router-hash-link";
import React, {FC, useEffect} from "react";
import {Close} from "@mui/icons-material";
import {Button} from "@mui/material";

import trailerComingSoon from '../../../assets/TrailerComingSoon.png';
import {animeActions, animeResourcesActions} from "../../../redux";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {AnimeDetailsLeft} from "../AnimeDetailsLeft";
import {AnimeCharacters} from "../AnimeCharacters";
import {AnimeThemeSongs} from "../AnimeThemeSongs";
import {AnimeReviews} from "../AnimeReviews";
import {AnimeStaff} from "../AnimeStaff";
import {duration} from "../AnimeCard";
import {Loader} from "../../Loader";
import {Footer} from "../../Footer";
import './AnimeDetails.scss'

export const AnimeDetails: FC = () => {
    const {selectedId = ''} = useParams();
    const dispatch = useAppDispatch();
    const {
        singleData: {data: anime},
        animeLoading,
        characterData,
        staffData,
        reviewData,
        isButtonClicked,
        trailerURL,
    } = useAppSelector((state) => ({
        singleData: state.animeReducer.singleData,
        animeLoading: state.animeReducer.loading,
        characterData: state.animeResourcesReducer.characterData,
        staffData: state.animeResourcesReducer.staffData,
        reviewData: state.animeResourcesReducer.reviewData,
        isButtonClicked: state.animeResourcesReducer.isButtonClicked,
        trailerURL: state.animeReducer.trailerURL,
    }));

    useEffect(() => {
        dispatch(animeActions.getFullById({id: selectedId || ''}));
        dispatch(animeResourcesActions.getCharacterData({id: selectedId || ''}));
        dispatch(animeResourcesActions.getStaffData({id: selectedId || ''}));
    }, [dispatch, selectedId]);

    useEffect(() => {
        dispatch(animeResourcesActions.reset());
    }, []);

    const lastStudioIndex = anime.studios.length - 1;

    const studios = anime.studios.map((s, i) => <span key={i}><Link
        to={`/anime/producer/${s.mal_id}/${s.name}`}>{s.name}</Link>{i < lastStudioIndex && ', '}</span>);

    const premied = <Link
        to={`/anime/season/${anime.year}/${anime.season}`}>{anime.season?.charAt(0).toUpperCase() + anime.season?.slice(1)}, {anime.year}</Link>;

    const type = <Link
        to={`/anime/type/${anime.type}`}>{anime.type}</Link>;
    const handleTrailerURL = (trailer: string) => {
        dispatch(animeActions.setTrailerURL(trailer));
    }
    return (
        animeLoading ? <Loader height={100}/> :
            <>
                <div className={'anime-details'}>
                    <div className={'details-header'}>
                        <div>
                            <span>{anime.title}</span>
                            <span>{anime.title_english}</span>
                        </div>
                    </div>

                    <div className={'details-body'}>
                        <AnimeDetailsLeft anime={anime}/>

                        <div className={'right-part'}>
                            <div className={'section-header'}>
                                <div className={'general'}>
                                    <div className={'general-info'}>
                                        <div className={'left'}>
                                            <span>SCORE</span>
                                            <span><b>{anime.score ? anime.score : '0'}</b></span>
                                            <span>{anime.scored_by ? anime.scored_by?.toLocaleString('en-US') : 'N/A'} users</span>
                                        </div>
                                        <hr/>
                                        <div className={'right'}>
                                            <div className={'rr'}>
                                                <div>
                                                    <span>Ranked</span>
                                                    <span><b>#{anime.rank ? anime.rank : '0'}</b></span>
                                                </div>
                                                <div>
                                                    <span>Popularity</span>
                                                    <span><b>#{anime.popularity}</b></span>
                                                </div>
                                                <div>
                                                    <span>Members</span>
                                                    <span><b>{anime.members.toLocaleString('en-US')}</b></span>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className={'right'}>
                                            <div className={'rr'}>
                                                <div>
                                                    <span>Episodes</span>
                                                    <span><b>{anime.episodes ? anime.episodes : 'N/A'}</b></span>
                                                </div>
                                                <div>
                                                    <span>Duration</span>
                                                    <span>
                                                      <b>
                                                        {anime.duration !== 'Unknown' ?
                                                            anime.duration.includes('hr') ? duration(anime.duration)
                                                                : anime.duration.slice(0, 7)
                                                            : '0 min,'
                                                        }
                                                      </b>
                                                </span>
                                                </div>
                                                <div>
                                                    <span>Rating</span>
                                                    <span><b>{anime.rating?.includes('13') ? anime.rating?.slice(0, 6) : anime.rating?.slice(0, 7)}</b></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'general-links'}>
                                        {anime.season !== null && <><span>{premied}</span>
                                            <hr/>
                                        </>}
                                        <span>{type}</span>
                                        {studios.length > 0 && (
                                            <>
                                                <hr/>
                                                <span>{studios}</span>
                                            </>
                                        )}
                                        <hr/>
                                        <span>{anime.genres.slice(0, 4).map((g, i) =>
                                            <span key={i}><Link
                                                to={`/anime/genre/${g.mal_id}/${g.name}`}>{g.name}</Link>{i < anime.genres.slice(0, 4).length - 1 && ', '}
                                            </span>)}
                                        </span>
                                    </div>
                                </div>
                                <div className={'trailer'}>
                                    {anime.trailer.embed_url ? (
                                            <Link to={anime.trailer.embed_url}
                                                  onClick={(e) => {
                                                      e.preventDefault();
                                                      handleTrailerURL(anime.trailer.embed_url);
                                                  }}>
                                                <img
                                                    src={anime.trailer.images.medium_image_url}
                                                    alt=""/>
                                                <span><b>Watch Trailer</b></span>
                                            </Link>
                                        ) :
                                        <div style={{height: 173, backgroundColor: '#000'}}>
                                            <img
                                                style={{objectFit: 'none'}}
                                                src={trailerComingSoon}
                                                alt="No trailer"/>
                                        </div>}
                                </div>
                                {trailerURL && (
                                    <div className={'trailer-container'} onClick={() => handleTrailerURL('')}>
                                        <div className={'trailer-video'}>
                                            <Close onClick={() => handleTrailerURL('')}/>
                                            <iframe src={trailerURL} title={anime.title} allowFullScreen></iframe>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {anime.synopsis && (
                                <div className={'section'}>
                                    <h4>Synopsis</h4>
                                    {anime.synopsis?.split('\n').map((v, i) => <p key={i}>{v}</p>)}
                                </div>
                            )}

                            {anime.background && <div className={'section'}>
                                <h4>Background</h4>
                                <p>{anime.background}</p>
                            </div>}

                            <div className={'section'}>
                                <h4>Related Anime</h4>
                                {anime.relations?.map((relation, index) => (
                                    <div key={index} className={'relation-container'}>
                                        <span>{relation.relation}:</span>
                                        <span>{relation.entry.map((r, i) => (
                                            <span key={i}><Link
                                                to={`/anime/${r.mal_id}/${r.name}`}>{r.name}</Link>{i < relation.entry.length - 1 && ', '}</span>
                                        ))}</span>
                                    </div>
                                ))}
                            </div>

                            {characterData.data?.length > 0 && (
                                <div className={'section'}>
                                    <h4 style={{justifyContent: 'space-between'}}>Characters & Voice Actors
                                        <span style={{fontWeight: 'normal'}}><Link
                                            to={`/anime/${selectedId}/characters`}>More Characters</Link></span>
                                    </h4>
                                    <AnimeCharacters characterData={characterData}/>
                                </div>
                            )}
                            {staffData.data.length > 0 && (
                                <div className={'section'}>
                                    <h4 style={{justifyContent: 'space-between'}}>Staff
                                        <span style={{fontWeight: 'normal'}}>
                                            {staffData.data.length > 5 && (
                                                <HashLink to={`/anime/${selectedId}/characters#staff`}
                                                          scroll={(element) => {
                                                              const boundingClientRect = element.getBoundingClientRect();
                                                              const topPosition = window.pageYOffset + boundingClientRect.top - 75;
                                                              window.scroll({top: topPosition})
                                                          }}>
                                                    More Staff
                                                </HashLink>
                                            )}
                                        </span>
                                    </h4>
                                    {staffData && <AnimeStaff staffData={staffData}/>}
                                </div>
                            )}

                            <AnimeThemeSongs anime={anime}/>
                            {reviewData.data.length === 0 && !isButtonClicked && (
                                <Button
                                    onClick={() => {
                                        dispatch(animeResourcesActions.setIsButtonClicked(true));
                                        dispatch(animeResourcesActions.getReviewData({id: selectedId || ''}));
                                    }}
                                    sx={{color: 'green-blue', margin: '20px auto 0', width: '100%', padding: '10px 0'}}
                                >
                                    View Reviews
                                </Button>
                            )}
                            {reviewData.data?.length > 0 && (
                                <div className={'section'}>
                                    <h4>Reviews</h4>
                                    <AnimeReviews reviewData={reviewData} animeId={selectedId || ''}/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Footer
                    info={'Anime details are often packed with meaning and symbolism, enhancing the viewing experience and making it a unique form of storytelling.'}/>
            </>
    );
};
