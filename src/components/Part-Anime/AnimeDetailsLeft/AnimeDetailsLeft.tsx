import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {Link} from "react-router-dom";
import React, {FC} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {animeStuffActions} from "../../../redux";
import {IAnimeData} from "../../../interfaces";
import './AnimeDetailsLeft.scss';

export const AnimeDetailsLeft: FC<{ anime: IAnimeData }> = ({anime}) => {
    const {expand} = useAppSelector(({animeStuffReducer}) => animeStuffReducer);
    const dispatch = useAppDispatch();

    const handleExpand = (e: number) => {
        dispatch(animeStuffActions.setExpand(e));
    };

    const websiteURL = (url: string) => {
        return url?.replace('http://', 'https://')?.split('https://')?.pop()?.split('/')[0];
    }

    const lastProducerIndex = anime.producers.length - 1;
    const lastLicenseIndex = anime.licensors.length - 1;
    const lastStudioIndex = anime.studios.length - 1;
    const lastGenreIndex = anime.genres.length - 1;
    const lastThemeIndex = anime.themes.length - 1;

    const producers = anime.producers.map((p, i) => <span key={i}><Link
        to={`/anime/producer/${p.mal_id}/${p.name}`}>{p.name}</Link>{i < lastProducerIndex && ', '}</span>);

    const genres = anime.genres.map((g, i) => <span key={i}><Link
        to={`/anime/genre/${g.mal_id}/${g.name}`}>{g.name}</Link>{i < lastGenreIndex && ', '}</span>);

    const themes = anime.themes.map((t, i) => <span key={i}><Link
        to={`/anime/genre/${t.mal_id}/${t.name}`}>{t.name}</Link>{i < lastThemeIndex && ', '}</span>);

    const licensors = anime.licensors.map((l, i) => <span key={i}><Link
        to={`/anime/producer/${l.mal_id}/${l.name}`}>{l.name}</Link>{i < lastLicenseIndex && ', '}</span>);

    const studios = anime.studios.map((s, i) => <span key={i}><Link
        to={`/anime/producer/${s.mal_id}/${s.name}`}>{s.name}</Link>{i < lastStudioIndex && ', '}</span>);
    const demographic = anime.demographics[0] && <Link
        to={`/anime/genre/${anime.demographics[0]?.mal_id}/${anime.demographics[0]?.name}`}>{anime.demographics[0]?.name}</Link>;

    const premied = <Link
        to={`/anime/season/${anime.year}/${anime.season}`}>{anime.season?.charAt(0).toUpperCase() + anime.season?.slice(1)}, {anime.year}</Link>;

    const type = <Link
        to={`/anime/type/${anime.type}`}>{anime.type}</Link>;

    return (
        <div className={'anime-details-left-part'}>
            <img src={anime.images.jpg.image_url} alt={anime.title}/>
            <div className={'section'}>
                <h4>Alternative Titles</h4>
                <div className={'text'}>
                    {anime.title_synonyms.length > 0 &&
                        <span><b>Synonyms:</b> {anime.title_synonyms}</span>}
                    <span><b>Japanese:</b> {anime.title_japanese}</span>
                    {anime.title_english && (
                        <span><b>English:</b> {anime.title_english}</span>
                    )}
                </div>
            </div>

            <div className={'section'}>
                <h4>Information</h4>
                <div className={'text'}>
                    <span><b>Type:</b> {type}</span>
                    {anime.episodes && <span><b>Episodes:</b> {anime.episodes}</span>}
                    <span><b>Status:</b> {anime.status}</span>
                    <span><b>Aired:</b> {anime.aired.string}</span>
                    {anime?.season !== null && <span><b>Premiered:</b> {premied}</span>}
                    {anime.broadcast.string !== null &&
                        <span><b>Broadcast:</b> {anime.broadcast.string}</span>}
                    {producers.length > 0 && (
                        <span><b>Producers:</b> {producers}</span>
                    )}
                    {licensors.length > 0 && <span><b>Licensors:</b> {licensors}</span>}
                    {studios.length > 0 && (
                        <span><b>Studios:</b> {studios}</span>
                    )}
                    <span><b>Source:</b> {anime.source}</span>
                    <span><b>Genres:</b> {genres}</span>
                    {anime.themes.length > 0 && <span><b>Themes:</b> {themes}</span>}
                    {anime.demographics.length > 0 && <span><b>Demographic:</b> {demographic}</span>}
                    <span><b>Duration:</b> {anime.duration}</span>
                    <span><b>Rating:</b> {anime.rating}</span>
                </div>
            </div>

            <div className={'section'}>
                <h4>Statistics</h4>
                <div className={'text'}>
                    {anime.score && (
                        <span><b>Score:</b> {anime.score} (scored by {anime.scored_by?.toLocaleString('en-US')} users)</span>
                    )}
                    {anime.rank && <span><b>Ranked:</b> #{anime.rank}</span>}
                    <span><b>Popularity:</b> #{anime.popularity}</span>
                    <span><b>Members:</b> {anime.members.toLocaleString('en-US')}</span>
                    <span><b>Favorites:</b> {anime.favorites.toLocaleString('en-US')}</span>
                </div>
            </div>

            {anime.streaming?.length > 0 && (
                <div className={'section'}>
                    <h4>Streaming Platforms</h4>
                    <div className={'text'}>
                                    <span>{anime.streaming.slice(0, expand).map((stream, index) =>
                                        <span key={index} className={'text-item'}>
                                            <Link
                                                to={stream.url}
                                                target={'_blank'}>
                                                <img
                                                    src={`https://www.google.com/s2/favicons?domain=${websiteURL(stream.url)}`}
                                                    alt={stream.name}/>
                                                &nbsp;{stream.name}<i>*</i></Link>
                                        </span>)}
                                    </span>
                        {anime.streaming.length > 2 && (
                            <span className={expand <= 2 ? 'more' : 'less'}
                                  onClick={() => handleExpand(expand <= 2 ? anime.streaming.length : 2)}>
                                            {expand <= 2 ? (
                                                <span><ExpandMore sx={{marginBottom: 0.5}}/> More Services</span>
                                            ) : (
                                                <span><ExpandLess sx={{marginBottom: 0.5}}/> Less Services</span>
                                            )}
                                        </span>
                        )}

                        <span style={{color: 'red', fontSize: 11.5}}>* May be unavailable in your country</span>
                    </div>
                </div>)}
        </div>
    );
};
