import {useLocation, useNavigate} from "react-router-dom";
import {Pagination, Stack} from "@mui/material";
import {FC, useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import giffNotFound from '../../../assets/GiffNotFound.gif';
import {AnimeSearchForm} from "../AnimeSearchForm";
import {IAnimeData} from "../../../interfaces";
import {animeActions} from "../../../redux";
import {Footer} from "../../Footer";
import {Loader} from "../../Loader";
import {ToTop} from "../../ToTop";
import {Anime} from "../Anime";
import './Search.scss';

export const Search: FC = () => {
    const {data, pagination, loading} = useAppSelector(({animeReducer}) => animeReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const query = location.state;

    const [searchInput, setSearchInput] = useState<string>(query);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        if (searchInput === '') {
            dispatch(animeActions.resetData());
        } else {
            dispatch(animeActions.getAllByName({
                q: searchInput,
                page: currentPage,
                limit: 25,
                sfw: true,
            }));
        }
    }, [currentPage, searchInput, dispatch]);

    return (
        <>
            <div className={'search'}>
                <AnimeSearchForm onSubmit={(data) => {
                    setSearchInput(data.search);
                    navigate({search: `?name=${data.search}`});
                }} name={query} reset={false} viewWidth={'view-width'}/>

                {loading ? <Loader height={100}/> : (
                    <>
                        {data.length ? (
                                <div className={'animes-container'}>
                                    {data.map((anime: IAnimeData, index: number) => <Anime anime={anime} key={index}/>)}
                                </div>
                            ) :
                            <div className={'not-found'}>
                                <div className={'not'}>
                                    <div>
                                        <h2><b>No results found!</b></h2>
                                        <hr/>
                                        <img
                                            src={giffNotFound}
                                            alt="not found"/>
                                    </div>
                                    <hr/>
                                    <div className={'inf'}>
                                    <span>"Sorry, I was not able to find anything based on the information you provided.
                                        Could you please check if the name you entered is spelled correctly and try again?"</span>
                                    </div>
                                </div>
                            </div>}
                        <div className={'animes-footer'}>
                            {pagination.last_visible_page > 1 && (
                                <Stack>
                                    <Pagination
                                        count={pagination.last_visible_page}
                                        color="primary"
                                        page={currentPage}
                                        onChange={(event, page) => {
                                            setCurrentPage(page);
                                            window.scrollTo(0, 0);
                                        }}
                                        className={'pagination'}
                                    />
                                </Stack>
                            )}
                        </div>
                    </>
                )}

            </div>
            <Footer
                info={'Anime search is popular among fans, who use streaming platforms, databases, and social media to find and discover new anime titles. It helps them connect with other fans and expand their knowledge of Japanese animation.'}/>
            <ToTop/>
        </>
    );
};
