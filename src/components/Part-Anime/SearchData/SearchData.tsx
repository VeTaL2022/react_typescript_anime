import React, {FC, MouseEvent} from "react";
import {Link} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {animeStuffActions} from "../../../redux";
import {IAnimeData} from "../../../interfaces";
import './SearchData.scss';

interface IProps {
    data: IAnimeData[],
    searchInput: string,
    viewWidth: string,
}

export const SearchData: FC<IProps> = ({data, searchInput, viewWidth}) => {
    const {hoveredAnime} = useAppSelector(({animeStuffReducer}) => animeStuffReducer);
    const dispatch = useAppDispatch();

    const handleHoveredAnime = (a: number | null) => {
        dispatch(animeStuffActions.setHoveredAnime(a));
    };

    const convertDate = (date: Date | number) => {
        const airedDate = new Date(date);
        return airedDate.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
    }

    const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
        const relatedTarget = event.relatedTarget as Node;
        if (!relatedTarget || !(relatedTarget instanceof Node) || !event.currentTarget.contains(relatedTarget)) {
            handleHoveredAnime(null);
        }
    };
    return (
        <div className={`anime-search-data ${viewWidth}`} onMouseLeave={handleMouseLeave}>
            {data.length > 0 ? (
                data.map((anime, index) => (
                    <Link
                        to={`${anime.mal_id}/${anime.title}`}
                        key={index}
                        className={`anime`}
                        onMouseEnter={() => handleHoveredAnime(index)}
                        onClick={() => dispatch(animeStuffActions.setSearchInput(''))}
                    >
                        <img src={anime.images.jpg.small_image_url} alt={anime.title}/>

                        {hoveredAnime === index ? (
                            <div className={'anime-info-extra'}>
                                <span>{anime.title} <small>({anime.type})</small></span>
                                <span>Aired: {convertDate(anime.aired.from)}</span>
                                <span>Score: {anime.score}</span>
                                <span>Status: {anime.status}</span>
                            </div>
                        ) : (
                            <div className={'anime-info'}>
                                <span>{anime.title}</span>
                                <span><small>({anime.type}, {anime.aired.prop.from.year})</small></span>
                            </div>
                        )}
                    </Link>
                ))
            ) : (
                searchInput.length > 0 && (
                    <p style={{padding: '5px 5px 5px 10px', textAlign: 'left', fontSize: 16}}>
                        No results found!
                    </p>
                )
            )}


            {data.length > 0 && (
                <Link to={`/anime/search?name=${searchInput}`} state={searchInput}
                      onClick={() => {
                          dispatch(animeStuffActions.setSearchInput(''));
                          dispatch(animeStuffActions.resetForm());
                      }}
                      className={'anime-view'}>
                        <span>
                            View all results for <button type={'button'}>{searchInput}</button>
                        </span>
                </Link>
            )}
        </div>
    );
};
